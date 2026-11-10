import { prisma } from "../config/prisma";
import type { PayuResult } from "../controllers/payuController";
import { sendAutomatedEmail } from "./emailService";
import { getPayuConfig, verifyPayuTransaction } from "./payu";
import { getSiteUrl } from "./siteUrl";
import { ensureBookingInvoice } from "./bookingInvoice";
import { regenerateInvoicePdf } from "./invoicePdf";
import { COMPANY_CONFIG } from "./pricing";

export type BookingPayOutcome = {
  outcome: "success" | "failed" | "cancelled" | "pending";
  message?: string;
};

const inr = (n: number) => `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

// Single place that turns a PayU result (browser callback OR server-side verification) into DB state for a stay request.
// Idempotent: replaying the same result never changes anything twice.
export async function applyBookingPayuResult(paymentId: string, result: PayuResult): Promise<BookingPayOutcome> {
  const payment = await prisma.bookingPayment.findUniqueOrThrow({
    where: { id: paymentId },
    include: { booking_request: { include: { client: true } } },
  });
  const booking = payment.booking_request;

  if (payment.status === "SUCCESSFUL") return { outcome: "success" };

  const status = result.status.toLowerCase();

  if (status === "success") {
    if (Math.abs(result.amount - payment.amount) > 0.01) {
      console.error("[BookingPay] Amount mismatch", { txn: payment.txnid, expected: payment.amount, got: result.amount });
      await prisma.bookingPayment.update({
        where: { id: payment.id },
        data: {
          status: "FAILED",
          gateway_payment_id: result.mihpayid || null,
          error_description: `AMOUNT_MISMATCH: paid ${result.amount}, expected ${payment.amount}`,
          raw_response: result.rawJson,
        },
      });
      return { outcome: "failed", message: "Payment amount mismatch" };
    }

    // Already paid by another attempt (two tabs): keep the record, flag it so the money can be refunded
    const alreadyPaid = booking.payment_status === "PAID";
    const amountStillDue = booking.amount_due !== null && Math.abs(booking.amount_due - payment.amount) <= 0.01;

    await prisma.bookingPayment.update({
      where: { id: payment.id },
      data: {
        status: "SUCCESSFUL",
        gateway_payment_id: result.mihpayid,
        payment_method: result.mode || null,
        error_description: alreadyPaid
          ? "DUPLICATE_PAYMENT: this request was already paid, refund needed"
          : !amountStillDue
          ? `AMOUNT_CHANGED: the amount due was changed to ${booking.amount_due} after this payment started, please review`
          : null,
        raw_response: result.rawJson,
      },
    });

    if (alreadyPaid) {
      console.error("[BookingPay] Duplicate payment for", booking.request_code, payment.txnid);
      return { outcome: "success" };
    }
    if (!amountStillDue) {
      console.error("[BookingPay] Amount due changed during payment for", booking.request_code, payment.txnid);
      return { outcome: "success" };
    }

    const paidAt = new Date();
    await prisma.bookingRequest.update({
      where: { id: booking.id },
      data: {
        payment_status: "PAID",
        paid_at: paidAt,
        // A cancelled request keeps its status (the admin must refund it); everything else is completed by payment
        ...(booking.status === "CANCELLED" ? {} : { status: "COMPLETED" }),
      },
    });

    // Invoice (best effort: it is also created on demand when the member downloads it)
    let invoicePdf: { filename: string; path: string } | undefined;
    try {
      const invoice = await ensureBookingInvoice(booking.id);
      if (invoice) invoicePdf = { filename: `${invoice.invoice_number}.pdf`, path: (await regenerateInvoicePdf(invoice.id)).filePath };
    } catch (e) {
      console.error("[BookingPay] Could not create the invoice for", booking.request_code, e);
    }

    // Best-effort notifications
    const name = `${booking.client.salutation} ${booking.client.first_name} ${booking.client.last_name}`.trim();
    const lines: [string, string][] = [
      ["Request", booking.request_code],
      ["Hotel", `${booking.hotel_name}, ${booking.city}`],
      ["Amount paid", inr(payment.amount)],
      ["PayU reference", result.mihpayid || payment.txnid],
    ];
    const base = { membershipPlan: booking.client.membership_plan, bookingCode: booking.request_code, bookingLines: lines, amount: payment.amount };
    sendAutomatedEmail({ recipient: booking.client.email, templateType: "BOOKING_PAYMENT_RECEIVED", clientId: booking.client_id, data: { ...base, clientName: name }, attachment: invoicePdf }).catch((e) =>
      console.error("[BookingPay] member receipt email failed:", e)
    );
    sendAutomatedEmail({
      recipient: process.env.BOOKING_ALERT_EMAIL || COMPANY_CONFIG.email,
      templateType: "BOOKING_PAYMENT_ADMIN_ALERT",
      clientId: booking.client_id,
      data: { ...base, clientName: name, actionUrl: `${getSiteUrl()}/admin/requests` },
    }).catch((e) => console.error("[BookingPay] admin payment alert email failed:", e));

    return { outcome: "success" };
  }

  if (status === "pending") {
    await prisma.bookingPayment.update({
      where: { id: payment.id },
      data: { gateway_payment_id: result.mihpayid || null, payment_method: result.mode || null, raw_response: result.rawJson },
    });
    return { outcome: "pending" };
  }

  const cancelled =
    status === "abandoned" || String(result.unmappedstatus || "").toLowerCase() === "usercancelled" || /cancel/i.test(String(result.errorMessage || ""));
  await prisma.bookingPayment.update({
    where: { id: payment.id },
    data: {
      status: cancelled ? "ABANDONED" : "FAILED",
      gateway_payment_id: result.mihpayid || null,
      payment_method: result.mode || null,
      error_description:
        String(result.errorMessage || "").trim() || (cancelled ? "Payment was cancelled or not completed" : "Payment failed at PayU"),
      raw_response: result.rawJson,
    },
  });
  return { outcome: cancelled ? "cancelled" : "failed", message: result.errorMessage };
}

// ---- background reconciliation (same idea as the membership reconciler) ----

const MIN_AGE_MS = 2 * 60 * 1000;
const MAX_AGE_MS = 3 * 24 * 60 * 60 * 1000;
const ABANDON_AFTER_MS = 45 * 60 * 1000;
let running = false;

export async function reconcilePendingBookingPayments(): Promise<void> {
  if (running) return;
  const { key, salt } = getPayuConfig();
  if (!key || !salt) return;

  running = true;
  try {
    const now = Date.now();
    const pending = await prisma.bookingPayment.findMany({
      where: { status: "PENDING", created_at: { gte: new Date(now - MAX_AGE_MS), lte: new Date(now - MIN_AGE_MS) } },
      orderBy: { created_at: "asc" },
      take: 25,
    });

    for (const payment of pending) {
      try {
        const age = now - payment.created_at.getTime();
        const details = await verifyPayuTransaction(payment.txnid);
        const status = details?.status || "";
        const notFound = !details || status === "not found";

        let result: PayuResult | null = null;
        if (details && !notFound && (status === "success" || status === "failure" || status === "failed")) {
          result = {
            status: status === "success" ? "success" : "failure",
            mihpayid: details.mihpayid,
            amount: details.amount,
            mode: details.mode,
            unmappedstatus: details.unmappedstatus,
            errorCode: details.errorCode,
            errorMessage: details.errorMessage,
            signature: null,
            rawJson: details.rawJson,
          };
        } else if (status !== "pending" && age > ABANDON_AFTER_MS) {
          result = {
            status: "abandoned",
            mihpayid: notFound ? "" : details!.mihpayid,
            amount: payment.amount,
            mode: details?.mode || null,
            errorMessage: `Payment was not completed (PayU status: ${notFound ? "not found" : status || "unknown"})`,
            rawJson: details?.rawJson || JSON.stringify({ txnid: payment.txnid, status: "not found", verifiedVia: "verify_payment" }),
          };
        }
        if (!result) continue;

        const outcome = await applyBookingPayuResult(payment.id, result);
        console.log(`[BookingPay Reconciler] ${payment.txnid} -> ${outcome.outcome}`);
      } catch (err: any) {
        console.error(`[BookingPay Reconciler] Failed to reconcile ${payment.txnid}:`, err?.message || err);
      }
    }
  } catch (err: any) {
    console.error("[BookingPay Reconciler] Run failed:", err?.message || err);
  } finally {
    running = false;
  }
}

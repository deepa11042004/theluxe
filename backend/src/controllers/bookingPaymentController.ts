import { Request, Response } from "express";
import fs from "fs";
import { prisma } from "../config/prisma";
import { isBlocked, recordAttempt } from "../utils/attemptLimiter";
import { getGroupClients } from "../utils/clientAuth";
import { applyBookingPayuResult } from "../utils/bookingPayments";
import { ensureBookingInvoice } from "../utils/bookingInvoice";
import { regenerateInvoicePdf } from "../utils/invoicePdf";
import { buildRequestHash, formatAmount, generateTxnId, getPayuConfig, sanitizeField, verifyResponseHash } from "../utils/payu";
import { isLocalhostUrl, resolveCallbackBase } from "./payuController";

const HOUR = 60 * 60 * 1000;
const fail = (res: Response, status: number, message: string) => res.status(status).json({ success: false, message });

// Member clicks "Pay Now" on a stay request: returns the signed PayU form fields for the amount the admin set.
export async function payBooking(req: Request, res: Response) {
  try {
    const { live, key, salt, paymentUrl } = getPayuConfig();
    if (!key || !salt) {
      console.error("[BookingPay] PayU is not configured on the server");
      return fail(res, 500, "Payments are temporarily unavailable. Please contact the concierge.");
    }

    const group = await getGroupClients(req.client!.email);
    const booking = await prisma.bookingRequest.findFirst({
      where: { id: req.params.id, client_id: { in: group.map((c) => c.id) } },
      include: { client: true },
    });
    if (!booking) return fail(res, 404, "Request not found.");
    if (booking.payment_status === "PAID") return fail(res, 400, "This request is already paid.");
    if (booking.payment_status !== "UNPAID" || !booking.amount_due || booking.amount_due <= 0) {
      return fail(res, 400, "There is no payment due for this request yet.");
    }
    if (booking.status === "CANCELLED") return fail(res, 400, "This request was cancelled.");

    const limitKey = `client-pay:${booking.id}`;
    if (isBlocked(limitKey, 10)) return fail(res, 429, "Too many payment attempts. Please try again in an hour.");
    recordAttempt(limitKey, HOUR);

    const callbackBase = resolveCallbackBase(req);
    if (!callbackBase || (!callbackBase.startsWith("https://") && !isLocalhostUrl(callbackBase))) {
      console.error("[BookingPay] Cannot determine a safe https return URL. Resolved:", JSON.stringify(callbackBase));
      return fail(res, 500, "Payments are temporarily unavailable. Please contact the concierge.");
    }

    // The amount always comes from the database, never from the browser
    const txnid = generateTxnId();
    const amount = formatAmount(booking.amount_due);
    const productinfo = sanitizeField(`Stay ${booking.request_code}`, 100);
    const firstname = sanitizeField(booking.client.first_name, 60) || "Member";

    await prisma.bookingPayment.create({
      data: { booking_request_id: booking.id, txnid, amount: booking.amount_due, currency: "INR", status: "PENDING" },
    });

    const callbackUrl = `${callbackBase}/api/v1/client/bookings/payu/callback`;
    const hash = buildRequestHash({ txnid, amount, productinfo, firstname, email: booking.client.email });
    if (live) console.log("[BookingPay] Starting LIVE payment", booking.request_code, amount);

    return res.json({
      success: true,
      data: {
        actionUrl: paymentUrl,
        fields: { key, txnid, amount, productinfo, firstname, email: booking.client.email, phone: booking.client.mobile, surl: callbackUrl, furl: callbackUrl, hash },
      },
    });
  } catch (err) {
    console.error("[BookingPay] payBooking error:", err);
    return fail(res, 500, "Could not start the payment. Please try again.");
  }
}

// PayU sends the member's browser back here (POST, no cookies). Nothing is trusted except the signed response.
export async function bookingPayuCallback(req: Request, res: Response) {
  const back = (params: Record<string, string>) => res.redirect(303, `/member/requests?${new URLSearchParams(params).toString()}`);
  try {
    const body = (req.body || {}) as Record<string, any>;
    const txnid = String(body.txnid || "");
    if (!txnid) return back({ payment: "error" });

    if (!verifyResponseHash(body)) {
      console.warn("[BookingPay] Response hash verification failed for txnid:", txnid);
      return back({ payment: "error" });
    }

    const payment = await prisma.bookingPayment.findUnique({
      where: { txnid },
      include: { booking_request: { select: { request_code: true } } },
    });
    if (!payment) return back({ payment: "error" });

    const result = await applyBookingPayuResult(payment.id, {
      status: String(body.status || ""),
      mihpayid: String(body.mihpayid || ""),
      amount: Number(body.amount),
      mode: body.mode ? String(body.mode) : null,
      unmappedstatus: String(body.unmappedstatus || ""),
      errorCode: body.error ? String(body.error) : null,
      errorMessage: String(body.error_Message || body.field9 || ""),
      signature: String(body.hash || ""),
      rawJson: JSON.stringify({
        mihpayid: body.mihpayid,
        mode: body.mode,
        status: body.status,
        unmappedstatus: body.unmappedstatus,
        txnid,
        amount: body.amount,
        bank_ref_num: body.bank_ref_num,
        error: body.error,
        error_Message: body.error_Message,
        addedon: body.addedon,
      }),
    });
    return back({ payment: result.outcome, code: payment.booking_request.request_code });
  } catch (err) {
    console.error("[BookingPay] Callback error:", err);
    return back({ payment: "error" });
  }
}

// Invoice PDF of a paid stay request (created on first download if it does not exist yet)
export async function downloadBookingInvoice(req: Request, res: Response) {
  try {
    const group = await getGroupClients(req.client!.email);
    const booking = await prisma.bookingRequest.findFirst({
      where: { id: req.params.id, client_id: { in: group.map((c) => c.id) } },
      select: { id: true, payment_status: true },
    });
    if (!booking) return fail(res, 404, "Request not found.");
    if (booking.payment_status !== "PAID") return fail(res, 400, "An invoice is available once the request has been paid.");

    const invoice = await ensureBookingInvoice(booking.id);
    if (!invoice) return fail(res, 500, "Could not prepare the invoice. Please try again.");

    const { filePath } = await regenerateInvoicePdf(invoice.id);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${invoice.invoice_number}.pdf"`);
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    console.error("[BookingPay] downloadBookingInvoice error:", err);
    return fail(res, 500, "Could not prepare the invoice PDF.");
  }
}

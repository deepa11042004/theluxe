import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import {
  activateMembershipAfterPayment,
  RegistrationValidationError,
  saveRegistrationClient,
} from "./membershipController";
import {
  buildRequestHash,
  formatAmount,
  generateTxnId,
  getPayuConfig,
  sanitizeField,
  verifyResponseHash,
} from "../utils/payu";

export async function initiatePayuPayment(req: Request, res: Response) {
  try {
    const { key, salt, paymentUrl, callbackBase } = getPayuConfig();
    if (!key || !salt) {
      return res.status(500).json({
        success: false,
        message: "PayU is not configured on the server (PAYU_KEY / PAYU_SALT missing).",
      });
    }

    const { client, planPricing } = await saveRegistrationClient(req.body);

    const txnid = generateTxnId();
    const amount = formatAmount(planPricing.totalAmount);
    const productinfo = sanitizeField(planPricing.name, 100);
    const firstname = sanitizeField(client.first_name, 60) || "Member";

    const paymentAttempt = await prisma.paymentAttempt.create({
      data: {
        client_id: client.id,
        gateway: "PAYU",
        gateway_order_id: txnid,
        amount: planPricing.totalAmount,
        currency: "INR",
        status: "PENDING",
      },
    });

    const callbackUrl = `${callbackBase}/api/v1/membership/payu/callback`;
    const hash = buildRequestHash({ txnid, amount, productinfo, firstname, email: client.email });

    return res.status(200).json({
      success: true,
      message: "Client saved. Redirect the user to PayU to complete payment.",
      data: {
        actionUrl: paymentUrl,
        paymentAttemptId: paymentAttempt.id,
        txnid,
        fields: {
          key,
          txnid,
          amount,
          productinfo,
          firstname,
          email: client.email,
          phone: client.mobile,
          surl: callbackUrl,
          furl: callbackUrl,
          hash,
        },
      },
    });
  } catch (err: any) {
    if (err instanceof RegistrationValidationError) {
      return res.status(400).json({ success: false, message: err.message });
    }
    console.error("[PayU] Initiate error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Internal server error initiating PayU payment.",
    });
  }
}

function pickGatewayDetails(body: Record<string, any>) {
  const keys = [
    "mihpayid",
    "mode",
    "status",
    "unmappedstatus",
    "txnid",
    "amount",
    "bank_ref_num",
    "bankcode",
    "PG_TYPE",
    "issuing_bank",
    "cardCategory",
    "error",
    "error_Message",
    "field9",
    "addedon",
  ];
  const out: Record<string, any> = {};
  for (const k of keys) if (body[k] !== undefined) out[k] = body[k];
  return JSON.stringify(out);
}

export async function handlePayuCallback(req: Request, res: Response) {
  const { callbackBase } = getPayuConfig();
  const redirectTo = (params: Record<string, string>) =>
    res.redirect(303, `${callbackBase}/join?${new URLSearchParams(params).toString()}`);

  try {
    const body = (req.body || {}) as Record<string, any>;
    const txnid = String(body.txnid || "");

    if (!txnid) {
      return redirectTo({ payment: "error", reason: "missing_txn" });
    }

    if (!verifyResponseHash(body)) {
      console.warn("[PayU] Response hash verification failed for txnid:", txnid);
      return redirectTo({ payment: "error", reason: "invalid_signature", txnid });
    }

    const attempt = await prisma.paymentAttempt.findFirst({
      where: { gateway: "PAYU", gateway_order_id: txnid },
      include: { client: true },
    });

    if (!attempt) {
      console.warn("[PayU] No payment attempt found for txnid:", txnid);
      return redirectTo({ payment: "error", reason: "unknown_txn", txnid });
    }

    const mihpayid = String(body.mihpayid || "");
    const status = String(body.status || "").toLowerCase();

    // Already finalized (page refresh / duplicate callback)
    if (attempt.status === "SUCCESSFUL") {
      return redirectTo({ payment: "success", txnid, paymentId: attempt.gateway_payment_id || mihpayid });
    }

    if (status === "success") {
      if (Math.abs(Number(body.amount) - attempt.amount) > 0.01) {
        console.error("[PayU] Amount mismatch", { txnid, expected: attempt.amount, got: body.amount });
        await prisma.paymentAttempt.update({
          where: { id: attempt.id },
          data: {
            status: "FAILED",
            gateway_payment_id: mihpayid || null,
            error_code: "AMOUNT_MISMATCH",
            error_description: `Paid amount ${body.amount} does not match expected ${attempt.amount}`,
            raw_response: pickGatewayDetails(body),
          },
        });
        await prisma.client.update({
          where: { id: attempt.client_id },
          data: { latest_payment_status: "FAILED", last_payment_attempt_at: new Date() },
        });
        return redirectTo({ payment: "failed", txnid, message: "Payment amount mismatch" });
      }

      const updatedAttempt = await prisma.paymentAttempt.update({
        where: { id: attempt.id },
        data: {
          status: "SUCCESSFUL",
          gateway_payment_id: mihpayid,
          gateway_signature: String(body.hash),
          payment_method: body.mode ? String(body.mode) : null,
          error_code: null,
          error_description: null,
          raw_response: pickGatewayDetails(body),
        },
      });

      await activateMembershipAfterPayment({
        client: attempt.client,
        attempt: updatedAttempt,
        gatewayLabel: "PayU",
        paymentId: mihpayid,
        orderId: txnid,
      });

      return redirectTo({ payment: "success", txnid, paymentId: mihpayid });
    }

    if (status === "pending") {
      await prisma.paymentAttempt.update({
        where: { id: attempt.id },
        data: {
          gateway_payment_id: mihpayid || null,
          payment_method: body.mode ? String(body.mode) : null,
          raw_response: pickGatewayDetails(body),
        },
      });
      return redirectTo({ payment: "pending", txnid });
    }

    // failure / cancelled
    const cancelled =
      String(body.unmappedstatus || "").toLowerCase() === "usercancelled" ||
      /cancel/i.test(String(body.error_Message || ""));
    const newStatus = cancelled ? "ABANDONED" : "FAILED";
    const errorMessage =
      String(body.error_Message || body.field9 || "").trim() ||
      (cancelled ? "Payment was cancelled by the user on the PayU page" : "Payment failed at PayU");

    await prisma.paymentAttempt.update({
      where: { id: attempt.id },
      data: {
        status: newStatus,
        gateway_payment_id: mihpayid || null,
        payment_method: body.mode ? String(body.mode) : null,
        error_code: body.error ? String(body.error) : null,
        error_description: errorMessage,
        raw_response: pickGatewayDetails(body),
      },
    });

    await prisma.client.update({
      where: { id: attempt.client_id },
      data: { latest_payment_status: newStatus, last_payment_attempt_at: new Date() },
    });

    return redirectTo({
      payment: cancelled ? "cancelled" : "failed",
      txnid,
      message: errorMessage,
    });
  } catch (err) {
    console.error("[PayU] Callback error:", err);
    return redirectTo({ payment: "error", reason: "server_error" });
  }
}

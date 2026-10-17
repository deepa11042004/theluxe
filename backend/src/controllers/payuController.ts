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

// Where PayU sends the customer back to: the site the customer is actually on (browser Origin, then the proxy's
// host headers). PAYU_CALLBACK_BASE_URL is only a last resort, so a stale/copied value (e.g. localhost) can't
// send real customers to the wrong place.
function resolveCallbackBase(req: Request): string {
  const origin = String(req.headers.origin || "").trim().replace(/\/+$/, "");
  if (/^https?:\/\/[^/\s]+$/i.test(origin)) return origin;

  const host = String(req.headers["x-forwarded-host"] || req.headers.host || "").split(",")[0].trim();
  const proto = String(req.headers["x-forwarded-proto"] || req.protocol || "http").split(",")[0].trim();
  // A backend-internal host (e.g. "backend:5001") is not something a customer's browser can reach
  if (host && !/^(backend|localhost|127\.0\.0\.1)(:\d+)?$/i.test(host) && /\./.test(host)) return `${proto}://${host}`;

  return getPayuConfig().callbackBase;
}

function isLocalhostUrl(url: string): boolean {
  return /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i.test(url);
}

export async function initiatePayuPayment(req: Request, res: Response) {
  try {
    const { live, key, salt, paymentUrl } = getPayuConfig();
    if (!key || !salt) {
      return res.status(500).json({
        success: false,
        message: `PayU is not configured on the server (PAYU_${live ? "LIVE" : "TEST"}_KEY / PAYU_${live ? "LIVE" : "TEST"}_SALT missing).`,
      });
    }

    const callbackBase = resolveCallbackBase(req);
    // Real site => must be https. Plain http is only accepted for localhost (a developer on their own machine),
    // and that decision no longer depends on NODE_ENV being set correctly on the server.
    if (!callbackBase || (!callbackBase.startsWith("https://") && !isLocalhostUrl(callbackBase))) {
      console.error("[PayU] Cannot determine a safe https return URL for PayU. Resolved:", JSON.stringify(callbackBase));
      return res.status(500).json({
        success: false,
        message: "Payments are temporarily unavailable. Please contact support.",
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

export interface PayuResult {
  // "success" | "pending" | "abandoned" | anything else is treated as a failure
  status: string;
  mihpayid: string;
  amount: number;
  mode?: string | null;
  unmappedstatus?: string;
  errorCode?: string | null;
  errorMessage?: string;
  signature?: string | null;
  rawJson: string;
}

export type PayuOutcome = {
  outcome: "success" | "failed" | "cancelled" | "pending";
  paymentId?: string;
  message?: string;
};

// Single place that turns a PayU result (browser callback OR server-side verification) into DB state. Idempotent.
export async function applyPayuResult(attemptId: string, result: PayuResult): Promise<PayuOutcome> {
  const attempt = await prisma.paymentAttempt.findUniqueOrThrow({
    where: { id: attemptId },
    include: { client: true },
  });

  if (attempt.status === "SUCCESSFUL") {
    return { outcome: "success", paymentId: attempt.gateway_payment_id || result.mihpayid };
  }

  const status = result.status.toLowerCase();

  if (status === "success") {
    if (Math.abs(result.amount - attempt.amount) > 0.01) {
      console.error("[PayU] Amount mismatch", { txn: attempt.gateway_order_id, expected: attempt.amount, got: result.amount });
      await prisma.paymentAttempt.update({
        where: { id: attempt.id },
        data: {
          status: "FAILED",
          gateway_payment_id: result.mihpayid || null,
          error_code: "AMOUNT_MISMATCH",
          error_description: `Paid amount ${result.amount} does not match expected ${attempt.amount}`,
          raw_response: result.rawJson,
        },
      });
      await prisma.client.update({
        where: { id: attempt.client_id },
        data: { latest_payment_status: "FAILED", last_payment_attempt_at: new Date() },
      });
      return { outcome: "failed", message: "Payment amount mismatch" };
    }

    const updatedAttempt = await prisma.paymentAttempt.update({
      where: { id: attempt.id },
      data: {
        status: "SUCCESSFUL",
        gateway_payment_id: result.mihpayid,
        gateway_signature: result.signature || null,
        payment_method: result.mode || null,
        error_code: null,
        error_description: null,
        raw_response: result.rawJson,
      },
    });

    await activateMembershipAfterPayment({
      client: attempt.client,
      attempt: updatedAttempt,
      gatewayLabel: "PayU",
      paymentId: result.mihpayid,
      orderId: attempt.gateway_order_id,
    });

    return { outcome: "success", paymentId: result.mihpayid };
  }

  if (status === "pending") {
    await prisma.paymentAttempt.update({
      where: { id: attempt.id },
      data: {
        gateway_payment_id: result.mihpayid || null,
        payment_method: result.mode || null,
        raw_response: result.rawJson,
      },
    });
    return { outcome: "pending" };
  }

  // failure / cancelled / never completed
  const cancelled =
    status === "abandoned" ||
    String(result.unmappedstatus || "").toLowerCase() === "usercancelled" ||
    /cancel/i.test(String(result.errorMessage || ""));
  const newStatus = cancelled ? "ABANDONED" : "FAILED";
  const errorMessage =
    String(result.errorMessage || "").trim() ||
    (status === "abandoned"
      ? "Payment was not completed"
      : cancelled
      ? "Payment was cancelled by the user on the PayU page"
      : "Payment failed at PayU");

  await prisma.paymentAttempt.update({
    where: { id: attempt.id },
    data: {
      status: newStatus,
      gateway_payment_id: result.mihpayid || null,
      payment_method: result.mode || null,
      error_code: result.errorCode || null,
      error_description: errorMessage,
      raw_response: result.rawJson,
    },
  });

  await prisma.client.update({
    where: { id: attempt.client_id },
    data: { latest_payment_status: newStatus, last_payment_attempt_at: new Date() },
  });

  return { outcome: cancelled ? "cancelled" : "failed", message: errorMessage };
}

export async function handlePayuCallback(req: Request, res: Response) {
  // Relative redirects: the customer always returns to the same site they paid from (never a configured/hardcoded host).
  const redirectTo = (params: Record<string, string>) =>
    res.redirect(303, `/join?${new URLSearchParams(params).toString()}`);

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
    });

    if (!attempt) {
      console.warn("[PayU] No payment attempt found for txnid:", txnid);
      return redirectTo({ payment: "error", reason: "unknown_txn", txnid });
    }

    const result = await applyPayuResult(attempt.id, {
      status: String(body.status || ""),
      mihpayid: String(body.mihpayid || ""),
      amount: Number(body.amount),
      mode: body.mode ? String(body.mode) : null,
      unmappedstatus: String(body.unmappedstatus || ""),
      errorCode: body.error ? String(body.error) : null,
      errorMessage: String(body.error_Message || body.field9 || ""),
      signature: String(body.hash || ""),
      rawJson: pickGatewayDetails(body),
    });

    const params: Record<string, string> = { payment: result.outcome, txnid };
    if (result.paymentId) params.paymentId = result.paymentId;
    if (result.message) params.message = result.message;
    return redirectTo(params);
  } catch (err) {
    console.error("[PayU] Callback error:", err);
    return redirectTo({ payment: "error", reason: "server_error" });
  }
}

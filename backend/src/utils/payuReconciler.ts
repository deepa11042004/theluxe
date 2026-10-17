import { prisma } from "../config/prisma";
import { applyPayuResult, PayuResult } from "../controllers/payuController";
import { getPayuConfig, verifyPayuTransaction } from "./payu";

const MIN_AGE_MS = 2 * 60 * 1000; // give the normal browser return trip time to arrive first
const MAX_AGE_MS = 3 * 24 * 60 * 60 * 1000;
const ABANDON_AFTER_MS = 45 * 60 * 1000;
const INTERVAL_MS = 2 * 60 * 1000;
const BATCH_SIZE = 25;

let running = false;

// Asks PayU directly about PENDING payments. Completes payments whose browser return trip was lost
// (closed tab, dropped connection, wrong return URL) and closes out ones that were never completed.
export async function reconcilePendingPayuPayments(): Promise<void> {
  if (running) return;
  const { key, salt } = getPayuConfig();
  if (!key || !salt) return;

  running = true;
  try {
    const now = Date.now();
    const pending = await prisma.paymentAttempt.findMany({
      where: {
        gateway: "PAYU",
        status: "PENDING",
        created_at: { gte: new Date(now - MAX_AGE_MS), lte: new Date(now - MIN_AGE_MS) },
      },
      orderBy: { created_at: "asc" },
      take: BATCH_SIZE,
    });

    for (const attempt of pending) {
      const txnid = attempt.gateway_order_id;
      if (!txnid) continue;

      try {
        const age = now - attempt.created_at.getTime();
        const details = await verifyPayuTransaction(txnid);
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
          // Not found / bounced / dropped and old enough that the customer is no longer on the PayU page
          result = {
            status: "abandoned",
            mihpayid: notFound ? "" : details!.mihpayid,
            amount: attempt.amount,
            mode: details?.mode || null,
            errorMessage: `Payment was not completed (PayU status: ${notFound ? "not found" : status || "unknown"})`,
            rawJson: details?.rawJson || JSON.stringify({ txnid, status: "not found", verifiedVia: "verify_payment" }),
          };
        }

        if (!result) continue;

        const outcome = await applyPayuResult(attempt.id, result);
        console.log(`[PayU Reconciler] ${txnid} -> ${outcome.outcome}${outcome.paymentId ? ` (PayU id ${outcome.paymentId})` : ""}`);
      } catch (err: any) {
        console.error(`[PayU Reconciler] Failed to reconcile ${txnid}:`, err?.message || err);
      }
    }
  } catch (err: any) {
    console.error("[PayU Reconciler] Run failed:", err?.message || err);
  } finally {
    running = false;
  }
}

export function startPayuReconciler(): void {
  setTimeout(reconcilePendingPayuPayments, 20_000).unref();
  setInterval(reconcilePendingPayuPayments, INTERVAL_MS).unref();
}

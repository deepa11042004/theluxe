"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ClipboardList, CreditCard, CheckCircle2, AlertTriangle, X } from "lucide-react";
import ConciergeReply from "@/components/member/ConciergeReply";
import { formatDate, formatINR, isCompletedStay } from "@/components/member/MemberContext";

interface BookingRow {
  id: string;
  request_code: string;
  city: string;
  hotel_name: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  rooms: number;
  budget: string | null;
  special_requests: string | null;
  status: string;
  admin_reply: string | null;
  replied_at: string | null;
  amount_due: number | null;
  payment_status: string;
  paid_at: string | null;
  created_at: string;
}

const STATUS_STYLE: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700",
  IN_PROGRESS: "bg-amber-50 text-amber-700",
  CONFIRMED: "bg-emerald-50 text-emerald-700",
  COMPLETED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-neutral-100 text-neutral-600",
};
const STATUS_LABEL: Record<string, string> = { NEW: "Received", IN_PROGRESS: "In progress", CONFIRMED: "Confirmed", COMPLETED: "Completed", CANCELLED: "Cancelled" };

// PayU needs a normal browser form POST, so the signed fields from our server are submitted as a hidden form.
function submitToPayu(actionUrl: string, fields: Record<string, string>) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = actionUrl;
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

const NOTICES: Record<string, { ok: boolean; text: string }> = {
  success: { ok: true, text: "Payment received. Thank you! Your request is now completed and has moved to History." },
  pending: { ok: true, text: "Your payment is being confirmed by the bank. This page will update once it is complete." },
  failed: { ok: false, text: "The payment did not go through. You have not been charged, or the amount will be returned by your bank. Please try again." },
  cancelled: { ok: false, text: "The payment was cancelled. You can try again any time." },
  error: { ok: false, text: "We could not confirm the payment. If money was deducted, please contact the concierge with your request number." },
};

function RequestsList() {
  const router = useRouter();
  const params = useSearchParams();
  const paymentResult = params.get("payment");
  const [notice, setNotice] = useState(paymentResult ? NOTICES[paymentResult] || null : null);
  const [bookings, setBookings] = useState<BookingRow[] | null>(null);
  const [payingId, setPayingId] = useState("");
  const [payError, setPayError] = useState("");

  useEffect(() => {
    fetch("/api/v1/client/bookings")
      .then((r) => r.json())
      .then((j) => setBookings(j.success ? j.data.filter((b: BookingRow) => !isCompletedStay(b)) : []))
      .catch(() => setBookings([]));
  }, []);

  const dismissNotice = () => {
    setNotice(null);
    router.replace("/member/requests");
  };

  const payNow = async (id: string) => {
    setPayError("");
    setPayingId(id);
    try {
      const res = await fetch(`/api/v1/client/bookings/${id}/pay`, { method: "POST" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        setPayError(json.message || "Could not start the payment. Please try again.");
        setPayingId("");
        return;
      }
      submitToPayu(json.data.actionUrl, json.data.fields);
    } catch {
      setPayError("Network error. Please check your connection and try again.");
      setPayingId("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Your requests</h1>
          <p className="text-sm text-neutral-500 mt-1">Track your open stay requests. Paid requests move to History.</p>
        </div>
        <Link href="/member/bookings" className="bg-[#E39F25] hover:bg-[#430021] text-white text-xs font-semibold tracking-widest uppercase px-5 py-3 rounded-sm transition-colors">
          New Request
        </Link>
      </div>

      {notice && (
        <div role="status" className={`flex items-start gap-3 text-sm rounded-lg px-4 py-3 border ${notice.ok ? "text-emerald-800 bg-emerald-50 border-emerald-200" : "text-red-700 bg-red-50 border-red-200"}`}>
          {notice.ok ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />}
          <span className="flex-1">
            {notice.text}
            {paymentResult === "success" && (
              <>
                {" "}
                <Link href="/member/history" className="underline font-semibold">
                  View History
                </Link>
              </>
            )}
          </span>
          <button onClick={dismissNotice} aria-label="Dismiss" className="p-0.5 hover:opacity-70">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {payError && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {payError}
        </p>
      )}

      {!bookings && <div className="w-6 h-6 border-4 border-[#E39F25] border-t-transparent rounded-full animate-spin" />}
      {bookings && bookings.length === 0 && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center text-sm text-neutral-500">
          <ClipboardList className="w-8 h-8 mx-auto mb-3 text-neutral-300" />
          You have no open stay requests.
        </div>
      )}

      <div className="space-y-3">
        {bookings?.map((b) => {
          const payable = b.payment_status === "UNPAID" && !!b.amount_due && b.status !== "CANCELLED";
          return (
            <article key={b.id} className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">{b.hotel_name}</p>
                  <p className="text-xs text-neutral-500">
                    {b.city} · {b.request_code} · sent {formatDate(b.created_at)}
                  </p>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[b.status] || STATUS_STYLE.NEW}`}>{STATUS_LABEL[b.status] || b.status}</span>
              </div>
              <p className="text-sm text-neutral-600 mt-3">
                {formatDate(b.check_in)} to {formatDate(b.check_out)} · {b.adults} adult{b.adults === 1 ? "" : "s"}
                {b.children ? `, ${b.children} child${b.children === 1 ? "" : "ren"}` : ""} · {b.rooms} room{b.rooms === 1 ? "" : "s"}
                {b.budget ? ` · Budget ${b.budget}` : ""}
              </p>
              {b.special_requests && <p className="text-sm text-neutral-500 mt-2 whitespace-pre-line">{b.special_requests}</p>}
              <ConciergeReply message={b.admin_reply} repliedAt={b.replied_at} />

              {payable && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Amount to pay</p>
                    <p className="text-2xl font-semibold">{formatINR(b.amount_due as number)}</p>
                  </div>
                  <button
                    onClick={() => payNow(b.id)}
                    disabled={!!payingId}
                    className="inline-flex items-center gap-2 bg-[#E39F25] hover:bg-[#430021] disabled:opacity-50 text-white text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-sm transition-colors"
                  >
                    <CreditCard className="w-4 h-4" />
                    {payingId === b.id ? "Redirecting..." : "Pay Now"}
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default function RequestsPage() {
  return (
    <Suspense fallback={null}>
      <RequestsList />
    </Suspense>
  );
}

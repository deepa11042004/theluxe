"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Download, History as HistoryIcon, MapPin } from "lucide-react";
import ConciergeReply from "@/components/member/ConciergeReply";
import { formatDate, formatINR, isCompletedStay, nightsBetween } from "@/components/member/MemberContext";

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

export default function HistoryPage() {
  const [stays, setStays] = useState<BookingRow[] | null>(null);

  useEffect(() => {
    fetch("/api/v1/client/bookings")
      .then((r) => r.json())
      .then((j) => {
        const done: BookingRow[] = j.success ? j.data.filter(isCompletedStay) : [];
        setStays(done.sort((a, b) => b.check_out.localeCompare(a.check_out)));
      })
      .catch(() => setStays([]));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Booking history</h1>
        <p className="text-sm text-neutral-500 mt-1">Your completed stays with The Luxe Yatra.</p>
      </div>

      {!stays && <div className="w-6 h-6 border-4 border-[#E39F25] border-t-transparent rounded-full animate-spin" />}
      {stays && stays.length === 0 && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center text-sm text-neutral-500">
          <HistoryIcon className="w-8 h-8 mx-auto mb-3 text-neutral-300" />
          <p>No completed stays yet. A request moves here once it has been paid.</p>
          <Link href="/member/requests" className="inline-block mt-3 text-xs font-semibold text-[#E39F25] hover:text-[#430021]">
            See your requests
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {stays?.map((b) => {
          const nights = nightsBetween(b.check_in, b.check_out);
          return (
            <article key={b.id} className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">{b.hotel_name}</p>
                  <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {b.city} · {b.request_code}
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">Completed</span>
              </div>
              <p className="text-sm text-neutral-600 mt-3">
                {formatDate(b.check_in)} to {formatDate(b.check_out)} · {nights} night{nights === 1 ? "" : "s"} · {b.adults} adult{b.adults === 1 ? "" : "s"}
                {b.children ? `, ${b.children} child${b.children === 1 ? "" : "ren"}` : ""} · {b.rooms} room{b.rooms === 1 ? "" : "s"}
              </p>
              {b.special_requests && <p className="text-sm text-neutral-500 mt-2 whitespace-pre-line">{b.special_requests}</p>}
              {b.payment_status === "PAID" && b.amount_due ? (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-emerald-700">
                    Paid {formatINR(b.amount_due)}
                    {b.paid_at ? ` on ${formatDate(b.paid_at)}` : ""}
                  </p>
                  <a
                    href={`/api/v1/client/bookings/${b.id}/invoice-pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#E39F25] text-[#B97A0C] hover:bg-[#E39F25] hover:text-white text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Invoice
                  </a>
                </div>
              ) : null}
              <ConciergeReply message={b.admin_reply} repliedAt={b.replied_at} />
            </article>
          );
        })}
      </div>
    </div>
  );
}

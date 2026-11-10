"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { formatDate, isCompletedStay } from "@/components/member/MemberContext";

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
  created_at: string;
}

const STATUS_STYLE: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700",
  IN_PROGRESS: "bg-amber-50 text-amber-700",
  CONFIRMED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-neutral-100 text-neutral-600",
};
const STATUS_LABEL: Record<string, string> = { NEW: "Received", IN_PROGRESS: "In progress", CONFIRMED: "Confirmed", CANCELLED: "Cancelled" };

export default function RequestsPage() {
  const [bookings, setBookings] = useState<BookingRow[] | null>(null);

  useEffect(() => {
    fetch("/api/v1/client/bookings")
      .then((r) => r.json())
      .then((j) => setBookings(j.success ? j.data.filter((b: BookingRow) => !isCompletedStay(b)) : []))
      .catch(() => setBookings([]));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Your requests</h1>
          <p className="text-sm text-neutral-500 mt-1">Track your open stay requests. Completed stays move to History.</p>
        </div>
        <Link href="/member/bookings" className="bg-[#E39F25] hover:bg-[#430021] text-white text-xs font-semibold tracking-widest uppercase px-5 py-3 rounded-sm transition-colors">
          New Request
        </Link>
      </div>

      {!bookings && <div className="w-6 h-6 border-4 border-[#E39F25] border-t-transparent rounded-full animate-spin" />}
      {bookings && bookings.length === 0 && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center text-sm text-neutral-500">
          <ClipboardList className="w-8 h-8 mx-auto mb-3 text-neutral-300" />
          You have not sent any stay requests yet.
        </div>
      )}

      <div className="space-y-3">
        {bookings?.map((b) => (
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
          </article>
        ))}
      </div>
    </div>
  );
}

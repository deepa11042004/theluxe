"use client";

import React from "react";
import Link from "next/link";
import LuxeMembershipCard from "@/components/Club/LuxeMembershipCard";
import { useMember, tierOf, formatDate } from "@/components/member/MemberContext";

export default function MembershipPage() {
  const { member } = useMember();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome, {member.salutation} {member.first_name} {member.last_name}
        </h1>
        <p className="text-sm text-neutral-500 mt-1">Your Luxe Club membership at a glance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {member.memberships.map((m) => (
          <section key={m.id} className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
            <LuxeMembershipCard tier={tierOf(m.membership_plan)} title={m.membership_plan} membershipNo={m.membership_number || "PENDING ACTIVATION"} />
            <dl className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <dt className="text-neutral-500">Status</dt>
                <dd className={`font-semibold mt-1 ${m.membership_status === "ACTIVE" ? "text-emerald-700" : "text-amber-700"}`}>{m.membership_status}</dd>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <dt className="text-neutral-500">Client ID</dt>
                <dd className="font-semibold mt-1">{m.client_code}</dd>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <dt className="text-neutral-500">Member since</dt>
                <dd className="font-semibold mt-1">{formatDate(m.membership_activated_at)}</dd>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <dt className="text-neutral-500">Valid until</dt>
                <dd className="font-semibold mt-1">{m.membership_expires_at ? formatDate(m.membership_expires_at) : "No expiry set"}</dd>
              </div>
            </dl>
          </section>
        ))}
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-semibold">Planning a stay?</h2>
          <p className="text-sm text-neutral-500">Tell us the city, hotel and dates and our concierge will take it from there.</p>
        </div>
        <Link href="/member/bookings" className="bg-[#E39F25] hover:bg-[#430021] text-white text-xs font-semibold tracking-widest uppercase px-5 py-3 rounded-sm text-center transition-colors">
          Request a Stay
        </Link>
      </div>
    </div>
  );
}

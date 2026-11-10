"use client";

import React from "react";
import HolidayChart from "@/components/member/HolidayChart";
import { useMember } from "@/components/member/MemberContext";

export default function HolidayChartPage() {
  const { member } = useMember();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Holiday chart</h1>
        <p className="text-sm text-neutral-500 mt-1">The holiday nights included in your membership and how many you have used.</p>
      </div>
      <div className="space-y-6">
        {member.memberships.map((m) => (
          <HolidayChart key={m.id} chart={m.holiday} planName={m.membership_plan} />
        ))}
      </div>
    </div>
  );
}

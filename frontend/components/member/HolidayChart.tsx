import React from "react";
import { Plane } from "lucide-react";

export interface HolidayChartData {
  allowance: number;
  used: number;
  remaining: number;
  period_start: string | null;
  period_end: string | null;
  stays: { id: string; request_code: string; hotel_name: string; city: string; check_in: string; check_out: string; nights: number }[];
}

const fmt = (v?: string | null) => (v ? new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }) : "-");

// Nights included in a membership plan and how many have been used by completed (paid) stays. Used by the member portal and the admin panel.
export default function HolidayChart({ chart, planName }: { chart: HolidayChartData; planName?: string }) {
  const { allowance, used, remaining, stays } = chart;
  const over = used > allowance ? used - allowance : 0;
  const pct = allowance > 0 ? Math.min(100, Math.round((used / allowance) * 100)) : used > 0 ? 100 : 0;

  return (
    <section className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <Plane className="w-4 h-4 text-[#E39F25]" />
            Holiday chart{planName ? ` · ${planName}` : ""}
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Membership year {fmt(chart.period_start)} to {fmt(chart.period_end)}
          </p>
        </div>
        <p className="text-xs text-neutral-500">Counted in nights, from completed (paid) stays</p>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-neutral-50 border border-neutral-100 p-3">
          <p className="text-2xl font-semibold">{allowance}</p>
          <p className="text-[11px] text-neutral-500 mt-0.5">Nights given</p>
        </div>
        <div className="rounded-xl bg-neutral-50 border border-neutral-100 p-3">
          <p className="text-2xl font-semibold text-[#B97A0C]">{used}</p>
          <p className="text-[11px] text-neutral-500 mt-0.5">Nights used</p>
        </div>
        <div className="rounded-xl bg-neutral-50 border border-neutral-100 p-3">
          <p className={`text-2xl font-semibold ${remaining > 0 ? "text-emerald-700" : "text-neutral-500"}`}>{remaining}</p>
          <p className="text-[11px] text-neutral-500 mt-0.5">Nights remaining</p>
        </div>
      </div>

      <div>
        <div className="h-3 rounded-full bg-neutral-100 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={allowance} aria-valuenow={Math.min(used, allowance)}>
          <div className={`h-full rounded-full ${over ? "bg-amber-500" : "bg-[#E39F25]"}`} style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-neutral-500 mt-2">
          {used} of {allowance} night{allowance === 1 ? "" : "s"} used
          {over ? <span className="text-amber-700 font-semibold"> · {over} night{over === 1 ? "" : "s"} over the allowance</span> : null}
        </p>
      </div>

      <div>
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Stays counted</h4>
        {stays.length === 0 ? (
          <p className="text-sm text-neutral-500">No holidays used yet.</p>
        ) : (
          <div className="overflow-x-auto border border-neutral-100 rounded-xl">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-500 border-b border-neutral-100">
                  <th className="px-4 py-2.5 font-semibold">Hotel</th>
                  <th className="px-4 py-2.5 font-semibold">Dates</th>
                  <th className="px-4 py-2.5 font-semibold text-right">Nights</th>
                </tr>
              </thead>
              <tbody>
                {stays.map((s) => (
                  <tr key={s.id} className="border-b border-neutral-50 last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium">{s.hotel_name}</p>
                      <p className="text-[11px] text-neutral-400">
                        {s.city} · {s.request_code}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 whitespace-nowrap">
                      {fmt(s.check_in)} to {fmt(s.check_out)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">{s.nights}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

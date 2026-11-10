"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Send } from "lucide-react";
import { useMember } from "@/components/member/MemberContext";

const todayStr = () => new Date().toISOString().slice(0, 10);
const inputCls = "w-full border border-neutral-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E39F25]/50 focus:border-[#E39F25] bg-white";
const labelCls = "block text-xs font-semibold text-neutral-600 mb-1.5";

export default function BookingsPage() {
  const { member } = useMember();
  const canRequest = member.memberships.some((m) => m.membership_status === "ACTIVE");

  const empty = { city: "", hotel_name: "", check_in: "", check_out: "", adults: "2", children: "0", rooms: "1", budget: "", contact_phone: member.mobile, special_requests: "" };
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sentCode, setSentCode] = useState("");
  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSentCode("");
    if (form.check_in && form.check_out && form.check_out <= form.check_in) {
      setError("Check-out must be after check-in.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/v1/client/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, adults: Number(form.adults), children: Number(form.children), rooms: Number(form.rooms) }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        setSentCode(json.data.request_code);
        setForm(empty);
      } else setError(json.message || "Could not send your request.");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Bookings</h1>
        <p className="text-sm text-neutral-500 mt-1">Send us your stay request. Our concierge will reply with availability and options. This is an enquiry, not a confirmed reservation.</p>
      </div>

      <section className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <h2 className="font-semibold mb-4">New stay request</h2>

        {sentCode && (
          <div role="status" className="mb-5 flex items-start gap-3 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <span>
              Request <strong>{sentCode}</strong> sent. We have emailed you a copy and our concierge will be in touch shortly.{" "}
              <Link href="/member/requests" className="underline font-semibold">
                View your requests
              </Link>
            </span>
          </div>
        )}

        {!canRequest ? (
          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">Stay requests need an active membership. Please contact our concierge to renew.</p>
        ) : (
          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>City / destination *</label>
              <input required maxLength={255} value={form.city} onChange={set("city")} placeholder="e.g. Udaipur" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Hotel name *</label>
              <input required maxLength={500} value={form.hotel_name} onChange={set("hotel_name")} placeholder="e.g. Oberoi Udaivilas" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Check-in *</label>
              <input required type="date" min={todayStr()} value={form.check_in} onChange={set("check_in")} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Check-out *</label>
              <input required type="date" min={form.check_in || todayStr()} value={form.check_out} onChange={set("check_out")} className={inputCls} />
            </div>
            <div className="grid grid-cols-3 gap-3 sm:col-span-2">
              <div>
                <label className={labelCls}>Adults *</label>
                <input required type="number" min={1} max={30} value={form.adults} onChange={set("adults")} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Children</label>
                <input type="number" min={0} max={30} value={form.children} onChange={set("children")} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Rooms *</label>
                <input required type="number" min={1} max={15} value={form.rooms} onChange={set("rooms")} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Budget (optional)</label>
              <input maxLength={255} value={form.budget} onChange={set("budget")} placeholder="e.g. ₹40,000 per night" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Contact number</label>
              <input maxLength={50} value={form.contact_phone} onChange={set("contact_phone")} className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Special requests (optional)</label>
              <textarea rows={4} maxLength={2000} value={form.special_requests} onChange={set("special_requests")} placeholder="Room preference, occasion, dietary needs, airport transfers..." className={inputCls} />
            </div>

            {error && (
              <p role="alert" className="sm:col-span-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <div className="sm:col-span-2">
              <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 bg-[#E39F25] hover:bg-[#430021] disabled:opacity-50 text-white text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-sm transition-colors">
                <Send className="w-4 h-4" />
                {submitting ? "Sending..." : "Send Request"}
              </button>
            </div>
          </form>
        )}
      </section>

    </div>
  );
}

"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Search, X, CalendarCheck, Mail, Phone, ExternalLink } from "lucide-react";

interface RequestClient {
  id: string;
  client_code: string;
  salutation: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  city: string;
  membership_plan: string;
  membership_number: string | null;
  membership_status: string;
}

interface BookingRequest {
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
  contact_phone: string | null;
  special_requests: string | null;
  status: string;
  admin_notes: string | null;
  admin_reply: string | null;
  created_at: string;
  client: RequestClient;
}

const STATUSES = ["NEW", "IN_PROGRESS", "CONFIRMED", "CANCELLED"] as const;
const LABEL: Record<string, string> = { ALL: "All", NEW: "New", IN_PROGRESS: "In progress", CONFIRMED: "Confirmed", CANCELLED: "Cancelled" };
const STYLE: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-neutral-100 text-neutral-600 border-neutral-200",
};

const fmt = (v: string) => new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
const fmtTime = (v: string) => new Date(v).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
const guests = (r: BookingRequest) => `${r.adults} adult${r.adults === 1 ? "" : "s"}${r.children ? `, ${r.children} child${r.children === 1 ? "" : "ren"}` : ""} · ${r.rooms} room${r.rooms === 1 ? "" : "s"}`;
const nameOf = (c: RequestClient) => `${c.salutation} ${c.first_name} ${c.last_name}`.trim();

function Badge({ status }: { status: string }) {
  return <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${STYLE[status] || STYLE.NEW}`}>{LABEL[status] || status}</span>;
}

export default function RequestsPage() {
  const [rows, setRows] = useState<BookingRequest[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [open, setOpen] = useState<BookingRequest | null>(null);
  const [draftStatus, setDraftStatus] = useState("NEW");
  const [draftNotes, setDraftNotes] = useState("");
  const [draftReply, setDraftReply] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const qs = new URLSearchParams({ page: String(page), limit: "15", status });
      if (query) qs.set("search", query);
      const res = await fetch(`/api/v1/admin/booking-requests?${qs}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to load requests.");
      setRows(json.data);
      setCounts(json.counts || {});
      setTotal(json.meta.total);
      setTotalPages(json.meta.totalPages);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load requests.");
    } finally {
      setLoading(false);
    }
  }, [page, status, query]);

  useEffect(() => {
    load();
  }, [load]);

  const openRow = (r: BookingRequest) => {
    setOpen(r);
    setDraftStatus(r.status);
    setDraftNotes(r.admin_notes || "");
    setDraftReply(r.admin_reply || "");
    setSaveMsg(null);
  };

  const save = async () => {
    if (!open) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      const res = await fetch(`/api/v1/admin/booking-requests/${open.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: draftStatus, admin_notes: draftNotes, admin_reply: draftReply }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Could not save.");
      setOpen(json.data);
      setSaveMsg({ ok: true, text: "Saved." });
      load();
    } catch (e) {
      setSaveMsg({ ok: false, text: e instanceof Error ? e.message : "Could not save." });
    } finally {
      setSaving(false);
    }
  };

  const allCount = STATUSES.reduce((n, s) => n + (counts[s] || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
          <CalendarCheck className="w-5 h-5 text-[#E39F25]" />
          Requests
        </h1>
        <p className="text-xs text-neutral-500 mt-1">Stay requests sent by members from their portal.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {["ALL", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => {
              setStatus(s);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${status === s ? "bg-[#E39F25] border-[#E39F25] text-white" : "bg-white border-neutral-200 text-neutral-600 hover:border-[#E39F25]"}`}
          >
            {LABEL[s]} <span className="opacity-70">({s === "ALL" ? allCount : counts[s] || 0})</span>
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          setQuery(search.trim());
        }}
        className="flex gap-2"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search request, hotel, city, member name or email" className="w-full pl-9 pr-3 py-2.5 text-sm border border-neutral-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#E39F25]/40" />
        </div>
        <button type="submit" className="bg-[#E39F25] hover:bg-[#430021] text-white text-xs font-semibold tracking-wider uppercase px-5 rounded-lg transition-colors">
          Search
        </button>
      </form>

      {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[860px]">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-500 border-b border-neutral-100">
              <th className="px-5 py-3 font-semibold">Request</th>
              <th className="px-5 py-3 font-semibold">Member</th>
              <th className="px-5 py-3 font-semibold">Hotel / City</th>
              <th className="px-5 py-3 font-semibold">Stay</th>
              <th className="px-5 py-3 font-semibold">Guests</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-neutral-400">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-neutral-400">
                  No requests found.
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((r) => (
                <tr key={r.id} onClick={() => openRow(r)} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50 cursor-pointer">
                  <td className="px-5 py-4">
                    <p className="font-semibold">{r.request_code}</p>
                    <p className="text-[11px] text-neutral-400">{fmtTime(r.created_at)}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium">{nameOf(r.client)}</p>
                    <p className="text-[11px] text-neutral-400">{r.client.client_code}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium">{r.hotel_name}</p>
                    <p className="text-[11px] text-neutral-400">{r.city}</p>
                  </td>
                  <td className="px-5 py-4 text-neutral-600 whitespace-nowrap">
                    {fmt(r.check_in)} to {fmt(r.check_out)}
                  </td>
                  <td className="px-5 py-4 text-neutral-600">{guests(r)}</td>
                  <td className="px-5 py-4">
                    <Badge status={r.status} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>{total} request{total === 1 ? "" : "s"}</span>
        <div className="flex items-center gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1.5 border border-neutral-200 rounded-lg bg-white disabled:opacity-40">
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1.5 border border-neutral-200 rounded-lg bg-white disabled:opacity-40">
            Next
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/40" onClick={() => setOpen(null)}>
          <aside className="w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 sticky top-0 bg-white">
              <div>
                <p className="font-bold">{open.request_code}</p>
                <p className="text-[11px] text-neutral-400">Received {fmtTime(open.created_at)}</p>
              </div>
              <button onClick={() => setOpen(null)} className="p-2 rounded-lg hover:bg-neutral-100" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-sm">
              <section className="space-y-1">
                <h3 className="text-[11px] uppercase tracking-wider font-bold text-neutral-400">Member</h3>
                <p className="font-semibold">{nameOf(open.client)}</p>
                <p className="text-neutral-500 text-xs">
                  {open.client.client_code} · {open.client.membership_plan}
                  {open.client.membership_number ? ` · ${open.client.membership_number}` : ""}
                </p>
                <p className="flex items-center gap-2 text-neutral-600">
                  <Mail className="w-4 h-4 text-[#E39F25]" />
                  <a href={`mailto:${open.client.email}`} className="hover:underline">
                    {open.client.email}
                  </a>
                </p>
                <p className="flex items-center gap-2 text-neutral-600">
                  <Phone className="w-4 h-4 text-[#E39F25]" />
                  <a href={`tel:${open.contact_phone || open.client.mobile}`} className="hover:underline">
                    {open.contact_phone || open.client.mobile}
                  </a>
                </p>
                <Link href={`/admin/clients/${open.client.id}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E39F25] hover:text-[#430021] pt-1">
                  View client <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </section>

              <section className="space-y-3">
                <h3 className="text-[11px] uppercase tracking-wider font-bold text-neutral-400">Stay request</h3>
                <dl className="grid grid-cols-3 gap-y-2.5 gap-x-3">
                  <dt className="text-neutral-500">Hotel</dt>
                  <dd className="col-span-2 font-medium">{open.hotel_name}</dd>
                  <dt className="text-neutral-500">City</dt>
                  <dd className="col-span-2 font-medium">{open.city}</dd>
                  <dt className="text-neutral-500">Check-in</dt>
                  <dd className="col-span-2 font-medium">{fmt(open.check_in)}</dd>
                  <dt className="text-neutral-500">Check-out</dt>
                  <dd className="col-span-2 font-medium">{fmt(open.check_out)}</dd>
                  <dt className="text-neutral-500">Guests</dt>
                  <dd className="col-span-2 font-medium">{guests(open)}</dd>
                  {open.budget && (
                    <>
                      <dt className="text-neutral-500">Budget</dt>
                      <dd className="col-span-2 font-medium">{open.budget}</dd>
                    </>
                  )}
                </dl>
                {open.special_requests && (
                  <div className="bg-neutral-50 border border-neutral-100 rounded-lg p-3 text-neutral-700 whitespace-pre-line">{open.special_requests}</div>
                )}
              </section>

              <section className="space-y-3">
                <h3 className="text-[11px] uppercase tracking-wider font-bold text-neutral-400">Handling</h3>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Status</label>
                  <select value={draftStatus} onChange={(e) => setDraftStatus(e.target.value)} className="w-full border border-neutral-300 rounded-lg px-3 py-2.5 bg-white">
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {LABEL[s]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Message to member (shown in their portal, e.g. the hotel you have arranged)</label>
                  <textarea rows={4} maxLength={2000} value={draftReply} onChange={(e) => setDraftReply(e.target.value)} placeholder="e.g. We have arranged The Oberoi, Shimla for 21 to 28 Nov. Our team will call you with the details." className="w-full border border-[#E39F25]/60 rounded-lg px-3 py-2.5 bg-[#FFFCF5]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5">Internal notes (not visible to the member)</label>
                  <textarea rows={5} maxLength={5000} value={draftNotes} onChange={(e) => setDraftNotes(e.target.value)} className="w-full border border-neutral-300 rounded-lg px-3 py-2.5" />
                </div>
                {saveMsg && <p className={`text-xs ${saveMsg.ok ? "text-emerald-700" : "text-red-700"}`}>{saveMsg.text}</p>}
                <button onClick={save} disabled={saving} className="bg-[#E39F25] hover:bg-[#430021] disabled:opacity-50 text-white text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-sm transition-colors">
                  {saving ? "Saving..." : "Save"}
                </button>
              </section>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useMember } from "@/components/member/MemberContext";

const inputCls = "w-full border border-neutral-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E39F25]/50 focus:border-[#E39F25] bg-white";
const labelCls = "block text-xs font-semibold text-neutral-600 mb-1.5";
const btnCls = "bg-[#E39F25] hover:bg-[#430021] disabled:opacity-50 text-white text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-sm transition-colors";

type Notice = { type: "ok" | "err"; text: string } | null;

function NoticeBox({ n }: { n: Notice }) {
  if (!n) return null;
  return (
    <p role={n.type === "err" ? "alert" : "status"} className={`text-sm rounded-lg px-4 py-3 border ${n.type === "ok" ? "text-emerald-800 bg-emerald-50 border-emerald-200" : "text-red-700 bg-red-50 border-red-200"}`}>
      {n.text}
    </p>
  );
}

export default function ProfilePage() {
  const { member, refresh } = useMember();

  const [profile, setProfile] = useState({ salutation: member.salutation, first_name: member.first_name, last_name: member.last_name, mobile: member.mobile, city: member.city });
  const [profileBusy, setProfileBusy] = useState(false);
  const [profileNotice, setProfileNotice] = useState<Notice>(null);

  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwBusy, setPwBusy] = useState(false);
  const [pwNotice, setPwNotice] = useState<Notice>(null);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileNotice(null);
    setProfileBusy(true);
    try {
      const res = await fetch("/api/v1/client/me", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(profile) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        setProfileNotice({ type: "ok", text: "Profile updated." });
        await refresh();
      } else setProfileNotice({ type: "err", text: json.message || "Could not update your profile." });
    } catch {
      setProfileNotice({ type: "err", text: "Network error. Please try again." });
    } finally {
      setProfileBusy(false);
    }
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwNotice(null);
    if (pw.next !== pw.confirm) {
      setPwNotice({ type: "err", text: "The two new passwords do not match." });
      return;
    }
    setPwBusy(true);
    try {
      const res = await fetch("/api/v1/client/me/password", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ current_password: pw.current, new_password: pw.next }) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        setPwNotice({ type: "ok", text: "Password changed. Other devices have been signed out." });
        setPw({ current: "", next: "", confirm: "" });
      } else setPwNotice({ type: "err", text: json.message || "Could not change the password." });
    } catch {
      setPwNotice({ type: "err", text: "Network error. Please try again." });
    } finally {
      setPwBusy(false);
    }
  };

  const p = (k: keyof typeof profile) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setProfile((s) => ({ ...s, [k]: e.target.value }));

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-neutral-500 mt-1">Keep your contact details up to date.</p>
      </div>

      <form onSubmit={saveProfile} className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-sm grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div className="sm:col-span-2">
          <label className={labelCls}>Title</label>
          <select value={profile.salutation} onChange={p("salutation")} className={inputCls}>
            {["Mr.", "Mrs.", "Ms.", "Dr.", "Mx."].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>First name</label>
          <input required maxLength={100} value={profile.first_name} onChange={p("first_name")} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Last name</label>
          <input required maxLength={100} value={profile.last_name} onChange={p("last_name")} className={inputCls} />
        </div>
        <div className="sm:col-span-3">
          <label className={labelCls}>Mobile</label>
          <input required value={profile.mobile} onChange={p("mobile")} className={inputCls} />
        </div>
        <div className="sm:col-span-3">
          <label className={labelCls}>City</label>
          <input required maxLength={100} value={profile.city} onChange={p("city")} className={inputCls} />
        </div>
        <div className="sm:col-span-6">
          <label className={labelCls}>Email (sign-in)</label>
          <input disabled value={member.email} className={`${inputCls} bg-neutral-100 text-neutral-500`} />
          <p className="text-xs text-neutral-400 mt-1">To change your email, please contact the concierge.</p>
        </div>
        <div className="sm:col-span-6 space-y-3">
          <NoticeBox n={profileNotice} />
          <button type="submit" disabled={profileBusy} className={btnCls}>
            {profileBusy ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>

      <form onSubmit={savePassword} className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="font-semibold">Change password</h2>
        <div>
          <label className={labelCls}>Current password</label>
          <input required type="password" autoComplete="current-password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} className={inputCls} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>New password</label>
            <input required type="password" autoComplete="new-password" minLength={8} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Confirm new password</label>
            <input required type="password" autoComplete="new-password" minLength={8} value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} className={inputCls} />
          </div>
        </div>
        <p className="text-xs text-neutral-400">At least 8 characters, with letters and numbers.</p>
        <NoticeBox n={pwNotice} />
        <button type="submit" disabled={pwBusy} className={btnCls}>
          {pwBusy ? "Saving..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

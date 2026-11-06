"use client";

import { createContext, useContext } from "react";

export interface Membership {
  id: string;
  client_code: string;
  membership_plan: string;
  membership_number: string | null;
  membership_status: string;
  membership_activated_at: string | null;
  membership_expires_at: string | null;
  latest_payment_status: string;
}

export interface MemberProfile {
  email: string;
  salutation: string;
  first_name: string;
  last_name: string;
  mobile: string;
  city: string;
  memberships: Membership[];
}

interface MemberContextValue {
  member: MemberProfile;
  refresh: () => Promise<void>;
}

export const MemberContext = createContext<MemberContextValue | null>(null);

export function useMember(): MemberContextValue {
  const ctx = useContext(MemberContext);
  if (!ctx) throw new Error("useMember must be used inside the member layout");
  return ctx;
}

export function tierOf(plan: string): "signature" | "diamond" | "imperial" {
  const p = (plan || "").toLowerCase();
  return p.includes("black") ? "imperial" : p.includes("prestige") ? "diamond" : "signature";
}

export function formatDate(value?: string | null, withTime = false): string {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}), timeZone: withTime ? undefined : "UTC" });
}

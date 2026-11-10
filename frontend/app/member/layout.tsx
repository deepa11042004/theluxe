"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { CreditCard, Receipt, CalendarCheck, ClipboardList, History, Plane, UserRound, LogOut } from "lucide-react";
import { MemberContext, MemberProfile } from "@/components/member/MemberContext";

const NAV = [
  { href: "/member", label: "Membership", icon: CreditCard },
  { href: "/member/invoices", label: "Invoices", icon: Receipt },
  { href: "/member/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/member/requests", label: "Requests", icon: ClipboardList },
  { href: "/member/holidays", label: "Holiday Chart", icon: Plane },
  { href: "/member/history", label: "History", icon: History },
  { href: "/member/profile", label: "Profile", icon: UserRound },
];

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [member, setMember] = useState<MemberProfile | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/client/me");
      const json = await res.json();
      if (json.success && json.data) setMember(json.data);
      else router.replace("/login");
    } catch {
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    fetch("/api/v1/client/me")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) setMember(json.data);
        else router.replace("/login");
      })
      .catch(() => router.replace("/login"));
  }, [router]);

  const signOut = async () => {
    await fetch("/api/v1/client/auth/logout", { method: "POST" }).catch(() => {});
    router.replace("/login");
  };

  if (!member) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#E39F25] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <MemberContext.Provider value={{ member, refresh: load }}>
      <div className="min-h-screen bg-neutral-50 text-neutral-900">
        <header className="bg-[#0E2A3A] text-white sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 min-w-0">
              <span className="relative h-8 w-8 shrink-0">
                <Image src="/Img/logo-emblem-v3.png" alt="The Luxe Yatra" fill className="object-contain brightness-0 invert" />
              </span>
              <span className="font-bold text-xs tracking-[0.2em] uppercase truncate">The Luxe Yatra</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-xs text-white/70 truncate max-w-[200px]">
                {member.salutation} {member.first_name}
              </span>
              <button onClick={signOut} className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/80 hover:text-white">
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
          <nav className="max-w-6xl mx-auto px-2 sm:px-6 flex gap-1 overflow-x-auto">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = href === "/member" ? pathname === "/member" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold tracking-wide whitespace-nowrap border-b-2 transition-colors ${
                    active ? "border-[#E39F25] text-white" : "border-transparent text-white/60 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#E39F25]" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </header>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
      </div>
    </MemberContext.Provider>
  );
}

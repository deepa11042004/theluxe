"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ShieldCheck, Menu } from "lucide-react";

interface AdminHeaderProps {
  user?: {
    name: string;
    email: string;
    role: string;
  } | null;
  onToggleSidebar?: () => void;
}

export default function AdminHeader({ user, onToggleSidebar }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 lg:left-64 right-0 z-30 px-4 sm:px-8 flex items-center justify-between shadow-xs transition-all">
      <div className="flex items-center gap-3">
        {/* HAMBURGER TOGGLE FOR MOBILE/TABLET */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 lg:hidden"
          title="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide uppercase truncate">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        {user && (
          <div className="flex items-center gap-2 sm:gap-3 pr-2 sm:pr-4 border-r border-gray-200">
            <div className="w-8 h-8 rounded-full bg-[#B38E46]/10 text-[#B38E46] flex items-center justify-center font-bold text-xs border border-[#B38E46]/30 shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-gray-900 leading-tight truncate">
                {user.name}
              </span>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#B38E46]" />
                <span className="text-[10px] font-bold tracking-wider text-[#B38E46] uppercase">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

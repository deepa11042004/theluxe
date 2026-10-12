"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Compass,
  FileText,
  Image as ImageIcon,
  Users,
  UserCheck,
  X,
  Receipt,
} from "lucide-react";

interface AdminSidebarProps {
  userRole?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ userRole, isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const isSuperAdmin = userRole === "SUPER_ADMIN";

  return (
    <>
      {/* MOBILE BACKDROP OVERLAY */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#141414] text-white flex flex-col transition-transform duration-300 ease-in-out border-r border-white/10 select-none ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* BRANDING HEADER */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0F0F0F]">
          <Link href="/admin" onClick={onClose} className="flex items-center gap-3">
            <div className="relative h-8 w-8">
              <Image
                src="/Img/logo-emblem-v3.png"
                alt="The Luxe Yatra"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs tracking-[0.2em] uppercase text-white">
                LUXE CMS
              </span>
              <span className="text-[10px] text-[#E39F25] font-medium tracking-widest uppercase">
                Admin Portal
              </span>
            </div>
          </Link>

          {/* CLOSE BUTTON FOR MOBILE */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
          {/* DASHBOARD */}
          <Link
            href="/admin"
            onClick={onClose}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              pathname === "/admin"
                ? "bg-[#E39F25] text-white shadow-md shadow-[#E39F25]/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          {/* HOTELS */}
          <Link
            href="/admin/hotels"
            onClick={onClose}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              pathname.startsWith("/admin/hotels")
                ? "bg-[#E39F25] text-white shadow-md shadow-[#E39F25]/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Building2 className="w-4 h-4 text-[#E39F25]" />
            <span>Hotels</span>
          </Link>

          {/* DESTINATIONS */}
          <Link
            href="/admin/destinations"
            onClick={onClose}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              pathname.startsWith("/admin/destinations")
                ? "bg-[#E39F25] text-white shadow-md shadow-[#E39F25]/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <MapPin className="w-4 h-4 text-[#E39F25]" />
            <span>Destinations</span>
          </Link>

          {/* ITINERARIES */}
          <Link
            href="/admin/itineraries"
            onClick={onClose}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              pathname.startsWith("/admin/itineraries")
                ? "bg-[#E39F25] text-white shadow-md shadow-[#E39F25]/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Compass className="w-4 h-4 text-[#E39F25]" />
            <span>Itineraries</span>
          </Link>

          {/* BLOGS */}
          <Link
            href="/admin/blogs"
            onClick={onClose}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              pathname.startsWith("/admin/blogs")
                ? "bg-[#E39F25] text-white shadow-md shadow-[#E39F25]/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText className="w-4 h-4 text-[#E39F25]" />
            <span>Blogs</span>
          </Link>

          {/* MEDIA LIBRARY */}
          <Link
            href="/admin/media"
            onClick={onClose}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              pathname.startsWith("/admin/media")
                ? "bg-[#E39F25] text-white shadow-md shadow-[#E39F25]/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#E39F25]" />
            <span>Media Library</span>
          </Link>

          {/* INVOICES */}
          <Link
            href="/admin/invoices"
            onClick={onClose}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              pathname.startsWith("/admin/invoices")
                ? "bg-[#E39F25] text-white shadow-md shadow-[#E39F25]/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Receipt className="w-4 h-4 text-[#E39F25]" />
            <span>Invoices</span>
          </Link>

          {/* CLIENTS */}
          <Link
            href="/admin/clients"
            onClick={onClose}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              pathname.startsWith("/admin/clients")
                ? "bg-[#E39F25] text-white shadow-md shadow-[#E39F25]/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <UserCheck className="w-4 h-4 text-[#E39F25]" />
            <span>Clients</span>
          </Link>

          {/* ADMIN USERS (SUPER ADMIN ONLY) */}
          {isSuperAdmin && (
            <Link
              href="/admin/users"
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                pathname === "/admin/users"
                  ? "bg-[#E39F25] text-white shadow-md shadow-[#E39F25]/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Users className="w-4 h-4 text-[#E39F25]" />
              <span>Admin Users</span>
            </Link>
          )}

          {/* PROFILE */}
          <Link
            href="/admin/profile"
            onClick={onClose}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              pathname === "/admin/profile"
                ? "bg-[#E39F25] text-white shadow-md shadow-[#E39F25]/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <UserCheck className="w-4 h-4 text-[#E39F25]" />
            <span>Profile</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

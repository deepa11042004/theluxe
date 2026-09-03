"use client";

import React, { useState } from "react";
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
  ChevronDown,
  Plus,
  List,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  userRole?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ userRole, isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    hotels: true,
    destinations: true,
    itineraries: true,
    blogs: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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
              <span className="text-[10px] text-[#B38E46] font-medium tracking-widest uppercase">
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
                ? "bg-[#B38E46] text-white shadow-md shadow-[#B38E46]/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          {/* HOTELS MODULE */}
          <div className="pt-2">
            <button
              onClick={() => toggleSection("hotels")}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-[#B38E46]" />
                <span>Hotels</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openSections.hotels ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSections.hotels && (
              <div className="mt-1 pl-7 space-y-1">
                <Link
                  href="/admin/hotels"
                  onClick={onClose}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                    pathname === "/admin/hotels"
                      ? "text-[#B38E46] bg-[#B38E46]/10 font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <List className="w-3.5 h-3.5" /> All Hotels
                </Link>
                <Link
                  href="/admin/hotels/new"
                  onClick={onClose}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                    pathname === "/admin/hotels/new"
                      ? "text-[#B38E46] bg-[#B38E46]/10 font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" /> Add Hotel
                </Link>
              </div>
            )}
          </div>

          {/* DESTINATIONS MODULE */}
          <div className="pt-2">
            <button
              onClick={() => toggleSection("destinations")}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#B38E46]" />
                <span>Destinations</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openSections.destinations ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSections.destinations && (
              <div className="mt-1 pl-7 space-y-1">
                <Link
                  href="/admin/destinations"
                  onClick={onClose}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                    pathname === "/admin/destinations"
                      ? "text-[#B38E46] bg-[#B38E46]/10 font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <List className="w-3.5 h-3.5" /> All Destinations
                </Link>
                <Link
                  href="/admin/destinations/new"
                  onClick={onClose}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                    pathname === "/admin/destinations/new"
                      ? "text-[#B38E46] bg-[#B38E46]/10 font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" /> Add Destination
                </Link>
              </div>
            )}
          </div>

          {/* ITINERARIES MODULE */}
          <div className="pt-2">
            <button
              onClick={() => toggleSection("itineraries")}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-[#B38E46]" />
                <span>Itineraries</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openSections.itineraries ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSections.itineraries && (
              <div className="mt-1 pl-7 space-y-1">
                <Link
                  href="/admin/itineraries"
                  onClick={onClose}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                    pathname === "/admin/itineraries"
                      ? "text-[#B38E46] bg-[#B38E46]/10 font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <List className="w-3.5 h-3.5" /> All Itineraries
                </Link>
                <Link
                  href="/admin/itineraries/new"
                  onClick={onClose}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                    pathname === "/admin/itineraries/new"
                      ? "text-[#B38E46] bg-[#B38E46]/10 font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" /> Add Itinerary
                </Link>
              </div>
            )}
          </div>

          {/* BLOGS MODULE */}
          <div className="pt-2">
            <button
              onClick={() => toggleSection("blogs")}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#B38E46]" />
                <span>Blogs</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openSections.blogs ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSections.blogs && (
              <div className="mt-1 pl-7 space-y-1">
                <Link
                  href="/admin/blogs"
                  onClick={onClose}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                    pathname === "/admin/blogs"
                      ? "text-[#B38E46] bg-[#B38E46]/10 font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <List className="w-3.5 h-3.5" /> All Blogs
                </Link>
                <Link
                  href="/admin/blogs/new"
                  onClick={onClose}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                    pathname === "/admin/blogs/new"
                      ? "text-[#B38E46] bg-[#B38E46]/10 font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" /> Add Blog
                </Link>
              </div>
            )}
          </div>

          {/* MEDIA LIBRARY */}
          <div className="pt-2">
            <Link
              href="/admin/media"
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                pathname === "/admin/media"
                  ? "bg-[#B38E46] text-white shadow-md shadow-[#B38E46]/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#B38E46]" />
              <span>Media Library</span>
            </Link>
          </div>

          {/* ADMIN USERS (SUPER ADMIN ONLY) */}
          {isSuperAdmin && (
            <div className="pt-2">
              <Link
                href="/admin/users"
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  pathname === "/admin/users"
                    ? "bg-[#B38E46] text-white shadow-md shadow-[#B38E46]/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Users className="w-4 h-4 text-[#B38E46]" />
                <span>Admin Users</span>
              </Link>
            </div>
          )}

          {/* PROFILE */}
          <div className="pt-2">
            <Link
              href="/admin/profile"
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                pathname === "/admin/profile"
                  ? "bg-[#B38E46] text-white shadow-md shadow-[#B38E46]/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <UserCheck className="w-4 h-4 text-[#B38E46]" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

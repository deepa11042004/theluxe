"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Compass,
  FileText,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/v1/admin/dashboard");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500 text-sm">
        Loading dashboard statistics...
      </div>
    );
  }

  const stats = data?.stats || {
    hotels: { total: 0, published: 0 },
    destinations: { total: 0, published: 0 },
    itineraries: { total: 0, published: 0 },
    blogs: { total: 0, published: 0 },
  };

  const recent = data?.recent || {};

  return (
    <div className="space-y-8">
      {/* PAGE TITLE */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-xs text-gray-500 mt-1 font-light">
            Phase-1 CMS statistics, quick actions, and recent content updates.
          </p>
        </div>
      </div>

      {/* STATS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* HOTELS STATS */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Hotels
            </span>
            <div className="text-3xl font-extrabold text-gray-900">
              {stats.hotels.total}
            </div>
            <span className="text-xs text-emerald-600 font-medium">
              {stats.hotels.published} Published
            </span>
          </div>
          <div className="p-3 bg-[#B38E46]/10 text-[#B38E46] rounded-xl">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        {/* DESTINATIONS STATS */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Destinations
            </span>
            <div className="text-3xl font-extrabold text-gray-900">
              {stats.destinations.total}
            </div>
            <span className="text-xs text-emerald-600 font-medium">
              {stats.destinations.published} Published
            </span>
          </div>
          <div className="p-3 bg-[#B38E46]/10 text-[#B38E46] rounded-xl">
            <MapPin className="w-6 h-6" />
          </div>
        </div>

        {/* ITINERARIES STATS */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Itineraries
            </span>
            <div className="text-3xl font-extrabold text-gray-900">
              {stats.itineraries.total}
            </div>
            <span className="text-xs text-emerald-600 font-medium">
              {stats.itineraries.published} Published
            </span>
          </div>
          <div className="p-3 bg-[#B38E46]/10 text-[#B38E46] rounded-xl">
            <Compass className="w-6 h-6" />
          </div>
        </div>

        {/* BLOGS STATS */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Blogs
            </span>
            <div className="text-3xl font-extrabold text-gray-900">
              {stats.blogs.total}
            </div>
            <span className="text-xs text-emerald-600 font-medium">
              {stats.blogs.published} Published
            </span>
          </div>
          <div className="p-3 bg-[#B38E46]/10 text-[#B38E46] rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B38E46]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
            Quick Actions
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/admin/hotels/new"
            className="flex items-center justify-between p-4 bg-gray-50 hover:bg-[#B38E46]/10 hover:border-[#B38E46]/40 border border-gray-200 rounded-xl transition-all group"
          >
            <span className="text-xs font-bold text-gray-800 group-hover:text-[#B38E46]">
              Add Hotel
            </span>
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-[#B38E46]" />
          </Link>
          <Link
            href="/admin/destinations/new"
            className="flex items-center justify-between p-4 bg-gray-50 hover:bg-[#B38E46]/10 hover:border-[#B38E46]/40 border border-gray-200 rounded-xl transition-all group"
          >
            <span className="text-xs font-bold text-gray-800 group-hover:text-[#B38E46]">
              Add Destination
            </span>
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-[#B38E46]" />
          </Link>
          <Link
            href="/admin/itineraries/new"
            className="flex items-center justify-between p-4 bg-gray-50 hover:bg-[#B38E46]/10 hover:border-[#B38E46]/40 border border-gray-200 rounded-xl transition-all group"
          >
            <span className="text-xs font-bold text-gray-800 group-hover:text-[#B38E46]">
              Add Itinerary
            </span>
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-[#B38E46]" />
          </Link>
          <Link
            href="/admin/blogs/new"
            className="flex items-center justify-between p-4 bg-gray-50 hover:bg-[#B38E46]/10 hover:border-[#B38E46]/40 border border-gray-200 rounded-xl transition-all group"
          >
            <span className="text-xs font-bold text-gray-800 group-hover:text-[#B38E46]">
              Write Blog
            </span>
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-[#B38E46]" />
          </Link>
        </div>
      </div>

      {/* RECENT CONTENT TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RECENT HOTELS */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
              Recent Hotels
            </h4>
            <Link
              href="/admin/hotels"
              className="text-xs text-[#B38E46] font-semibold hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recent.hotels?.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100"
              >
                <div>
                  <div className="text-xs font-semibold text-gray-900">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-gray-400">{item.city}</div>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </div>

        {/* RECENT DESTINATIONS */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
              Recent Destinations
            </h4>
            <Link
              href="/admin/destinations"
              className="text-xs text-[#B38E46] font-semibold hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recent.destinations?.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100"
              >
                <div>
                  <div className="text-xs font-semibold text-gray-900">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-gray-400">{item.country}</div>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, CheckCircle2, XCircle, Star } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

export default function AdminDestinationsListPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>({ totalPages: 1 });

  useEffect(() => {
    fetchDestinations();
  }, [page, statusFilter]);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "15",
      });
      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);

      const res = await fetch(`/api/v1/admin/destinations?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setItems(json.data);
        setMeta(json.meta);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/v1/admin/destinations/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const json = await res.json();
      if (json.success) fetchDestinations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;
    try {
      const res = await fetch(`/api/v1/admin/destinations/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) fetchDestinations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Destinations Management
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage global and domestic destinations, travel highlights, currency, and best time to visit.
          </p>
        </div>
        <Link
          href="/admin/destinations/new"
          className="bg-[#B38E46] text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#967536] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Destination
        </Link>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex gap-4 justify-between items-center">
        <form onSubmit={(e) => { e.preventDefault(); setPage(1); fetchDestinations(); }} className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by destination name, country, or region..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-[#B38E46]"
          />
        </form>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none bg-white"
        >
          <option value="">All Statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-gray-500">Loading destinations...</div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center text-xs text-gray-400">No destinations found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Destination</th>
                  <th className="py-3.5 px-4">Country</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => {
                  const cover = item.images?.[0]?.image_url;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                            {cover ? (
                              <Image src={cover} alt={item.name} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-bold">NO IMG</div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-xs">{item.name}</div>
                            <div className="text-[10px] text-gray-400 font-mono">/{item.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">{item.country || "N/A"}</td>
                      <td className="py-3 px-4 capitalize">{item.destination_type || "International"}</td>
                      <td className="py-3 px-4">
                        {item.is_featured ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 font-semibold">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Featured
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[11px]">Regular</span>
                        )}
                      </td>
                      <td className="py-3 px-4"><StatusBadge status={item.status} /></td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleStatusToggle(item.id, item.status)}
                          className="p-1.5 rounded-lg border text-gray-600 hover:bg-gray-100"
                        >
                          {item.status === "PUBLISHED" ? <XCircle className="w-4 h-4 text-amber-600" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        </button>
                        <Link href={`/admin/destinations/${item.id}/edit`} className="p-1.5 rounded-lg border text-gray-600 hover:bg-gray-100 inline-block">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Filter, Edit, Trash2, CheckCircle2, XCircle, Star } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

export default function AdminHotelsListPage() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>({ totalPages: 1 });

  useEffect(() => {
    fetchHotels();
  }, [page, statusFilter]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "15",
      });
      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);

      const res = await fetch(`/api/v1/admin/hotels?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setHotels(json.data);
        setMeta(json.meta);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchHotels();
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/v1/admin/hotels/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const json = await res.json();
      if (json.success) {
        fetchHotels();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hotel?")) return;
    try {
      const res = await fetch(`/api/v1/admin/hotels/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        fetchHotels();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Hotels Management
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage luxury hotel listings, detailed amenities, images, and publishing status.
          </p>
        </div>
        <Link
          href="/admin/hotels/new"
          className="bg-[#B38E46] text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#967536] transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Hotel
        </Link>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hotels by name, city, or country..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-[#B38E46]"
          />
        </form>

        <div className="flex gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-[#B38E46] bg-white"
          >
            <option value="">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* HOTELS TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-gray-500">
            Loading hotels list...
          </div>
        ) : hotels.length === 0 ? (
          <div className="py-20 text-center text-xs text-gray-400">
            No hotels found. Click "Add New Hotel" to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Hotel</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {hotels.map((hotel) => {
                  const coverImg = hotel.images?.find((img: any) => img.is_primary)?.image_url || hotel.images?.[0]?.image_url;
                  return (
                    <tr key={hotel.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-900">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                            {coverImg ? (
                              <Image
                                src={coverImg}
                                alt={hotel.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-bold">
                                NO IMG
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-xs">
                              {hotel.name}
                            </div>
                            <div className="text-[10px] text-gray-400 font-mono">
                              /{hotel.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-gray-700">
                        {hotel.city || hotel.country ? `${hotel.city || ""}${hotel.city && hotel.country ? ", " : ""}${hotel.country || ""}` : "N/A"}
                      </td>

                      <td className="py-3 px-4 text-gray-700 capitalize">
                        {hotel.hotel_type || "Luxury Hotel"}
                      </td>

                      <td className="py-3 px-4">
                        {hotel.is_featured ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 font-semibold">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Featured
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[11px]">Regular</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <StatusBadge status={hotel.status} />
                      </td>

                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleStatusToggle(hotel.id, hotel.status)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            hotel.status === "PUBLISHED"
                              ? "text-amber-600 border-amber-300 hover:bg-amber-50"
                              : "text-emerald-600 border-emerald-300 hover:bg-emerald-50"
                          }`}
                          title={hotel.status === "PUBLISHED" ? "Unpublish Hotel" : "Publish Hotel"}
                        >
                          {hotel.status === "PUBLISHED" ? (
                            <XCircle className="w-4 h-4" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                        </button>

                        <Link
                          href={`/admin/hotels/${hotel.id}/edit`}
                          className="p-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors inline-block"
                          title="Edit Hotel"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDelete(hotel.id)}
                          className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Hotel"
                        >
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

        {/* PAGINATION */}
        {meta.totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <span>
              Page {page} of {meta.totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 rounded-lg border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import SeoForm, { SeoData } from "./SeoForm";
import MediaPickerModal from "./MediaPickerModal";
import StatusBadge from "./StatusBadge";

interface ItineraryFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function ItineraryForm({ initialData, isEdit = false }: ItineraryFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [activeDayImageIndex, setActiveDayImageIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    short_description: initialData?.short_description || "",
    overview: initialData?.overview || "",
    region: initialData?.region || "Asia",
    category: initialData?.category || "Luxury Journey",
    nights: initialData?.nights || 4,
    days: initialData?.days || 5,
    min_travelers: initialData?.min_travelers || 2,
    max_travelers: initialData?.max_travelers || 8,
    price_from: initialData?.price_from || "",
    price_currency: initialData?.price_currency || "INR",
    price_unit: initialData?.price_unit || "per person",
    is_flights_included: initialData?.is_flights_included || false,
    is_featured: initialData?.is_featured || false,
    display_order: initialData?.display_order || 0,
    status: initialData?.status || "DRAFT",
    days_list: initialData?.days_list || [
      { day_number: 1, title: "Day 1: Arrival & Welcome Dinner", description: "" },
    ],
    inclusions: initialData?.inclusions?.map((i: any) => i.title) || ["Private Airport Transfers", "Luxury Accommodation"],
    exclusions: initialData?.exclusions?.map((e: any) => e.title) || ["International Airfare", "Personal Expenses"],
    images: initialData?.images || [],
    seo: {
      seo_title: initialData?.seo_title || "",
      seo_description: initialData?.seo_description || "",
      canonical_url: initialData?.canonical_url || "",
      og_title: initialData?.og_title || "",
      og_description: initialData?.og_description || "",
      og_image: initialData?.og_image || "",
      robots_index: initialData?.robots_index !== false,
      robots_follow: initialData?.robots_follow !== false,
    } as SeoData,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addDay = () => {
    setFormData((prev) => ({
      ...prev,
      days_list: [
        ...prev.days_list,
        {
          day_number: prev.days_list.length + 1,
          title: `Day ${prev.days_list.length + 1}: `,
          description: "",
        },
      ],
      days: prev.days_list.length + 1,
    }));
  };

  const removeDay = (idx: number) => {
    setFormData((prev) => {
      const updated = prev.days_list.filter((_: any, i: number) => i !== idx).map((d: any, i: number) => ({ ...d, day_number: i + 1 }));
      return { ...prev, days_list: updated, days: updated.length };
    });
  };

  const moveDay = (idx: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= formData.days_list.length) return;

    const list = [...formData.days_list];
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;

    const renumbered = list.map((d, i) => ({ ...d, day_number: i + 1 }));
    setFormData((prev) => ({ ...prev, days_list: renumbered }));
  };

  const handleDayChange = (idx: number, field: string, value: any) => {
    const list = [...formData.days_list];
    list[idx] = { ...list[idx], [field]: value };
    setFormData((prev) => ({ ...prev, days_list: list }));
  };

  const handleImageSelect = (media: { url: string; id?: string }) => {
    if (activeDayImageIndex !== null) {
      handleDayChange(activeDayImageIndex, "image_url", media.url);
      handleDayChange(activeDayImageIndex, "media_id", media.id);
      setActiveDayImageIndex(null);
    } else {
      setFormData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          {
            media_id: media.id,
            image_url: media.url,
            is_primary: prev.images.length === 0,
          },
        ],
      }));
    }
  };

  const handleSubmit = async (statusOverride?: string) => {
    if (!formData.title) {
      setError("Itinerary title is required.");
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      ...formData,
      status: statusOverride || formData.status,
      ...formData.seo,
    };

    try {
      const url = isEdit ? `/api/v1/admin/itineraries/${initialData.id}` : "/api/v1/admin/itineraries";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        router.push("/admin/itineraries");
      } else {
        setError(json.message || "Failed to save itinerary.");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={() => router.push("/admin/itineraries")} className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-gray-900 truncate">
              {isEdit ? `Edit Itinerary: ${formData.title}` : "Create Itinerary"}
            </h2>
            <StatusBadge status={formData.status} />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
          <button type="button" onClick={() => handleSubmit("DRAFT")} disabled={loading} className="px-3.5 sm:px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold">
            Save Draft
          </button>
          <button type="button" onClick={() => handleSubmit("PUBLISHED")} disabled={loading} className="px-4 sm:px-5 py-2 bg-[#B38E46] text-white rounded-xl text-xs font-semibold hover:bg-[#967536] flex items-center gap-1.5 sm:gap-2">
            <Save className="w-4 h-4" /> Publish Itinerary
          </button>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold">{error}</div>}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden max-w-full">
        <div className="flex border-b border-gray-200 bg-gray-50/50 overflow-x-auto whitespace-nowrap scrollbar-none">
          {["basic", "days", "inclusions", "images", "seo", "publishing"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider border-b-2 capitalize shrink-0 ${
                activeTab === tab ? "border-[#B38E46] text-[#B38E46] bg-white" : "border-transparent text-gray-500"
              }`}
            >
              {tab === "days" ? `Day-by-Day (${formData.days_list.length})` : tab}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6">
          {/* BASIC TAB */}
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Itinerary Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g. Dubai Desert Dreams & Coastal Luxury"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Days</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.days}
                    onChange={(e) => handleChange("days", parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Nights</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.nights}
                    onChange={(e) => handleChange("nights", parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Price From (₹)</label>
                  <input
                    type="number"
                    value={formData.price_from}
                    onChange={(e) => handleChange("price_from", e.target.value)}
                    placeholder="150000"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Currency</label>
                  <input
                    type="text"
                    value={formData.price_currency}
                    onChange={(e) => handleChange("price_currency", e.target.value)}
                    placeholder="INR"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Overview</label>
                <textarea
                  rows={4}
                  value={formData.overview}
                  onChange={(e) => handleChange("overview", e.target.value)}
                  placeholder="Detailed tour overview..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                />
              </div>
            </div>
          )}

          {/* DAY-BY-DAY BUILDER TAB */}
          {activeTab === "days" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 uppercase">Day-by-Day Schedule Builder</h3>
                <button
                  type="button"
                  onClick={addDay}
                  className="bg-[#B38E46] text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#967536] flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Day
                </button>
              </div>

              <div className="space-y-4">
                {formData.days_list.map((day: any, idx: number) => (
                  <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-[#B38E46] uppercase tracking-wider">
                        Day {day.day_number}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveDay(idx, "up")}
                          className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === formData.days_list.length - 1}
                          onClick={() => moveDay(idx, "down")}
                          className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeDay(idx)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => handleDayChange(idx, "title", e.target.value)}
                      placeholder="Day Title..."
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold"
                    />

                    <textarea
                      rows={2}
                      value={day.description}
                      onChange={(e) => handleDayChange(idx, "description", e.target.value)}
                      placeholder="Day activities & schedule details..."
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
                    />

                    <div className="flex items-center gap-3">
                      {day.image_url ? (
                        <div className="flex items-center gap-2">
                          <img src={day.image_url} alt="" className="w-10 h-10 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={() => handleDayChange(idx, "image_url", "")}
                            className="text-[11px] text-red-600 hover:underline"
                          >
                            Remove Image
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveDayImageIndex(idx);
                            setMediaPickerOpen(true);
                          }}
                          className="text-xs text-[#B38E46] font-semibold hover:underline"
                        >
                          + Attach Day Image
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INCLUSIONS & EXCLUSIONS */}
          {activeTab === "inclusions" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Inclusions</h4>
                {formData.inclusions.map((inc: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={inc}
                      onChange={(e) => {
                        const list = [...formData.inclusions];
                        list[idx] = e.target.value;
                        setFormData((p) => ({ ...p, inclusions: list }));
                      }}
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, inclusions: p.inclusions.filter((_: any, i: number) => i !== idx) }))}
                      className="p-1.5 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, inclusions: [...p.inclusions, ""] }))}
                  className="text-xs text-[#B38E46] font-semibold"
                >
                  + Add Inclusion
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider">Exclusions</h4>
                {formData.exclusions.map((exc: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={exc}
                      onChange={(e) => {
                        const list = [...formData.exclusions];
                        list[idx] = e.target.value;
                        setFormData((p) => ({ ...p, exclusions: list }));
                      }}
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, exclusions: p.exclusions.filter((_: any, i: number) => i !== idx) }))}
                      className="p-1.5 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, exclusions: [...p.exclusions, ""] }))}
                  className="text-xs text-[#B38E46] font-semibold"
                >
                  + Add Exclusion
                </button>
              </div>
            </div>
          )}

          {activeTab === "images" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 uppercase">Gallery Images</h3>
                <button
                  type="button"
                  onClick={() => {
                    setActiveDayImageIndex(null);
                    setMediaPickerOpen(true);
                  }}
                  className="bg-[#B38E46] text-white px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Add Image
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {formData.images.map((img: any, idx: number) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                    <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "seo" && <SeoForm data={formData.seo} onChange={(updatedSeo) => handleChange("seo", updatedSeo)} />}

          {activeTab === "publishing" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full sm:w-48 px-3.5 py-2 border border-gray-300 rounded-xl text-sm font-semibold bg-white"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => handleChange("is_featured", e.target.checked)}
                  className="w-4 h-4 text-[#B38E46] rounded"
                />
                Featured Itinerary
              </label>
            </div>
          )}
        </div>
      </div>

      <MediaPickerModal isOpen={mediaPickerOpen} onClose={() => setMediaPickerOpen(false)} onSelect={handleImageSelect} />
    </div>
  );
}

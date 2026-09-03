"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import SeoForm, { SeoData } from "./SeoForm";
import MediaPickerModal from "./MediaPickerModal";
import StatusBadge from "./StatusBadge";

interface DestinationFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function DestinationForm({ initialData, isEdit = false }: DestinationFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    short_description: initialData?.short_description || "",
    description: initialData?.description || "",
    country: initialData?.country || "",
    state_region: initialData?.state_region || "",
    city: initialData?.city || "",
    continent: initialData?.continent || "Asia",
    destination_type: initialData?.destination_type || "International",
    best_time_to_visit: initialData?.best_time_to_visit || "",
    ideal_duration: initialData?.ideal_duration || "4-5 Days",
    currency: initialData?.currency || "EUR",
    language: initialData?.language || "English",
    time_zone: initialData?.time_zone || "GMT+1",
    is_featured: initialData?.is_featured || false,
    is_popular: initialData?.is_popular || false,
    is_india_destination: initialData?.is_india_destination || false,
    is_international_destination: initialData?.is_international_destination || true,
    display_order: initialData?.display_order || 0,
    status: initialData?.status || "DRAFT",
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

  const handleImageSelect = (media: { url: string; id?: string; alt?: string }) => {
    setFormData((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        {
          media_id: media.id,
          image_url: media.url,
          alt_text: media.alt || prev.name,
          caption: "",
          is_primary: prev.images.length === 0,
        },
      ],
    }));
  };

  const handleSubmit = async (statusOverride?: string) => {
    if (!formData.name) {
      setError("Destination name is required.");
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
      const url = isEdit ? `/api/v1/admin/destinations/${initialData.id}` : "/api/v1/admin/destinations";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        router.push("/admin/destinations");
      } else {
        setError(json.message || "Failed to save destination.");
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
          <button onClick={() => router.push("/admin/destinations")} className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-gray-900 truncate">
              {isEdit ? `Edit Destination: ${formData.name}` : "Create Destination"}
            </h2>
            <StatusBadge status={formData.status} />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
          <button type="button" onClick={() => handleSubmit("DRAFT")} disabled={loading} className="px-3.5 sm:px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold">
            Save Draft
          </button>
          <button type="button" onClick={() => handleSubmit("PUBLISHED")} disabled={loading} className="px-4 sm:px-5 py-2 bg-[#B38E46] text-white rounded-xl text-xs font-semibold hover:bg-[#967536] flex items-center gap-1.5 sm:gap-2">
            <Save className="w-4 h-4" /> Publish Destination
          </button>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold">{error}</div>}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden max-w-full">
        <div className="flex border-b border-gray-200 bg-gray-50/50 overflow-x-auto whitespace-nowrap scrollbar-none">
          {["basic", "travel", "images", "seo", "publishing"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider border-b-2 capitalize shrink-0 ${
                activeTab === tab ? "border-[#B38E46] text-[#B38E46] bg-white" : "border-transparent text-gray-500"
              }`}
            >
              {tab === "basic" ? "Basic Info" : tab === "travel" ? "Travel Details" : tab}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Destination Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g. Switzerland, Maldives, Goa"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    placeholder="Switzerland"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Continent</label>
                  <input
                    type="text"
                    value={formData.continent}
                    onChange={(e) => handleChange("continent", e.target.value)}
                    placeholder="Europe"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Overview of the destination..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === "travel" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Best Time to Visit</label>
                <input
                  type="text"
                  value={formData.best_time_to_visit}
                  onChange={(e) => handleChange("best_time_to_visit", e.target.value)}
                  placeholder="October to April"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Ideal Duration</label>
                <input
                  type="text"
                  value={formData.ideal_duration}
                  onChange={(e) => handleChange("ideal_duration", e.target.value)}
                  placeholder="5-7 Days"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Currency</label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => handleChange("currency", e.target.value)}
                  placeholder="EUR, USD, INR"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Time Zone</label>
                <input
                  type="text"
                  value={formData.time_zone}
                  onChange={(e) => handleChange("time_zone", e.target.value)}
                  placeholder="GMT+1"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === "images" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 uppercase">Gallery</h3>
                <button
                  type="button"
                  onClick={() => setMediaPickerOpen(true)}
                  className="bg-[#B38E46] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#967536]"
                >
                  Add Image
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {formData.images.map((img: any, idx: number) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                    <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, images: p.images.filter((_: any, i: number) => i !== idx) }))}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <SeoForm data={formData.seo} onChange={(updatedSeo) => handleChange("seo", updatedSeo)} />
          )}

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
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => handleChange("is_featured", e.target.checked)}
                    className="w-4 h-4 text-[#B38E46] rounded"
                  />
                  Featured Destination
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      <MediaPickerModal isOpen={mediaPickerOpen} onClose={() => setMediaPickerOpen(false)} onSelect={handleImageSelect} />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import SeoForm, { SeoData } from "./SeoForm";
import MediaPickerModal from "./MediaPickerModal";
import StatusBadge from "./StatusBadge";

interface HotelFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function HotelForm({ initialData, isEdit = false }: HotelFormProps) {
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
    region: initialData?.region || "Asia",
    country: initialData?.country || "",
    state_province: initialData?.state_province || "",
    city: initialData?.city || "",
    location_area: initialData?.location_area || "",
    address: initialData?.address || "",
    latitude: initialData?.latitude || "",
    longitude: initialData?.longitude || "",
    hotel_type: initialData?.hotel_type || "Luxury Resort",
    luxury_category: initialData?.luxury_category || "5-Star Ultra Luxury",
    official_website: initialData?.official_website || "",
    booking_url: initialData?.booking_url || "",
    google_maps_url: initialData?.google_maps_url || "",
    best_time_to_visit: initialData?.best_time_to_visit || "",
    dining_information: initialData?.dining_information || "",
    spa_wellness: initialData?.spa_wellness || "",
    activities: initialData?.activities || "",
    why_we_recommend: initialData?.why_we_recommend || "",
    is_featured: initialData?.is_featured || false,
    is_popular: initialData?.is_popular || false,
    is_top_hotel: initialData?.is_top_hotel || false,
    is_india_top_50: initialData?.is_india_top_50 || false,
    is_international_top_50: initialData?.is_international_top_50 || false,
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
          image_type: "gallery",
          is_primary: prev.images.length === 0,
        },
      ],
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleSubmit = async (statusOverride?: string) => {
    if (!formData.name) {
      setError("Hotel name is required.");
      setActiveTab("basic");
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
      const url = isEdit
        ? `/api/v1/admin/hotels/${initialData.id}`
        : "/api/v1/admin/hotels";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        router.push("/admin/hotels");
      } else {
        setError(json.message || "Failed to save hotel.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* TOP HEADER & ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/hotels")}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors text-gray-600 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-gray-900 truncate">
              {isEdit ? `Edit Hotel: ${formData.name}` : "Create New Hotel"}
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] sm:text-xs text-gray-500">Status:</span>
              <StatusBadge status={formData.status} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => handleSubmit("DRAFT")}
            disabled={loading}
            className="px-3.5 sm:px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("PUBLISHED")}
            disabled={loading}
            className="px-4 sm:px-5 py-2 bg-[#B38E46] text-white rounded-xl text-xs font-semibold hover:bg-[#967536] transition-colors flex items-center gap-1.5 sm:gap-2 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{isEdit ? "Update & Publish" : "Publish Hotel"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold">
          {error}
        </div>
      )}

      {/* FORM TABS */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden max-w-full">
        <div className="flex border-b border-gray-200 bg-gray-50/50 overflow-x-auto whitespace-nowrap scrollbar-none">
          {[
            { id: "basic", label: "Basic Info" },
            { id: "location", label: "Location & Address" },
            { id: "details", label: "Hotel Details" },
            { id: "images", label: `Images (${formData.images.length})` },
            { id: "seo", label: "SEO & Social" },
            { id: "publishing", label: "Publishing Controls" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? "border-[#B38E46] text-[#B38E46] bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6">
          {/* TAB 1: BASIC INFO */}
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Hotel Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g. Taj Lake Palace"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-[#B38E46]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Custom Slug (URL Path)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleChange("slug", e.target.value)}
                  placeholder="e.g. taj-lake-palace (leave blank for auto-generation)"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-[#B38E46]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Short Description / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={formData.short_description}
                  onChange={(e) => handleChange("short_description", e.target.value)}
                  placeholder="Brief 1-2 sentence overview for cards and search"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-[#B38E46]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Full Description & Story
                </label>
                <textarea
                  rows={6}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Comprehensive description of the hotel's heritage, atmosphere, and experience..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-[#B38E46]"
                />
              </div>
            </div>
          )}

          {/* TAB 2: LOCATION */}
          {activeTab === "location" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Region</label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => handleChange("region", e.target.value)}
                  placeholder="e.g. Asia, Europe, Middle East"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-[#B38E46]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  placeholder="e.g. India, Maldives, France"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-[#B38E46]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">State / Province</label>
                <input
                  type="text"
                  value={formData.state_province}
                  onChange={(e) => handleChange("state_province", e.target.value)}
                  placeholder="e.g. Rajasthan"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-[#B38E46]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="e.g. Udaipur"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-[#B38E46]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Full physical street address"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-[#B38E46]"
                />
              </div>
            </div>
          )}

          {/* TAB 3: HOTEL DETAILS */}
          {activeTab === "details" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Hotel Type</label>
                  <input
                    type="text"
                    value={formData.hotel_type}
                    onChange={(e) => handleChange("hotel_type", e.target.value)}
                    placeholder="Heritage Palace, Beach Resort, Boutique Villa"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Luxury Category</label>
                  <input
                    type="text"
                    value={formData.luxury_category}
                    onChange={(e) => handleChange("luxury_category", e.target.value)}
                    placeholder="Ultra Luxury, Ultra Prestige"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Why We Recommend</label>
                <textarea
                  rows={3}
                  value={formData.why_we_recommend}
                  onChange={(e) => handleChange("why_we_recommend", e.target.value)}
                  placeholder="Curator highlights on why this property stands out..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Dining Information</label>
                <textarea
                  rows={2}
                  value={formData.dining_information}
                  onChange={(e) => handleChange("dining_information", e.target.value)}
                  placeholder="Michelin-starred restaurants, fine dining details..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 4: IMAGES */}
          {activeTab === "images" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 uppercase">Gallery Images</h3>
                <button
                  type="button"
                  onClick={() => setMediaPickerOpen(true)}
                  className="bg-[#B38E46] text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#967536] flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Image
                </button>
              </div>

              {formData.images.length === 0 ? (
                <div className="p-8 sm:p-12 border-2 border-dashed border-gray-200 rounded-2xl text-center text-gray-400 text-xs">
                  No images added yet. Click "Add Image" to select from media library.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {formData.images.map((img: any, idx: number) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                      <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SEO */}
          {activeTab === "seo" && (
            <SeoForm
              data={formData.seo}
              onChange={(updatedSeo) => handleChange("seo", updatedSeo)}
            />
          )}

          {/* TAB 6: PUBLISHING & FEATURED FLAGS */}
          {activeTab === "publishing" && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Publishing Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full sm:w-auto px-3.5 py-2 border border-gray-300 rounded-xl text-sm font-semibold outline-none bg-white"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Featured & Curation Badges
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => handleChange("is_featured", e.target.checked)}
                      className="w-4 h-4 text-[#B38E46] rounded"
                    />
                    Featured Hotel
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_popular}
                      onChange={(e) => handleChange("is_popular", e.target.checked)}
                      className="w-4 h-4 text-[#B38E46] rounded"
                    />
                    Popular Pick
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_india_top_50}
                      onChange={(e) => handleChange("is_india_top_50", e.target.checked)}
                      className="w-4 h-4 text-[#B38E46] rounded"
                    />
                    India Top 50 Luxury Hotels
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_international_top_50}
                      onChange={(e) => handleChange("is_international_top_50", e.target.checked)}
                      className="w-4 h-4 text-[#B38E46] rounded"
                    />
                    International Top 50 Luxury Hotels
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={handleImageSelect}
      />
    </div>
  );
}

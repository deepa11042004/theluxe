"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import SeoForm, { SeoData } from "./SeoForm";
import MediaPickerModal from "./MediaPickerModal";
import StatusBadge from "./StatusBadge";

interface BlogFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("content");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [isInsertingIntoEditor, setIsInsertingIntoEditor] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "<p>Write your luxury travel story here...</p>",
    category_id: initialData?.category_id || "",
    author_name: initialData?.author_name || "The Luxe Yatra Editorial",
    author_bio: initialData?.author_bio || "",
    reading_time: initialData?.reading_time || 5,
    is_featured: initialData?.is_featured || false,
    display_order: initialData?.display_order || 0,
    status: initialData?.status || "DRAFT",
    scheduled_at: initialData?.scheduled_at ? new Date(initialData.scheduled_at).toISOString().slice(0, 16) : "",
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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/v1/admin/blog-categories");
      const json = await res.json();
      if (json.success) {
        setCategories(json.data);
        if (!formData.category_id && json.data.length > 0) {
          setFormData((p) => ({ ...p, category_id: json.data[0].id }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (media: { url: string; id?: string; alt?: string }) => {
    if (isInsertingIntoEditor) {
      const imgHtml = `<img src="${media.url}" alt="${media.alt || ''}" class="my-4 rounded-xl shadow-md max-w-full" />`;
      setFormData((prev) => ({ ...prev, content: prev.content + imgHtml }));
      setIsInsertingIntoEditor(false);
    } else {
      setFormData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          {
            media_id: media.id,
            image_url: media.url,
            alt_text: media.alt || prev.title,
            is_featured: prev.images.length === 0,
          },
        ],
      }));
    }
  };

  const handleSubmit = async (statusOverride?: string) => {
    if (!formData.title) {
      setError("Blog title is required.");
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
      const url = isEdit ? `/api/v1/admin/blogs/${initialData.id}` : "/api/v1/admin/blogs";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        router.push("/admin/blogs");
      } else {
        setError(json.message || "Failed to save blog post.");
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
          <button onClick={() => router.push("/admin/blogs")} className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-gray-900 truncate">
              {isEdit ? `Edit Blog: ${formData.title}` : "Write New Blog Post"}
            </h2>
            <StatusBadge status={formData.status} />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
          <button type="button" onClick={() => handleSubmit("DRAFT")} disabled={loading} className="px-3.5 sm:px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold">
            Save Draft
          </button>
          <button type="button" onClick={() => handleSubmit("PUBLISHED")} disabled={loading} className="px-4 sm:px-5 py-2 bg-[#B38E46] text-white rounded-xl text-xs font-semibold hover:bg-[#967536] flex items-center gap-1.5 sm:gap-2">
            <Save className="w-4 h-4" /> Publish Story
          </button>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold">{error}</div>}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden max-w-full">
        <div className="flex border-b border-gray-200 bg-gray-50/50 overflow-x-auto whitespace-nowrap scrollbar-none">
          {["content", "category", "images", "seo", "publishing"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider border-b-2 capitalize shrink-0 ${
                activeTab === tab ? "border-[#B38E46] text-[#B38E46] bg-white" : "border-transparent text-gray-500"
              }`}
            >
              {tab === "content" ? "Article Body" : tab === "category" ? "Category & Author" : tab}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6">
          {/* ARTICLE CONTENT TAB */}
          {activeTab === "content" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Article Title (H1) *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g. The World's Most Exclusive Private Island Resorts"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm sm:text-base font-bold outline-none focus:border-[#B38E46]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Excerpt / Summary</label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => handleChange("excerpt", e.target.value)}
                  placeholder="Short introductory hook for article preview cards..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-[#B38E46]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Rich-Text Article Body</label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => handleChange("content", content)}
                  onOpenMediaPicker={() => {
                    setIsInsertingIntoEditor(true);
                    setMediaPickerOpen(true);
                  }}
                />
              </div>
            </div>
          )}

          {/* CATEGORY & AUTHOR TAB */}
          {activeTab === "category" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Blog Category</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => handleChange("category_id", e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Author Name</label>
                <input
                  type="text"
                  value={formData.author_name}
                  onChange={(e) => handleChange("author_name", e.target.value)}
                  placeholder="The Luxe Yatra Editorial"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Estimated Reading Time (Minutes)</label>
                <input
                  type="number"
                  min={1}
                  value={formData.reading_time}
                  onChange={(e) => handleChange("reading_time", parseInt(e.target.value) || 5)}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Author Bio</label>
                <textarea
                  rows={2}
                  value={formData.author_bio}
                  onChange={(e) => handleChange("author_bio", e.target.value)}
                  placeholder="Short author bio..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
                />
              </div>
            </div>
          )}

          {/* IMAGES TAB */}
          {activeTab === "images" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 uppercase">Featured Cover Image</h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsInsertingIntoEditor(false);
                    setMediaPickerOpen(true);
                  }}
                  className="bg-[#B38E46] text-white px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Add Featured Image
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
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              {formData.status === "SCHEDULED" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Schedule Publish Date & Time</label>
                  <input
                    type="datetime-local"
                    value={formData.scheduled_at}
                    onChange={(e) => handleChange("scheduled_at", e.target.value)}
                    className="w-full sm:w-auto px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none bg-white"
                  />
                </div>
              )}

              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => handleChange("is_featured", e.target.checked)}
                  className="w-4 h-4 text-[#B38E46] rounded"
                />
                Featured Story on Blog Home
              </label>
            </div>
          )}
        </div>
      </div>

      <MediaPickerModal isOpen={mediaPickerOpen} onClose={() => setMediaPickerOpen(false)} onSelect={handleImageSelect} />
    </div>
  );
}

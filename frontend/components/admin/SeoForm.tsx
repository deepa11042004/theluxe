import React from "react";

export interface SeoData {
  seo_title?: string;
  seo_description?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  robots_index?: boolean;
  robots_follow?: boolean;
}

interface SeoFormProps {
  data: SeoData;
  onChange: (updated: SeoData) => void;
}

export default function SeoForm({ data, onChange }: SeoFormProps) {
  const handleChange = (field: keyof SeoData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const titleLength = (data.seo_title || "").length;
  const descLength = (data.seo_description || "").length;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <h3 className="text-base font-semibold text-gray-900 border-b pb-3">
        Search Engine Optimization (SEO) & Social Meta
      </h3>

      {/* SEO Title */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
            SEO Title
          </label>
          <span
            className={`text-xs ${
              titleLength >= 50 && titleLength <= 60
                ? "text-emerald-600 font-medium"
                : "text-amber-600"
            }`}
          >
            {titleLength} / 60 characters (Recommended: 50–60)
          </span>
        </div>
        <input
          type="text"
          value={data.seo_title || ""}
          onChange={(e) => handleChange("seo_title", e.target.value)}
          placeholder="Enter meta title for search engines"
          className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#B38E46] focus:border-transparent outline-none"
        />
      </div>

      {/* Meta Description */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Meta Description
          </label>
          <span
            className={`text-xs ${
              descLength >= 140 && descLength <= 160
                ? "text-emerald-600 font-medium"
                : "text-amber-600"
            }`}
          >
            {descLength} / 160 characters (Recommended: 140–160)
          </span>
        </div>
        <textarea
          rows={3}
          value={data.seo_description || ""}
          onChange={(e) => handleChange("seo_description", e.target.value)}
          placeholder="Provide a compelling summary for search result snippets"
          className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#B38E46] focus:border-transparent outline-none resize-y"
        />
      </div>

      {/* Canonical URL */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
          Canonical URL
        </label>
        <input
          type="url"
          value={data.canonical_url || ""}
          onChange={(e) => handleChange("canonical_url", e.target.value)}
          placeholder="https://theluxeyatra.com/custom-canonical-path"
          className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#B38E46] focus:border-transparent outline-none"
        />
      </div>

      {/* Open Graph (Social Sharing) */}
      <div className="pt-4 border-t border-gray-100 space-y-4">
        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
          Open Graph (Social Sharing)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              OG Title
            </label>
            <input
              type="text"
              value={data.og_title || ""}
              onChange={(e) => handleChange("og_title", e.target.value)}
              placeholder="Title for Facebook/LinkedIn previews"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#B38E46]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              OG Image URL
            </label>
            <input
              type="text"
              value={data.og_image || ""}
              onChange={(e) => handleChange("og_image", e.target.value)}
              placeholder="URL of social preview image"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#B38E46]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            OG Description
          </label>
          <textarea
            rows={2}
            value={data.og_description || ""}
            onChange={(e) => handleChange("og_description", e.target.value)}
            placeholder="Short description for social cards"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#B38E46]"
          />
        </div>
      </div>

      {/* Robots Directives */}
      <div className="pt-4 border-t border-gray-100 flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={data.robots_index !== false}
            onChange={(e) => handleChange("robots_index", e.target.checked)}
            className="w-4 h-4 text-[#B38E46] rounded focus:ring-[#B38E46]"
          />
          Allow Search Engines to Index (Robots Index)
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={data.robots_follow !== false}
            onChange={(e) => handleChange("robots_follow", e.target.checked)}
            className="w-4 h-4 text-[#B38E46] rounded focus:ring-[#B38E46]"
          />
          Allow Links Following (Robots Follow)
        </label>
      </div>
    </div>
  );
}

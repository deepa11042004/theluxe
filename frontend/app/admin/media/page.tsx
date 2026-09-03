"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Search, Trash2, FolderImage, Check } from "lucide-react";

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/media");
      const json = await res.json();
      if (json.success) {
        setMediaList(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/v1/admin/media", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        setMediaList((prev) => [json.data, ...prev]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media file?")) return;
    try {
      const res = await fetch(`/api/v1/admin/media/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setMediaList((prev) => prev.filter((item) => item.id !== id));
        if (selectedMedia?.id === id) setSelectedMedia(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = mediaList.filter((m) =>
    (m.original_filename || m.filename || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Media Library</h2>
          <p className="text-xs text-gray-500 mt-1">Upload, optimize (auto WebP conversion), and manage high-resolution assets.</p>
        </div>
        <label className="cursor-pointer bg-[#B38E46] text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#967536] flex items-center gap-2 shadow-sm">
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading & Optimizing..." : "Upload New Image"}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
        </label>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search media files by filename..."
          className="w-full text-xs outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* GALLERY GRID */}
        <div className="md:col-span-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          {loading ? (
            <div className="py-20 text-center text-xs text-gray-500">Loading media assets...</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-xs text-gray-400">No media files found. Upload your first image!</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedMedia(item)}
                  className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedMedia?.id === item.id ? "border-[#B38E46] ring-2 ring-[#B38E46]/30 shadow-md" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image src={item.url} alt={item.filename} fill className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-[10px] text-white truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.original_filename}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DETAILS SIDEBAR */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 h-fit">
          <h3 className="text-sm font-bold text-gray-800 uppercase border-b pb-3">File Details</h3>
          {selectedMedia ? (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <Image src={selectedMedia.url} alt="" fill className="object-cover" />
              </div>
              <div className="space-y-2 text-xs text-gray-600 font-light">
                <p><span className="font-semibold text-gray-800">Filename:</span> {selectedMedia.original_filename}</p>
                <p><span className="font-semibold text-gray-800">Format:</span> {selectedMedia.mime_type}</p>
                <p><span className="font-semibold text-gray-800">Dimensions:</span> {selectedMedia.width} x {selectedMedia.height} px</p>
                <p><span className="font-semibold text-gray-800">Size:</span> {(selectedMedia.file_size / 1024).toFixed(1)} KB</p>
                <p><span className="font-semibold text-gray-800">URL:</span> <code className="bg-gray-100 p-1 rounded text-[10px] block truncate">{selectedMedia.url}</code></p>
              </div>
              <button
                onClick={() => handleDelete(selectedMedia.id)}
                className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete Asset
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">Select an asset from the media library grid to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

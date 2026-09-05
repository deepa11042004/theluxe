import React, { useState, useEffect } from "react";
import { X, Upload, Check, Image as ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: { url: string; id?: string; alt?: string }) => void;
}

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
}: MediaPickerModalProps) {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

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
        setSelectedMedia(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMedia = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this media image?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/v1/admin/media/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setMediaList((prev) => prev.filter((item) => item.id !== id));
        if (selectedMedia?.id === id) {
          setSelectedMedia(null);
        }
      } else {
        alert(json.message || "Failed to delete media image.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting the media image.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleConfirm = () => {
    if (selectedMedia) {
      onSelect({
        url: selectedMedia.url,
        id: selectedMedia.id,
        alt: selectedMedia.alt_text || selectedMedia.original_filename,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full h-[80vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100">
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#B38E46]" />
            <h3 className="font-bold text-gray-900 text-base">Select Media Image</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-200 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* UPLOAD & CONTROLS */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <label className="cursor-pointer inline-flex items-center gap-2 bg-[#B38E46] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#967536] transition-colors shadow-sm">
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading & Optimizing..." : "Upload New Image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>

          <span className="text-xs text-gray-500 font-medium">
            {mediaList.length} items in media library
          </span>
        </div>

        {/* MEDIA GRID */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {loading ? (
            <div className="flex items-center justify-center h-full text-sm text-gray-500">
              Loading media library...
            </div>
          ) : mediaList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
              <ImageIcon className="w-12 h-12 stroke-[1.5]" />
              <p className="text-sm font-medium">No media uploaded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mediaList.map((item) => {
                const isSelected = selectedMedia?.id === item.id;
                const isDeleting = deletingId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMedia(item)}
                    className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      isSelected
                        ? "border-[#B38E46] ring-2 ring-[#B38E46]/30 shadow-md"
                        : "border-transparent hover:border-gray-300"
                    } ${isDeleting ? "opacity-40 pointer-events-none" : ""}`}
                  >
                    <Image
                      src={item.url}
                      alt={item.alt_text || item.filename}
                      fill
                      className="object-cover"
                    />

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={(e) => handleDeleteMedia(item.id, e)}
                      title="Delete Image"
                      className="absolute top-2 left-2 bg-red-600/90 hover:bg-red-600 text-white p-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-[#B38E46] text-white p-1 rounded-full shadow">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1.5 text-[10px] text-white truncate opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.original_filename}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedMedia}
            className="px-6 py-2 text-xs font-semibold bg-[#B38E46] text-white rounded-xl hover:bg-[#967536] disabled:opacity-50 transition-colors shadow-sm"
          >
            Select Image
          </button>
        </div>
      </div>
    </div>
  );
}

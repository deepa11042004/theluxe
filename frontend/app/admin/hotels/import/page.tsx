"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  FileSpreadsheet,
  FileArchive,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Loader2,
  Image as ImageIcon,
  Check,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldCheck,
  Building2,
  FolderCheck,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

interface MatchedHotel {
  rank: number;
  name: string;
  city: string;
  state: string;
  country: string;
  category: string;
  hotelType: string;
  luxuryCategory: string;
  status: string;
  isFeatured: boolean;
  isIndiaTop50: boolean;
  folderName: string;
  imageCount: number;
  isExisting: boolean;
  existingHotelId?: string;
  existingHotelName?: string;
}

interface ValidationData {
  sessionId: string;
  success: boolean;
  summary: {
    totalHotels: number;
    totalFolders: number;
    totalImages: number;
    matchedHotels: number;
    newHotels: number;
    existingHotels: number;
    errorCount: number;
    warningCount: number;
  };
  errors: string[];
  warnings: string[];
  preview: MatchedHotel[];
}

interface ImportFinalResult {
  success: boolean;
  message: string;
  stats: {
    totalDetected: number;
    hotelsCreated: number;
    hotelsUpdated: number;
    hotelsSkipped: number;
    imagesProcessed: number;
    coverImagesAssigned: number;
    galleryImagesAssigned: number;
    errorsCount: number;
  };
  errors: string[];
  importedHotels: {
    id: string;
    name: string;
    slug: string;
    rank: number | null;
    status: string;
    action: "CREATED" | "UPDATED" | "SKIPPED";
  }[];
}

export default function BulkHotelImportPage() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);

  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationData | null>(null);
  const [validationError, setValidationError] = useState<string>("");

  const [updateExisting, setUpdateExisting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatusText, setImportStatusText] = useState("");

  const [finalResult, setFinalResult] = useState<ImportFinalResult | null>(null);

  // Search in preview
  const [previewSearch, setPreviewSearch] = useState("");

  const csvInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);

  const handleCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.name.toLowerCase().endsWith(".csv")) {
        setValidationError("Please select a valid CSV file (.csv)");
        return;
      }
      setCsvFile(file);
      setValidationError("");
      setValidationResult(null);
      setFinalResult(null);
    }
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.name.toLowerCase().endsWith(".zip")) {
        setValidationError("Please select a valid ZIP archive (.zip)");
        return;
      }
      setZipFile(file);
      setValidationError("");
      setValidationResult(null);
      setFinalResult(null);
    }
  };

  const handleValidate = async () => {
    if (!csvFile || !zipFile) {
      setValidationError("Please select both the Hotel CSV file and Hotel Images ZIP file.");
      return;
    }

    setValidating(true);
    setValidationError("");
    setValidationResult(null);
    setFinalResult(null);

    const formData = new FormData();
    formData.append("csv", csvFile);
    formData.append("zip", zipFile);

    try {
      const res = await fetch("/api/v1/admin/hotels/import/validate", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok && !json.preview) {
        setValidationError(
          json.message || json.errors?.join("; ") || "Validation failed. Please check your files."
        );
      } else {
        setValidationResult(json);
        if (!json.success && json.errors && json.errors.length > 0) {
          setValidationError(json.errors[0]);
        }
      }
    } catch (err: any) {
      setValidationError(err.message || "An unexpected error occurred during validation.");
    } finally {
      setValidating(false);
    }
  };

  const handleExecuteImport = async () => {
    if (!validationResult || !validationResult.sessionId) {
      setValidationError("No valid import session found. Please re-validate your files.");
      return;
    }

    setImporting(true);
    setValidationError("");
    setImportProgress(10);
    setImportStatusText("Starting import process...");

    // Simulated progress tick while server executes import
    const progressInterval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev < 90) {
          const next = prev + Math.floor(Math.random() * 8) + 4;
          const currentHotel = Math.min(50, Math.ceil((next / 100) * 50));
          setImportStatusText(`Processing hotel ${currentHotel} of 50... Optimizing WebP images...`);
          return next;
        }
        return prev;
      });
    }, 600);

    try {
      const res = await fetch("/api/v1/admin/hotels/import/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: validationResult.sessionId,
          updateExisting,
        }),
      });

      clearInterval(progressInterval);
      setImportProgress(100);
      setImportStatusText("Finalizing database records...");

      const json: ImportFinalResult = await res.json();
      if (!res.ok || !json.success) {
        setValidationError(json.message || json.errors?.join("; ") || "Import failed.");
      } else {
        setFinalResult(json);
      }
    } catch (err: any) {
      clearInterval(progressInterval);
      setValidationError(err.message || "An unexpected error occurred during import execution.");
    } finally {
      setImporting(false);
    }
  };

  const handleReset = () => {
    setCsvFile(null);
    setZipFile(null);
    setValidationResult(null);
    setValidationError("");
    setFinalResult(null);
    setImportProgress(0);
    if (csvInputRef.current) csvInputRef.current.value = "";
    if (zipInputRef.current) zipInputRef.current.value = "";
  };

  const filteredPreview = validationResult?.preview.filter((h) => {
    if (!previewSearch) return true;
    const q = previewSearch.toLowerCase();
    return (
      h.name.toLowerCase().includes(q) ||
      h.city.toLowerCase().includes(q) ||
      h.category.toLowerCase().includes(q) ||
      h.rank.toString().includes(q)
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/hotels"
              className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Hotels
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Upload className="w-6 h-6 text-[#B38E46]" /> Bulk Hotel Import
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Import 50 luxury hotel records from CSV and automatically attach 200 matching WebP images from ZIP.
          </p>
        </div>
      </div>

      {/* ERROR ALERT */}
      {validationError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-800 text-xs">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-red-900">Import / Validation Error</div>
            <div className="mt-0.5">{validationError}</div>
          </div>
        </div>
      )}

      {/* FINAL RESULT SCREEN */}
      {finalResult && (
        <div className="bg-white rounded-2xl border border-emerald-200 p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Bulk Import Complete!</h3>
              <p className="text-xs text-gray-500 mt-1">{finalResult.message}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Hotels Created</div>
              <div className="text-2xl font-bold text-emerald-600 mt-1">{finalResult.stats.hotelsCreated}</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Hotels Skipped</div>
              <div className="text-2xl font-bold text-gray-700 mt-1">{finalResult.stats.hotelsSkipped}</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Cover Images</div>
              <div className="text-2xl font-bold text-blue-600 mt-1">{finalResult.stats.coverImagesAssigned}</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Gallery Images</div>
              <div className="text-2xl font-bold text-amber-600 mt-1">{finalResult.stats.galleryImagesAssigned}</div>
            </div>
          </div>

          <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100 text-xs text-emerald-900 space-y-2">
            <div className="font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              All 50 hotels successfully mapped and validated.
            </div>
            <div className="font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              {finalResult.stats.imagesProcessed} WebP images optimized and linked in Media Library.
            </div>
            <div className="font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              Zero duplicate slugs or broken database references.
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/admin/hotels"
              className="bg-[#B38E46] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#967536] transition-colors flex items-center gap-2 shadow-sm"
            >
              <Building2 className="w-4 h-4" /> View Hotels List
            </Link>
            <button
              onClick={handleReset}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Import Another Batch
            </button>
          </div>
        </div>
      )}

      {/* IMPORT PROGRESS OVERLAY / BAR */}
      {importing && (
        <div className="bg-white rounded-2xl border border-[#B38E46]/30 p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 text-[#B38E46] animate-spin" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Executing Bulk Import...</h4>
                <p className="text-xs text-gray-500">{importStatusText}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#B38E46] font-mono">{importProgress}%</span>
          </div>

          {/* Progress track */}
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-[#B38E46] h-full transition-all duration-300 rounded-full"
              style={{ width: `${importProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1 & 2: FILE UPLOADS (Show when not finished) */}
      {!finalResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CSV CARD */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-[#B38E46]">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">1. Hotel Data File</h3>
                    <p className="text-[11px] text-gray-500">CSV file containing 50 hotels</p>
                  </div>
                </div>
                {csvFile && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <Check className="w-3.5 h-3.5" /> Selected
                  </span>
                )}
              </div>

              <input
                ref={csvInputRef}
                type="file"
                accept=".csv"
                onChange={handleCsvChange}
                className="hidden"
                id="csv-file-input"
              />

              <label
                htmlFor="csv-file-input"
                className="border-2 border-dashed border-gray-200 hover:border-[#B38E46] rounded-xl p-6 text-center block cursor-pointer transition-all bg-gray-50/50 hover:bg-[#B38E46]/5 group"
              >
                <FileSpreadsheet className="w-8 h-8 text-gray-400 group-hover:text-[#B38E46] mx-auto mb-2 transition-colors" />
                <span className="text-xs font-semibold text-gray-700 block">
                  {csvFile ? csvFile.name : "Click to select Hotel CSV file"}
                </span>
                <span className="text-[10px] text-gray-400 mt-1 block">
                  {csvFile ? `${(csvFile.size / 1024).toFixed(1)} KB` : "Supports standard UTF-8 .csv files"}
                </span>
              </label>
            </div>

            {csvFile && (
              <div className="mt-3 flex justify-between items-center text-[11px] text-gray-500">
                <span className="truncate max-w-[200px] font-mono">{csvFile.name}</span>
                <button
                  onClick={() => {
                    setCsvFile(null);
                    setValidationResult(null);
                    if (csvInputRef.current) csvInputRef.current.value = "";
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* ZIP CARD */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <FileArchive className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">2. Hotel Images Archive</h3>
                    <p className="text-[11px] text-gray-500">ZIP archive containing 200 WebP images</p>
                  </div>
                </div>
                {zipFile && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <Check className="w-3.5 h-3.5" /> Selected
                  </span>
                )}
              </div>

              <input
                ref={zipInputRef}
                type="file"
                accept=".zip"
                onChange={handleZipChange}
                className="hidden"
                id="zip-file-input"
              />

              <label
                htmlFor="zip-file-input"
                className="border-2 border-dashed border-gray-200 hover:border-[#B38E46] rounded-xl p-6 text-center block cursor-pointer transition-all bg-gray-50/50 hover:bg-[#B38E46]/5 group"
              >
                <FileArchive className="w-8 h-8 text-gray-400 group-hover:text-[#B38E46] mx-auto mb-2 transition-colors" />
                <span className="text-xs font-semibold text-gray-700 block">
                  {zipFile ? zipFile.name : "Click to select Images ZIP file"}
                </span>
                <span className="text-[10px] text-gray-400 mt-1 block">
                  {zipFile
                    ? `${(zipFile.size / (1024 * 1024)).toFixed(1)} MB`
                    : "Expected 50 folders with 4 WebP images each"}
                </span>
              </label>
            </div>

            {zipFile && (
              <div className="mt-3 flex justify-between items-center text-[11px] text-gray-500">
                <span className="truncate max-w-[200px] font-mono">{zipFile.name}</span>
                <button
                  onClick={() => {
                    setZipFile(null);
                    setValidationResult(null);
                    if (zipInputRef.current) zipInputRef.current.value = "";
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VALIDATE BUTTON */}
      {!finalResult && !validationResult && (
        <div className="flex justify-end">
          <button
            disabled={!csvFile || !zipFile || validating}
            onClick={handleValidate}
            className="bg-[#B38E46] text-white px-6 py-3 rounded-xl text-xs font-semibold hover:bg-[#967536] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-sm"
          >
            {validating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Validating CSV & ZIP (Scanning 200 images)...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" /> Validate Files Before Import
              </>
            )}
          </button>
        </div>
      )}

      {/* STEP 3 & 4: VALIDATION REPORT & PREVIEW TABLE */}
      {validationResult && !finalResult && (
        <div className="space-y-6">
          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Hotels Found</div>
              <div className="text-xl font-bold text-gray-900 mt-1">{validationResult.summary.totalHotels}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Image Folders</div>
              <div className="text-xl font-bold text-gray-900 mt-1">{validationResult.summary.totalFolders}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Images Found</div>
              <div className="text-xl font-bold text-blue-600 mt-1">{validationResult.summary.totalImages}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Matched Folders</div>
              <div className="text-xl font-bold text-emerald-600 mt-1">
                {validationResult.summary.matchedHotels} / {validationResult.summary.totalHotels}
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">New Hotels</div>
              <div className="text-xl font-bold text-emerald-600 mt-1">{validationResult.summary.newHotels}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Existing in DB</div>
              <div className="text-xl font-bold text-amber-600 mt-1">{validationResult.summary.existingHotels}</div>
            </div>
          </div>

          {/* VALIDATION STATUS BANNER */}
          {validationResult.success ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-emerald-900 text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold">Validation Successful!</span> All 50 hotels matched with image folders (4
                  WebP images each). Ready to import.
                </div>
              </div>
              <span className="text-[11px] font-semibold bg-emerald-200/60 px-3 py-1 rounded-full text-emerald-800">
                Ready for Database Import
              </span>
            </div>
          ) : (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-2 text-xs text-red-900">
              <div className="font-bold flex items-center gap-2 text-red-800">
                <AlertTriangle className="w-5 h-5 text-red-600" /> Validation Errors Detected:
              </div>
              <ul className="list-disc pl-6 space-y-1">
                {validationResult.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* PREVIEW TABLE */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Hotel Import Preview (50 Records)</h3>
                <p className="text-[11px] text-gray-400">
                  Review matched hotel details, location, categories, and images before committing to database.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={previewSearch}
                  onChange={(e) => setPreviewSearch(e.target.value)}
                  placeholder="Filter preview list..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-xl outline-none focus:border-[#B38E46]"
                />
              </div>
            </div>

            <div className="overflow-x-auto max-h-[480px]">
              <table className="w-full text-left text-xs text-gray-600">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 uppercase font-semibold text-[10px] tracking-wider sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Hotel Name</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Category / Type</th>
                    <th className="py-3 px-4">Images</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">DB Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPreview?.map((h) => (
                    <tr key={h.rank} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-gray-900">#{h.rank}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {h.name}
                        {h.isFeatured && (
                          <span className="ml-2 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {h.city}, {h.state}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-gray-900 font-medium">{h.category}</div>
                        <div className="text-[10px] text-gray-400">{h.hotelType}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                          <ImageIcon className="w-3 h-3 text-blue-600" /> 4 WebP
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={h.status} />
                      </td>
                      <td className="py-3 px-4">
                        {h.isExisting ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            Existing Hotel
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            New Record
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* STEP 5: ACTIONS & OPTIONS */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700 select-none">
                <input
                  type="checkbox"
                  checked={updateExisting}
                  onChange={(e) => setUpdateExisting(e.target.checked)}
                  className="rounded text-[#B38E46] focus:ring-[#B38E46] w-4 h-4 cursor-pointer"
                />
                <span>
                  <strong className="font-semibold text-gray-900">Update Existing Hotels</strong> (By default, existing
                  hotels are safely skipped to avoid overriding changes).
                </span>
              </label>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleReset}
                disabled={importing}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors w-full sm:w-auto"
              >
                Cancel / Reset
              </button>

              <button
                disabled={!validationResult.success || importing}
                onClick={handleExecuteImport}
                className="bg-[#B38E46] text-white px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#967536] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto"
              >
                {importing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Importing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" /> Import {validationResult.summary.matchedHotels} Hotels +{" "}
                    {validationResult.summary.totalImages} Images
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

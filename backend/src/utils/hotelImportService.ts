import fs from "fs";
import path from "path";
import os from "os";
import { parse } from "csv-parse/sync";
import AdmZip from "adm-zip";
import { prisma } from "../config/prisma";
import { slugify } from "./slugify";
import { processAndOptimizeImage } from "../middleware/upload";
import { logAudit } from "./auditLogger";

export interface HotelCsvRow {
  top_hotel_rank: string;
  name: string;
  country: string;
  city_location: string;
  state_region: string;
  category: string;
  hotel_type: string;
  luxury_category: string;
  short_description: string;
  description: string;
  official_website: string;
  booking_url: string;
  google_maps_url: string;
  best_time_to_visit: string;
  highlights: string;
  amenities: string;
  dining_information: string;
  spa_wellness: string;
  activities: string;
  why_we_recommend: string;
  is_featured: string;
  is_popular: string;
  is_international_top_50: string;
  is_top_hotel: string;
  is_india_top_50: string;
  display_order: string;
  status: string;
}

export interface MatchedHotelPreview {
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
  images: {
    cover: string;
    gallery1: string;
    gallery2: string;
    gallery3: string;
  };
  isExisting: boolean;
  existingHotelId?: string;
  existingHotelName?: string;
}

export interface ValidationResult {
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
  preview: MatchedHotelPreview[];
}

export interface ImportResult {
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

interface StagedHotelData {
  csvRow: HotelCsvRow;
  rank: number;
  folderName: string;
  isExisting: boolean;
  existingHotelId?: string;
  imageFiles: {
    cover: string;
    gallery1: string;
    gallery2: string;
    gallery3: string;
  };
}

interface StagedSession {
  sessionId: string;
  stageDir: string;
  hotels: StagedHotelData[];
  createdAt: number;
}

// In-memory registry for staged import sessions with TTL
const stagedSessions = new Map<string, StagedSession>();

const SESSION_TTL_MS = 60 * 60 * 1000; // 1 hour

// Periodically clean expired sessions
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, session] of stagedSessions.entries()) {
    if (now - session.createdAt > SESSION_TTL_MS) {
      cleanupSession(sessionId);
    }
  }
}, 10 * 60 * 1000);

export function cleanupSession(sessionId: string) {
  const session = stagedSessions.get(sessionId);
  if (session) {
    try {
      if (fs.existsSync(session.stageDir)) {
        fs.rmSync(session.stageDir, { recursive: true, force: true });
      }
    } catch (err) {
      console.error(`Failed to clean stage directory for session ${sessionId}:`, err);
    }
    stagedSessions.delete(sessionId);
  }
}

/**
 * Normalizes a string for comparison (removes accents/diacritics, punctuation, extra spaces).
 */
export function normalizeText(text: string): string {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics like in SUJÁN -> SUJAN
    .toLowerCase()
    .replace(/[^a-z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Validates uploaded CSV and ZIP files.
 */
export async function validateImportFiles(
  csvBuffer: Buffer,
  zipBuffer: Buffer
): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const sessionId = `import-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  const stageDir = path.join(os.tmpdir(), "theluxe-bulk-import", sessionId);

  fs.mkdirSync(stageDir, { recursive: true });

  // 1. Parse CSV
  let csvRecords: HotelCsvRow[] = [];
  try {
    const csvContent = csvBuffer.toString("utf8");
    const rawRecords = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    }) as any[];

    csvRecords = rawRecords.filter((r) => r.name && r.name.trim() !== "");
  } catch (err: any) {
    cleanupSession(sessionId);
    return {
      sessionId: "",
      success: false,
      summary: {
        totalHotels: 0,
        totalFolders: 0,
        totalImages: 0,
        matchedHotels: 0,
        newHotels: 0,
        existingHotels: 0,
        errorCount: 1,
        warningCount: 0,
      },
      errors: [`Invalid CSV file format: ${err.message}`],
      warnings: [],
      preview: [],
    };
  }

  if (csvRecords.length === 0) {
    cleanupSession(sessionId);
    return {
      sessionId: "",
      success: false,
      summary: {
        totalHotels: 0,
        totalFolders: 0,
        totalImages: 0,
        matchedHotels: 0,
        newHotels: 0,
        existingHotels: 0,
        errorCount: 1,
        warningCount: 0,
      },
      errors: ["The uploaded CSV contains no valid hotel records."],
      warnings: [],
      preview: [],
    };
  }

  // 2. Validate and Extract ZIP Archive
  let zip: AdmZip;
  try {
    zip = new AdmZip(zipBuffer);
  } catch (err: any) {
    cleanupSession(sessionId);
    return {
      sessionId: "",
      success: false,
      summary: {
        totalHotels: csvRecords.length,
        totalFolders: 0,
        totalImages: 0,
        matchedHotels: 0,
        newHotels: 0,
        existingHotels: 0,
        errorCount: 1,
        warningCount: 0,
      },
      errors: [`Invalid ZIP archive: ${err.message}`],
      warnings: [],
      preview: [],
    };
  }

  const zipEntries = zip.getEntries();
  const folderMap = new Map<
    string,
    {
      folderName: string;
      rank: number;
      normalizedName: string;
      files: Map<string, { entryName: string; getData: () => Buffer }>;
    }
  >();

  let totalImagesFound = 0;

  for (const entry of zipEntries) {
    // Check for path traversal attacks
    if (entry.entryName.includes("..") || path.isAbsolute(entry.entryName)) {
      errors.push(`Security error: Malicious path traversal detected in ZIP entry '${entry.entryName}'`);
      continue;
    }

    if (entry.isDirectory) {
      continue;
    }

    const normalizedPath = entry.entryName.replace(/\\/g, "/");
    const parts = normalizedPath.split("/").filter(Boolean);
    const fileName = parts[parts.length - 1];
    const parentFolder = parts.length >= 2 ? parts[parts.length - 2] : "";

    // Ignore system files like .DS_Store or Thumbs.db
    if (fileName.startsWith(".") || fileName.toLowerCase() === "thumbs.db") {
      continue;
    }

    // Check file extension
    const ext = path.extname(fileName).toLowerCase();
    if (ext !== ".webp") {
      errors.push(`Unsupported file '${entry.entryName}'. Only WebP images (.webp) are allowed.`);
      continue;
    }

    totalImagesFound++;

    // Locate hotel folder with numeric prefix (e.g., "01 Aman-i-Khas")
    const match = parentFolder.match(/^(\d+)\s*(.*)$/);
    if (!match) {
      errors.push(`Image '${entry.entryName}' is in folder '${parentFolder}', which does not have the expected numeric rank prefix (e.g. '01 Hotel Name').`);
      continue;
    }

    const folderRank = parseInt(match[1], 10);
    const folderHotelName = match[2].trim();
    const folderKey = `rank-${folderRank}`;

    if (!folderMap.has(folderKey)) {
      folderMap.set(folderKey, {
        folderName: parentFolder,
        rank: folderRank,
        normalizedName: normalizeText(folderHotelName),
        files: new Map(),
      });
    }

    const folderData = folderMap.get(folderKey)!;
    folderData.files.set(fileName.toLowerCase(), {
      entryName: entry.entryName,
      getData: () => entry.getData(),
    });
  }

  // 3. Match CSV Rows with ZIP Folders
  const expectedImageNames = ["cover.webp", "01.webp", "02.webp", "03.webp"];
  const stagedHotels: StagedHotelData[] = [];
  const previewList: MatchedHotelPreview[] = [];

  // Query existing DB hotels to flag duplicates
  const existingHotelsInDb = await prisma.hotel.findMany({
    where: { deleted_at: null },
    select: { id: true, name: true, slug: true, top_hotel_rank: true },
  });

  const existingSlugMap = new Map<string, { id: string; name: string }>();
  const existingNameMap = new Map<string, { id: string; name: string }>();
  const existingRankMap = new Map<number, { id: string; name: string }>();

  for (const h of existingHotelsInDb) {
    if (h.slug) existingSlugMap.set(h.slug, { id: h.id, name: h.name });
    if (h.name) existingNameMap.set(normalizeText(h.name), { id: h.id, name: h.name });
    if (h.top_hotel_rank) existingRankMap.set(h.top_hotel_rank, { id: h.id, name: h.name });
  }

  let newHotelsCount = 0;
  let existingHotelsCount = 0;
  const processedRanks = new Set<number>();

  for (const row of csvRecords) {
    const rank = parseInt(row.top_hotel_rank, 10);
    if (isNaN(rank)) {
      errors.push(`CSV Row for hotel '${row.name}' has an invalid or missing top_hotel_rank ('${row.top_hotel_rank}').`);
      continue;
    }

    if (processedRanks.has(rank)) {
      errors.push(`Duplicate top_hotel_rank ${rank} found in CSV for hotel '${row.name}'.`);
      continue;
    }
    processedRanks.add(rank);

    const folderKey = `rank-${rank}`;
    const folderData = folderMap.get(folderKey);

    if (!folderData) {
      errors.push(`Missing image folder for rank ${rank} ("${row.name}"). Expected a ZIP folder starting with '${String(rank).padStart(2, "0")}'.`);
      continue;
    }

    // Validate normalized name between CSV and folder
    const csvNormalizedName = normalizeText(row.name);
    const folderNormalizedName = folderData.normalizedName;

    // Check if the names match (or one contains the other)
    const namesMatch =
      csvNormalizedName === folderNormalizedName ||
      csvNormalizedName.includes(folderNormalizedName) ||
      folderNormalizedName.includes(csvNormalizedName);

    if (!namesMatch) {
      errors.push(
        `Rank/Name mismatch for rank ${rank}: CSV specifies "${row.name}", but ZIP folder is "${folderData.folderName}".`
      );
      continue;
    }

    // Validate images in folder
    const missingImages: string[] = [];
    for (const imgName of expectedImageNames) {
      if (!folderData.files.has(imgName)) {
        missingImages.push(imgName);
      }
    }

    if (missingImages.length > 0) {
      errors.push(
        `Missing image(s) in folder '${folderData.folderName}': ${missingImages.join(", ")}. Expected all 4 images: ${expectedImageNames.join(", ")}.`
      );
      continue;
    }

    // Check for unexpected extra files in folder
    const extraFiles: string[] = [];
    for (const [fileName] of folderData.files.entries()) {
      if (!expectedImageNames.includes(fileName)) {
        extraFiles.push(fileName);
      }
    }
    if (extraFiles.length > 0) {
      errors.push(
        `Extra unexpected image(s) in folder '${folderData.folderName}': ${extraFiles.join(", ")}.`
      );
      continue;
    }

    // Check if hotel already exists in DB
    const slug = slugify(row.name);
    let isExisting = false;
    let existingHotelInfo: { id: string; name: string } | undefined = undefined;

    if (existingSlugMap.has(slug)) {
      isExisting = true;
      existingHotelInfo = existingSlugMap.get(slug);
    } else if (existingNameMap.has(csvNormalizedName)) {
      isExisting = true;
      existingHotelInfo = existingNameMap.get(csvNormalizedName);
    } else if (existingRankMap.has(rank)) {
      isExisting = true;
      existingHotelInfo = existingRankMap.get(rank);
    }

    if (isExisting) {
      existingHotelsCount++;
    } else {
      newHotelsCount++;
    }

    // Extract images to temporary stage directory
    const hotelStageDir = path.join(stageDir, `hotel_${rank}`);
    fs.mkdirSync(hotelStageDir, { recursive: true });

    const savedImages = {
      cover: path.join(hotelStageDir, "cover.webp"),
      gallery1: path.join(hotelStageDir, "01.webp"),
      gallery2: path.join(hotelStageDir, "02.webp"),
      gallery3: path.join(hotelStageDir, "03.webp"),
    };

    fs.writeFileSync(savedImages.cover, folderData.files.get("cover.webp")!.getData());
    fs.writeFileSync(savedImages.gallery1, folderData.files.get("01.webp")!.getData());
    fs.writeFileSync(savedImages.gallery2, folderData.files.get("02.webp")!.getData());
    fs.writeFileSync(savedImages.gallery3, folderData.files.get("03.webp")!.getData());

    stagedHotels.push({
      csvRow: row,
      rank,
      folderName: folderData.folderName,
      isExisting,
      existingHotelId: existingHotelInfo?.id,
      imageFiles: savedImages,
    });

    previewList.push({
      rank,
      name: row.name,
      city: row.city_location,
      state: row.state_region,
      country: row.country || "India",
      category: row.category || row.hotel_type || "Luxury Hotel",
      hotelType: row.hotel_type,
      luxuryCategory: row.luxury_category,
      status: row.status ? row.status.toUpperCase() : "PUBLISHED",
      isFeatured: row.is_featured?.toUpperCase() === "TRUE" || row.is_featured === "1",
      isIndiaTop50: row.is_india_top_50?.toUpperCase() === "TRUE" || row.is_india_top_50 === "1",
      folderName: folderData.folderName,
      imageCount: 4,
      images: {
        cover: "cover.webp",
        gallery1: "01.webp",
        gallery2: "02.webp",
        gallery3: "03.webp",
      },
      isExisting,
      existingHotelId: existingHotelInfo?.id,
      existingHotelName: existingHotelInfo?.name,
    });
  }

  // Check if any ZIP folders did not match any CSV row
  for (const [folderKey, folderData] of folderMap.entries()) {
    if (!processedRanks.has(folderData.rank)) {
      errors.push(`ZIP folder '${folderData.folderName}' (Rank ${folderData.rank}) has no matching record in the CSV.`);
    }
  }

  // Sort preview list by rank
  previewList.sort((a, b) => a.rank - b.rank);
  stagedHotels.sort((a, b) => a.rank - b.rank);

  const isValid = errors.length === 0;

  if (isValid) {
    // Store staged session
    stagedSessions.set(sessionId, {
      sessionId,
      stageDir,
      hotels: stagedHotels,
      createdAt: Date.now(),
    });
  } else {
    // Clean up temporary stage dir if validation failed
    cleanupSession(sessionId);
  }

  return {
    sessionId: isValid ? sessionId : "",
    success: isValid,
    summary: {
      totalHotels: csvRecords.length,
      totalFolders: folderMap.size,
      totalImages: totalImagesFound,
      matchedHotels: stagedHotels.length,
      newHotels: newHotelsCount,
      existingHotels: existingHotelsCount,
      errorCount: errors.length,
      warningCount: warnings.length,
    },
    errors,
    warnings,
    preview: previewList,
  };
}

/**
 * Executes the bulk import using a validated staged session.
 */
export async function executeImport(
  sessionId: string,
  options: { updateExisting?: boolean } = {},
  userId?: string
): Promise<ImportResult> {
  const session = stagedSessions.get(sessionId);
  if (!session) {
    return {
      success: false,
      message: "Import session expired or not found. Please upload and validate the files again.",
      stats: {
        totalDetected: 0,
        hotelsCreated: 0,
        hotelsUpdated: 0,
        hotelsSkipped: 0,
        imagesProcessed: 0,
        coverImagesAssigned: 0,
        galleryImagesAssigned: 0,
        errorsCount: 1,
      },
      errors: ["Session not found."],
      importedHotels: [],
    };
  }

  const { updateExisting = false } = options;
  const errors: string[] = [];
  const importedHotels: ImportResult["importedHotels"] = [];

  let hotelsCreated = 0;
  let hotelsUpdated = 0;
  let hotelsSkipped = 0;
  let imagesProcessed = 0;
  let coverImagesAssigned = 0;
  let galleryImagesAssigned = 0;

  try {
    for (const staged of session.hotels) {
      const row = staged.csvRow;
      const rank = staged.rank;
      const slug = slugify(row.name);

      // Check current DB existence
      let existing = await prisma.hotel.findFirst({
        where: {
          OR: [
            { slug },
            { name: row.name },
            { top_hotel_rank: rank },
          ],
          deleted_at: null,
        },
        include: { images: true },
      });

      if (existing && !updateExisting) {
        hotelsSkipped++;
        importedHotels.push({
          id: existing.id,
          name: existing.name,
          slug: existing.slug,
          rank: existing.top_hotel_rank,
          status: existing.status,
          action: "SKIPPED",
        });
        continue;
      }

      // Read image buffers
      const coverBuf = fs.readFileSync(staged.imageFiles.cover);
      const g1Buf = fs.readFileSync(staged.imageFiles.gallery1);
      const g2Buf = fs.readFileSync(staged.imageFiles.gallery2);
      const g3Buf = fs.readFileSync(staged.imageFiles.gallery3);

      // Process and optimize images
      const [optCover, optG1, optG2, optG3] = await Promise.all([
        processAndOptimizeImage(coverBuf, `${slug}-cover.webp`, "hotels"),
        processAndOptimizeImage(g1Buf, `${slug}-01.webp`, "hotels"),
        processAndOptimizeImage(g2Buf, `${slug}-02.webp`, "hotels"),
        processAndOptimizeImage(g3Buf, `${slug}-03.webp`, "hotels"),
      ]);

      imagesProcessed += 4;
      coverImagesAssigned += 1;
      galleryImagesAssigned += 3;

      // Create Media records
      const mediaList = await Promise.all([
        prisma.media.create({
          data: {
            original_filename: "cover.webp",
            filename: optCover.filename,
            url: optCover.url,
            mime_type: "image/webp",
            file_size: optCover.fileSize,
            width: optCover.width,
            height: optCover.height,
            alt_text: `${row.name} - Luxury Hotel in ${row.city_location || "India"}`,
            caption: row.name,
            folder: "hotels",
            created_by: userId,
          },
        }),
        prisma.media.create({
          data: {
            original_filename: "01.webp",
            filename: optG1.filename,
            url: optG1.url,
            mime_type: "image/webp",
            file_size: optG1.fileSize,
            width: optG1.width,
            height: optG1.height,
            alt_text: `${row.name} - Gallery Image 1`,
            caption: "",
            folder: "hotels",
            created_by: userId,
          },
        }),
        prisma.media.create({
          data: {
            original_filename: "02.webp",
            filename: optG2.filename,
            url: optG2.url,
            mime_type: "image/webp",
            file_size: optG2.fileSize,
            width: optG2.width,
            height: optG2.height,
            alt_text: `${row.name} - Gallery Image 2`,
            caption: "",
            folder: "hotels",
            created_by: userId,
          },
        }),
        prisma.media.create({
          data: {
            original_filename: "03.webp",
            filename: optG3.filename,
            url: optG3.url,
            mime_type: "image/webp",
            file_size: optG3.fileSize,
            width: optG3.width,
            height: optG3.height,
            alt_text: `${row.name} - Gallery Image 3`,
            caption: "",
            folder: "hotels",
            created_by: userId,
          },
        }),
      ]);

      const status = row.status?.toUpperCase() || "PUBLISHED";
      const isFeatured = row.is_featured?.toUpperCase() === "TRUE" || row.is_featured === "1";
      const isPopular = row.is_popular?.toUpperCase() === "TRUE" || row.is_popular === "1";
      const isIndiaTop50 = row.is_india_top_50?.toUpperCase() === "TRUE" || row.is_india_top_50 === "1";
      const isInternationalTop50 =
        row.is_international_top_50?.toUpperCase() === "TRUE" || row.is_international_top_50 === "1";
      const isTopHotel =
        row.is_top_hotel?.toUpperCase() === "TRUE" || row.is_top_hotel === "1" || isIndiaTop50;
      const displayOrder = parseInt(row.display_order, 10) || rank || 0;

      const hotelDataPayload = {
        name: row.name,
        slug,
        short_description: row.short_description || null,
        description: row.description || null,
        region: row.state_region || null,
        country: row.country || "India",
        state_province: row.state_region || null,
        city: row.city_location || null,
        location_area: row.city_location || null,
        hotel_type: row.hotel_type || row.category || null,
        luxury_category: row.luxury_category || null,
        official_website: row.official_website || null,
        booking_url: row.booking_url || null,
        google_maps_url: row.google_maps_url || null,
        best_time_to_visit: row.best_time_to_visit || null,
        highlights: row.highlights || null,
        amenities: row.amenities || null,
        dining_information: row.dining_information || null,
        spa_wellness: row.spa_wellness || null,
        activities: row.activities || null,
        why_we_recommend: row.why_we_recommend || null,
        is_featured: isFeatured,
        is_popular: isPopular,
        is_top_hotel: isTopHotel,
        top_hotel_rank: rank,
        is_india_top_50: isIndiaTop50,
        is_international_top_50: isInternationalTop50,
        display_order: displayOrder,
        status,
        published_at: status === "PUBLISHED" ? new Date() : null,
      };

      const imagesToCreate = [
        {
          media_id: mediaList[0].id,
          image_url: optCover.url,
          alt_text: mediaList[0].alt_text,
          caption: mediaList[0].caption,
          image_type: "cover",
          display_order: 1,
          is_primary: true,
        },
        {
          media_id: mediaList[1].id,
          image_url: optG1.url,
          alt_text: mediaList[1].alt_text,
          caption: mediaList[1].caption,
          image_type: "gallery",
          display_order: 2,
          is_primary: false,
        },
        {
          media_id: mediaList[2].id,
          image_url: optG2.url,
          alt_text: mediaList[2].alt_text,
          caption: mediaList[2].caption,
          image_type: "gallery",
          display_order: 3,
          is_primary: false,
        },
        {
          media_id: mediaList[3].id,
          image_url: optG3.url,
          alt_text: mediaList[3].alt_text,
          caption: mediaList[3].caption,
          image_type: "gallery",
          display_order: 4,
          is_primary: false,
        },
      ];

      if (existing && updateExisting) {
        // Delete previous images and re-attach
        await prisma.hotelImage.deleteMany({
          where: { hotel_id: existing.id },
        });

        const updatedHotel = await prisma.hotel.update({
          where: { id: existing.id },
          data: {
            ...hotelDataPayload,
            updated_by: userId,
            images: {
              create: imagesToCreate,
            },
          },
        });

        hotelsUpdated++;
        importedHotels.push({
          id: updatedHotel.id,
          name: updatedHotel.name,
          slug: updatedHotel.slug,
          rank: updatedHotel.top_hotel_rank,
          status: updatedHotel.status,
          action: "UPDATED",
        });
      } else {
        // Create new hotel
        const createdHotel = await prisma.hotel.create({
          data: {
            ...hotelDataPayload,
            created_by: userId,
            images: {
              create: imagesToCreate,
            },
          },
        });

        hotelsCreated++;
        importedHotels.push({
          id: createdHotel.id,
          name: createdHotel.name,
          slug: createdHotel.slug,
          rank: createdHotel.top_hotel_rank,
          status: createdHotel.status,
          action: "CREATED",
        });
      }
    }

    // Log audit
    await logAudit({
      userId,
      action: "CREATE",
      entity: "BulkHotelImport",
      newData: {
        totalDetected: session.hotels.length,
        hotelsCreated,
        hotelsUpdated,
        hotelsSkipped,
        imagesProcessed,
      },
    });

    // Cleanup session stage dir
    cleanupSession(sessionId);

    return {
      success: true,
      message: `Successfully processed ${session.hotels.length} hotels (${hotelsCreated} created, ${hotelsUpdated} updated, ${hotelsSkipped} skipped) and ${imagesProcessed} images.`,
      stats: {
        totalDetected: session.hotels.length,
        hotelsCreated,
        hotelsUpdated,
        hotelsSkipped,
        imagesProcessed,
        coverImagesAssigned,
        galleryImagesAssigned,
        errorsCount: errors.length,
      },
      errors,
      importedHotels,
    };
  } catch (err: any) {
    cleanupSession(sessionId);
    return {
      success: false,
      message: `Bulk import failed during execution: ${err.message}`,
      stats: {
        totalDetected: session.hotels.length,
        hotelsCreated,
        hotelsUpdated,
        hotelsSkipped,
        imagesProcessed,
        coverImagesAssigned,
        galleryImagesAssigned,
        errorsCount: errors.length + 1,
      },
      errors: [...errors, err.message],
      importedHotels,
    };
  }
}

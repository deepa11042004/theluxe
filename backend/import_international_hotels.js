const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const sharp = require('sharp');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

async function runImport() {
  console.log("=== STARTING IMPORT OF TOP 50 INTERNATIONAL LUXURY HOTELS ===");

  // 1. Fix any Indian hotels that might have had is_international_top_50 mistakenly set to true
  const updatedIndiaHotels = await prisma.hotel.updateMany({
    where: {
      OR: [
        { country: "India" },
        { is_india_top_50: true }
      ]
    },
    data: {
      is_india_top_50: true,
      is_international_top_50: false,
    }
  });
  console.log(`Verified ${updatedIndiaHotels.count} Indian hotels set to is_india_top_50=true, is_international_top_50=false.`);

  // 2. Set up uploads directories
  const backendUploads = path.resolve(__dirname, "public/uploads/hotels");
  const frontendUploads = path.resolve(__dirname, "../frontend/public/uploads/hotels");
  if (!fs.existsSync(backendUploads)) fs.mkdirSync(backendUploads, { recursive: true });
  if (!fs.existsSync(frontendUploads)) fs.mkdirSync(frontendUploads, { recursive: true });

  // 3. Read CSV
  const csvPath = path.resolve(__dirname, '../frontend/the_luxe_yatra_top_50_international_luxury_hotels_completed (1) - International Hotels.csv');
  const hotelsDir = path.resolve(__dirname, '../frontend/hotels/Hotels');

  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const rows = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  console.log(`Parsed ${rows.length} rows from International CSV.`);

  // Map folders by rank prefix
  const folders = fs.readdirSync(hotelsDir).filter(f => fs.statSync(path.join(hotelsDir, f)).isDirectory());
  const folderMapByRank = new Map();
  for (const f of folders) {
    const m = f.match(/^(\d+)_/);
    if (m) {
      folderMapByRank.set(parseInt(m[1], 10), f);
    }
  }

  let createdCount = 0;
  let updatedCount = 0;

  for (const row of rows) {
    const rank = parseInt(row.top_hotel_rank, 10);
    const folderName = folderMapByRank.get(rank);
    if (!folderName) {
      console.error(`ERROR: No folder found for Rank ${rank}: ${row.name}`);
      continue;
    }

    const hotelFolderPath = path.join(hotelsDir, folderName);
    const slug = slugify(row.name);

    // Image filenames
    const coverSrc = path.join(hotelFolderPath, "cover.webp");
    const g1Src = path.join(hotelFolderPath, "01.webp");
    const g2Src = path.join(hotelFolderPath, "02.webp");
    const g3Src = path.join(hotelFolderPath, "03.webp");

    const imageTargets = [
      { src: coverSrc, type: "cover", baseSuffix: "cover", isPrimary: true, dispOrder: 1 },
      { src: g1Src, type: "gallery", baseSuffix: "01", isPrimary: false, dispOrder: 2 },
      { src: g2Src, type: "gallery", baseSuffix: "02", isPrimary: false, dispOrder: 3 },
      { src: g3Src, type: "gallery", baseSuffix: "03", isPrimary: false, dispOrder: 4 },
    ];

    const processedImages = [];

    for (const item of imageTargets) {
      if (!fs.existsSync(item.src)) {
        console.warn(`Warning: Image not found: ${item.src}`);
        continue;
      }

      const uniqueFileName = `${slug}-${item.baseSuffix}.webp`;
      const backendDest = path.join(backendUploads, uniqueFileName);
      const frontendDest = path.join(frontendUploads, uniqueFileName);

      // Copy image to both destinations
      fs.copyFileSync(item.src, backendDest);
      fs.copyFileSync(item.src, frontendDest);

      const stats = fs.statSync(backendDest);
      let imgMeta = { width: 1200, height: 800 };
      try {
        const sharpMeta = await sharp(item.src).metadata();
        if (sharpMeta.width) imgMeta.width = sharpMeta.width;
        if (sharpMeta.height) imgMeta.height = sharpMeta.height;
      } catch (e) {
        // ignore
      }

      const publicUrl = `/uploads/hotels/${uniqueFileName}`;

      // Media record
      let media = await prisma.media.findFirst({
        where: { filename: uniqueFileName }
      });
      if (!media) {
        media = await prisma.media.create({
          data: {
            original_filename: path.basename(item.src),
            filename: uniqueFileName,
            url: publicUrl,
            mime_type: "image/webp",
            file_size: stats.size,
            width: imgMeta.width,
            height: imgMeta.height,
            alt_text: `${row.name} - ${item.type === "cover" ? "Cover" : "Gallery"} Image`,
            caption: row.name,
            folder: "hotels",
          }
        });
      }

      processedImages.push({
        media_id: media.id,
        image_url: publicUrl,
        alt_text: media.alt_text,
        caption: media.caption,
        image_type: item.type,
        display_order: item.dispOrder,
        is_primary: item.isPrimary,
      });
    }

    const isFeatured = row.is_featured === "TRUE" || row.is_featured === "1";
    const isPopular = row.is_popular === "TRUE" || row.is_popular === "1";
    const displayOrder = parseInt(row.display_order, 10) || rank;

    const hotelData = {
      name: row.name,
      slug,
      short_description: row.short_description || null,
      description: row.description || null,
      region: row.state_region || row.country || null,
      country: row.country || null,
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
      is_top_hotel: true,
      top_hotel_rank: rank,
      is_india_top_50: false,
      is_international_top_50: true,
      display_order: displayOrder,
      status: "PUBLISHED",
      published_at: new Date(),
    };

    // Check if this hotel already exists in DB by slug, or by name + is_international_top_50
    let existingHotel = await prisma.hotel.findFirst({
      where: {
        OR: [
          { slug },
          { name: row.name, is_international_top_50: true },
        ],
        deleted_at: null,
      }
    });

    let savedHotel;
    if (existingHotel) {
      // Delete old images
      await prisma.hotelImage.deleteMany({
        where: { hotel_id: existingHotel.id }
      });

      savedHotel = await prisma.hotel.update({
        where: { id: existingHotel.id },
        data: {
          ...hotelData,
          images: {
            create: processedImages
          }
        }
      });
      updatedCount++;
      console.log(`[UPDATED] Rank ${rank}: "${savedHotel.name}" (${savedHotel.country}) -> Slug: ${savedHotel.slug}`);
    } else {
      savedHotel = await prisma.hotel.create({
        data: {
          ...hotelData,
          images: {
            create: processedImages
          }
        }
      });
      createdCount++;
      console.log(`[CREATED] Rank ${rank}: "${savedHotel.name}" (${savedHotel.country}) -> Slug: ${savedHotel.slug}`);
    }
  }

  console.log("\n=======================================================");
  console.log(`IMPORT COMPLETED SUCCESSFULLY!`);
  console.log(`Created: ${createdCount} hotels`);
  console.log(`Updated: ${updatedCount} hotels`);
  console.log(`Total International Hotels in DB: ${createdCount + updatedCount}`);
  console.log("=======================================================\n");

  const intlCount = await prisma.hotel.count({ where: { is_international_top_50: true, deleted_at: null } });
  const indiaCount = await prisma.hotel.count({ where: { is_india_top_50: true, deleted_at: null } });
  const totalCount = await prisma.hotel.count({ where: { deleted_at: null } });

  console.log(`Current DB Totals -> Total Hotels: ${totalCount}, India Top 50: ${indiaCount}, International Top 50: ${intlCount}`);
}

runImport()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";

const storage = multer.memoryStorage();

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

export const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15 MB limit
  },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPG, JPEG, PNG, WEBP, and AVIF formats are allowed."
        )
      );
    }
  },
});

export async function processAndOptimizeImage(
  buffer: Buffer,
  originalFilename: string,
  folder: string = "general"
) {
  const uploadDir = path.join(
    __dirname,
    "../../../frontend/public/uploads",
    folder
  );
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileExt = path.extname(originalFilename);
  const baseName = path
    .basename(originalFilename, fileExt)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");
  const uniqueName = `${baseName}-${Date.now()}.webp`;
  const filePath = path.join(uploadDir, uniqueName);

  const image = sharp(buffer);
  const metadata = await image.metadata();

  // Convert to WebP with 85 quality compression
  await image.webp({ quality: 85 }).toFile(filePath);

  const publicUrl = `/uploads/${folder}/${uniqueName}`;

  return {
    filename: uniqueName,
    url: publicUrl,
    mimeType: "image/webp",
    fileSize: fs.statSync(filePath).size,
    width: metadata.width || 0,
    height: metadata.height || 0,
  };
}

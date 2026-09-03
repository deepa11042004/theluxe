"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
exports.processAndOptimizeImage = processAndOptimizeImage;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const storage = multer_1.default.memoryStorage();
const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/avif",
];
exports.upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 15 * 1024 * 1024, // 15 MB limit
    },
    fileFilter: (req, file, cb) => {
        if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Invalid file type. Only JPG, JPEG, PNG, WEBP, and AVIF formats are allowed."));
        }
    },
});
async function processAndOptimizeImage(buffer, originalFilename, folder = "general") {
    const uploadDir = path_1.default.join(__dirname, "../../../frontend/public/uploads", folder);
    if (!fs_1.default.existsSync(uploadDir)) {
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
    }
    const fileExt = path_1.default.extname(originalFilename);
    const baseName = path_1.default
        .basename(originalFilename, fileExt)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-");
    const uniqueName = `${baseName}-${Date.now()}.webp`;
    const filePath = path_1.default.join(uploadDir, uniqueName);
    const image = (0, sharp_1.default)(buffer);
    const metadata = await image.metadata();
    // Convert to WebP with 85 quality compression
    await image.webp({ quality: 85 }).toFile(filePath);
    const publicUrl = `/uploads/${folder}/${uniqueName}`;
    return {
        filename: uniqueName,
        url: publicUrl,
        mimeType: "image/webp",
        fileSize: fs_1.default.statSync(filePath).size,
        width: metadata.width || 0,
        height: metadata.height || 0,
    };
}

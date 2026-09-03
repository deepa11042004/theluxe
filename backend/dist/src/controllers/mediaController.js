"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMedia = getMedia;
exports.uploadMedia = uploadMedia;
exports.deleteMedia = deleteMedia;
const prisma_1 = require("../config/prisma");
const upload_1 = require("../middleware/upload");
const auditLogger_1 = require("../utils/auditLogger");
async function getMedia(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 30;
        const skip = (page - 1) * limit;
        const search = req.query.search;
        const folder = req.query.folder;
        const where = { deleted_at: null };
        if (search) {
            where.OR = [
                { original_filename: { contains: search } },
                { filename: { contains: search } },
                { alt_text: { contains: search } },
            ];
        }
        if (folder)
            where.folder = folder;
        const [items, total] = await Promise.all([
            prisma_1.prisma.media.findMany({
                where,
                skip,
                take: limit,
                orderBy: { created_at: "desc" },
            }),
            prisma_1.prisma.media.count({ where }),
        ]);
        return res.json({
            success: true,
            data: items,
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        });
    }
    catch (err) {
        next(err);
    }
}
async function uploadMedia(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image file provided." });
        }
        const folder = req.body.folder || "general";
        const alt_text = req.body.alt_text || "";
        const caption = req.body.caption || "";
        const optimized = await (0, upload_1.processAndOptimizeImage)(req.file.buffer, req.file.originalname, folder);
        const record = await prisma_1.prisma.media.create({
            data: {
                original_filename: req.file.originalname,
                filename: optimized.filename,
                url: optimized.url,
                mime_type: optimized.mimeType,
                file_size: optimized.fileSize,
                width: optimized.width,
                height: optimized.height,
                alt_text,
                caption,
                folder,
                created_by: req.user?.id,
            },
        });
        await (0, auditLogger_1.logAudit)({
            userId: req.user?.id,
            action: "CREATE",
            entity: "Media",
            entityId: record.id,
            newData: record,
            req,
        });
        return res.status(201).json({ success: true, data: record });
    }
    catch (err) {
        next(err);
    }
}
async function deleteMedia(req, res, next) {
    try {
        const { id } = req.params;
        const media = await prisma_1.prisma.media.findFirst({ where: { id, deleted_at: null } });
        if (!media) {
            return res.status(404).json({ success: false, message: "Media file not found." });
        }
        await prisma_1.prisma.media.update({
            where: { id },
            data: { deleted_at: new Date() },
        });
        await (0, auditLogger_1.logAudit)({
            userId: req.user?.id,
            action: "DELETE",
            entity: "Media",
            entityId: id,
            oldData: media,
            req,
        });
        return res.json({ success: true, message: "Media file deleted successfully." });
    }
    catch (err) {
        next(err);
    }
}

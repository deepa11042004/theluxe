import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import { processAndOptimizeImage } from "../middleware/upload";
import { logAudit } from "../utils/auditLogger";

export async function getMedia(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 30;
    const skip = (page - 1) * limit;

    const search = req.query.search as string;
    const folder = req.query.folder as string;

    const where: any = { deleted_at: null };
    if (search) {
      where.OR = [
        { original_filename: { contains: search } },
        { filename: { contains: search } },
        { alt_text: { contains: search } },
      ];
    }
    if (folder) where.folder = folder;

    const [items, total] = await Promise.all([
      prisma.media.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      prisma.media.count({ where }),
    ]);

    return res.json({
      success: true,
      data: items,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
}

export async function uploadMedia(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file provided." });
    }

    const folder = (req.body.folder as string) || "general";
    const alt_text = (req.body.alt_text as string) || "";
    const caption = (req.body.caption as string) || "";

    const optimized = await processAndOptimizeImage(
      req.file.buffer,
      req.file.originalname,
      folder
    );

    const record = await prisma.media.create({
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

    await logAudit({
      userId: req.user?.id,
      action: "CREATE",
      entity: "Media",
      entityId: record.id,
      newData: record,
      req,
    });

    return res.status(201).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
}

export async function deleteMedia(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const media = await prisma.media.findFirst({ where: { id, deleted_at: null } });
    if (!media) {
      return res.status(404).json({ success: false, message: "Media file not found." });
    }

    await prisma.media.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    await logAudit({
      userId: req.user?.id,
      action: "DELETE",
      entity: "Media",
      entityId: id,
      oldData: media,
      req,
    });

    return res.json({ success: true, message: "Media file deleted successfully." });
  } catch (err) {
    next(err);
  }
}

import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import { slugify } from "../utils/slugify";
import { logAudit } from "../utils/auditLogger";

export async function getDestinations(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const search = req.query.search as string;
    const country = req.query.country as string;
    const category = req.query.category as string;
    const destination_type = req.query.destination_type as string;
    const status = req.query.status as string;
    const featured = req.query.featured as string;

    const where: any = { deleted_at: null };

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { country: { contains: search } },
        { city: { contains: search } },
      ];
    }
    if (country) where.country = country;
    if (destination_type) where.destination_type = destination_type;
    if (status) where.status = status;
    if (featured !== undefined) where.is_featured = featured === "true";

    const [items, total] = await Promise.all([
      prisma.destination.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updated_at: "desc" },
        include: {
          images: { orderBy: { display_order: "asc" } },
        },
      }),
      prisma.destination.count({ where }),
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

export async function getDestinationById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const destination = await prisma.destination.findFirst({
      where: { id, deleted_at: null },
      include: {
        images: { orderBy: { display_order: "asc" } },
      },
    });

    if (!destination) {
      return res.status(404).json({ success: false, message: "Destination not found." });
    }

    return res.json({ success: true, data: destination });
  } catch (err) {
    next(err);
  }
}

export async function createDestination(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    if (!body.name) {
      return res.status(400).json({ success: false, message: "Destination name is required." });
    }

    let slug = body.slug ? slugify(body.slug) : slugify(body.name);
    const existing = await prisma.destination.findFirst({ where: { slug, deleted_at: null } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const destination = await prisma.destination.create({
      data: {
        name: body.name,
        slug,
        short_description: body.short_description,
        description: body.description,
        country: body.country,
        state_region: body.state_region,
        city: body.city,
        continent: body.continent,
        destination_type: body.destination_type,
        best_time_to_visit: body.best_time_to_visit,
        ideal_duration: body.ideal_duration,
        currency: body.currency,
        language: body.language,
        time_zone: body.time_zone,
        categories: body.categories || null,
        is_featured: body.is_featured || false,
        is_popular: body.is_popular || false,
        is_india_destination: body.is_india_destination || false,
        is_international_destination: body.is_international_destination || false,
        display_order: body.display_order ? parseInt(body.display_order) : 0,
        status: body.status || "DRAFT",
        published_at: body.status === "PUBLISHED" ? new Date() : null,
        created_by: req.user?.id,
        images: {
          create: (body.images || []).map((img: any, idx: number) => ({
            media_id: img.media_id,
            image_url: img.image_url,
            alt_text: img.alt_text,
            caption: img.caption,
            image_type: img.image_type || "gallery",
            display_order: img.display_order ?? idx,
            is_primary: img.is_primary || idx === 0,
          })),
        },
      },
      include: { images: true },
    });

    await logAudit({
      userId: req.user?.id,
      action: "CREATE",
      entity: "Destination",
      entityId: destination.id,
      newData: destination,
      req,
    });

    return res.status(201).json({ success: true, data: destination });
  } catch (err) {
    next(err);
  }
}

export async function updateDestination(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const body = req.body;

    const existing = await prisma.destination.findFirst({ where: { id, deleted_at: null } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Destination not found." });
    }

    let slug = existing.slug;
    if (body.slug && body.slug !== existing.slug) {
      slug = slugify(body.slug);
      const duplicate = await prisma.destination.findFirst({
        where: { slug, id: { not: id }, deleted_at: null },
      });
      if (duplicate) {
        return res.status(400).json({ success: false, message: "Slug already in use." });
      }
    }

    if (body.images) {
      await prisma.destinationImage.deleteMany({ where: { destination_id: id } });
    }

    const updated = await prisma.destination.update({
      where: { id },
      data: {
        name: body.name ?? existing.name,
        slug,
        short_description: body.short_description,
        description: body.description,
        country: body.country,
        state_region: body.state_region,
        city: body.city,
        continent: body.continent,
        destination_type: body.destination_type,
        best_time_to_visit: body.best_time_to_visit,
        ideal_duration: body.ideal_duration,
        currency: body.currency,
        language: body.language,
        time_zone: body.time_zone,
        categories: body.categories !== undefined ? body.categories : existing.categories,
        is_featured: body.is_featured !== undefined ? body.is_featured : existing.is_featured,
        is_popular: body.is_popular !== undefined ? body.is_popular : existing.is_popular,
        is_india_destination: body.is_india_destination !== undefined ? body.is_india_destination : existing.is_india_destination,
        is_international_destination: body.is_international_destination !== undefined ? body.is_international_destination : existing.is_international_destination,
        display_order: body.display_order ? parseInt(body.display_order) : existing.display_order,
        status: body.status ?? existing.status,
        published_at: body.status === "PUBLISHED" && existing.status !== "PUBLISHED" ? new Date() : existing.published_at,
        updated_by: req.user?.id,
        images: body.images
          ? {
              create: body.images.map((img: any, idx: number) => ({
                media_id: img.media_id,
                image_url: img.image_url,
                alt_text: img.alt_text,
                caption: img.caption,
                image_type: img.image_type || "gallery",
                display_order: img.display_order ?? idx,
                is_primary: img.is_primary || idx === 0,
              })),
            }
          : undefined,
      },
      include: { images: true },
    });

    await logAudit({
      userId: req.user?.id,
      action: "UPDATE",
      entity: "Destination",
      entityId: id,
      oldData: existing,
      newData: updated,
      req,
    });

    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export async function deleteDestination(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const existing = await prisma.destination.findFirst({ where: { id, deleted_at: null } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Destination not found." });
    }

    await prisma.destination.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    await logAudit({
      userId: req.user?.id,
      action: "DELETE",
      entity: "Destination",
      entityId: id,
      oldData: existing,
      req,
    });

    return res.json({ success: true, message: "Destination deleted successfully." });
  } catch (err) {
    next(err);
  }
}

export async function toggleStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await prisma.destination.update({
      where: { id },
      data: { status, published_at: status === "PUBLISHED" ? new Date() : undefined },
    });
    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export async function toggleFeatured(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { is_featured } = req.body;
    const updated = await prisma.destination.update({
      where: { id },
      data: { is_featured: Boolean(is_featured) },
    });
    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

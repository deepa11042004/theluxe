import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import { slugify } from "../utils/slugify";
import { logAudit } from "../utils/auditLogger";

export async function getItineraries(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const search = req.query.search as string;
    const region = req.query.region as string;
    const category = req.query.category as string;
    const status = req.query.status as string;
    const featured = req.query.featured as string;

    const where: any = { deleted_at: null };

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { region: { contains: search } },
        { category: { contains: search } },
      ];
    }
    if (region) where.region = region;
    if (category) where.category = category;
    if (status) where.status = status;
    if (featured !== undefined) where.is_featured = featured === "true";

    const [items, total] = await Promise.all([
      prisma.itinerary.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updated_at: "desc" },
        include: {
          destinations: { include: { destination: true } },
          days_list: { orderBy: { day_number: "asc" } },
          features: { orderBy: { display_order: "asc" } },
          inclusions: { orderBy: { display_order: "asc" } },
          exclusions: { orderBy: { display_order: "asc" } },
          images: { orderBy: { display_order: "asc" } },
        },
      }),
      prisma.itinerary.count({ where }),
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

export async function getItineraryById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const item = await prisma.itinerary.findFirst({
      where: { id, deleted_at: null },
      include: {
        destinations: { include: { destination: true } },
        days_list: { orderBy: { day_number: "asc" } },
        features: { orderBy: { display_order: "asc" } },
        inclusions: { orderBy: { display_order: "asc" } },
        exclusions: { orderBy: { display_order: "asc" } },
        images: { orderBy: { display_order: "asc" } },
      },
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "Itinerary not found." });
    }

    return res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

export async function createItinerary(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    if (!body.title) {
      return res.status(400).json({ success: false, message: "Itinerary title is required." });
    }

    let slug = body.slug ? slugify(body.slug) : slugify(body.title);
    const existing = await prisma.itinerary.findFirst({ where: { slug, deleted_at: null } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const daysCount = parseInt(body.days) || 1;
    const nightsCount = parseInt(body.nights) || 1;

    if (daysCount < nightsCount) {
      return res.status(400).json({ success: false, message: "Days must be greater than or equal to nights." });
    }

    const destinationIds: string[] = body.destination_ids || [];
    const daysData: any[] = body.days_list || [];
    const featuresData: any[] = body.features || [];
    const inclusionsData: any[] = body.inclusions || [];
    const exclusionsData: any[] = body.exclusions || [];
    const imagesData: any[] = body.images || [];

    const item = await prisma.itinerary.create({
      data: {
        title: body.title,
        slug,
        short_description: body.short_description,
        overview: body.overview,
        region: body.region,
        category: body.category,
        nights: nightsCount,
        days: daysCount,
        min_travelers: parseInt(body.min_travelers) || 1,
        max_travelers: parseInt(body.max_travelers) || 10,
        price_from: body.price_from ? parseFloat(body.price_from) : null,
        price_currency: body.price_currency || "INR",
        price_unit: body.price_unit || "per person",
        is_flights_included: Boolean(body.is_flights_included),
        is_featured: Boolean(body.is_featured),
        display_order: body.display_order ? parseInt(body.display_order) : 0,
        status: body.status || "DRAFT",
        published_at: body.status === "PUBLISHED" ? new Date() : null,
        created_by: req.user?.id,
        destinations: {
          create: destinationIds.map((destId, idx) => ({
            destination_id: destId,
            display_order: idx,
          })),
        },
        days_list: {
          create: daysData.map((d, idx) => ({
            day_number: d.day_number || idx + 1,
            title: d.title,
            description: d.description,
            image_url: d.image_url,
            media_id: d.media_id,
            display_order: idx,
          })),
        },
        features: {
          create: featuresData.map((f, idx) => ({
            name: typeof f === "string" ? f : f.name,
            icon: f.icon || null,
            display_order: idx,
          })),
        },
        inclusions: {
          create: inclusionsData.map((inc, idx) => ({
            title: typeof inc === "string" ? inc : inc.title,
            display_order: idx,
          })),
        },
        exclusions: {
          create: exclusionsData.map((exc, idx) => ({
            title: typeof exc === "string" ? exc : exc.title,
            display_order: idx,
          })),
        },
        images: {
          create: imagesData.map((img, idx) => ({
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
      include: {
        destinations: true,
        days_list: true,
        features: true,
        inclusions: true,
        exclusions: true,
        images: true,
      },
    });

    await logAudit({
      userId: req.user?.id,
      action: "CREATE",
      entity: "Itinerary",
      entityId: item.id,
      newData: item,
      req,
    });

    return res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

export async function updateItinerary(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const body = req.body;

    const existing = await prisma.itinerary.findFirst({ where: { id, deleted_at: null } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Itinerary not found." });
    }

    let slug = existing.slug;
    if (body.slug && body.slug !== existing.slug) {
      slug = slugify(body.slug);
      const duplicate = await prisma.itinerary.findFirst({
        where: { slug, id: { not: id }, deleted_at: null },
      });
      if (duplicate) {
        return res.status(400).json({ success: false, message: "Slug already in use." });
      }
    }

    if (body.destination_ids) {
      await prisma.itineraryDestination.deleteMany({ where: { itinerary_id: id } });
    }
    if (body.days_list) {
      await prisma.itineraryDay.deleteMany({ where: { itinerary_id: id } });
    }
    if (body.features) {
      await prisma.itineraryFeature.deleteMany({ where: { itinerary_id: id } });
    }
    if (body.inclusions) {
      await prisma.itineraryInclusion.deleteMany({ where: { itinerary_id: id } });
    }
    if (body.exclusions) {
      await prisma.itineraryExclusion.deleteMany({ where: { itinerary_id: id } });
    }
    if (body.images) {
      await prisma.itineraryImage.deleteMany({ where: { itinerary_id: id } });
    }

    const updated = await prisma.itinerary.update({
      where: { id },
      data: {
        title: body.title ?? existing.title,
        slug,
        short_description: body.short_description,
        overview: body.overview,
        region: body.region,
        category: body.category,
        nights: body.nights ? parseInt(body.nights) : existing.nights,
        days: body.days ? parseInt(body.days) : existing.days,
        min_travelers: body.min_travelers ? parseInt(body.min_travelers) : existing.min_travelers,
        max_travelers: body.max_travelers ? parseInt(body.max_travelers) : existing.max_travelers,
        price_from: body.price_from ? parseFloat(body.price_from) : existing.price_from,
        price_currency: body.price_currency ?? existing.price_currency,
        price_unit: body.price_unit ?? existing.price_unit,
        is_flights_included: body.is_flights_included !== undefined ? Boolean(body.is_flights_included) : existing.is_flights_included,
        is_featured: body.is_featured !== undefined ? Boolean(body.is_featured) : existing.is_featured,
        display_order: body.display_order ? parseInt(body.display_order) : existing.display_order,
        status: body.status ?? existing.status,
        published_at: body.status === "PUBLISHED" && existing.status !== "PUBLISHED" ? new Date() : existing.published_at,
        updated_by: req.user?.id,
        destinations: body.destination_ids
          ? {
              create: (body.destination_ids as string[]).map((destId, idx) => ({
                destination_id: destId,
                display_order: idx,
              })),
            }
          : undefined,
        days_list: body.days_list
          ? {
              create: (body.days_list as any[]).map((d, idx) => ({
                day_number: d.day_number || idx + 1,
                title: d.title,
                description: d.description,
                image_url: d.image_url,
                media_id: d.media_id,
                display_order: idx,
              })),
            }
          : undefined,
        features: body.features
          ? {
              create: (body.features as any[]).map((f, idx) => ({
                name: typeof f === "string" ? f : f.name,
                icon: f.icon || null,
                display_order: idx,
              })),
            }
          : undefined,
        inclusions: body.inclusions
          ? {
              create: (body.inclusions as any[]).map((inc, idx) => ({
                title: typeof inc === "string" ? inc : inc.title,
                display_order: idx,
              })),
            }
          : undefined,
        exclusions: body.exclusions
          ? {
              create: (body.exclusions as any[]).map((exc, idx) => ({
                title: typeof exc === "string" ? exc : exc.title,
                display_order: idx,
              })),
            }
          : undefined,
        images: body.images
          ? {
              create: (body.images as any[]).map((img, idx) => ({
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
      include: {
        destinations: true,
        days_list: true,
        features: true,
        inclusions: true,
        exclusions: true,
        images: true,
      },
    });

    await logAudit({
      userId: req.user?.id,
      action: "UPDATE",
      entity: "Itinerary",
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

export async function deleteItinerary(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const existing = await prisma.itinerary.findFirst({ where: { id, deleted_at: null } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Itinerary not found." });
    }

    await prisma.itinerary.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    await logAudit({
      userId: req.user?.id,
      action: "DELETE",
      entity: "Itinerary",
      entityId: id,
      oldData: existing,
      req,
    });

    return res.json({ success: true, message: "Itinerary deleted successfully." });
  } catch (err) {
    next(err);
  }
}

export async function toggleStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await prisma.itinerary.update({
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
    const updated = await prisma.itinerary.update({
      where: { id },
      data: { is_featured: Boolean(is_featured) },
    });
    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

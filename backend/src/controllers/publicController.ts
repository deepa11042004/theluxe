import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";

export async function getPublicHotels(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search as string;
    const featured = req.query.featured as string;
    const popular = req.query.popular as string;

    const where: any = { status: "PUBLISHED", deleted_at: null };
    if (featured === "true") {
      where.is_featured = true;
    }
    if (popular === "true") {
      where.is_popular = true;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { city: { contains: search } },
        { country: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.hotel.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ display_order: "asc" }, { published_at: "desc" }],
        include: { images: { orderBy: { display_order: "asc" } } },
      }),
      prisma.hotel.count({ where }),
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

export async function getPublicHotelBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const hotel = await prisma.hotel.findFirst({
      where: { slug, status: "PUBLISHED", deleted_at: null },
      include: { images: { orderBy: { display_order: "asc" } } },
    });

    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found." });
    }

    return res.json({ success: true, data: hotel });
  } catch (err) {
    next(err);
  }
}

export async function getPublicDestinations(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search as string;

    const where: any = { status: "PUBLISHED", deleted_at: null };
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { country: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.destination.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ display_order: "asc" }, { published_at: "desc" }],
        include: { images: { orderBy: { display_order: "asc" } } },
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

export async function getPublicDestinationBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const item = await prisma.destination.findFirst({
      where: { slug, status: "PUBLISHED", deleted_at: null },
      include: { images: { orderBy: { display_order: "asc" } } },
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "Destination not found." });
    }

    return res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

export async function getPublicItineraries(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search as string;

    const where: any = { status: "PUBLISHED", deleted_at: null };
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { region: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.itinerary.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ display_order: "asc" }, { published_at: "desc" }],
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

export async function getPublicItineraryBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const item = await prisma.itinerary.findFirst({
      where: { slug, status: "PUBLISHED", deleted_at: null },
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

export async function getPublicBlogs(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search as string;

    const where: any = { status: "PUBLISHED", deleted_at: null };
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ display_order: "asc" }, { published_at: "desc" }],
        include: {
          category: true,
          images: { orderBy: { display_order: "asc" } },
        },
      }),
      prisma.blog.count({ where }),
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

export async function getPublicBlogBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const item = await prisma.blog.findFirst({
      where: { slug, status: "PUBLISHED", deleted_at: null },
      include: {
        category: true,
        images: { orderBy: { display_order: "asc" } },
      },
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "Blog post not found." });
    }

    return res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

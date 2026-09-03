"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicHotels = getPublicHotels;
exports.getPublicHotelBySlug = getPublicHotelBySlug;
exports.getPublicDestinations = getPublicDestinations;
exports.getPublicDestinationBySlug = getPublicDestinationBySlug;
exports.getPublicItineraries = getPublicItineraries;
exports.getPublicItineraryBySlug = getPublicItineraryBySlug;
exports.getPublicBlogs = getPublicBlogs;
exports.getPublicBlogBySlug = getPublicBlogBySlug;
const prisma_1 = require("../config/prisma");
async function getPublicHotels(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const search = req.query.search;
        const where = { status: "PUBLISHED", deleted_at: null };
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { city: { contains: search } },
                { country: { contains: search } },
            ];
        }
        const [items, total] = await Promise.all([
            prisma_1.prisma.hotel.findMany({
                where,
                skip,
                take: limit,
                orderBy: [{ display_order: "asc" }, { published_at: "desc" }],
                include: { images: { orderBy: { display_order: "asc" } } },
            }),
            prisma_1.prisma.hotel.count({ where }),
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
async function getPublicHotelBySlug(req, res, next) {
    try {
        const { slug } = req.params;
        const hotel = await prisma_1.prisma.hotel.findFirst({
            where: { slug, status: "PUBLISHED", deleted_at: null },
            include: { images: { orderBy: { display_order: "asc" } } },
        });
        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found." });
        }
        return res.json({ success: true, data: hotel });
    }
    catch (err) {
        next(err);
    }
}
async function getPublicDestinations(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const search = req.query.search;
        const where = { status: "PUBLISHED", deleted_at: null };
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { country: { contains: search } },
            ];
        }
        const [items, total] = await Promise.all([
            prisma_1.prisma.destination.findMany({
                where,
                skip,
                take: limit,
                orderBy: [{ display_order: "asc" }, { published_at: "desc" }],
                include: { images: { orderBy: { display_order: "asc" } } },
            }),
            prisma_1.prisma.destination.count({ where }),
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
async function getPublicDestinationBySlug(req, res, next) {
    try {
        const { slug } = req.params;
        const item = await prisma_1.prisma.destination.findFirst({
            where: { slug, status: "PUBLISHED", deleted_at: null },
            include: { images: { orderBy: { display_order: "asc" } } },
        });
        if (!item) {
            return res.status(404).json({ success: false, message: "Destination not found." });
        }
        return res.json({ success: true, data: item });
    }
    catch (err) {
        next(err);
    }
}
async function getPublicItineraries(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const search = req.query.search;
        const where = { status: "PUBLISHED", deleted_at: null };
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { region: { contains: search } },
            ];
        }
        const [items, total] = await Promise.all([
            prisma_1.prisma.itinerary.findMany({
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
            prisma_1.prisma.itinerary.count({ where }),
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
async function getPublicItineraryBySlug(req, res, next) {
    try {
        const { slug } = req.params;
        const item = await prisma_1.prisma.itinerary.findFirst({
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
    }
    catch (err) {
        next(err);
    }
}
async function getPublicBlogs(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const search = req.query.search;
        const where = { status: "PUBLISHED", deleted_at: null };
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { excerpt: { contains: search } },
            ];
        }
        const [items, total] = await Promise.all([
            prisma_1.prisma.blog.findMany({
                where,
                skip,
                take: limit,
                orderBy: [{ display_order: "asc" }, { published_at: "desc" }],
                include: {
                    category: true,
                    images: { orderBy: { display_order: "asc" } },
                },
            }),
            prisma_1.prisma.blog.count({ where }),
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
async function getPublicBlogBySlug(req, res, next) {
    try {
        const { slug } = req.params;
        const item = await prisma_1.prisma.blog.findFirst({
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
    }
    catch (err) {
        next(err);
    }
}

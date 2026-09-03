"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotels = getHotels;
exports.getHotelById = getHotelById;
exports.createHotel = createHotel;
exports.updateHotel = updateHotel;
exports.deleteHotel = deleteHotel;
exports.toggleStatus = toggleStatus;
exports.toggleFeatured = toggleFeatured;
const prisma_1 = require("../config/prisma");
const slugify_1 = require("../utils/slugify");
const auditLogger_1 = require("../utils/auditLogger");
async function getHotels(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const search = req.query.search;
        const region = req.query.region;
        const country = req.query.country;
        const city = req.query.city;
        const hotel_type = req.query.hotel_type;
        const status = req.query.status;
        const featured = req.query.featured;
        const where = { deleted_at: null };
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { city: { contains: search } },
                { country: { contains: search } },
            ];
        }
        if (region)
            where.region = region;
        if (country)
            where.country = country;
        if (city)
            where.city = city;
        if (hotel_type)
            where.hotel_type = hotel_type;
        if (status)
            where.status = status;
        if (featured !== undefined)
            where.is_featured = featured === "true";
        const [items, total] = await Promise.all([
            prisma_1.prisma.hotel.findMany({
                where,
                skip,
                take: limit,
                orderBy: { updated_at: "desc" },
                include: {
                    images: {
                        orderBy: { display_order: "asc" },
                    },
                },
            }),
            prisma_1.prisma.hotel.count({ where }),
        ]);
        return res.json({
            success: true,
            data: items,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (err) {
        next(err);
    }
}
async function getHotelById(req, res, next) {
    try {
        const { id } = req.params;
        const hotel = await prisma_1.prisma.hotel.findFirst({
            where: { id, deleted_at: null },
            include: {
                images: {
                    orderBy: { display_order: "asc" },
                },
            },
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
async function createHotel(req, res, next) {
    try {
        const body = req.body;
        if (!body.name) {
            return res.status(400).json({ success: false, message: "Hotel name is required." });
        }
        let slug = body.slug ? (0, slugify_1.slugify)(body.slug) : (0, slugify_1.slugify)(body.name);
        // Check slug uniqueness
        const existing = await prisma_1.prisma.hotel.findFirst({
            where: { slug, deleted_at: null },
        });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }
        const imagesData = body.images || [];
        const hotel = await prisma_1.prisma.hotel.create({
            data: {
                name: body.name,
                slug,
                short_description: body.short_description,
                description: body.description,
                region: body.region,
                country: body.country,
                state_province: body.state_province,
                city: body.city,
                location_area: body.location_area,
                address: body.address,
                latitude: body.latitude ? parseFloat(body.latitude) : null,
                longitude: body.longitude ? parseFloat(body.longitude) : null,
                hotel_type: body.hotel_type,
                luxury_category: body.luxury_category,
                official_website: body.official_website,
                booking_url: body.booking_url,
                google_maps_url: body.google_maps_url,
                best_time_to_visit: body.best_time_to_visit,
                highlights: body.highlights || null,
                amenities: body.amenities || null,
                dining_information: body.dining_information,
                spa_wellness: body.spa_wellness,
                activities: body.activities,
                why_we_recommend: body.why_we_recommend,
                is_featured: body.is_featured || false,
                is_popular: body.is_popular || false,
                is_top_hotel: body.is_top_hotel || false,
                top_hotel_rank: body.top_hotel_rank ? parseInt(body.top_hotel_rank) : null,
                is_india_top_50: body.is_india_top_50 || false,
                is_international_top_50: body.is_international_top_50 || false,
                display_order: body.display_order ? parseInt(body.display_order) : 0,
                status: body.status || "DRAFT",
                published_at: body.status === "PUBLISHED" ? new Date() : null,
                seo_title: body.seo_title,
                seo_description: body.seo_description,
                canonical_url: body.canonical_url,
                og_title: body.og_title,
                og_description: body.og_description,
                og_image: body.og_image,
                robots_index: body.robots_index !== undefined ? body.robots_index : true,
                robots_follow: body.robots_follow !== undefined ? body.robots_follow : true,
                created_by: req.user?.id,
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
            include: { images: true },
        });
        await (0, auditLogger_1.logAudit)({
            userId: req.user?.id,
            action: "CREATE",
            entity: "Hotel",
            entityId: hotel.id,
            newData: hotel,
            req,
        });
        return res.status(201).json({ success: true, data: hotel });
    }
    catch (err) {
        next(err);
    }
}
async function updateHotel(req, res, next) {
    try {
        const { id } = req.params;
        const body = req.body;
        const existing = await prisma_1.prisma.hotel.findFirst({
            where: { id, deleted_at: null },
            include: { images: true },
        });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Hotel not found." });
        }
        let slug = existing.slug;
        if (body.slug && body.slug !== existing.slug) {
            slug = (0, slugify_1.slugify)(body.slug);
            const duplicate = await prisma_1.prisma.hotel.findFirst({
                where: { slug, id: { not: id }, deleted_at: null },
            });
            if (duplicate) {
                return res.status(400).json({ success: false, message: "Slug already in use." });
            }
        }
        let published_at = existing.published_at;
        if (body.status === "PUBLISHED" && existing.status !== "PUBLISHED") {
            published_at = new Date();
        }
        // Replace images if provided
        if (body.images) {
            await prisma_1.prisma.hotelImage.deleteMany({ where: { hotel_id: id } });
        }
        const updated = await prisma_1.prisma.hotel.update({
            where: { id },
            data: {
                name: body.name ?? existing.name,
                slug,
                short_description: body.short_description,
                description: body.description,
                region: body.region,
                country: body.country,
                state_province: body.state_province,
                city: body.city,
                location_area: body.location_area,
                address: body.address,
                latitude: body.latitude ? parseFloat(body.latitude) : null,
                longitude: body.longitude ? parseFloat(body.longitude) : null,
                hotel_type: body.hotel_type,
                luxury_category: body.luxury_category,
                official_website: body.official_website,
                booking_url: body.booking_url,
                google_maps_url: body.google_maps_url,
                best_time_to_visit: body.best_time_to_visit,
                highlights: body.highlights !== undefined ? body.highlights : existing.highlights,
                amenities: body.amenities !== undefined ? body.amenities : existing.amenities,
                dining_information: body.dining_information,
                spa_wellness: body.spa_wellness,
                activities: body.activities,
                why_we_recommend: body.why_we_recommend,
                is_featured: body.is_featured !== undefined ? body.is_featured : existing.is_featured,
                is_popular: body.is_popular !== undefined ? body.is_popular : existing.is_popular,
                is_top_hotel: body.is_top_hotel !== undefined ? body.is_top_hotel : existing.is_top_hotel,
                top_hotel_rank: body.top_hotel_rank ? parseInt(body.top_hotel_rank) : null,
                is_india_top_50: body.is_india_top_50 !== undefined ? body.is_india_top_50 : existing.is_india_top_50,
                is_international_top_50: body.is_international_top_50 !== undefined ? body.is_international_top_50 : existing.is_international_top_50,
                display_order: body.display_order ? parseInt(body.display_order) : existing.display_order,
                status: body.status ?? existing.status,
                published_at,
                seo_title: body.seo_title,
                seo_description: body.seo_description,
                canonical_url: body.canonical_url,
                og_title: body.og_title,
                og_description: body.og_description,
                og_image: body.og_image,
                robots_index: body.robots_index !== undefined ? body.robots_index : existing.robots_index,
                robots_follow: body.robots_follow !== undefined ? body.robots_follow : existing.robots_follow,
                updated_by: req.user?.id,
                images: body.images
                    ? {
                        create: body.images.map((img, idx) => ({
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
        await (0, auditLogger_1.logAudit)({
            userId: req.user?.id,
            action: "UPDATE",
            entity: "Hotel",
            entityId: id,
            oldData: existing,
            newData: updated,
            req,
        });
        return res.json({ success: true, data: updated });
    }
    catch (err) {
        next(err);
    }
}
async function deleteHotel(req, res, next) {
    try {
        const { id } = req.params;
        const existing = await prisma_1.prisma.hotel.findFirst({
            where: { id, deleted_at: null },
        });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Hotel not found." });
        }
        await prisma_1.prisma.hotel.update({
            where: { id },
            data: { deleted_at: new Date() },
        });
        await (0, auditLogger_1.logAudit)({
            userId: req.user?.id,
            action: "DELETE",
            entity: "Hotel",
            entityId: id,
            oldData: existing,
            req,
        });
        return res.json({ success: true, message: "Hotel deleted successfully." });
    }
    catch (err) {
        next(err);
    }
}
async function toggleStatus(req, res, next) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value." });
        }
        const updated = await prisma_1.prisma.hotel.update({
            where: { id },
            data: {
                status,
                published_at: status === "PUBLISHED" ? new Date() : undefined,
            },
        });
        await (0, auditLogger_1.logAudit)({
            userId: req.user?.id,
            action: status === "PUBLISHED" ? "PUBLISH" : "UNPUBLISH",
            entity: "Hotel",
            entityId: id,
            newData: updated,
            req,
        });
        return res.json({ success: true, data: updated });
    }
    catch (err) {
        next(err);
    }
}
async function toggleFeatured(req, res, next) {
    try {
        const { id } = req.params;
        const { is_featured } = req.body;
        const updated = await prisma_1.prisma.hotel.update({
            where: { id },
            data: { is_featured: Boolean(is_featured) },
        });
        return res.json({ success: true, data: updated });
    }
    catch (err) {
        next(err);
    }
}

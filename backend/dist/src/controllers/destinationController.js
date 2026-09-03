"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDestinations = getDestinations;
exports.getDestinationById = getDestinationById;
exports.createDestination = createDestination;
exports.updateDestination = updateDestination;
exports.deleteDestination = deleteDestination;
exports.toggleStatus = toggleStatus;
exports.toggleFeatured = toggleFeatured;
const prisma_1 = require("../config/prisma");
const slugify_1 = require("../utils/slugify");
const auditLogger_1 = require("../utils/auditLogger");
async function getDestinations(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const search = req.query.search;
        const country = req.query.country;
        const category = req.query.category;
        const destination_type = req.query.destination_type;
        const status = req.query.status;
        const featured = req.query.featured;
        const where = { deleted_at: null };
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { country: { contains: search } },
                { city: { contains: search } },
            ];
        }
        if (country)
            where.country = country;
        if (destination_type)
            where.destination_type = destination_type;
        if (status)
            where.status = status;
        if (featured !== undefined)
            where.is_featured = featured === "true";
        const [items, total] = await Promise.all([
            prisma_1.prisma.destination.findMany({
                where,
                skip,
                take: limit,
                orderBy: { updated_at: "desc" },
                include: {
                    images: { orderBy: { display_order: "asc" } },
                },
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
async function getDestinationById(req, res, next) {
    try {
        const { id } = req.params;
        const destination = await prisma_1.prisma.destination.findFirst({
            where: { id, deleted_at: null },
            include: {
                images: { orderBy: { display_order: "asc" } },
            },
        });
        if (!destination) {
            return res.status(404).json({ success: false, message: "Destination not found." });
        }
        return res.json({ success: true, data: destination });
    }
    catch (err) {
        next(err);
    }
}
async function createDestination(req, res, next) {
    try {
        const body = req.body;
        if (!body.name) {
            return res.status(400).json({ success: false, message: "Destination name is required." });
        }
        let slug = body.slug ? (0, slugify_1.slugify)(body.slug) : (0, slugify_1.slugify)(body.name);
        const existing = await prisma_1.prisma.destination.findFirst({ where: { slug, deleted_at: null } });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }
        const destination = await prisma_1.prisma.destination.create({
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
                    create: (body.images || []).map((img, idx) => ({
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
            entity: "Destination",
            entityId: destination.id,
            newData: destination,
            req,
        });
        return res.status(201).json({ success: true, data: destination });
    }
    catch (err) {
        next(err);
    }
}
async function updateDestination(req, res, next) {
    try {
        const { id } = req.params;
        const body = req.body;
        const existing = await prisma_1.prisma.destination.findFirst({ where: { id, deleted_at: null } });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Destination not found." });
        }
        let slug = existing.slug;
        if (body.slug && body.slug !== existing.slug) {
            slug = (0, slugify_1.slugify)(body.slug);
            const duplicate = await prisma_1.prisma.destination.findFirst({
                where: { slug, id: { not: id }, deleted_at: null },
            });
            if (duplicate) {
                return res.status(400).json({ success: false, message: "Slug already in use." });
            }
        }
        if (body.images) {
            await prisma_1.prisma.destinationImage.deleteMany({ where: { destination_id: id } });
        }
        const updated = await prisma_1.prisma.destination.update({
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
            entity: "Destination",
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
async function deleteDestination(req, res, next) {
    try {
        const { id } = req.params;
        const existing = await prisma_1.prisma.destination.findFirst({ where: { id, deleted_at: null } });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Destination not found." });
        }
        await prisma_1.prisma.destination.update({
            where: { id },
            data: { deleted_at: new Date() },
        });
        await (0, auditLogger_1.logAudit)({
            userId: req.user?.id,
            action: "DELETE",
            entity: "Destination",
            entityId: id,
            oldData: existing,
            req,
        });
        return res.json({ success: true, message: "Destination deleted successfully." });
    }
    catch (err) {
        next(err);
    }
}
async function toggleStatus(req, res, next) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await prisma_1.prisma.destination.update({
            where: { id },
            data: { status, published_at: status === "PUBLISHED" ? new Date() : undefined },
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
        const updated = await prisma_1.prisma.destination.update({
            where: { id },
            data: { is_featured: Boolean(is_featured) },
        });
        return res.json({ success: true, data: updated });
    }
    catch (err) {
        next(err);
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogs = getBlogs;
exports.getBlogById = getBlogById;
exports.createBlog = createBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
exports.toggleStatus = toggleStatus;
exports.toggleFeatured = toggleFeatured;
const prisma_1 = require("../config/prisma");
const slugify_1 = require("../utils/slugify");
const auditLogger_1 = require("../utils/auditLogger");
async function getBlogs(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const search = req.query.search;
        const category_id = req.query.category_id;
        const status = req.query.status;
        const featured = req.query.featured;
        const where = { deleted_at: null };
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { excerpt: { contains: search } },
                { author_name: { contains: search } },
            ];
        }
        if (category_id)
            where.category_id = category_id;
        if (status)
            where.status = status;
        if (featured !== undefined)
            where.is_featured = featured === "true";
        const [items, total] = await Promise.all([
            prisma_1.prisma.blog.findMany({
                where,
                skip,
                take: limit,
                orderBy: { updated_at: "desc" },
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
async function getBlogById(req, res, next) {
    try {
        const { id } = req.params;
        const blog = await prisma_1.prisma.blog.findFirst({
            where: { id, deleted_at: null },
            include: {
                category: true,
                images: { orderBy: { display_order: "asc" } },
            },
        });
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog post not found." });
        }
        return res.json({ success: true, data: blog });
    }
    catch (err) {
        next(err);
    }
}
async function createBlog(req, res, next) {
    try {
        const body = req.body;
        if (!body.title) {
            return res.status(400).json({ success: false, message: "Blog title is required." });
        }
        let slug = body.slug ? (0, slugify_1.slugify)(body.slug) : (0, slugify_1.slugify)(body.title);
        const existing = await prisma_1.prisma.blog.findFirst({ where: { slug, deleted_at: null } });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }
        const blog = await prisma_1.prisma.blog.create({
            data: {
                title: body.title,
                slug,
                excerpt: body.excerpt,
                content: body.content,
                category_id: body.category_id || null,
                author_id: req.user?.id,
                author_name: body.author_name || req.user?.name || "The Luxe Yatra Editorial",
                author_bio: body.author_bio,
                author_image: body.author_image,
                reading_time: body.reading_time ? parseInt(body.reading_time) : 5,
                is_featured: Boolean(body.is_featured),
                display_order: body.display_order ? parseInt(body.display_order) : 0,
                status: body.status || "DRAFT",
                published_at: body.status === "PUBLISHED" ? new Date() : null,
                scheduled_at: body.scheduled_at ? new Date(body.scheduled_at) : null,
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
                        display_order: img.display_order ?? idx,
                        is_featured: img.is_featured || idx === 0,
                    })),
                },
            },
            include: { category: true, images: true },
        });
        await (0, auditLogger_1.logAudit)({
            userId: req.user?.id,
            action: "CREATE",
            entity: "Blog",
            entityId: blog.id,
            newData: blog,
            req,
        });
        return res.status(201).json({ success: true, data: blog });
    }
    catch (err) {
        next(err);
    }
}
async function updateBlog(req, res, next) {
    try {
        const { id } = req.params;
        const body = req.body;
        const existing = await prisma_1.prisma.blog.findFirst({ where: { id, deleted_at: null } });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Blog post not found." });
        }
        let slug = existing.slug;
        if (body.slug && body.slug !== existing.slug) {
            slug = (0, slugify_1.slugify)(body.slug);
            const duplicate = await prisma_1.prisma.blog.findFirst({
                where: { slug, id: { not: id }, deleted_at: null },
            });
            if (duplicate) {
                return res.status(400).json({ success: false, message: "Slug already in use." });
            }
        }
        if (body.images) {
            await prisma_1.prisma.blogImage.deleteMany({ where: { blog_id: id } });
        }
        const updated = await prisma_1.prisma.blog.update({
            where: { id },
            data: {
                title: body.title ?? existing.title,
                slug,
                excerpt: body.excerpt,
                content: body.content,
                category_id: body.category_id !== undefined ? body.category_id : existing.category_id,
                author_name: body.author_name ?? existing.author_name,
                author_bio: body.author_bio,
                author_image: body.author_image,
                reading_time: body.reading_time ? parseInt(body.reading_time) : existing.reading_time,
                is_featured: body.is_featured !== undefined ? Boolean(body.is_featured) : existing.is_featured,
                display_order: body.display_order ? parseInt(body.display_order) : existing.display_order,
                status: body.status ?? existing.status,
                published_at: body.status === "PUBLISHED" && existing.status !== "PUBLISHED" ? new Date() : existing.published_at,
                scheduled_at: body.scheduled_at ? new Date(body.scheduled_at) : existing.scheduled_at,
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
                            display_order: img.display_order ?? idx,
                            is_featured: img.is_featured || idx === 0,
                        })),
                    }
                    : undefined,
            },
            include: { category: true, images: true },
        });
        await (0, auditLogger_1.logAudit)({
            userId: req.user?.id,
            action: "UPDATE",
            entity: "Blog",
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
async function deleteBlog(req, res, next) {
    try {
        const { id } = req.params;
        const existing = await prisma_1.prisma.blog.findFirst({ where: { id, deleted_at: null } });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Blog post not found." });
        }
        await prisma_1.prisma.blog.update({
            where: { id },
            data: { deleted_at: new Date() },
        });
        await (0, auditLogger_1.logAudit)({
            userId: req.user?.id,
            action: "DELETE",
            entity: "Blog",
            entityId: id,
            oldData: existing,
            req,
        });
        return res.json({ success: true, message: "Blog post deleted successfully." });
    }
    catch (err) {
        next(err);
    }
}
async function toggleStatus(req, res, next) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await prisma_1.prisma.blog.update({
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
        const updated = await prisma_1.prisma.blog.update({
            where: { id },
            data: { is_featured: Boolean(is_featured) },
        });
        return res.json({ success: true, data: updated });
    }
    catch (err) {
        next(err);
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogCategories = getBlogCategories;
exports.createBlogCategory = createBlogCategory;
const prisma_1 = require("../config/prisma");
const slugify_1 = require("../utils/slugify");
async function getBlogCategories(req, res, next) {
    try {
        const categories = await prisma_1.prisma.blogCategory.findMany({
            orderBy: { display_order: "asc" },
        });
        return res.json({ success: true, data: categories });
    }
    catch (err) {
        next(err);
    }
}
async function createBlogCategory(req, res, next) {
    try {
        const { name, description, display_order } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "Category name is required." });
        }
        const slug = (0, slugify_1.slugify)(name);
        const category = await prisma_1.prisma.blogCategory.create({
            data: {
                name,
                slug,
                description,
                display_order: display_order ? parseInt(display_order) : 0,
            },
        });
        return res.status(201).json({ success: true, data: category });
    }
    catch (err) {
        next(err);
    }
}

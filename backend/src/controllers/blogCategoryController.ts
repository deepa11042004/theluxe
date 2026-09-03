import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import { slugify } from "../utils/slugify";

export async function getBlogCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { display_order: "asc" },
    });
    return res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
}

export async function createBlogCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, description, display_order } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Category name is required." });
    }

    const slug = slugify(name);
    const category = await prisma.blogCategory.create({
      data: {
        name,
        slug,
        description,
        display_order: display_order ? parseInt(display_order) : 0,
      },
    });

    return res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
}

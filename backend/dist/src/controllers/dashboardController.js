"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = getDashboardStats;
const prisma_1 = require("../config/prisma");
async function getDashboardStats(req, res, next) {
    try {
        const [totalHotels, publishedHotels, totalDestinations, publishedDestinations, totalItineraries, publishedItineraries, totalBlogs, publishedBlogs, recentHotels, recentDestinations, recentItineraries, recentBlogs,] = await Promise.all([
            prisma_1.prisma.hotel.count({ where: { deleted_at: null } }),
            prisma_1.prisma.hotel.count({ where: { status: "PUBLISHED", deleted_at: null } }),
            prisma_1.prisma.destination.count({ where: { deleted_at: null } }),
            prisma_1.prisma.destination.count({ where: { status: "PUBLISHED", deleted_at: null } }),
            prisma_1.prisma.itinerary.count({ where: { deleted_at: null } }),
            prisma_1.prisma.itinerary.count({ where: { status: "PUBLISHED", deleted_at: null } }),
            prisma_1.prisma.blog.count({ where: { deleted_at: null } }),
            prisma_1.prisma.blog.count({ where: { status: "PUBLISHED", deleted_at: null } }),
            prisma_1.prisma.hotel.findMany({
                where: { deleted_at: null },
                take: 5,
                orderBy: { updated_at: "desc" },
                select: { id: true, name: true, city: true, status: true, updated_at: true },
            }),
            prisma_1.prisma.destination.findMany({
                where: { deleted_at: null },
                take: 5,
                orderBy: { updated_at: "desc" },
                select: { id: true, name: true, country: true, status: true, updated_at: true },
            }),
            prisma_1.prisma.itinerary.findMany({
                where: { deleted_at: null },
                take: 5,
                orderBy: { updated_at: "desc" },
                select: { id: true, title: true, days: true, status: true, updated_at: true },
            }),
            prisma_1.prisma.blog.findMany({
                where: { deleted_at: null },
                take: 5,
                orderBy: { updated_at: "desc" },
                select: { id: true, title: true, author_name: true, status: true, updated_at: true },
            }),
        ]);
        return res.json({
            success: true,
            data: {
                stats: {
                    hotels: { total: totalHotels, published: publishedHotels },
                    destinations: { total: totalDestinations, published: publishedDestinations },
                    itineraries: { total: totalItineraries, published: publishedItineraries },
                    blogs: { total: totalBlogs, published: publishedBlogs },
                },
                recent: {
                    hotels: recentHotels,
                    destinations: recentDestinations,
                    itineraries: recentItineraries,
                    blogs: recentBlogs,
                },
            },
        });
    }
    catch (err) {
        next(err);
    }
}

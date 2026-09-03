"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const authCtrl = __importStar(require("../controllers/authController"));
const hotelCtrl = __importStar(require("../controllers/hotelController"));
const destCtrl = __importStar(require("../controllers/destinationController"));
const itinCtrl = __importStar(require("../controllers/itineraryController"));
const blogCtrl = __importStar(require("../controllers/blogController"));
const blogCatCtrl = __importStar(require("../controllers/blogCategoryController"));
const mediaCtrl = __importStar(require("../controllers/mediaController"));
const userCtrl = __importStar(require("../controllers/userController"));
const dashCtrl = __importStar(require("../controllers/dashboardController"));
const router = (0, express_1.Router)();
// Auth Routes (Public)
router.post("/auth/login", authCtrl.login);
router.post("/auth/logout", authCtrl.logout);
// Protected Admin Routes
router.use(auth_1.authenticateToken);
router.get("/auth/me", authCtrl.getMe);
router.post("/auth/refresh", authCtrl.refresh);
router.put("/auth/password", authCtrl.updatePassword);
// Dashboard
router.get("/dashboard", (0, auth_1.requirePermission)("dashboard.view"), dashCtrl.getDashboardStats);
// Hotels
router.get("/hotels", (0, auth_1.requirePermission)("hotel.view"), hotelCtrl.getHotels);
router.get("/hotels/:id", (0, auth_1.requirePermission)("hotel.view"), hotelCtrl.getHotelById);
router.post("/hotels", (0, auth_1.requirePermission)("hotel.create"), hotelCtrl.createHotel);
router.put("/hotels/:id", (0, auth_1.requirePermission)("hotel.update"), hotelCtrl.updateHotel);
router.delete("/hotels/:id", (0, auth_1.requirePermission)("hotel.delete"), hotelCtrl.deleteHotel);
router.patch("/hotels/:id/status", (0, auth_1.requirePermission)("hotel.publish"), hotelCtrl.toggleStatus);
router.patch("/hotels/:id/featured", (0, auth_1.requirePermission)("hotel.update"), hotelCtrl.toggleFeatured);
// Destinations
router.get("/destinations", (0, auth_1.requirePermission)("destination.view"), destCtrl.getDestinations);
router.get("/destinations/:id", (0, auth_1.requirePermission)("destination.view"), destCtrl.getDestinationById);
router.post("/destinations", (0, auth_1.requirePermission)("destination.create"), destCtrl.createDestination);
router.put("/destinations/:id", (0, auth_1.requirePermission)("destination.update"), destCtrl.updateDestination);
router.delete("/destinations/:id", (0, auth_1.requirePermission)("destination.delete"), destCtrl.deleteDestination);
router.patch("/destinations/:id/status", (0, auth_1.requirePermission)("destination.publish"), destCtrl.toggleStatus);
router.patch("/destinations/:id/featured", (0, auth_1.requirePermission)("destination.update"), destCtrl.toggleFeatured);
// Itineraries
router.get("/itineraries", (0, auth_1.requirePermission)("itinerary.view"), itinCtrl.getItineraries);
router.get("/itineraries/:id", (0, auth_1.requirePermission)("itinerary.view"), itinCtrl.getItineraryById);
router.post("/itineraries", (0, auth_1.requirePermission)("itinerary.create"), itinCtrl.createItinerary);
router.put("/itineraries/:id", (0, auth_1.requirePermission)("itinerary.update"), itinCtrl.updateItinerary);
router.delete("/itineraries/:id", (0, auth_1.requirePermission)("itinerary.delete"), itinCtrl.deleteItinerary);
router.patch("/itineraries/:id/status", (0, auth_1.requirePermission)("itinerary.publish"), itinCtrl.toggleStatus);
router.patch("/itineraries/:id/featured", (0, auth_1.requirePermission)("itinerary.update"), itinCtrl.toggleFeatured);
// Blogs & Blog Categories
router.get("/blog-categories", blogCatCtrl.getBlogCategories);
router.post("/blog-categories", (0, auth_1.requirePermission)("blog.create"), blogCatCtrl.createBlogCategory);
router.get("/blogs", (0, auth_1.requirePermission)("blog.view"), blogCtrl.getBlogs);
router.get("/blogs/:id", (0, auth_1.requirePermission)("blog.view"), blogCtrl.getBlogById);
router.post("/blogs", (0, auth_1.requirePermission)("blog.create"), blogCtrl.createBlog);
router.put("/blogs/:id", (0, auth_1.requirePermission)("blog.update"), blogCtrl.updateBlog);
router.delete("/blogs/:id", (0, auth_1.requirePermission)("blog.delete"), blogCtrl.deleteBlog);
router.patch("/blogs/:id/status", (0, auth_1.requirePermission)("blog.publish"), blogCtrl.toggleStatus);
router.patch("/blogs/:id/featured", (0, auth_1.requirePermission)("blog.update"), blogCtrl.toggleFeatured);
// Media Library
router.get("/media", (0, auth_1.requirePermission)("media.view"), mediaCtrl.getMedia);
router.post("/media", (0, auth_1.requirePermission)("media.upload"), upload_1.upload.single("file"), mediaCtrl.uploadMedia);
router.delete("/media/:id", (0, auth_1.requirePermission)("media.delete"), mediaCtrl.deleteMedia);
// Users (Super Admin Only)
router.get("/users", (0, auth_1.requirePermission)("user.view"), userCtrl.getUsers);
router.post("/users", (0, auth_1.requirePermission)("user.create"), userCtrl.createUser);
router.put("/users/:id", (0, auth_1.requirePermission)("user.update"), userCtrl.updateUser);
router.delete("/users/:id", (0, auth_1.requirePermission)("user.delete"), userCtrl.deleteUser);
exports.default = router;

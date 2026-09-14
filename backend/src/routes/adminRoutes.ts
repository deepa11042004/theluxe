import { Router } from "express";
import { authenticateToken, requirePermission } from "../middleware/auth";
import { upload } from "../middleware/upload";
import * as authCtrl from "../controllers/authController";
import * as hotelCtrl from "../controllers/hotelController";
import * as destCtrl from "../controllers/destinationController";
import * as itinCtrl from "../controllers/itineraryController";
import * as blogCtrl from "../controllers/blogController";
import * as blogCatCtrl from "../controllers/blogCategoryController";
import * as mediaCtrl from "../controllers/mediaController";
import * as userCtrl from "../controllers/userController";
import * as dashCtrl from "../controllers/dashboardController";

const router = Router();

// Auth Routes (Public)
router.post("/auth/login", authCtrl.login);
router.post("/auth/logout", authCtrl.logout);

// Protected Admin Routes
router.use(authenticateToken);

router.get("/auth/me", authCtrl.getMe);
router.post("/auth/refresh", authCtrl.refresh);
router.put("/auth/password", authCtrl.updatePassword);

// Dashboard
router.get("/dashboard", requirePermission("dashboard.view"), dashCtrl.getDashboardStats);

// Hotels
router.get("/hotels", requirePermission("hotel.view"), hotelCtrl.getHotels);
router.get("/hotels/:id", requirePermission("hotel.view"), hotelCtrl.getHotelById);
router.post("/hotels", requirePermission("hotel.create"), hotelCtrl.createHotel);
router.put("/hotels/:id", requirePermission("hotel.update"), hotelCtrl.updateHotel);
router.delete("/hotels/:id", requirePermission("hotel.delete"), hotelCtrl.deleteHotel);
router.patch("/hotels/:id/status", requirePermission("hotel.publish"), hotelCtrl.toggleStatus);
router.patch("/hotels/:id/featured", requirePermission("hotel.update"), hotelCtrl.toggleFeatured);

// Destinations
router.get("/destinations", requirePermission("destination.view"), destCtrl.getDestinations);
router.get("/destinations/:id", requirePermission("destination.view"), destCtrl.getDestinationById);
router.post("/destinations", requirePermission("destination.create"), destCtrl.createDestination);
router.put("/destinations/:id", requirePermission("destination.update"), destCtrl.updateDestination);
router.delete("/destinations/:id", requirePermission("destination.delete"), destCtrl.deleteDestination);
router.patch("/destinations/:id/status", requirePermission("destination.publish"), destCtrl.toggleStatus);
router.patch("/destinations/:id/featured", requirePermission("destination.update"), destCtrl.toggleFeatured);

// Itineraries
router.get("/itineraries", requirePermission("itinerary.view"), itinCtrl.getItineraries);
router.get("/itineraries/:id", requirePermission("itinerary.view"), itinCtrl.getItineraryById);
router.post("/itineraries", requirePermission("itinerary.create"), itinCtrl.createItinerary);
router.put("/itineraries/:id", requirePermission("itinerary.update"), itinCtrl.updateItinerary);
router.delete("/itineraries/:id", requirePermission("itinerary.delete"), itinCtrl.deleteItinerary);
router.patch("/itineraries/:id/status", requirePermission("itinerary.publish"), itinCtrl.toggleStatus);
router.patch("/itineraries/:id/featured", requirePermission("itinerary.update"), itinCtrl.toggleFeatured);

// Blogs & Blog Categories
router.get("/blog-categories", blogCatCtrl.getBlogCategories);
router.post("/blog-categories", requirePermission("blog.create"), blogCatCtrl.createBlogCategory);

router.get("/blogs", requirePermission("blog.view"), blogCtrl.getBlogs);
router.get("/blogs/:id", requirePermission("blog.view"), blogCtrl.getBlogById);
router.post("/blogs", requirePermission("blog.create"), blogCtrl.createBlog);
router.put("/blogs/:id", requirePermission("blog.update"), blogCtrl.updateBlog);
router.delete("/blogs/:id", requirePermission("blog.delete"), blogCtrl.deleteBlog);
router.patch("/blogs/:id/status", requirePermission("blog.publish"), blogCtrl.toggleStatus);
router.patch("/blogs/:id/featured", requirePermission("blog.update"), blogCtrl.toggleFeatured);

// Media Library
router.get("/media", requirePermission("media.view"), mediaCtrl.getMedia);
router.post("/media", requirePermission("media.upload"), upload.single("file"), mediaCtrl.uploadMedia);
router.delete("/media/:id", requirePermission("media.delete"), mediaCtrl.deleteMedia);

// Users (Super Admin Only)
router.get("/users", requirePermission("user.view"), userCtrl.getUsers);
router.post("/users", requirePermission("user.create"), userCtrl.createUser);
router.put("/users/:id", requirePermission("user.update"), userCtrl.updateUser);
router.delete("/users/:id", requirePermission("user.delete"), userCtrl.deleteUser);

export default router;

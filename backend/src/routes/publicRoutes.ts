import { Router } from "express";
import * as pubCtrl from "../controllers/publicController";

const router = Router();

// Public Hotels
router.get("/hotels", pubCtrl.getPublicHotels);
router.get("/hotels/:slug", pubCtrl.getPublicHotelBySlug);

// Public Destinations
router.get("/destinations", pubCtrl.getPublicDestinations);
router.get("/destinations/:slug", pubCtrl.getPublicDestinationBySlug);

// Public Itineraries
router.get("/itineraries", pubCtrl.getPublicItineraries);
router.get("/itineraries/:slug", pubCtrl.getPublicItineraryBySlug);

// Public Blogs
router.get("/blogs", pubCtrl.getPublicBlogs);
router.get("/blogs/:slug", pubCtrl.getPublicBlogBySlug);

export default router;

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
router.get("/itineraries/:slug/days", pubCtrl.getPublicItineraryDays);
router.get("/itineraries/:slug/attractions", pubCtrl.getPublicItineraryAttractions);
router.get("/itineraries/:slug/images", pubCtrl.getPublicItineraryImages);

// Public Blogs
router.get("/blogs", pubCtrl.getPublicBlogs);
router.get("/blogs/:slug", pubCtrl.getPublicBlogBySlug);

// Public Membership & Payment Routes
import * as memberCtrl from "../controllers/membershipController";
router.get("/membership/config", memberCtrl.getMembershipConfig);
router.post("/membership/register", memberCtrl.registerMembership);
router.post("/membership/verify", memberCtrl.verifyPayment);
router.post("/membership/fail", memberCtrl.recordFailedPayment);
router.post("/membership/abandon", memberCtrl.recordAbandonedPayment);
router.post("/membership/webhook", memberCtrl.handleWebhook);

// PayU
import * as payuCtrl from "../controllers/payuController";
router.post("/membership/payu/initiate", payuCtrl.initiatePayuPayment);
router.post("/membership/payu/callback", payuCtrl.handlePayuCallback);

// Member portal (client login)
import * as portalCtrl from "../controllers/clientPortalController";
import { authenticateClient } from "../utils/clientAuth";
router.post("/client/auth/login", portalCtrl.login);
router.post("/client/auth/logout", portalCtrl.logout);
router.post("/client/auth/forgot-password", portalCtrl.forgotPassword);
router.get("/client/auth/check-token", portalCtrl.checkToken);
router.post("/client/auth/set-password", portalCtrl.setPassword);
router.get("/client/me", authenticateClient, portalCtrl.getMe);
router.put("/client/me", authenticateClient, portalCtrl.updateProfile);
router.put("/client/me/password", authenticateClient, portalCtrl.changePassword);
router.get("/client/invoices", authenticateClient, portalCtrl.getInvoices);
router.get("/client/invoices/:id/pdf", authenticateClient, portalCtrl.downloadInvoice);
router.get("/client/bookings", authenticateClient, portalCtrl.getBookings);
router.post("/client/bookings", authenticateClient, portalCtrl.createBooking);

export default router;


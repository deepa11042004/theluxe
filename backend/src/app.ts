import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import path from "path";
import adminRoutes from "./routes/adminRoutes";
import publicRoutes from "./routes/publicRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Security Headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// CORS setup
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin, or localhost, or .sslip.io domains, or FRONTEND_URL
      if (
        !origin ||
        origin.includes("localhost") ||
        origin.includes("127.0.0.1") ||
        origin.includes("sslip.io") ||
        (process.env.FRONTEND_URL && origin.includes(process.env.FRONTEND_URL))
      ) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

// Rate limiting for API protection
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { success: false, message: "Too many requests. Please try again later." },
});
app.use("/api/", limiter);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());

// Static uploads serving
app.use("/uploads", express.static(path.join(__dirname, "../../frontend/public/uploads")));

// API V1 Routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1", publicRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Global Error Handler
app.use(errorHandler);

export default app;

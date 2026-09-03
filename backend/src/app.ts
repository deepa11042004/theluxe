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
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
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

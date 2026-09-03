"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const publicRoutes_1 = __importDefault(require("./routes/publicRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
// Security Headers
app.use((0, helmet_1.default)({ crossOriginResourcePolicy: false }));
// CORS setup
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
}));
// Rate limiting for API protection
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: { success: false, message: "Too many requests. Please try again later." },
});
app.use("/api/", limiter);
app.use(express_1.default.json({ limit: "20mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "20mb" }));
app.use((0, cookie_parser_1.default)());
// Static uploads serving
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../../frontend/public/uploads")));
// API V1 Routes
app.use("/api/v1/admin", adminRoutes_1.default);
app.use("/api/v1", publicRoutes_1.default);
// Health Check
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});
// Global Error Handler
app.use(errorHandler_1.errorHandler);
exports.default = app;

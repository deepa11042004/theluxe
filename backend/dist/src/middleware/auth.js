"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
exports.requirePermission = requirePermission;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../config/prisma");
async function authenticateToken(req, res, next) {
    try {
        let token = undefined;
        // Check Authorization header
        const authHeader = req.headers["authorization"];
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
        else if (req.cookies && req.cookies.admin_token) {
            token = req.cookies.admin_token;
        }
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. Session expired or missing token.",
            });
        }
        const jwtSecret = process.env.JWT_SECRET || "default_secret";
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: decoded.userId },
            include: {
                role: {
                    include: {
                        role_permissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
            },
        });
        if (!user || user.status !== "ACTIVE") {
            return res.status(401).json({
                success: false,
                message: "User account inactive or not found.",
            });
        }
        const permissions = user.role.role_permissions.map((rp) => rp.permission.name);
        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role.name,
            permissions,
        };
        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token. Please log in again.",
        });
    }
}
function requirePermission(permissionName) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }
        // Super Admin has all permissions
        if (req.user.role === "SUPER_ADMIN") {
            return next();
        }
        if (!req.user.permissions.includes(permissionName)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: You do not have permission to perform this action (${permissionName}).`,
            });
        }
        next();
    };
}

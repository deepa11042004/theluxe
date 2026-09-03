"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.logout = logout;
exports.getMe = getMe;
exports.refresh = refresh;
exports.updatePassword = updatePassword;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../config/prisma");
const auditLogger_1 = require("../utils/auditLogger");
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }
        const user = await prisma_1.prisma.user.findUnique({
            where: { email },
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
                message: "Invalid email or password.",
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }
        // Update last login
        await prisma_1.prisma.user.update({
            where: { id: user.id },
            data: { last_login_at: new Date() },
        });
        const jwtSecret = process.env.JWT_SECRET || "default_secret";
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwtSecret, { expiresIn: "7d" });
        // Set cookie
        res.cookie("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const permissions = user.role.role_permissions.map((rp) => rp.permission.name);
        await (0, auditLogger_1.logAudit)({
            userId: user.id,
            action: "LOGIN",
            entity: "User",
            entityId: user.id,
            req,
        });
        return res.json({
            success: true,
            message: "Login successful.",
            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role.name,
                    permissions,
                },
            },
        });
    }
    catch (err) {
        next(err);
    }
}
async function logout(req, res, next) {
    try {
        if (req.user) {
            await (0, auditLogger_1.logAudit)({
                userId: req.user.id,
                action: "LOGOUT",
                entity: "User",
                entityId: req.user.id,
                req,
            });
        }
        res.clearCookie("admin_token");
        return res.json({
            success: true,
            message: "Logged out successfully.",
        });
    }
    catch (err) {
        next(err);
    }
}
async function getMe(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        return res.json({
            success: true,
            data: req.user,
        });
    }
    catch (err) {
        next(err);
    }
}
async function refresh(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const jwtSecret = process.env.JWT_SECRET || "default_secret";
        const token = jsonwebtoken_1.default.sign({ userId: req.user.id }, jwtSecret, { expiresIn: "7d" });
        res.cookie("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.json({
            success: true,
            data: {
                token,
                user: req.user,
            },
        });
    }
    catch (err) {
        next(err);
    }
}
async function updatePassword(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required.",
            });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 6 characters long.",
            });
        }
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: req.user.id },
        });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcryptjs_1.default.compare(currentPassword, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect current password.",
            });
        }
        const newPasswordHash = await bcryptjs_1.default.hash(newPassword, 10);
        await prisma_1.prisma.user.update({
            where: { id: user.id },
            data: { password_hash: newPasswordHash },
        });
        await (0, auditLogger_1.logAudit)({
            userId: user.id,
            action: "PASSWORD_CHANGE",
            entity: "User",
            entityId: user.id,
            req,
        });
        return res.json({
            success: true,
            message: "Password updated successfully.",
        });
    }
    catch (err) {
        next(err);
    }
}

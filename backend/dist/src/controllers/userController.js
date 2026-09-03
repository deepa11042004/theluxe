"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../config/prisma");
const auditLogger_1 = require("../utils/auditLogger");
async function getUsers(req, res, next) {
    try {
        const users = await prisma_1.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                last_login_at: true,
                created_at: true,
                role: { select: { id: true, name: true, description: true } },
            },
            orderBy: { created_at: "desc" },
        });
        const roles = await prisma_1.prisma.role.findMany({
            select: { id: true, name: true, description: true },
        });
        return res.json({ success: true, data: { users, roles } });
    }
    catch (err) {
        next(err);
    }
}
async function createUser(req, res, next) {
    try {
        const { name, email, password, role_id } = req.body;
        if (!name || !email || !password || !role_id) {
            return res.status(400).json({ success: false, message: "Name, email, password, and role are required." });
        }
        const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(400).json({ success: false, message: "User with this email already exists." });
        }
        const password_hash = await bcryptjs_1.default.hash(password, 10);
        const newUser = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password_hash,
                role_id,
                status: "ACTIVE",
            },
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                created_at: true,
                role: { select: { name: true } },
            },
        });
        await (0, auditLogger_1.logAudit)({
            userId: req.user?.id,
            action: "USER_CREATE",
            entity: "User",
            entityId: newUser.id,
            newData: newUser,
            req,
        });
        return res.status(201).json({ success: true, data: newUser });
    }
    catch (err) {
        next(err);
    }
}
async function updateUser(req, res, next) {
    try {
        const { id } = req.params;
        const { name, role_id, status, password } = req.body;
        const data = {};
        if (name)
            data.name = name;
        if (role_id)
            data.role_id = role_id;
        if (status)
            data.status = status;
        if (password && password.length >= 6) {
            data.password_hash = await bcryptjs_1.default.hash(password, 10);
        }
        const updated = await prisma_1.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                role: { select: { name: true } },
            },
        });
        await (0, auditLogger_1.logAudit)({
            userId: req.user?.id,
            action: "USER_UPDATE",
            entity: "User",
            entityId: id,
            newData: updated,
            req,
        });
        return res.json({ success: true, data: updated });
    }
    catch (err) {
        next(err);
    }
}
async function deleteUser(req, res, next) {
    try {
        const { id } = req.params;
        if (id === req.user?.id) {
            return res.status(400).json({ success: false, message: "Cannot delete your own admin account." });
        }
        await prisma_1.prisma.user.delete({ where: { id } });
        await (0, auditLogger_1.logAudit)({
            userId: req.user?.id,
            action: "USER_DELETE",
            entity: "User",
            entityId: id,
            req,
        });
        return res.json({ success: true, message: "User deleted successfully." });
    }
    catch (err) {
        next(err);
    }
}

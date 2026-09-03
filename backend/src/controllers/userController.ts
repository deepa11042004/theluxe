import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { logAudit } from "../utils/auditLogger";

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await prisma.user.findMany({
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

    const roles = await prisma.role.findMany({
      select: { id: true, name: true, description: true },
    });

    return res.json({ success: true, data: { users, roles } });
  } catch (err) {
    next(err);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password, role_id } = req.body;
    if (!name || !email || !password || !role_id) {
      return res.status(400).json({ success: false, message: "Name, email, password, and role are required." });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ success: false, message: "User with this email already exists." });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
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

    await logAudit({
      userId: req.user?.id,
      action: "USER_CREATE",
      entity: "User",
      entityId: newUser.id,
      newData: newUser,
      req,
    });

    return res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { name, role_id, status, password } = req.body;

    const data: any = {};
    if (name) data.name = name;
    if (role_id) data.role_id = role_id;
    if (status) data.status = status;
    if (password && password.length >= 6) {
      data.password_hash = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.user.update({
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

    await logAudit({
      userId: req.user?.id,
      action: "USER_UPDATE",
      entity: "User",
      entityId: id,
      newData: updated,
      req,
    });

    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (id === req.user?.id) {
      return res.status(400).json({ success: false, message: "Cannot delete your own admin account." });
    }

    await prisma.user.delete({ where: { id } });

    await logAudit({
      userId: req.user?.id,
      action: "USER_DELETE",
      entity: "User",
      entityId: id,
      req,
    });

    return res.json({ success: true, message: "User deleted successfully." });
  } catch (err) {
    next(err);
  }
}

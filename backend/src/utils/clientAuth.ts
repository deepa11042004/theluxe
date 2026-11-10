import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";

export const CLIENT_COOKIE = "client_token";
const SESSION_DAYS = 7;
export const SET_PASSWORD_TTL_MIN = 7 * 24 * 60; // link in the welcome email
export const RESET_PASSWORD_TTL_MIN = 60; // forgot-password link

// Only paid (or lapsed) members have a portal; pending / cancelled applications do not.
export const PORTAL_STATUSES = ["ACTIVE", "EXPIRED"];

export interface AuthenticatedClient {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      client?: AuthenticatedClient;
    }
  }
}

export function normalizeEmail(value: unknown): string {
  return String(value || "").trim().toLowerCase();
}

export function validatePassword(password: unknown): string | null {
  if (typeof password !== "string") return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (password.length > 72) return "Password must be at most 72 characters.";
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) return "Password must contain both letters and numbers.";
  return null;
}

export const hashPassword = (password: string) => bcrypt.hash(password, 12);

// Used to keep the response time similar whether or not the account exists
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);
export async function burnPasswordCheck(password: string): Promise<void> {
  await bcrypt.compare(password, DUMMY_HASH);
}

function jwtSecret(): string {
  return process.env.JWT_SECRET || "default_secret";
}

export function setSessionCookie(res: Response, client: { id: string; password_set_at: Date | null }): void {
  // pa = when the password was last set; changing the password therefore signs out every other session
  const token = jwt.sign({ clientId: client.id, typ: "client", pa: client.password_set_at?.getTime() ?? 0 }, jwtSecret(), {
    expiresIn: `${SESSION_DAYS}d`,
  });
  res.cookie(CLIENT_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000,
  });
}

export function clearSessionCookie(res: Response): void {
  res.clearCookie(CLIENT_COOKIE);
}

export async function authenticateClient(req: Request, res: Response, next: NextFunction) {
  const deny = () => res.status(401).json({ success: false, message: "Please sign in to continue." });
  try {
    const token = req.cookies?.[CLIENT_COOKIE];
    if (!token) return deny();

    const decoded = jwt.verify(token, jwtSecret()) as { clientId?: string; typ?: string; pa?: number };
    if (decoded.typ !== "client" || !decoded.clientId) return deny();

    const client = await prisma.client.findUnique({ where: { id: decoded.clientId } });
    if (!client || client.deleted_at || !client.password_hash || !PORTAL_STATUSES.includes(client.membership_status)) return deny();
    if ((client.password_set_at?.getTime() ?? 0) !== (decoded.pa ?? 0)) return deny();

    req.client = { id: client.id, email: client.email };
    next();
  } catch {
    return deny();
  }
}

// Everything that belongs to one person: all client records sharing the email address.
export async function getGroupClients(email: string) {
  return prisma.client.findMany({ where: { email, deleted_at: null }, orderBy: { created_at: "desc" } });
}

export function pickPrimary<T extends { membership_status: string }>(clients: T[]): T | undefined {
  return clients.find((c) => c.membership_status === "ACTIVE") || clients.find((c) => PORTAL_STATUSES.includes(c.membership_status));
}

const sha256 = (value: string) => crypto.createHash("sha256").update(value).digest("hex");

export async function createAuthToken(clientId: string, purpose: "SET_PASSWORD" | "RESET_PASSWORD", ttlMinutes: number): Promise<string> {
  const raw = crypto.randomBytes(32).toString("hex");
  // One live link per client: issuing a new one cancels the previous
  await prisma.clientAuthToken.deleteMany({ where: { client_id: clientId, used_at: null } });
  await prisma.clientAuthToken.create({
    data: {
      client_id: clientId,
      token_hash: sha256(raw),
      purpose,
      expires_at: new Date(Date.now() + ttlMinutes * 60 * 1000),
    },
  });
  return raw;
}

export async function findValidToken(raw: unknown) {
  if (typeof raw !== "string" || !/^[a-f0-9]{64}$/.test(raw)) return null;
  const record = await prisma.clientAuthToken.findUnique({ where: { token_hash: sha256(raw) }, include: { client: true } });
  if (!record || record.used_at || record.expires_at <= new Date()) return null;
  if (record.client.deleted_at || !PORTAL_STATUSES.includes(record.client.membership_status)) return null;
  return record;
}

// Marks the token used; false if someone else already used it (double-click / replay)
export async function consumeToken(id: string): Promise<boolean> {
  const res = await prisma.clientAuthToken.updateMany({ where: { id, used_at: null }, data: { used_at: new Date() } });
  return res.count === 1;
}

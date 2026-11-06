import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import fs from "fs";
import { z } from "zod";
import { prisma } from "../config/prisma";
import { sendAutomatedEmail } from "../utils/emailService";
import { regenerateInvoicePdf } from "../utils/invoicePdf";
import { isBlocked, recordAttempt, clearAttempts } from "../utils/attemptLimiter";
import { COMPANY_CONFIG } from "../utils/pricing";
import { getSiteUrl } from "../utils/siteUrl";
import {
  PORTAL_STATUSES,
  RESET_PASSWORD_TTL_MIN,
  SET_PASSWORD_TTL_MIN,
  burnPasswordCheck,
  clearSessionCookie,
  consumeToken,
  createAuthToken,
  findValidToken,
  getGroupClients,
  hashPassword,
  normalizeEmail,
  pickPrimary,
  setSessionCookie,
  validatePassword,
} from "../utils/clientAuth";

const MIN = 60 * 1000;
const HOUR = 60 * MIN;

const fullName = (c: { salutation: string; first_name: string; last_name: string }) => `${c.salutation} ${c.first_name} ${c.last_name}`.trim();
const fail = (res: Response, status: number, message: string) => res.status(status).json({ success: false, message });

// ---------------------------------------------------------------- auth

export async function login(req: Request, res: Response) {
  try {
    const email = normalizeEmail(req.body?.email);
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (!email || !password) return fail(res, 400, "Email and password are required.");

    const key = `client-login:${email}`;
    if (isBlocked(key, 8)) return fail(res, 429, "Too many failed attempts. Please wait 15 minutes or reset your password.");

    const clients = await getGroupClients(email);
    const eligible = clients.filter((c) => c.password_hash && PORTAL_STATUSES.includes(c.membership_status));

    let matched = false;
    for (const c of eligible) {
      if (await bcrypt.compare(password, c.password_hash as string)) {
        matched = true;
        break;
      }
    }
    if (!eligible.length) await burnPasswordCheck(password);

    if (!matched) {
      recordAttempt(key, 15 * MIN);
      return fail(res, 401, "Invalid email or password.");
    }

    clearAttempts(key);
    const primary = pickPrimary(eligible)!;
    setSessionCookie(res, primary);
    return res.json({ success: true, message: "Signed in." });
  } catch (err) {
    console.error("[ClientPortal] login error:", err);
    return fail(res, 500, "Could not sign in. Please try again.");
  }
}

export async function logout(_req: Request, res: Response) {
  clearSessionCookie(res);
  return res.json({ success: true });
}

// Sends a link to create (no password yet) or reset the password. The answer never reveals whether the email is a member.
export async function forgotPassword(req: Request, res: Response) {
  const generic = { success: true, message: "If this email belongs to a Luxe Club member, a link to set your password has been sent." };
  try {
    const email = normalizeEmail(req.body?.email);
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return fail(res, 400, "Please enter a valid email address.");

    const key = `client-forgot:${email}`;
    if (isBlocked(key, 3)) return res.json(generic);
    recordAttempt(key, HOUR);

    const clients = await getGroupClients(email);
    const primary = pickPrimary(clients);
    if (!primary) return res.json(generic);

    const hasPassword = clients.some((c) => c.password_hash);
    const purpose = hasPassword ? "RESET_PASSWORD" : "SET_PASSWORD";
    const token = await createAuthToken(primary.id, purpose, hasPassword ? RESET_PASSWORD_TTL_MIN : SET_PASSWORD_TTL_MIN);

    const result = await sendAutomatedEmail({
      recipient: primary.email,
      templateType: hasPassword ? "CLIENT_RESET_PASSWORD" : "CLIENT_SET_PASSWORD",
      clientId: primary.id,
      data: {
        clientName: fullName(primary),
        membershipPlan: primary.membership_plan,
        actionUrl: `${getSiteUrl()}/set-password?token=${token}`,
      },
    });
    if (!result.success) console.error("[ClientPortal] forgot-password email failed:", result.error);

    return res.json(generic);
  } catch (err) {
    console.error("[ClientPortal] forgotPassword error:", err);
    return res.json(generic);
  }
}

export async function checkToken(req: Request, res: Response) {
  const record = await findValidToken(req.query.token);
  if (!record) return res.json({ success: true, data: { valid: false } });
  return res.json({ success: true, data: { valid: true, purpose: record.purpose } });
}

export async function setPassword(req: Request, res: Response) {
  try {
    const record = await findValidToken(req.body?.token);
    if (!record) return fail(res, 400, "This link is invalid or has expired. Please request a new one.");

    const problem = validatePassword(req.body?.password);
    if (problem) return fail(res, 400, problem);

    if (!(await consumeToken(record.id))) return fail(res, 400, "This link has already been used. Please request a new one.");

    const passwordHash = await hashPassword(req.body.password);
    const now = new Date();
    // One password per person: every client record that shares the email gets it
    await prisma.client.updateMany({
      where: { email: record.client.email },
      data: { password_hash: passwordHash, password_set_at: now },
    });
    await prisma.clientAuthToken.updateMany({
      where: { client: { email: record.client.email }, used_at: null },
      data: { used_at: now },
    });

    const group = await getGroupClients(record.client.email);
    const primary = pickPrimary(group) || record.client;
    setSessionCookie(res, { id: primary.id, password_set_at: now });
    return res.json({ success: true, message: "Password saved. You are now signed in." });
  } catch (err) {
    console.error("[ClientPortal] setPassword error:", err);
    return fail(res, 500, "Could not save the password. Please try again.");
  }
}

// ---------------------------------------------------------------- profile

export async function getMe(req: Request, res: Response) {
  try {
    const group = await getGroupClients(req.client!.email);
    const me = group.find((c) => c.id === req.client!.id)!;
    const memberships = group
      .filter((c) => PORTAL_STATUSES.includes(c.membership_status))
      .map((c) => ({
        id: c.id,
        client_code: c.client_code,
        membership_plan: c.membership_plan,
        membership_number: c.membership_number,
        membership_status: c.membership_status,
        membership_activated_at: c.membership_activated_at,
        membership_expires_at: c.membership_expires_at,
        latest_payment_status: c.latest_payment_status,
      }));

    return res.json({
      success: true,
      data: {
        email: me.email,
        salutation: me.salutation,
        first_name: me.first_name,
        last_name: me.last_name,
        mobile: me.mobile,
        city: me.city,
        memberships,
      },
    });
  } catch (err) {
    console.error("[ClientPortal] getMe error:", err);
    return fail(res, 500, "Could not load your profile.");
  }
}

const profileSchema = z.object({
  salutation: z.string().trim().min(1).max(20),
  first_name: z.string().trim().min(1, "First name is required").max(100),
  last_name: z.string().trim().min(1, "Last name is required").max(100),
  mobile: z.string().trim().regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid mobile number"),
  city: z.string().trim().min(1, "City is required").max(100),
});

export async function updateProfile(req: Request, res: Response) {
  try {
    const parsed = profileSchema.safeParse(req.body);
    if (!parsed.success) return fail(res, 400, parsed.error.issues[0]?.message || "Please check the details you entered.");

    await prisma.client.updateMany({
      where: { email: req.client!.email, membership_status: { in: PORTAL_STATUSES } },
      data: parsed.data,
    });
    return res.json({ success: true, message: "Profile updated." });
  } catch (err) {
    console.error("[ClientPortal] updateProfile error:", err);
    return fail(res, 500, "Could not update your profile.");
  }
}

export async function changePassword(req: Request, res: Response) {
  try {
    const current = typeof req.body?.current_password === "string" ? req.body.current_password : "";
    const next = req.body?.new_password;

    const key = `client-pwchange:${req.client!.id}`;
    if (isBlocked(key, 5)) return fail(res, 429, "Too many attempts. Please try again later.");

    const client = await prisma.client.findUnique({ where: { id: req.client!.id } });
    if (!client?.password_hash || !(await bcrypt.compare(current, client.password_hash))) {
      recordAttempt(key, 15 * MIN);
      return fail(res, 400, "Your current password is incorrect.");
    }
    const problem = validatePassword(next);
    if (problem) return fail(res, 400, problem);

    clearAttempts(key);
    const now = new Date();
    await prisma.client.updateMany({ where: { email: client.email }, data: { password_hash: await hashPassword(next), password_set_at: now } });
    // The new password signs out other devices; keep this one signed in
    setSessionCookie(res, { id: client.id, password_set_at: now });
    return res.json({ success: true, message: "Password changed." });
  } catch (err) {
    console.error("[ClientPortal] changePassword error:", err);
    return fail(res, 500, "Could not change the password.");
  }
}

// ---------------------------------------------------------------- invoices

export async function getInvoices(req: Request, res: Response) {
  try {
    const group = await getGroupClients(req.client!.email);
    const invoices = await prisma.invoice.findMany({
      where: { client_id: { in: group.map((c) => c.id) }, status: { not: "CANCELLED" } },
      orderBy: { invoice_date: "desc" },
      select: {
        id: true,
        invoice_number: true,
        invoice_date: true,
        paid_date: true,
        invoice_type: true,
        status: true,
        membership_plan: true,
        total_amount: true,
        currency: true,
      },
    });
    return res.json({ success: true, data: invoices });
  } catch (err) {
    console.error("[ClientPortal] getInvoices error:", err);
    return fail(res, 500, "Could not load your invoices.");
  }
}

export async function downloadInvoice(req: Request, res: Response) {
  try {
    const group = await getGroupClients(req.client!.email);
    const invoice = await prisma.invoice.findFirst({
      where: { id: req.params.id, client_id: { in: group.map((c) => c.id) }, status: { not: "CANCELLED" } },
      select: { id: true, invoice_number: true },
    });
    if (!invoice) return fail(res, 404, "Invoice not found.");

    const { filePath } = await regenerateInvoicePdf(invoice.id);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${invoice.invoice_number}.pdf"`);
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    console.error("[ClientPortal] downloadInvoice error:", err);
    return fail(res, 500, "Could not prepare the invoice PDF.");
  }
}

// ---------------------------------------------------------------- booking requests

const dateOnly = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date")
  .transform((v) => new Date(`${v}T00:00:00.000Z`))
  .refine((d) => !Number.isNaN(d.getTime()), "Enter a valid date");

const bookingSchema = z
  .object({
    city: z.string().trim().min(2, "Please enter the city").max(255),
    hotel_name: z.string().trim().min(2, "Please enter the hotel name").max(500),
    check_in: dateOnly,
    check_out: dateOnly,
    adults: z.coerce.number().int().min(1, "At least 1 adult").max(30),
    children: z.coerce.number().int().min(0).max(30).default(0),
    rooms: z.coerce.number().int().min(1, "At least 1 room").max(15).default(1),
    budget: z.string().trim().max(255).optional().or(z.literal("")),
    contact_phone: z.string().trim().max(50).optional().or(z.literal("")),
    special_requests: z.string().trim().max(2000, "Special requests are too long (max 2000 characters)").optional().or(z.literal("")),
  })
  .superRefine((v, ctx) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    if (v.check_in < today) ctx.addIssue({ code: "custom", path: ["check_in"], message: "Check-in cannot be in the past" });
    if (v.check_out <= v.check_in) ctx.addIssue({ code: "custom", path: ["check_out"], message: "Check-out must be after check-in" });
    if ((v.check_out.getTime() - v.check_in.getTime()) / 86400000 > 60) ctx.addIssue({ code: "custom", path: ["check_out"], message: "Stays longer than 60 nights: please contact the concierge" });
  });

export async function getBookings(req: Request, res: Response) {
  try {
    const group = await getGroupClients(req.client!.email);
    const bookings = await prisma.bookingRequest.findMany({
      where: { client_id: { in: group.map((c) => c.id) } },
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        request_code: true,
        city: true,
        hotel_name: true,
        check_in: true,
        check_out: true,
        adults: true,
        children: true,
        rooms: true,
        budget: true,
        special_requests: true,
        status: true,
        created_at: true,
      },
    });
    return res.json({ success: true, data: bookings });
  } catch (err) {
    console.error("[ClientPortal] getBookings error:", err);
    return fail(res, 500, "Could not load your booking requests.");
  }
}

async function nextRequestCode(): Promise<string> {
  const last = await prisma.bookingRequest.findFirst({ orderBy: { created_at: "desc" }, select: { request_code: true } });
  const n = last ? parseInt(last.request_code.replace(/\D/g, ""), 10) : 0;
  return `BR-${String((Number.isFinite(n) ? n : 0) + 1).padStart(5, "0")}`;
}

const fmtDate = (d: Date) => d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

export async function createBooking(req: Request, res: Response) {
  try {
    const parsed = bookingSchema.safeParse(req.body);
    if (!parsed.success) return fail(res, 400, parsed.error.issues[0]?.message || "Please check the booking details.");
    const v = parsed.data;

    const key = `client-booking:${req.client!.id}`;
    if (isBlocked(key, 10)) return fail(res, 429, "You have sent several requests today. Please wait or contact the concierge.");

    // Stay requests are a member benefit: need an active membership
    const group = await getGroupClients(req.client!.email);
    const active = group.find((c) => c.id === req.client!.id && c.membership_status === "ACTIVE") || group.find((c) => c.membership_status === "ACTIVE");
    if (!active) return fail(res, 403, "An active membership is required to submit a stay request. Please contact the concierge.");

    let booking = null;
    for (let attempt = 0; attempt < 3 && !booking; attempt++) {
      try {
        booking = await prisma.bookingRequest.create({
          data: {
            request_code: await nextRequestCode(),
            client_id: active.id,
            city: v.city,
            hotel_name: v.hotel_name,
            check_in: v.check_in,
            check_out: v.check_out,
            adults: v.adults,
            children: v.children,
            rooms: v.rooms,
            budget: v.budget || null,
            contact_phone: v.contact_phone || active.mobile,
            special_requests: v.special_requests || null,
          },
        });
      } catch (e: any) {
        if (e?.code !== "P2002") throw e; // request_code collision: try the next number
      }
    }
    if (!booking) return fail(res, 500, "Could not save your request. Please try again.");

    recordAttempt(key, 24 * HOUR);

    const nights = Math.round((v.check_out.getTime() - v.check_in.getTime()) / 86400000);
    const lines: [string, string][] = [
      ["Request", booking.request_code],
      ["Member", `${fullName(active)} (${active.membership_number || active.client_code})`],
      ["City", v.city],
      ["Hotel", v.hotel_name],
      ["Check-in", fmtDate(v.check_in)],
      ["Check-out", `${fmtDate(v.check_out)} (${nights} night${nights === 1 ? "" : "s"})`],
      ["Guests", `${v.adults} adult${v.adults === 1 ? "" : "s"}${v.children ? `, ${v.children} child${v.children === 1 ? "" : "ren"}` : ""}, ${v.rooms} room${v.rooms === 1 ? "" : "s"}`],
    ];
    if (v.budget) lines.push(["Budget", v.budget]);
    lines.push(["Contact", booking.contact_phone || active.mobile]);
    if (v.special_requests) lines.push(["Special requests", v.special_requests]);

    // Emails are best effort: the request is already saved
    const base = { bookingCode: booking.request_code, bookingLines: lines, membershipPlan: active.membership_plan };
    sendAutomatedEmail({
      recipient: active.email,
      templateType: "BOOKING_REQUEST_RECEIVED",
      clientId: active.id,
      data: { ...base, clientName: fullName(active) },
    }).catch((e) => console.error("[ClientPortal] booking confirmation email failed:", e));
    sendAutomatedEmail({
      recipient: process.env.BOOKING_ALERT_EMAIL || COMPANY_CONFIG.email,
      templateType: "BOOKING_REQUEST_ADMIN_ALERT",
      clientId: active.id,
      data: { ...base, clientName: fullName(active), actionUrl: `${getSiteUrl()}/admin/requests` },
    }).catch((e) => console.error("[ClientPortal] booking admin alert email failed:", e));

    return res.status(201).json({ success: true, message: "Your request has been sent to our concierge.", data: { id: booking.id, request_code: booking.request_code } });
  } catch (err) {
    console.error("[ClientPortal] createBooking error:", err);
    return fail(res, 500, "Could not save your request. Please try again.");
  }
}

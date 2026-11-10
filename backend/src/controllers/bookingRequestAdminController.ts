import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const BOOKING_STATUSES = ["NEW", "IN_PROGRESS", "CONFIRMED", "COMPLETED", "CANCELLED"];

const paymentSelect = {
  select: { id: true, txnid: true, amount: true, status: true, gateway_payment_id: true, error_description: true, created_at: true },
  orderBy: { created_at: "desc" as const },
  take: 5,
};

const clientSelect = {
  id: true,
  client_code: true,
  salutation: true,
  first_name: true,
  last_name: true,
  email: true,
  mobile: true,
  city: true,
  membership_plan: true,
  membership_number: true,
  membership_status: true,
} as const;

export async function getBookingRequests(req: Request, res: Response) {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 15));
    const status = (req.query.status as string)?.trim();
    const search = (req.query.search as string)?.trim();

    const where: any = {};
    if (status && status !== "ALL" && BOOKING_STATUSES.includes(status)) where.status = status;
    if (search) {
      where.OR = [
        { request_code: { contains: search } },
        { city: { contains: search } },
        { hotel_name: { contains: search } },
        { client: { first_name: { contains: search } } },
        { client: { last_name: { contains: search } } },
        { client: { email: { contains: search } } },
        { client: { client_code: { contains: search } } },
        { client: { membership_number: { contains: search } } },
      ];
    }

    const [total, data, grouped] = await Promise.all([
      prisma.bookingRequest.count({ where }),
      prisma.bookingRequest.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: "desc" },
        include: { client: { select: clientSelect }, payments: paymentSelect },
      }),
      prisma.bookingRequest.groupBy({ by: ["status"], _count: { _all: true } }),
    ]);

    const counts: Record<string, number> = { NEW: 0, IN_PROGRESS: 0, CONFIRMED: 0, COMPLETED: 0, CANCELLED: 0 };
    for (const g of grouped) counts[g.status] = g._count._all;

    return res.json({
      success: true,
      data,
      counts,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) || 1 },
    });
  } catch (err: any) {
    console.error("[BookingAdmin] getBookingRequests error:", err);
    return res.status(500).json({ success: false, message: err?.message || "Failed to load booking requests." });
  }
}

export async function getBookingRequestById(req: Request, res: Response) {
  try {
    const request = await prisma.bookingRequest.findUnique({
      where: { id: req.params.id },
      include: { client: { select: clientSelect }, payments: paymentSelect },
    });
    if (!request) return res.status(404).json({ success: false, message: "Booking request not found." });
    return res.json({ success: true, data: request });
  } catch (err: any) {
    console.error("[BookingAdmin] getBookingRequestById error:", err);
    return res.status(500).json({ success: false, message: err?.message || "Failed to load the booking request." });
  }
}

export async function updateBookingRequest(req: Request, res: Response) {
  try {
    const { status, admin_notes, admin_reply, amount_due } = req.body || {};
    const data: any = {};

    if (status !== undefined) {
      if (!BOOKING_STATUSES.includes(status)) {
        return res.status(400).json({ success: false, message: `Status must be one of: ${BOOKING_STATUSES.join(", ")}.` });
      }
      data.status = status;
    }
    if (admin_notes !== undefined) {
      if (typeof admin_notes !== "string" || admin_notes.length > 5000) {
        return res.status(400).json({ success: false, message: "Notes must be text of at most 5000 characters." });
      }
      data.admin_notes = admin_notes.trim() || null;
    }
    if (admin_reply !== undefined) {
      if (typeof admin_reply !== "string" || admin_reply.length > 2000) {
        return res.status(400).json({ success: false, message: "The message to the member must be text of at most 2000 characters." });
      }
      data.admin_reply = admin_reply.trim() || null;
    }
    if (!Object.keys(data).length && amount_due === undefined) return res.status(400).json({ success: false, message: "Nothing to update." });

    const existing = await prisma.bookingRequest.findUnique({ where: { id: req.params.id }, select: { id: true, admin_reply: true, amount_due: true, payment_status: true } });
    if (!existing) return res.status(404).json({ success: false, message: "Booking request not found." });
    // Amount to pay: only while unpaid, and not while a payment is in progress
    if (amount_due !== undefined) {
      const raw = amount_due === null || amount_due === "" ? 0 : Number(amount_due);
      const amount = Math.round(raw * 100) / 100;
      if (!Number.isFinite(amount) || amount < 0 || amount > 10000000) {
        return res.status(400).json({ success: false, message: "Amount to pay must be a number up to 1,00,00,000." });
      }
      if (amount > 0 && amount < 1) {
        return res.status(400).json({ success: false, message: "Amount to pay must be at least ₹1." });
      }
      if ((existing.amount_due || 0) !== amount) {
        if (existing.payment_status === "PAID") {
          return res.status(409).json({ success: false, message: "This request is already paid, so the amount can no longer be changed." });
        }
        const inProgress = await prisma.bookingPayment.count({
          where: { booking_request_id: existing.id, status: "PENDING", created_at: { gte: new Date(Date.now() - 45 * 60 * 1000) } },
        });
        if (inProgress > 0) {
          return res.status(409).json({ success: false, message: "The member has a payment in progress. Please wait a few minutes before changing the amount." });
        }
        data.amount_due = amount > 0 ? amount : null;
        data.payment_status = amount > 0 ? "UNPAID" : "NONE";
      }
    }
    if (data.admin_reply !== undefined && data.admin_reply !== existing.admin_reply) data.replied_at = data.admin_reply ? new Date() : null;

    const updated = await prisma.bookingRequest.update({
      where: { id: req.params.id },
      data,
      include: { client: { select: clientSelect }, payments: paymentSelect },
    });
    return res.json({ success: true, message: "Request updated.", data: updated });
  } catch (err: any) {
    console.error("[BookingAdmin] updateBookingRequest error:", err);
    return res.status(500).json({ success: false, message: err?.message || "Failed to update the booking request." });
  }
}

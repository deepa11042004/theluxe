import type { Invoice } from "@prisma/client";
import { prisma } from "../config/prisma";
import { generateInvoiceNumber } from "../controllers/membershipController";
import { COMPANY_CONFIG } from "./pricing";

// GST included in the amount the member paid for a stay (same 18% treatment as membership invoices). Override with STAY_GST_RATE.
const gstRate = (): number => {
  const v = Number(process.env.STAY_GST_RATE ?? 18);
  return Number.isFinite(v) && v >= 0 && v < 100 ? v : 18;
};

const round2 = (n: number) => Math.round(n * 100) / 100;
const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

// One tax invoice per paid stay request. Safe to call repeatedly (returns the existing invoice), which also
// creates invoices for stays that were paid before invoices existed.
const inflight = new Map<string, Promise<Invoice | null>>();

export function ensureBookingInvoice(bookingId: string): Promise<Invoice | null> {
  // Concurrent calls for the same stay share one run, so a double click can never create two invoices
  let run = inflight.get(bookingId);
  if (!run) {
    run = create(bookingId).finally(() => inflight.delete(bookingId));
    inflight.set(bookingId, run);
  }
  return run;
}

async function create(bookingId: string): Promise<Invoice | null> {
  const existing = await prisma.invoice.findFirst({ where: { booking_request_id: bookingId } });
  if (existing) return existing;

  const booking = await prisma.bookingRequest.findUnique({ where: { id: bookingId }, include: { client: true } });
  if (!booking || booking.payment_status !== "PAID") return null;

  const payment = await prisma.bookingPayment.findFirst({
    where: { booking_request_id: bookingId, status: "SUCCESSFUL" },
    orderBy: { created_at: "asc" },
  });
  const total = round2(payment?.amount ?? booking.amount_due ?? 0);
  if (total <= 0) return null;

  const rate = gstRate();
  const taxable = round2(total / (1 + rate / 100));
  const tax = round2(total - taxable);
  const paidDate = booking.paid_at || payment?.updated_at || new Date();
  const nights = Math.max(1, Math.round((booking.check_out.getTime() - booking.check_in.getTime()) / 86400000));

  return prisma.invoice.create({
    data: {
      invoice_number: await generateInvoiceNumber(),
      client_id: booking.client_id,
      booking_request_id: booking.id,
      invoice_date: paidDate,
      paid_date: paidDate,
      invoice_type: "TAX_INVOICE",
      status: "PAID",
      membership_plan: `Stay at ${booking.hotel_name}, ${booking.city}`.slice(0, 480),
      plan_description: `Stay request ${booking.request_code}: ${fmt(booking.check_in)} to ${fmt(booking.check_out)} (${nights} night${nights === 1 ? "" : "s"}), ${booking.adults} adult${booking.adults === 1 ? "" : "s"}${booking.children ? `, ${booking.children} child${booking.children === 1 ? "" : "ren"}` : ""}, ${booking.rooms} room${booking.rooms === 1 ? "" : "s"}`,
      quantity: 1,
      unit_price: taxable,
      discount: 0,
      taxable_amount: taxable,
      tax_rate: rate,
      tax_amount: tax,
      total_amount: total,
      amount_paid: total,
      balance_due: 0,
      currency: "INR",
      company_name: booking.client.company_name,
      company_gstin: booking.client.gstin,
      seller_name: COMPANY_CONFIG.legalName,
      seller_address: COMPANY_CONFIG.address,
      seller_gstin: COMPANY_CONFIG.gstin,
      seller_email: COMPANY_CONFIG.accountsEmail,
      seller_phone: COMPANY_CONFIG.phone,
    },
  });
}


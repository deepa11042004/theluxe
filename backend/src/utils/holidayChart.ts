import { prisma } from "../config/prisma";
import { getHolidayAllowance } from "./pricing";

export interface HolidayStay {
  id: string;
  request_code: string;
  hotel_name: string;
  city: string;
  check_in: Date;
  check_out: Date;
  nights: number;
}

export interface HolidayChart {
  allowance: number; // nights included per membership year
  used: number; // nights of completed (paid) stays in the current membership year
  remaining: number;
  period_start: Date | null;
  period_end: Date | null;
  stays: HolidayStay[];
}

const nightsBetween = (a: Date, b: Date) => Math.max(0, Math.round((b.getTime() - a.getTime()) / 86400000));

// Nights given by the membership plan and how many of them were used by completed (paid) stay requests
// during the current membership year.
export async function buildHolidayChart(client: {
  id: string;
  membership_plan: string;
  membership_activated_at: Date | null;
  membership_expires_at: Date | null;
}): Promise<HolidayChart> {
  const start = client.membership_activated_at;
  const end = client.membership_expires_at;

  const where: any = { client_id: client.id, status: "COMPLETED" };
  if (start || end) where.check_in = { ...(start ? { gte: start } : {}), ...(end ? { lte: end } : {}) };

  const bookings = await prisma.bookingRequest.findMany({ where, orderBy: { check_in: "desc" } });
  const stays: HolidayStay[] = bookings.map((b) => ({
    id: b.id,
    request_code: b.request_code,
    hotel_name: b.hotel_name,
    city: b.city,
    check_in: b.check_in,
    check_out: b.check_out,
    nights: nightsBetween(b.check_in, b.check_out),
  }));

  const allowance = getHolidayAllowance(client.membership_plan);
  const used = stays.reduce((n, s) => n + s.nights, 0);
  return { allowance, used, remaining: Math.max(0, allowance - used), period_start: start, period_end: end, stays };
}

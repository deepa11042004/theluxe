// Public base URL of the website, used for links inside emails (set-password, member portal, payment retry).
// SITE_URL overrides everything; otherwise production uses the real domain and development uses the local frontend.
export function getSiteUrl(): string {
  const configured = String(process.env.SITE_URL || "").trim().replace(/\/+$/, "");
  if (/^https?:\/\/[^/\s]+$/i.test(configured)) return configured;
  // Development: Next.js' default port. If your frontend runs elsewhere, set SITE_URL in backend/.env.
  return process.env.NODE_ENV === "production" ? "https://theluxeyatra.com" : "http://localhost:3000";
}

import { prisma } from "../config/prisma";
import { createAuthToken, SET_PASSWORD_TTL_MIN } from "./clientAuth";
import { getSiteUrl } from "./siteUrl";

// Button shown in the welcome email: members who have no password yet get a one-time "create password" link,
// everyone else a plain link to the sign-in page.
export async function getWelcomePortalLink(client: { id: string; email: string }): Promise<{ loginUrl: string; loginLabel: string }> {
  const site = getSiteUrl();
  try {
    const hasPassword = await prisma.client.findFirst({ where: { email: client.email, password_hash: { not: null } }, select: { id: true } });
    if (hasPassword) return { loginUrl: `${site}/login`, loginLabel: "Access Member Portal" };

    const token = await createAuthToken(client.id, "SET_PASSWORD", SET_PASSWORD_TTL_MIN);
    return { loginUrl: `${site}/set-password?token=${token}`, loginLabel: "Create Your Password" };
  } catch (err) {
    console.error("[PortalLinks] Could not create a set-password link, falling back to the login page:", err);
    return { loginUrl: `${site}/login`, loginLabel: "Access Member Portal" };
  }
}

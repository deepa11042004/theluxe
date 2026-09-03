import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const PERMISSIONS = [
  "dashboard.view",
  "hotel.view",
  "hotel.create",
  "hotel.update",
  "hotel.delete",
  "hotel.publish",
  "destination.view",
  "destination.create",
  "destination.update",
  "destination.delete",
  "destination.publish",
  "itinerary.view",
  "itinerary.create",
  "itinerary.update",
  "itinerary.delete",
  "itinerary.publish",
  "blog.view",
  "blog.create",
  "blog.update",
  "blog.delete",
  "blog.publish",
  "media.view",
  "media.upload",
  "media.update",
  "media.delete",
  "user.view",
  "user.create",
  "user.update",
  "user.delete",
  "profile.view",
  "profile.update",
  "audit.view",
];

const BLOG_CATEGORIES = [
  { name: "Destinations", slug: "destinations" },
  { name: "Privileges", slug: "privileges" },
  { name: "Lifestyle", slug: "lifestyle" },
  { name: "Press", slug: "press" },
  { name: "Curated Journeys", slug: "curated-journeys" },
  { name: "Global Insights", slug: "global-insights" },
  { name: "Member Benefits", slug: "member-benefits" },
];

async function main() {
  console.log("Seeding Phase 1 data...");

  // 1. Permissions
  const permMap = new Map<string, string>();
  for (const permName of PERMISSIONS) {
    const perm = await prisma.permission.upsert({
      where: { name: permName },
      update: {},
      create: {
        name: permName,
        description: `Permission for ${permName}`,
      },
    });
    permMap.set(permName, perm.id);
  }

  // 2. Roles
  const superAdminRole = await prisma.role.upsert({
    where: { name: "SUPER_ADMIN" },
    update: {},
    create: {
      name: "SUPER_ADMIN",
      description: "Super Administrator with full access",
    },
  });

  const contentManagerRole = await prisma.role.upsert({
    where: { name: "CONTENT_MANAGER" },
    update: {},
    create: {
      name: "CONTENT_MANAGER",
      description: "Can manage and publish all content",
    },
  });

  const editorRole = await prisma.role.upsert({
    where: { name: "EDITOR" },
    update: {},
    create: {
      name: "EDITOR",
      description: "Can create and edit draft content",
    },
  });

  // 3. Assign Role Permissions
  // Super Admin: All
  for (const [, permId] of permMap) {
    await prisma.rolePermission.upsert({
      where: {
        role_id_permission_id: {
          role_id: superAdminRole.id,
          permission_id: permId,
        },
      },
      update: {},
      create: {
        role_id: superAdminRole.id,
        permission_id: permId,
      },
    });
  }

  // Content Manager: All except user.* and audit.view
  const contentManagerPerms = PERMISSIONS.filter(
    (p) => !p.startsWith("user.") && p !== "audit.view"
  );
  for (const permName of contentManagerPerms) {
    const permId = permMap.get(permName)!;
    await prisma.rolePermission.upsert({
      where: {
        role_id_permission_id: {
          role_id: contentManagerRole.id,
          permission_id: permId,
        },
      },
      update: {},
      create: {
        role_id: contentManagerRole.id,
        permission_id: permId,
      },
    });
  }

  // Editor: View, Create, Update, Media upload/view, Profile view/update
  const editorPerms = PERMISSIONS.filter(
    (p) =>
      p.endsWith(".view") ||
      p.endsWith(".create") ||
      p.endsWith(".update") ||
      p.endsWith(".upload")
  );
  for (const permName of editorPerms) {
    const permId = permMap.get(permName)!;
    await prisma.rolePermission.upsert({
      where: {
        role_id_permission_id: {
          role_id: editorRole.id,
          permission_id: permId,
        },
      },
      update: {},
      create: {
        role_id: editorRole.id,
        permission_id: permId,
      },
    });
  }

  // 4. Default Super Admin User
  const passwordHash = await bcrypt.hash("Admin@123456", 10);
  await prisma.user.upsert({
    where: { email: "admin@theluxeyatra.com" },
    update: { password_hash: passwordHash, role_id: superAdminRole.id },
    create: {
      name: "Super Admin",
      email: "admin@theluxeyatra.com",
      password_hash: passwordHash,
      role_id: superAdminRole.id,
      status: "ACTIVE",
    },
  });

  // 5. Blog Categories
  for (let i = 0; i < BLOG_CATEGORIES.length; i++) {
    const cat = BLOG_CATEGORIES[i];
    await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        display_order: i,
        status: "ACTIVE",
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

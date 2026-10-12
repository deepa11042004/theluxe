import { prisma } from "../config/prisma";

const NEW_PERMISSIONS = [
  "client.view",
  "client.create",
  "client.update",
  "client.delete",
  "invoice.view",
  "invoice.create",
  "invoice.update",
  "invoice.delete",
  "invoice.send",
  "email.send",
];

async function main() {
  for (const name of NEW_PERMISSIONS) {
    await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name, description: `Permission to ${name}` },
    });
  }
  console.log("Permissions seeded successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

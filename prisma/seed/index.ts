import { PrismaClient } from "@prisma/client";
import { seedCountries } from "./country.seed";
import { seedRegions } from "./region.seed";
import { seedUsers } from "./user.seed";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting database seeding...\n");

  try {
    await seedCountries(prisma);
    console.log("");

    await seedRegions(prisma);
    console.log("");

    await seedUsers(prisma);
    console.log("");

    console.log("✨ Database seeding completed successfully!");
  } catch (error) {
    console.error("💥 Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

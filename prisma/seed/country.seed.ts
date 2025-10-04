import { PrismaClient } from "@prisma/client";

export async function seedCountries(prisma: PrismaClient) {
  console.log("🌱 Seeding countries...");
  try {
    const countries = [
      {
        id: "country-vn-001",
        name: "Việt Nam",
        code: "VN",
        longitude: 108.2772,
        latitude: 14.0583,
        status: "active",
      },
    ];

    for (const country of countries) {
      await prisma.country.upsert({
        where: { id: country.id },
        update: {},
        create: country,
      });
    }

    console.log(`✅ Seeded ${countries.length} countries successfully`);
  } catch (error) {
    console.error("❌ Seeding countries failed:", error);
    throw error;
  }
}

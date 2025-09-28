import { PrismaClient } from "@prisma/client";

export async function seedCountries(prisma: PrismaClient) {
  console.log("🌱 Seeding countries...");

  const countries = [
    {
      id: "country-vn-001",
      name: "Việt Nam",
      code: "VN",
      longitude: 105.8342,
      latitude: 21.0278,
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

  console.log("✅ Countries seeded successfully");
}

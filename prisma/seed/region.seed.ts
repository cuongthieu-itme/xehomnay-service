import { PrismaClient } from "@prisma/client";

export async function seedRegions(prisma: PrismaClient) {
  console.log("🌱 Seeding regions...");
  try {
    // Verify that countries exist
    const vietnamCountry = await prisma.country.findUnique({
      where: { id: "country-vn-001" },
    });

    if (!vietnamCountry) {
      throw new Error(
        "Missing required Country: country-vn-001. Run seedCountries() first."
      );
    }

    const regions = [
      {
        id: "region-hn-001",
        name: "Hà Nội",
        countryId: "country-vn-001",
        longitude: 105.8342,
        latitude: 21.0278,
        status: "active",
      },
    ];

    for (const region of regions) {
      await prisma.region.upsert({
        where: { id: region.id },
        update: {},
        create: region,
      });
    }

    console.log(`✅ Seeded ${regions.length} regions successfully`);
  } catch (error) {
    console.error("❌ Seeding regions failed:", error);
    throw error;
  }
}

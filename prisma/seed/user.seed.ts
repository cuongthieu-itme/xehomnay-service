import { PrismaClient } from "@prisma/client";

export async function seedUsers(prisma: PrismaClient) {
  console.log("🌱 Seeding users & provider...");
  try {
    const admin = await prisma.user.upsert({
      where: { email: "admin@xehomnay.com" },
      update: {},
      create: {
        id: "admin-user-001",
        name: "Admin User",
        email: "admin@xehomnay.com",
        password:
          "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KqKqKq", // password: admin123
        role: "admin",
        status: "active",
        emailVerified: new Date(),
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
    });

    const country = await prisma.country.findUnique({
      where: { id: "country-vn-001" },
    });
    if (!country) {
      throw new Error(
        "Missing required Country: country-vn-001. Run seedCountries() first."
      );
    }

    const region = await prisma.region.findUnique({
      where: { id: "region-hn-001" },
    });
    if (!region) {
      throw new Error(
        "Missing required Region: region-hn-001. Run seedRegions() after seedCountries()."
      );
    }

    await prisma.provider.upsert({
      where: { id: "provider-001" },
      update: {},
      create: {
        id: "provider-001",
        companyName: "Xe Hôm Nay Co., Ltd",
        businessReg: "BR-001-2025",
        contactName: "Nguyễn Văn A",
        contactPhone: "+84 912 345 678",
        email: "provider@xehomnay.com",
        countryId: country.id,
        regionId: region.id,
        city: "Hà Nội",
        street: "12 Lý Thái Tổ, Hoàn Kiếm",
        longitude: 105.8342,
        latitude: 21.0278,
        avatar:
          "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=300",
        userId: admin.id,
      },
    });

    console.log("✅ Users & provider seeded successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

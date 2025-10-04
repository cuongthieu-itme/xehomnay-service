import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export async function seedUsers(prisma: PrismaClient) {
  console.log("🌱 Seeding users & providers...");
  try {
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

    // Hash password: "password123"
    const hashedPassword = await bcrypt.hash("password123", 12);

    await prisma.user.upsert({
      where: { email: "admin@xehomnay.com" },
      update: {},
      create: {
        id: "admin-user-001",
        name: "Admin Xe Hôm Nay",
        email: "admin@xehomnay.com",
        password: hashedPassword,
        role: "admin",
        status: "active",
        emailVerified: new Date(),
        image:
          "https://ui-avatars.com/api/?name=Admin&size=200&background=3b82f6&color=fff",
      },
    });

    console.log("✅ Admin created successfully");

    const provider = await prisma.user.upsert({
      where: { email: "provider@xehomnay.com" },
      update: {},
      create: {
        id: "provider-user-001",
        name: "Công ty TNHH đầu tư thương mại và du lịch TODAY TRAVEL",
        email: "provider@xehomnay.com",
        password: hashedPassword,
        role: "provider",
        status: "active",
        emailVerified: new Date(),
        image:
          "https://ui-avatars.com/api/?name=Xe+Ha+Noi&size=200&background=10b981&color=fff",
      },
    });

    await prisma.provider.upsert({
      where: { id: "provider-001" },
      update: {},
      create: {
        id: "provider-001",
        companyName: "Công ty TNHH đầu tư thương mại và du lịch TODAY TRAVEL",
        businessReg: "0852342525",
        contactName: "Phạm Thế Anh",
        contactPhone: "0852342525",
        email: provider.email,
        countryId: country.id,
        regionId: region.id,
        city: "Hà Nội",
        street: "Số 10, ngõ 253 Nguyễn Khang, phường Yên Hòa, TP. Hà Nội",
        longitude: 105.8342,
        latitude: 21.0278,
        avatar:
          "https://ui-avatars.com/api/?name=Xe+Ha+Noi&size=300&background=10b981&color=fff",
        active: true,
        userId: provider.id,
      },
    });

    console.log("✅ Provider created successfully");
    console.log("\n📝 Login credentials:");
    console.log("   Admin:    admin@xehomnay.com / password123");
    console.log("   Provider: provider@xehomnay.com / password123");
  } catch (error) {
    console.error("❌ Seeding users failed:", error);
    throw error;
  }
}

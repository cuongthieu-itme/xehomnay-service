import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRegions() {
  console.log('🌱 Seeding regions...');

  const regions = [
    {
      id: 'region-hcm-001',
      name: 'Hồ Chí Minh',
      countryId: 'country-vn-001',
      longitude: 106.6297,
      latitude: 10.8231,
      status: 'active',
    },
    {
      id: 'region-hn-001',
      name: 'Hà Nội',
      countryId: 'country-vn-001',
      longitude: 105.8342,
      latitude: 21.0278,
      status: 'active',
    },
    {
      id: 'region-ca-001',
      name: 'California',
      countryId: 'country-us-001',
      longitude: -119.4179,
      latitude: 36.7783,
      status: 'active',
    },
  ];

  for (const region of regions) {
    await prisma.region.upsert({
      where: { id: region.id },
      update: {},
      create: region,
    });
  }

  console.log('✅ Regions seeded successfully');
}

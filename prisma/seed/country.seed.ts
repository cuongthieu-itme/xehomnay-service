import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCountries() {
  console.log('🌱 Seeding countries...');

  const countries = [
    {
      id: 'country-vn-001',
      name: 'Việt Nam',
      code: 'VN',
      longitude: 105.8342,
      latitude: 21.0278,
      status: 'active',
    },
    {
      id: 'country-us-001',
      name: 'Mỹ',
      code: 'US',
      longitude: -95.7129,
      latitude: 37.0902,
      status: 'active',
    },
    {
      id: 'country-sg-001',
      name: 'Singapore',
      code: 'SG',
      longitude: 103.8198,
      latitude: 1.3521,
      status: 'active',
    },
  ];

  for (const country of countries) {
    await prisma.country.upsert({
      where: { id: country.id },
      update: {},
      create: country,
    });
  }

  console.log('✅ Countries seeded successfully');
}

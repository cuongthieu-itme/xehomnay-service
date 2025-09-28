import { PrismaClient } from '@prisma/client';
import { seedUsers } from './user.seed';
import { seedCountries } from './country.seed';
import { seedRegions } from './region.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting database seeding...');

  try {
    await seedCountries(prisma);
    await seedRegions(prisma);
    await seedUsers(prisma);

    console.log('🎉 All seeders completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
  console.log('🌱 Seeding users...');

  // Admin user
  await prisma.user.upsert({
    where: { email: 'admin@xehomnay.com' },
    update: {},
    create: {
      id: 'admin-user-001',
      name: 'Admin User',
      email: 'admin@xehomnay.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KqKqKq', // password: admin123
      role: 'admin',
      status: 'active',
      emailVerified: new Date(),
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
  });

  console.log('✅ Users seeded successfully');
}

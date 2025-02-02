import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'sqlserver://prisma_user:StrongPassword123@127.0.0.1:1433/GarmsiriSystemDB?encrypt=false&trustServerCertificate=true',
    },
  },
});

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT name FROM sys.tables`;
    console.log('✅ اتصال موفق! جداول:', result);
  } catch (error) {
    console.error('❌ خطا در اتصال:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

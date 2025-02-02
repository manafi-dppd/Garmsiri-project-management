import {sqlServerClient} from './prisma/db.js';

async function test() {
  try {
    await sqlServerClient.$connect();
    const tables =
      await sqlServerClient.$queryRaw`SELECT name FROM sys.tables;`;
    console.log('✅ اتصال موفق شد! لیست جداول:', tables);
    await sqlServerClient.$disconnect();
  } catch (error) {
    console.error('❌ خطای اتصال به دیتابیس:', error);
  }
}

test();

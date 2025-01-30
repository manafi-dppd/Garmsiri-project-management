import {sqliteClient} from '@prisma/db';

async function testDatabase() {
  console.log('🔍 تست اتصال به دیتابیس...');

  console.log('📌 مسیر پایگاه داده:', process.env.SQLITE_DATABASE_URL);

  try {
    const users = await sqliteClient.user.findMany();
    console.log('✅ لیست کاربران:', users);
  } catch (error) {
    console.error('❌ خطا در دریافت کاربران:', error);
  }
}

testDatabase();

import {sqliteClient, sqlServerClient} from '@prisma/db';

const prisma = sqliteClient;

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
  } catch (error) {
    console.error('خطا در اتصال به پایگاه داده:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

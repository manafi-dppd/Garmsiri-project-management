import {PrismaClient} from '@prisma/client';

// بررسی اینکه از کدام پایگاه داده استفاده شود
const isUsingSqlServer = process.env.DB_TYPE === 'sqlserver';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: isUsingSqlServer
        ? process.env.SQLSERVER_DATABASE_URL
        : process.env.SQLITE_DATABASE_URL,
    },
  },
});

export default prisma;

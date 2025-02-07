// import {sqliteClient, sqlServerClient} from '@prisma/db';
// import {PrismaClient as SqlServerClient} from '../prisma/generated/sqlserver';

// export const sqliteClient = new PrismaClient({
//   datasources: {
//     db: {
//       url: process.env.SQLITE_DATABASE_URL,
//     },
//   },
// });
// const sqlServerClient = new SqlServerClient();

// // export {sqliteClient, sqlServerClient};
// export {sqlServerClient};

////////////////////

// import {PrismaClient as PrismaSqliteClient} from '../prisma/generated/sqlite';
// import {PrismaClient as PrismaSqlServerClient} from '../prisma/generated/sqlserver';

// export const sqliteClient = new PrismaSqliteClient();
// export const sqlServerClient = new PrismaSqlServerClient();

import dotenv from 'dotenv';
dotenv.config();

import {PrismaClient as PrismaSqliteClient} from './sqlite/generated/sqlite'; // مسیر مربوط به SQLite
import {PrismaClient as PrismaSqlServerClient} from './sqlserver/generated/sqlserver'; // مسیر مربوط به SQL Server

if (!process.env.DATABASE_URL_SQLSERVER) {
  throw new Error('🚨 خطا: متغیر محیطی DATABASE_URL_SQLSERVER تعریف نشده است!');
}

export const sqliteClient = new PrismaSqliteClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_SQLITE,
    },
  },
});

export const sqlServerClient = new PrismaSqlServerClient({
  datasources: {
    db: {
      url:
        process.env.DATABASE_URL_SQLSERVER ||
        'sqlserver://prisma_user:StrongPassword123@localhost:1433;database=DB_NAME;encrypt=true;trustServerCertificate=true',
    },
  },
});

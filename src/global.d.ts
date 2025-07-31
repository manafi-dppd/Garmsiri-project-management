// src/global.d.ts
declare module 'bcryptjs';
declare module 'next-auth' {
  interface User {
    id: string;
    role?: string;
  }
  interface Session {
    user: User & {
      id: string;
      role?: string;
    };
  }
}

declare global {
  var prisma: PrismaClient | undefined;
}
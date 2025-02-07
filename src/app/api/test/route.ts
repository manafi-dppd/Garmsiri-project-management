import {NextResponse} from 'next/server';
import {sqliteClient, sqlServerClient} from '@prisma/db';

export async function GET() {
  try {
    // دریافت یک رکورد از جدول User در SQLite
    const sqliteData = await sqliteClient.user.findMany({
      take: 5, // دریافت ۵ رکورد اول
    });

    // دریافت یک رکورد از جدول AbadeMakhzan در SQL Server
    const sqlServerData = await sqlServerClient.abadeMakhzan.findMany({
      take: 5, // دریافت ۵ رکورد اول
    });

    return NextResponse.json({
      sqliteData,
      sqlServerData,
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      {error: 'Database connection failed'},
      {status: 500},
    );
  }
}

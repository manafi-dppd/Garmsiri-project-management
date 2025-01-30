import {NextResponse} from 'next/server';
import {sqliteClient, sqlServerClient} from '@prisma/db';

const prisma = sqliteClient;

// Handler for GET requests
export async function GET() {
  try {
    const positions = await prisma.position.findMany({
      where: {}, // تمام پوزیشن‌ها
      select: {id: true, title: true, title_fa: true, req_license: true}, // انتخاب فیلدهای مورد نیاز
    });
    return NextResponse.json(positions, {status: 200});
  } catch (error) {
    console.error('Error fetching positions:', error);
    return NextResponse.json(
      {error: 'Error fetching positions'},
      {status: 500},
    );
  }
}

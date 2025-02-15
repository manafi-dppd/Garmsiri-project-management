import {NextRequest, NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db';

const prisma = sqlServerClient; // تنظیمات Prisma

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const networkId = searchParams.get('networkId');

  if (!networkId) {
    return NextResponse.json({error: 'Network ID is required'}, {status: 400});
  }
 
  try {
    const currentDate = new Date(); // تاریخ فعلی

    // پیدا کردن بازه‌ای که تاریخ فعلی در آن قرار دارد
    const shabake = await prisma.shabakeDoreKesht.findFirst({
      where: {
        FIdNet: Number(networkId),
        TrikhShorooe: {lte: currentDate},
        TrikhPayan: {gte: currentDate},
      },
      select: {TrikhShorooe: true, TrikhPayan: true},
    });

    if (!shabake) {
      return NextResponse.json(
        {message: 'تقویم آبیاری در سامانه بارگذاری شده است'},
        {status: 404},
      );
    }

    // دریافت رکوردهای `TrikhDoreKesht` فقط در بازه‌ی مشخص شده
    const records = await prisma.trikhDoreKesht.findMany({
      where: {
        Trikh: {
          gte: shabake.TrikhShorooe,
          lte: shabake.TrikhPayan,
        },
      },
      select: {IdTarDor: true, Trikh: true, Dahe: true},
      orderBy: {Trikh: 'asc'},
    });
    console.log('records: ', records);
    return NextResponse.json(records);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}

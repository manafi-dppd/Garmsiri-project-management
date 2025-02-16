import {NextRequest, NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db';

const prisma = sqlServerClient; // تنظیمات Prisma

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const networkId = searchParams.get('networkId');
  const dahe = searchParams.get('dahe'); // مقدار دهه مورد نظر
  const sal = searchParams.get('sal'); // مقدار سال مورد نظر
  const mah = searchParams.get('mah'); // مقدار ماه مورد نظر

  if (!networkId) {
    return NextResponse.json({error: 'Network ID is required'}, {status: 400});
  }
  console.log('networkId: ', networkId);
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
        {message: 'تقویم آبیاری در سامانه بارگذاری نشده است'},
        {status: 404},
      );
    }

    // فیلتر کردن رکوردها بر اساس سال، ماه و دهه
    const records = await prisma.trikhDoreKesht.findMany({
      where: {
        Trikh: {
          gte: shabake.TrikhShorooe,
          lte: shabake.TrikhPayan,
        },
        Sal: Number(sal), // فقط رکوردهای سال مشخص را بگیر
        Mah: Number(mah), // فقط رکوردهای ماه مشخص را بگیر
        Dahe: Number(dahe), // فقط رکوردهای دهه مشخص را بگیر
      },
      select: {
        IdTarDor: true,
        Trikh: true,
        Dahe: true,
        Sal: true,
        Mah: true,
      },
      orderBy: {Trikh: 'asc'},
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}

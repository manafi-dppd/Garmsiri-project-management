import {NextRequest, NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const networkId = searchParams.get('networkId');

  if (!networkId) {
    return NextResponse.json({error: 'Network ID is required'}, {status: 400});
  }

  try {
    const currentDate = new Date();

    // دریافت محدوده سال زراعی
    const shabake = await prisma.shabakedorekesht.findFirst({
      where: {
        fidnet: Number(networkId),
        trikhshorooe: {lte: currentDate},
        trikhpayan: {gte: currentDate},
      },
      select: {
        trikhshorooe: true,
        trikhpayan: true,
      },
    });

    if (!shabake) {
      return NextResponse.json(
        {message: 'تقویم آبیاری در سامانه بارگذاری نشده است'},
        {status: 404},
      );
    }

    // دریافت لیست ماه‌ها و fiddahe برای تاریخ امروز
    const todayRecord = await prisma.trikhdorekesht.findFirst({
      where: {
        trikh: currentDate,
      },
      select: {
        fiddahe: true,
      },
    });

    const mahList = await prisma.trikhdorekesht.findMany({
      where: {
        trikh: {
          gte: shabake.trikhshorooe,
          lte: shabake.trikhpayan,
        },
      },
      select: {
        mah: true,
        sal: true,
      },
      distinct: ['mah'],
      orderBy: {mah: 'asc'},
    });

    return NextResponse.json({
      mahList,
      currentFiddahe: todayRecord?.fiddahe || null,
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : String(error),
      },
      {status: 500},
    );
  }
}

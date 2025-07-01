// src/app/api/getShabakeDoreKesht/route.ts
import {NextRequest, NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const networkId = searchParams.get('networkId');
  const saleZeraee = searchParams.get('saleZeraee');
  const doreKesht = searchParams.get('doreKesht');

  if (!networkId || !saleZeraee || !doreKesht) {
    return NextResponse.json(
      {error: 'Missing required parameters'},
      {status: 400},
    );
  }

  try {
    // دریافت idsal از جدول salezeraee
    const saleZeraeeRecord = await prisma.salezeraee.findFirst({
      where: {
        salezeraee: saleZeraee,
      },
      select: {
        idsal: true,
      },
    });

    if (!saleZeraeeRecord) {
      return NextResponse.json({error: 'سال زراعی یافت نشد'}, {status: 404});
    }

    // دریافت iddore از جدول dorekesht
    const doreKeshtRecord = await prisma.dorekesht.findFirst({
      where: {
        dore: doreKesht,
      },
      select: {
        iddore: true,
      },
    });

    if (!doreKeshtRecord) {
      return NextResponse.json({error: 'دوره کشت یافت نشد'}, {status: 404});
    }

    // دریافت اطلاعات shabakedorekesht
    const shabake = await prisma.shabakedorekesht.findFirst({
      where: {
        fidnet: Number(networkId),
        fidsal: saleZeraeeRecord.idsal,
        fiddore: doreKeshtRecord.iddore,
      },
      select: {
        trikhshorooe: true,
        trikhpayan: true,
      },
    });

    if (!shabake) {
      return NextResponse.json(
        {error: 'اطلاعات تقویم آبیاری برای این شبکه و سال زراعی یافت نشد'},
        {status: 404},
      );
    }

    const currentDate = new Date();
    let useDate = currentDate;

    // بررسی آیا تاریخ امروز در محدوده تقویم آبیاری است
    if (
      currentDate < new Date(shabake.trikhshorooe) ||
      currentDate > new Date(shabake.trikhpayan)
    ) {
      useDate = new Date(shabake.trikhshorooe);
    }

    // دریافت fiddahe برای تاریخ انتخاب شده
    const todayRecord = await prisma.trikhdorekesht.findFirst({
      where: {
        trikh: useDate,
      },
      select: {
        fiddahe: true,
      },
    });

    // دریافت لیست ماه‌ها
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
      trikhshorooe: shabake.trikhshorooe,
      trikhpayan: shabake.trikhpayan,
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

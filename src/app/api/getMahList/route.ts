import {NextRequest, NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db'; // اتصال به پایگاه داده SQL Server

const prisma = sqlServerClient;

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const networkId = searchParams.get('networkId');

  if (!networkId) {
    return NextResponse.json({error: 'Network ID is required'}, {status: 400});
  }

  try {
    const currentDate = new Date();

    // دریافت محدوده سال زراعی از جدول ShabakeDoreKesht
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

    // دریافت لیست ماه‌ها از جدول TrikhDoreKesht بدون تغییرات اضافی
    const mahList = await prisma.trikhDoreKesht.findMany({
      where: {
        Trikh: {
          gte: shabake.TrikhShorooe,
          lte: shabake.TrikhPayan,
        },
      },
      select: {
        Mah: true, // شماره ماه (۱ تا ۱۲)
        Sal: true, // سال زراعی
      },
      distinct: ['Mah'],
      orderBy: {Mah: 'asc'},
    });

    return NextResponse.json(mahList);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}

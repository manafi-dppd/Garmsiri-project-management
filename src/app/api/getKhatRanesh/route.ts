import {NextRequest, NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db';
const prisma = sqlServerClient;

// تعریف اینترفیس برای داده‌های دریافتی از API
interface ApiKhatRanesh {
  IdRanesh: number;
  RaneshName: string;
  FIdPumpSta: number;
  FIdDPipe: number;
  FIdSePu: number;
  FIdMeasuring: number;
  Zarfiat?: number;
  Active?: boolean;
}

// تابع Type Guard برای بررسی ساختار داده‌ها
const isKhatRanesh = (data: any): data is ApiKhatRanesh => {
  return (
    typeof data.IdRanesh === 'number' &&
    typeof data.RaneshName === 'string' &&
    typeof data.FIdPumpSta === 'number' &&
    typeof data.FIdDPipe === 'number' &&
    typeof data.FIdSePu === 'number' &&
    typeof data.FIdMeasuring === 'number'
  );
};

export async function GET(req: NextRequest) {
  try {
    const {searchParams} = new URL(req.url);
    const idPumpStation = parseInt(
      searchParams.get('idPumpStation') || '0',
      10,
    );

    if (!idPumpStation) {
      return NextResponse.json(
        {error: 'idPumpStation is required'},
        {status: 400},
      );
    }

    // واکشی داده‌های اولیه از دیتابیس
    const khatRaneshList = await prisma.khatRanesh.findMany({
      where: {FIdPumpSta: idPumpStation},
      select: {
        IdRanesh: true,
        RaneshName: true,
        FIdPumpSta: true,
        FIdDPipe: true,
        FIdSePu: true,
        FIdMeasuring: true,
      },
    });

    // پردازش داده‌ها و اضافه کردن مقادیر پیش‌فرض
    const detailedKhatRaneshList = await Promise.all(
      khatRaneshList.map(async (ranesh) => {
        if (isKhatRanesh(ranesh)) {
          if (ranesh.FIdSePu === 1) {
            // واکشی اطلاعات پمپ
            const pumpRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getKhatRaneshPump?idRanesh=${ranesh.IdRanesh}`,
            );
            const pumpData = await pumpRes.json();
            return {
              ...ranesh,
              ...pumpData,
              Zarfiat: pumpData.Zarfiat ?? 0, // مقدار پیش‌فرض Zarfiat
              Active: ranesh.Active ?? true, // مقدار پیش‌فرض Active
            };
          } else {
            // واکشی مقدار Zarfiat برای Segli
            const segliData = await prisma.khatRaneshSegli.findFirst({
              where: {FIdRanesh: ranesh.IdRanesh},
              select: {Zarfiat: true},
            });
            return {
              ...ranesh,
              Zarfiat: segliData?.Zarfiat ?? 0,
              Active: ranesh.Active ?? true,
            };
          }
        }
        return ranesh;
      }),
    );

    return NextResponse.json(detailedKhatRaneshList);
  } catch (error) {
    return NextResponse.json(
      {error: 'Failed to fetch KhatRanesh', details: error},
      {status: 500},
    );
  }
}

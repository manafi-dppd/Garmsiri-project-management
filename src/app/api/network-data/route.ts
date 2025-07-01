import {NextRequest, NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const selectedNetworkId = Number(url.searchParams.get('networkId'));
    const currentDate = new Date();

    if (!selectedNetworkId) {
      return NextResponse.json({error: 'شبکه انتخاب نشده است.'}, {status: 400});
    }

    // دریافت رکورد جاری shabakedorekesht
    const currentShabakeRecord = await prisma.shabakedorekesht.findFirst({
      where: {
        fidnet: selectedNetworkId,
        trikhshorooe: {lte: currentDate},
        trikhpayan: {gte: currentDate},
      },
    });

    if (!currentShabakeRecord) {
      return NextResponse.json(
        {error: 'دوره کشت جاری یافت نشد.'},
        {status: 404},
      );
    }

    // محاسبه بازه 10 روز قبل و بعد از شروع دوره کشت جاری
    const doreKeshtStart = new Date(currentShabakeRecord.trikhshorooe);
    const doreWindowStart = new Date(doreKeshtStart);
    const doreWindowEnd = new Date(doreKeshtStart);
    doreWindowStart.setDate(doreKeshtStart.getDate() - 10);
    doreWindowEnd.setDate(doreKeshtStart.getDate() + 10);

    // بررسی آیا در بازه 10 روز قبل یا بعد از شروع دوره کشت هستیم
    const isInDoreWindow =
      currentDate >= doreWindowStart && currentDate <= doreWindowEnd;

    // دریافت سال زراعی جاری
    const currentSaleZeraee = await prisma.salezeraee.findUnique({
      where: {idsal: currentShabakeRecord.fidsal},
      select: {salezeraee: true},
    });

    // دریافت دوره کشت جاری
    const currentDoreKesht = await prisma.dorekesht.findUnique({
      where: {iddore: currentShabakeRecord.fiddore},
      select: {dore: true},
    });

    // دریافت سایر دوره‌های کشت فقط اگر در بازه زمانی باشیم
    let otherDoreKesht: string[] = [];
    if (isInDoreWindow) {
      const allDoreKesht = await prisma.dorekesht.findMany({
        where: {
          iddore: {
            in: await prisma.shabakedorekesht
              .findMany({
                where: {fidnet: selectedNetworkId},
                select: {fiddore: true},
                distinct: ['fiddore'],
              })
              .then((res) => res.map((r) => r.fiddore)),
          },
        },
        select: {dore: true},
      });
      otherDoreKesht = allDoreKesht.map((d) => d.dore);
    }

    return NextResponse.json({
      // همیشه فقط سال زراعی جاری را برگردان
      SaleZeraee: currentSaleZeraee ? [currentSaleZeraee.salezeraee] : [],

      // اگر در بازه زمانی هستیم تمام دوره‌ها، در غیر اینصورت فقط دوره جاری
      Dore: isInDoreWindow
        ? otherDoreKesht
        : currentDoreKesht
          ? [currentDoreKesht.dore]
          : [],

      // مقدار پیشفرض برای دوره کشت
      currentDoreKesht: currentDoreKesht?.dore || null,

      // مقدار پیشفرض برای سال زراعی
      currentSaleZeraee: currentSaleZeraee?.salezeraee || null,

      IdShDo: currentShabakeRecord.idshdo,
    });
  } catch (error) {
    console.error('خطا در دریافت داده‌های شبکه:', error);
    return NextResponse.json({error: 'خطای داخلی سرور'}, {status: 500});
  }
}

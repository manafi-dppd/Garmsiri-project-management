import {NextRequest, NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const selectedNetworkId = Number(url.searchParams.get('networkId'));
    const currentDate = new Date();

    if (!selectedNetworkId) {
      return NextResponse.json({error: 'شبکه انتخاب نشده است.'}, {status: 400});
    }

    // دریافت رکوردهای مربوط به شبکه مورد نظر
    const shabakeRecords = await sqlServerClient.shabakeDoreKesht.findMany({
      where: {
        FIdNet: selectedNetworkId,
      },
      orderBy: {TrikhShorooe: 'asc'},
    });

    if (!shabakeRecords.length) {
      return NextResponse.json(
        {error: 'تقویم آبیاری در سامانه بارگذاری نشده است.'},
        {status: 404},
      );
    }

    let finalFIdSal: number | number[] = [];
    let finalFIdDore: number | number[] = [];
    let matchedRecord: any = null;

    // بررسی شرط 2
    matchedRecord = shabakeRecords.find((record) => {
      const startDate = new Date(record.TrikhShorooe);
      const endDate = new Date(record.TrikhPayan);

      return (
        currentDate >= new Date(startDate.setDate(startDate.getDate() + 10)) &&
        currentDate <= new Date(endDate.setDate(endDate.getDate() - 10))
      );
    });

    if (matchedRecord) {
      finalFIdSal = matchedRecord.FIdSal;
      finalFIdDore = matchedRecord.FIdDore;
    } else {
      // بررسی شرط 3
      matchedRecord = shabakeRecords.find((record) => {
        const startDate = new Date(record.TrikhShorooe);
        return (
          currentDate >=
            new Date(startDate.setDate(startDate.getDate() - 10)) &&
          currentDate <= new Date(startDate.setDate(startDate.getDate() + 20))
        );
      });

      if (matchedRecord) {
        const prevRecord = shabakeRecords.find(
          (record) =>
            new Date(record.TrikhPayan).getTime() ===
            new Date(matchedRecord.TrikhShorooe).getTime() - 86400000,
        );

        if (prevRecord) {
          finalFIdDore = [prevRecord.FIdDore, matchedRecord.FIdDore];

          finalFIdSal =
            prevRecord.FIdSal === matchedRecord.FIdSal
              ? prevRecord.FIdSal
              : [prevRecord.FIdSal, matchedRecord.FIdSal];
        } else {
          finalFIdDore = matchedRecord.FIdDore;
          finalFIdSal = matchedRecord.FIdSal;
        }
      } else {
        return NextResponse.json(
          {error: 'تقویم آبیاری در سامانه بارگذاری نشده است.'},
          {status: 404},
        );
      }
    }

    // دریافت SaleZeraee و Dore
    const saleZeraee = await sqlServerClient.saleZeraee.findMany({
      where: {
        IdSal: {in: Array.isArray(finalFIdSal) ? finalFIdSal : [finalFIdSal]},
      },
      select: {SaleZeraee: true},
    });

    const doreKesht = await sqlServerClient.doreKesht.findMany({
      where: {
        IdDore: {
          in: Array.isArray(finalFIdDore) ? finalFIdDore : [finalFIdDore],
        },
      },
      select: {Dore: true},
    });

    return NextResponse.json({
      SaleZeraee: saleZeraee.map((s) => s.SaleZeraee),
      Dore: doreKesht.map((d) => d.Dore),
    });
  } catch (error) {
    console.error('خطا در دریافت داده‌های شبکه:', error);
    return NextResponse.json({error: 'خطای داخلی سرور'}, {status: 500});
  }
}

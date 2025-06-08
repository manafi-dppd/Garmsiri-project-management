import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ShabakeRecord {
  fidnet: number;
  trikhshorooe: Date;
  trikhpayan: Date;
  fidsal: number;
  fiddore: number;
}

interface SaleZeraee {
  salezeraee: string;
}

interface DoreKesht {
  dore: string;
}

interface IdShDo {
  idshdo: number;
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const selectedNetworkId = Number(url.searchParams.get("networkId"));
    const currentDate = new Date();

    if (!selectedNetworkId) {
      return NextResponse.json(
        { error: "شبکه انتخاب نشده است." },
        { status: 400 }
      );
    }

    const shabakeRecords = await prisma.shabakedorekesht.findMany({
      where: { fidnet: selectedNetworkId },
      orderBy: { trikhshorooe: "asc" },
    });

    if (!shabakeRecords.length) {
      return NextResponse.json(
        { error: "تقویم آبیاری در سامانه بارگذاری نشده است." },
        { status: 404 }
      );
    }

    let finalFIdSal: number | number[] = [];
    let finalFIdDore: number | number[] = [];
    let matchedRecord: ShabakeRecord | null = null;

    matchedRecord =
      shabakeRecords.find(
        (record: {
          trikhshorooe: string | number | Date;
          trikhpayan: string | number | Date;
        }) => {
          const startDate = new Date(record.trikhshorooe);
          const endDate = new Date(record.trikhpayan);

          const adjustedStart = new Date(startDate);
          adjustedStart.setDate(startDate.getDate() + 10);

          const adjustedEnd = new Date(endDate);
          adjustedEnd.setDate(endDate.getDate() - 10);

          return currentDate >= adjustedStart && currentDate <= adjustedEnd;
        }
      ) || null;

    if (matchedRecord) {
      finalFIdSal = matchedRecord.fidsal;
      finalFIdDore = matchedRecord.fiddore;
    } else {
      matchedRecord =
        shabakeRecords.find(
          (record: { trikhshorooe: string | number | Date }) => {
            const startDate = new Date(record.trikhshorooe);
            const windowStart = new Date(startDate);
            const windowEnd = new Date(startDate);

            windowStart.setDate(startDate.getDate() - 10);
            windowEnd.setDate(startDate.getDate() + 20);

            return currentDate >= windowStart && currentDate <= windowEnd;
          }
        ) || null;

      if (matchedRecord) {
        const prevRecord = shabakeRecords.find(
          (record: { trikhpayan: string | number | Date }) => {
            const recordEnd = new Date(record.trikhpayan);
            const matchedStart = new Date(matchedRecord!.trikhshorooe);
            return recordEnd.getTime() === matchedStart.getTime() - 86400000;
          }
        );

        if (prevRecord) {
          finalFIdDore = [prevRecord.fiddore, matchedRecord.fiddore];
          finalFIdSal =
            prevRecord.fidsal === matchedRecord.fidsal
              ? prevRecord.fidsal
              : [prevRecord.fidsal, matchedRecord.fidsal];
        } else {
          finalFIdDore = matchedRecord.fiddore;
          finalFIdSal = matchedRecord.fidsal;
        }
      } else {
        return NextResponse.json(
          { error: "تقویم آبیاری در سامانه بارگذاری نشده است." },
          { status: 404 }
        );
      }
    }

    const saleZeraee = await prisma.salezeraee.findMany({
      where: {
        idsal: { in: Array.isArray(finalFIdSal) ? finalFIdSal : [finalFIdSal] },
      },
      select: { salezeraee: true },
    });

    const doreKesht = await prisma.dorekesht.findMany({
      where: {
        iddore: {
          in: Array.isArray(finalFIdDore) ? finalFIdDore : [finalFIdDore],
        },
      },
      select: { dore: true },
    });

    const idShDoRecords = await prisma.shabakedorekesht.findMany({
      where: {
        fidnet: selectedNetworkId,
        fidsal: {
          in: Array.isArray(finalFIdSal) ? finalFIdSal : [finalFIdSal],
        },
        fiddore: {
          in: Array.isArray(finalFIdDore) ? finalFIdDore : [finalFIdDore],
        },
      },
      select: { idshdo: true },
    });

    return NextResponse.json({
      SaleZeraee: saleZeraee.map((s: SaleZeraee) => s.salezeraee),
      Dore: doreKesht.map((d: DoreKesht) => d.dore),
      IdShDo: idShDoRecords.map((i: IdShDo) => i.idshdo),
    });
  } catch (error) {
    console.error("خطا در دریافت داده‌های شبکه:", error);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

interface Record {
  idtardor: number;
  trikh: Date;
  dahe: number;
  sal: number;
  mah: number;
}

interface VolumeResult {
  fidranesh: number;
  _sum: { taghvim: Decimal | null };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const networkId = searchParams.get("networkId");
  const dahe = searchParams.get("dahe");
  const sal = searchParams.get("sal");
  const mah = searchParams.get("mah");
  const idsal = searchParams.get("idsal");
  const iddore = searchParams.get("iddore");

  if (!networkId || !idsal || !iddore) {
    return NextResponse.json(
      { error: "Network ID, idsal, and iddore are required" },
      { status: 400 }
    );
  }

  try {
    // دریافت shabake بر اساس networkId, idsal و iddore
    const shabake = await prisma.shabakedorekesht.findFirst({
      where: {
        fidnet: Number(networkId),
        fidsal: Number(idsal),
        fiddore: Number(iddore),
      },
      select: { trikhshorooe: true, trikhpayan: true },
    });

    if (!shabake) {
      return NextResponse.json(
        { message: "تقویم آبیاری برای این دوره کشت و سال زراعی یافت نشد" },
        { status: 404 }
      );
    }

    const currentDate = new Date();
    let startDate = shabake.trikhshorooe;
    const endDate = shabake.trikhpayan;

    // بررسی آیا تاریخ جاری در بازه shabake قرار دارد یا خیر
    const isCurrentDateInRange =
      currentDate >= shabake.trikhshorooe && currentDate <= shabake.trikhpayan;

    // اگر تاریخ جاری در بازه نیست، از trikhshorooe به عنوان تاریخ شروع استفاده می‌کنیم
    if (!isCurrentDateInRange) {
      startDate = shabake.trikhshorooe;
    }

    const records = await prisma.trikhdorekesht.findMany({
      where: {
        trikh: { gte: startDate, lte: endDate },
        sal: sal ? Number(sal) : undefined,
        mah: mah ? Number(mah) : undefined,
        dahe: dahe ? Number(dahe) : undefined,
      },
      select: { idtardor: true, trikh: true, dahe: true, sal: true, mah: true },
      orderBy: { trikh: "asc" },
    });

    const predictedVolumes = await Promise.all(
      records.map(async (record: Record) => {
        const raneshVolumes = await prisma.bahrebardaritaghvim.groupBy({
          by: ["fidranesh"],
          where: { fidtardor: record.idtardor },
          _sum: { taghvim: true },
        });
        return {
          idtardor: record.idtardor,
          volumes: raneshVolumes.map((rv: VolumeResult) => ({
            fidranesh: rv.fidranesh,
            totaltaghvim: rv._sum.taghvim ? Number(rv._sum.taghvim) : 0,
          })),
        };
      })
    );

    return NextResponse.json({ records, predictedVolumes });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

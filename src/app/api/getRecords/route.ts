import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Decimal } from '@prisma/client/runtime/library';

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

  if (!networkId) {
    return NextResponse.json(
      { error: "Network ID is required" },
      { status: 400 }
    );
  }

  try {
    const currentDate = new Date();
    const shabake = await prisma.shabakedorekesht.findFirst({
      where: {
        fidnet: Number(networkId),
        trikhshorooe: { lte: currentDate },
        trikhpayan: { gte: currentDate },
      },
      select: { trikhshorooe: true, trikhpayan: true },
    });

    if (!shabake) {
      return NextResponse.json(
        { message: "تقویم آبیاری در سامانه بارگذاری نشده است" },
        { status: 404 }
      );
    }

    const records = await prisma.trikhdorekesht.findMany({
      where: {
        trikh: { gte: shabake.trikhshorooe, lte: shabake.trikhpayan },
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
            totaltaghvim: rv._sum.taghvim || 0,
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

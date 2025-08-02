import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

// export const dynamic = "force-static";

export async function GET(req: NextRequest) {
  const t = await getTranslations("GetShabakeDoreKesht");
  const { searchParams } = new URL(req.url);
  const networkId = searchParams.get("networkId");
  const saleZeraee = searchParams.get("saleZeraee");
  const doreKesht = searchParams.get("doreKesht");

  if (!networkId || !saleZeraee || !doreKesht) {
    return NextResponse.json(
      { error: t("missingParameters") },
      { status: 400 }
    );
  }

  try {
    const saleZeraeeRecord = await prisma.salezeraee.findFirst({
      where: { salezeraee: saleZeraee },
      select: { idsal: true },
    });

    if (!saleZeraeeRecord) {
      return NextResponse.json(
        { error: t("cropYearNotFound") },
        { status: 404 }
      );
    }

    const doreKeshtRecord = await prisma.dorekesht.findFirst({
      where: { dore: doreKesht },
      select: { iddore: true },
    });

    if (!doreKeshtRecord) {
      return NextResponse.json(
        { error: t("irrigationPeriodNotFound") },
        { status: 404 }
      );
    }

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
        { error: t("irrigationCalendarNotFound") },
        { status: 404 }
      );
    }

    const currentDate = new Date();
    let useDate = currentDate;

    if (
      currentDate < new Date(shabake.trikhshorooe) ||
      currentDate > new Date(shabake.trikhpayan)
    ) {
      useDate = new Date(shabake.trikhshorooe);
    }

    const todayRecord = await prisma.trikhdorekesht.findFirst({
      where: { trikh: useDate },
      select: { fiddahe: true },
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
      distinct: ["mah"],
      orderBy: { mah: "asc" },
    });

    return NextResponse.json(
      {
        mahList,
        currentFiddahe: todayRecord?.fiddahe || null,
        trikhshorooe: shabake.trikhshorooe,
        trikhpayan: shabake.trikhpayan,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        error: t("internalServerError"),
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

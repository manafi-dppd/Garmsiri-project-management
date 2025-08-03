import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

export async function GET(req: NextRequest) {
  const t = await getTranslations("GetShabakeDoreKesht");
  const { searchParams } = new URL(req.url);
  const networkId = searchParams.get("networkId");
  const idsal = searchParams.get("idsal");
  const iddore = searchParams.get("iddore");
  console.log("[GetShabakeDoreKesht] Parameters:", {
    networkId,
    idsal,
    iddore,
  });

  if (!networkId || !idsal || !iddore) {
    return NextResponse.json(
      { error: t("missingParameters") },
      { status: 400 }
    );
  }

  try {
    const shabake = await prisma.shabakedorekesht.findFirst({
      where: {
        fidnet: Number(networkId),
        fidsal: Number(idsal),
        fiddore: Number(iddore),
      },
      select: {
        idshdo: true,
        trikhshorooe: true,
        trikhpayan: true,
      },
    });
    console.log("[GetShabakeDoreKesht] shabake:", shabake);
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
        idshdo: shabake.idshdo,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      }
    );
  } catch (error) {
    console.error("[GetShabakeDoreKesht] Database error:", error);
    return NextResponse.json(
      {
        error: t("internalServerError"),
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

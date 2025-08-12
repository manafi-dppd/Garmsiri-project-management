import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { Locale, locales } from "@/i18n/config";

export async function GET(req: NextRequest) {
  const t = await getTranslations("GetShabakeDoreKesht");
  const { searchParams } = new URL(req.url);
  const networkId = searchParams.get("networkId");
  const idsal = searchParams.get("idsal");
  const iddore = searchParams.get("iddore");
  const locale = (searchParams.get("locale") || "en") as Locale;

  // console.log("[GetShabakeDoreKesht] Parameters:", {
  //   networkId,
  //   idsal,
  //   iddore,
  //   locale,
  // });

  // Validate input parameters
  if (!networkId || !idsal || !iddore) {
    return NextResponse.json(
      { error: t("missingParameters") },
      { status: 400 }
    );
  }

  // Validate locale
  if (!locales.includes(locale)) {
    return NextResponse.json({ error: t("invalidLocale") }, { status: 400 });
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
    // console.log("[GetShabakeDoreKesht] shabake:", shabake);
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

    // Fetch mahList based on locale
    const mahList = await prisma.trikhdorekesht.findMany({
      where: {
        trikh: {
          gte: shabake.trikhshorooe,
          lte: shabake.trikhpayan,
        },
      },
      select: {
        mah: locale === "fa" ? true : false, // Select mah only for Persian
        sal: locale === "fa" ? true : false, // Select sal only for Persian
        trikh: locale !== "fa" ? true : false, // Select trikh for non-Persian
      },
      distinct: locale === "fa" ? ["mah"] : ["trikh"], // Distinct based on mah for Persian, trikh for others
      orderBy: locale === "fa" ? { mah: "asc" } : { trikh: "asc" },
    });

    // Map mahList to include sal and mah for non-Persian locales
    const formattedMahList = mahList.map((item) => {
      if (locale === "fa") {
        return { mah: item.mah, sal: item.sal };
      } else {
        const date = new Date(item.trikh);
        return {
          mah: date.getMonth() + 1, // Extract month (1-12)
          sal: date.getFullYear(), // Extract year
        };
      }
    });

    return NextResponse.json(
      {
        mahList: formattedMahList,
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

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { locales, Locale, defaultLocale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const t = await getTranslations("NetworkData");
  try {
    const url = new URL(req.url);
    const selectedNetworkId = Number(url.searchParams.get("networkId"));
    // تلاش برای دریافت locale از پارامتر URL (اختیاری)
    const urlLocale = url.searchParams.get("locale");
    // استخراج بخش اصلی زبان از هدر Accept-Language
    const acceptLanguage = req.headers.get("Accept-Language")?.split(",")[0];
    const localeBase = acceptLanguage
      ? acceptLanguage.split("-")[0]
      : defaultLocale;
    // اولویت: 1) پارامتر URL، 2) هدر Accept-Language، 3) defaultLocale
    const localeCandidate = urlLocale || localeBase;
    const locale = (
      locales.includes(localeCandidate as Locale)
        ? localeCandidate
        : defaultLocale
    ) as Locale;


    if (!selectedNetworkId) {
      console.error("[NetworkDataAPI] No network selected");
      return NextResponse.json(
        { error: t("noNetworkSelected") },
        { status: 400 }
      );
    }

    const currentDate = new Date();
    const currentShabakeRecord = await prisma.shabakedorekesht.findFirst({
      where: {
        fidnet: selectedNetworkId,
        trikhshorooe: { lte: currentDate },
        trikhpayan: { gte: currentDate },
      },
    });

    if (!currentShabakeRecord) {
      console.error("[NetworkDataAPI] Current irrigation period not found");
      return NextResponse.json(
        { error: t("currentIrrigationPeriodNotFound") },
        { status: 404 }
      );
    }

    const doreKeshtStart = new Date(currentShabakeRecord.trikhshorooe);
    const doreWindowStart = new Date(doreKeshtStart);
    const doreWindowEnd = new Date(doreKeshtStart);
    doreWindowStart.setDate(doreKeshtStart.getDate() - 30);
    doreWindowEnd.setDate(doreKeshtStart.getDate() + 30);

    const isInDoreWindow =
      currentDate >= doreWindowStart && currentDate <= doreWindowEnd;

    const currentSaleZeraee = await prisma.salezeraee.findUnique({
      where: { idsal: currentShabakeRecord.fidsal },
      select: {
        salezeraee: true,
        cropyear: true,
      },
    });

    const currentDoreKesht = await prisma.dorekesht.findUnique({
      where: { iddore: currentShabakeRecord.fiddore },
      select: {
        dore: true,
        dore_fa: true,
        dore_ar: true,
        dore_tr: true,
      },
    });

    let otherDoreKesht: {
      dore: string;
      dore_fa: string | null;
      dore_ar: string | null;
      dore_tr: string | null;
    }[] = [];
    if (isInDoreWindow) {
      otherDoreKesht = await prisma.dorekesht.findMany({
        where: {
          iddore: {
            in: await prisma.shabakedorekesht
              .findMany({
                where: { fidnet: selectedNetworkId },
                select: { fiddore: true },
                distinct: ["fiddore"],
              })
              .then((res) => res.map((r) => r.fiddore)),
          },
        },
        select: {
          dore: true,
          dore_fa: true,
          dore_ar: true,
          dore_tr: true,
        },
      });
    }

    const getLocalizedDore = (dore: {
      dore: string;
      dore_fa: string | null;
      dore_ar: string | null;
      dore_tr: string | null;
    }): string => {
      const selectedDore =
        locale === "fa"
          ? dore.dore_fa || dore.dore
          : locale === "ar"
          ? dore.dore_ar || dore.dore
          : locale === "tr"
          ? dore.dore_tr || dore.dore
          : dore.dore;
      return selectedDore;
    };

    const getLocalizedSaleZeraee = (sale: {
      salezeraee: string;
      cropyear: string | null;
    }): string => {
      const selectedSaleZeraee =
        locale === "fa" ? sale.salezeraee : sale.cropyear || sale.salezeraee;
      return selectedSaleZeraee;
    };

    return NextResponse.json(
      {
        SaleZeraee: currentSaleZeraee
          ? [getLocalizedSaleZeraee(currentSaleZeraee)]
          : [],
        Dore: isInDoreWindow
          ? otherDoreKesht.map(getLocalizedDore)
          : currentDoreKesht
          ? [getLocalizedDore(currentDoreKesht)]
          : [],
        currentDoreKesht: currentDoreKesht
          ? getLocalizedDore(currentDoreKesht)
          : null,
        currentSaleZeraee: currentSaleZeraee
          ? getLocalizedSaleZeraee(currentSaleZeraee)
          : null,
        IdShDo: currentShabakeRecord.idshdo,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("[NetworkDataAPI] Error fetching network data:", error);
    return NextResponse.json(
      { error: t("internalServerError") },
      { status: 500 }
    );
  }
}

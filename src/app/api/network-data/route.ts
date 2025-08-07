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
    const urlLocale = url.searchParams.get("locale");
    const acceptLanguage = req.headers.get("Accept-Language")?.split(",")[0];
    const localeBase = acceptLanguage
      ? acceptLanguage.split("-")[0]
      : defaultLocale;
    const locale = (
      locales.includes(urlLocale as Locale)
        ? urlLocale
        : locales.includes(localeBase as Locale)
        ? localeBase
        : defaultLocale
    ) as Locale;

    // console.log("[NetworkDataAPI] Request received:", {
    //   selectedNetworkId,
    //   urlLocale,
    //   acceptLanguage,
    //   localeBase,
    //   locale,
    // });

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

    console.log(
      "[NetworkDataAPI] Current shabake record:",
      currentShabakeRecord
    );

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

    // console.log("[NetworkDataAPI] Dore window:", {
    //   isInDoreWindow,
    //   doreWindowStart,
    //   doreWindowEnd,
    // });

    const currentSaleZeraee = await prisma.salezeraee.findUnique({
      where: { idsal: currentShabakeRecord.fidsal },
      select: {
        idsal: true,
        salezeraee: true,
        cropyear: true,
      },
    });

    // console.log("[NetworkDataAPI] Current salezeraee:", currentSaleZeraee);

    const currentDoreKesht = await prisma.dorekesht.findUnique({
      where: { iddore: currentShabakeRecord.fiddore },
      select: {
        iddore: true,
        dore: true,
        dore_fa: true,
        dore_ar: true,
        dore_tr: true,
      },
    });

    // console.log("[NetworkDataAPI] Current dorekesht:", currentDoreKesht);

    let otherDoreKesht: {
      iddore: number;
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
          iddore: true,
          dore: true,
          dore_fa: true,
          dore_ar: true,
          dore_tr: true,
        },
      });
      // console.log("[NetworkDataAPI] Other dorekesht:", otherDoreKesht);
    }

    const getLocalizedDore = (dore: {
      iddore: number;
      dore: string;
      dore_fa: string | null;
      dore_ar: string | null;
      dore_tr: string | null;
    }): { iddore: number; name: string } => {
      const selectedDore =
        locale === "fa"
          ? dore.dore_fa || dore.dore
          : locale === "ar"
          ? dore.dore_ar || dore.dore
          : locale === "tr"
          ? dore.dore_tr || dore.dore
          : dore.dore;
      // console.log("[NetworkDataAPI] Localized dore:", {
      //   locale,
      //   dore,
      //   selectedDore,
      // });
      return { iddore: dore.iddore, name: selectedDore };
    };

    const getLocalizedSaleZeraee = (sale: {
      idsal: number;
      salezeraee: string;
      cropyear: string | null;
    }): { idsal: number; name: string } => {
      const selectedSaleZeraee =
        locale === "fa" ? sale.salezeraee : sale.cropyear || sale.salezeraee;
      // console.log("[NetworkDataAPI] Localized salezeraee:", {
      //   locale,
      //   sale,
      //   selectedSaleZeraee,
      // });
      return { idsal: sale.idsal, name: selectedSaleZeraee };
    };

    const responseData = {
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
    };

    // console.log("[NetworkDataAPI] Response data:", responseData);

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[NetworkDataAPI] Error fetching network data:", error);
    return NextResponse.json(
      { error: t("internalServerError") },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getLocale } from "next-intl/server";
import { locales, Locale, defaultLocale } from "@/i18n/config";

interface TaeedProgramRequest {
  fidpumpsta: number;
  sal: number;
  mah: number;
  dahe: number;
  locale: string;
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const urlLocale = url.searchParams.get("locale");
  const acceptLanguage = request.headers.get("Accept-Language")?.split(",")[0];
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
  try {
    const body = (await request.json()) as TaeedProgramRequest;

    if (
      !body ||
      typeof body.fidpumpsta !== "number" ||
      !body.sal ||
      !body.mah ||
      !body.dahe
    ) {
      return NextResponse.json(
        {
          error: locale === "fa" ? "پارامترهای نامعتبر" : "Invalid parameters",
          received: body,
        },
        { status: 400 }
      );
    }
    const { fidpumpsta, sal, mah, dahe } = body;

    if (!fidpumpsta || !sal || !mah || !dahe) {
      return NextResponse.json(
        {
          error:
            locale === "fa"
              ? "پارامترهای الزامی وجود ندارد"
              : "Missing required parameters",
        },
        { status: 400 }
      );
    }

    const whereClause: any = {
      fidpumpsta,
      sal,
      mah,
      dahe,
    };

    const result = await prisma.taeedprogram.findFirst({
      where: whereClause,
      select: {
        firstnersal: true,
        lastnersal: true,
        tarikhersal: true,
        firstnabmantaghe: true,
        lastnabmantaghe: true,
        tarikhabmantaghe: true,
        taedabmantaghe: true,
        firstnpeymankar: true,
        lastnpeymankar: true,
        tarikhpeymankar: true,
        taedpeymankar: true,
        firstnabniroo: true,
        lastnabniroo: true,
        tarikhabniroo: true,
        taedabniroo: true,
        filenamenahaee: true,
        tarikhfilenahee: true,
        firstntaeednahaee: true,
        lastntaeednahaee: true,
        tarikhtaeednahaee: true,
        taeednahaee: true,
        fiddahe: locale === "fa" ? true : false,
        fiddec: locale !== "fa" ? true : false,
        toziheslah: true,
      },
    });

    if (!result) {
      return NextResponse.json(
        {
          error:
            locale === "fa" ? "رکوردی یافت نشد" : "No matching record found",
        },
        { status: 404 }
      );
    }

    const sanitized = {
      ...result,
      taedabmantaghe:
        result.taedabmantaghe === false &&
        !result.firstnabmantaghe &&
        !result.lastnabmantaghe &&
        !result.tarikhabmantaghe
          ? null
          : result.taedabmantaghe,
      taedpeymankar:
        result.taedpeymankar === false &&
        !result.firstnpeymankar &&
        !result.lastnpeymankar &&
        !result.tarikhpeymankar
          ? null
          : result.taedpeymankar,
      taedabniroo:
        result.taedabniroo === false &&
        !result.firstnabniroo &&
        !result.lastnabniroo &&
        !result.tarikhabniroo
          ? null
          : result.taedabniroo,
      fiddahe: locale === "fa" ? result.fiddahe : null,
      fiddec: locale !== "fa" ? result.fiddec : null,
    };

    return NextResponse.json(sanitized, { status: 200 });
  } catch (error) {
    console.error("Error fetching TaeedProgram details:", error);
    return NextResponse.json(
      { error: locale === "fa" ? "خطای سرور" : "Server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

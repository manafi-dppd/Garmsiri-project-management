import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { locales, Locale, defaultLocale } from "@/i18n/config";

interface TaeedProgramRequest {
  fidpumpsta: number;
  sal: number;
  mah: number;
  dahe: number;
  locale: string;
}

export async function POST(request: NextRequest) {
  let body: TaeedProgramRequest | null = null; // تعریف body در محدوده بالاتر

  try {
    body = (await request.json()) as TaeedProgramRequest;

    // بررسی وجود پارامترهای الزامی
    if (
      !body ||
      typeof body.fidpumpsta !== "number" ||
      !body.sal ||
      !body.mah ||
      !body.dahe ||
      !body.locale
    ) {
      return NextResponse.json(
        {
          error:
            body?.locale === "fa" ? "پارامترهای نامعتبر" : "Invalid parameters",
          received: body,
        },
        { status: 400 }
      );
    }

    const { fidpumpsta, sal, mah, dahe, locale } = body; // استخراج locale از بدنه

    // اعتبارسنجی locale
    const validatedLocale = locales.includes(locale as Locale)
      ? (locale as Locale)
      : defaultLocale;

    if (!fidpumpsta || !sal || !mah || !dahe) {
      return NextResponse.json(
        {
          error:
            validatedLocale === "fa"
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
        fiddahe: validatedLocale === "fa" ? true : false,
        fiddec: validatedLocale !== "fa" ? true : false,
        toziheslah: true,
      },
    });

    if (!result) {
      return NextResponse.json(
        {
          error:
            validatedLocale === "fa"
              ? "رکوردی یافت نشد"
              : "No matching record found",
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
      fiddahe: validatedLocale === "fa" ? result.fiddahe : null,
      fiddec: validatedLocale !== "fa" ? result.fiddec : null,
    };

    return NextResponse.json(sanitized, { status: 200 });
  } catch (error) {
    console.error("Error fetching TaeedProgram details:", error);
    // استفاده از body?.locale برای مدیریت خطا
    return NextResponse.json(
      { error: body?.locale === "fa" ? "خطای سرور" : "Server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "بدنه درخواست نامعتبر است" },
        { status: 400 }
      );
    }

    const { idPumpStation, sal, mah, dahe, correctionText, locale } = body;

    if (
      typeof idPumpStation !== "number" ||
      typeof sal !== "number" ||
      typeof mah !== "number" ||
      typeof dahe !== "number" ||
      typeof correctionText !== "string" ||
      !locale
    ) {
      return NextResponse.json(
        { error: "فیلدهای مورد نیاز گم شده یا نامعتبر هستند" },
        { status: 400 }
      );
    }

    // Validate fiddahe or fiddec based on locale
    const record = await prisma.taeedprogram.findFirst({
      where: {
        fidpumpsta: idPumpStation,
        sal,
        mah,
        dahe,
      },
      select: { fiddahe: true, fiddec: true },
    });

    if (!record) {
      return NextResponse.json({ error: "رکوردی یافت نشد" }, { status: 404 });
    }

    if (locale === "fa" && record.fiddahe === null) {
      return NextResponse.json(
        { error: "fiddahe نمی‌تواند NULL باشد برای زبان فارسی" },
        { status: 400 }
      );
    }

    if (locale !== "fa" && record.fiddec === null) {
      return NextResponse.json(
        { error: "fiddec نمی‌تواند NULL باشد برای زبان‌های غیرفارسی" },
        { status: 400 }
      );
    }

    await prisma.taeedprogram.updateMany({
      where: {
        fidpumpsta: idPumpStation,
        sal,
        mah,
        dahe,
      },
      data: {
        fiduserersal: null,
        firstnersal: null,
        lastnersal: null,
        tozihersal: null,
        tarikhersal: null,
        fiduserabmantaghe: null,
        firstnabmantaghe: null,
        lastnabmantaghe: null,
        tozihabmantaghe: null,
        tarikhabmantaghe: null,
        taedabmantaghe: null,
        fiduserpeymankar: null,
        firstnpeymankar: null,
        lastnpeymankar: null,
        tozihpeymankar: null,
        tarikhpeymankar: null,
        taedpeymankar: null,
        fiduserabniroo: null,
        firstnabniroo: null,
        lastnabniroo: null,
        tozihabniroo: null,
        tarikhabniroo: null,
        taedabniroo: null,
        filenamenahaee: null,
        filepathnahaee: null,
        tarikhfilenahee: null,
        fidusertaeednahaee: null,
        firstntaeednahaee: null,
        lastntaeednahaee: null,
        tarikhtaeednahaee: null,
        taeednahaee: null,
        toziheslah: correctionText,
      },
    });

    return NextResponse.json(
      { message: "درخواست اصلاح با موفقیت ثبت شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error("خطا در ثبت درخواست اصلاح:", error);
    return NextResponse.json(
      {
        error: "خطا در ثبت درخواست اصلاح",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object" || !body.locale) {
      return NextResponse.json(
        { error: "بدنه درخواست نامعتبر است" },
        { status: 400 }
      );
    }

    const {
      idPumpStation,
      sal,
      mah,
      dahe,
      firstName,
      lastName,
      tozihPeymankar = null,
      taedPeymankar,
      locale,
    } = body;

    if (
      typeof idPumpStation !== "number" ||
      typeof sal !== "number" ||
      typeof mah !== "number" ||
      typeof dahe !== "number" ||
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof taedPeymankar !== "boolean"
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

    const now = new Date();

    const result = await prisma.taeedprogram.updateMany({
      where: {
        fidpumpsta: idPumpStation,
        sal: sal,
        mah: mah,
        dahe: dahe,
      },
      data: {
        firstnpeymankar: firstName,
        lastnpeymankar: lastName,
        tozihpeymankar: tozihPeymankar,
        tarikhpeymankar: now,
        taedpeymankar: taedPeymankar,
      },
    });

    return NextResponse.json(
      { message: "داده‌ها با موفقیت به‌روزرسانی شدند", count: result.count },
      { status: 200 }
    );
  } catch (error) {
    console.error("خطا در به‌روزرسانی TaeedProgram:", error);
    return NextResponse.json(
      {
        error: "خطا در به‌روزرسانی داده‌ها",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

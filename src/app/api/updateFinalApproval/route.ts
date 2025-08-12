import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body.idpumpstation !== "number" || !body.locale) {
      console.error("Validation failed:", body);
      return NextResponse.json(
        {
          error:
            "بدنه درخواست نامعتبر است - idpumpstation و locale مورد نیاز است",
          details: body,
        },
        { status: 400 }
      );
    }

    const { idpumpstation, sal, mah, dahe, firstname, lastname, locale } = body;
    const now = new Date();

    // Validate fiddahe or fiddec based on locale
    const record = await prisma.taeedprogram.findFirst({
      where: {
        fidpumpsta: idpumpstation,
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

    const updateResult = await prisma.taeedprogram.updateMany({
      where: {
        fidpumpsta: idpumpstation,
        sal: sal,
        mah: mah,
        dahe: dahe,
      },
      data: {
        firstntaeednahaee: firstname || null,
        lastntaeednahaee: lastname || null,
        tarikhtaeednahaee: now,
        taeednahaee: true,
        toziheslah: null,
      },
    });

    if (updateResult.count === 0) {
      return NextResponse.json(
        { error: "رکوردی برای به‌روزرسانی یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "داده‌ها با موفقیت به‌روزرسانی شدند",
        count: updateResult.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("خطا در به‌روزرسانی:", error);
    return NextResponse.json(
      {
        error: "خطا در به‌روزرسانی پایگاه داده",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

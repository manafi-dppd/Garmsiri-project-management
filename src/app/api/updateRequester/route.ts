import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    if (
      !body ||
      typeof body.idpumpstation !== "number" ||
      typeof body.sal !== "number" ||
      typeof body.mah !== "number" ||
      typeof body.dahe !== "number" ||
      typeof body.firstname !== "string" ||
      typeof body.lastname !== "string" ||
      (typeof body.tozihersal !== "string" && body.tozihersal !== null) ||
      typeof body.taedabmantaghe !== "boolean" ||
      !body.locale
    ) {
      return NextResponse.json(
        { error: "فرمت بدنه درخواست نامعتبر است" },
        { status: 400 }
      );
    }

    const {
      idpumpstation,
      sal,
      mah,
      dahe,
      firstname,
      lastname,
      tozihersal,
      taedabmantaghe,
      locale,
    } = body;

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

    const now = new Date();

    const updatedProgram = await prisma.taeedprogram.updateMany({
      where: {
        fidpumpsta: idpumpstation,
        sal: sal,
        mah: mah,
        dahe: dahe,
      },
      data: {
        firstnersal: firstname,
        lastnersal: lastname,
        tozihersal: tozihersal,
        tarikhersal: now,
        taedabmantaghe: taedabmantaghe,
      },
    });

    return NextResponse.json(updatedProgram, { status: 200 });
  } catch (error) {
    console.error("خطا در به‌روزرسانی:", error);
    return NextResponse.json(
      { error: "خطا در به‌روزرسانی TaeedProgram" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic"; // Force dynamic rendering

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sal = searchParams.get("sal");
    const mah = searchParams.get("mah");
    const dahe = searchParams.get("dahe");
    const FIdPumpSta = searchParams.get("fidpumpsta");
    const locale = searchParams.get("locale");

    if (!sal || !mah || !dahe || !FIdPumpSta || !locale) {
      return NextResponse.json(
        { error: "پارامترهای ضروری وجود ندارد" },
        { status: 400 }
      );
    }

    const salNum = Number(sal);
    const mahNum = Number(mah);
    const daheNum = Number(dahe);
    const fidPumpStaNum = Number(FIdPumpSta);

    if (
      isNaN(salNum) ||
      isNaN(mahNum) ||
      isNaN(daheNum) ||
      isNaN(fidPumpStaNum)
    ) {
      return NextResponse.json(
        { error: "مقادیر عددی نامعتبر" },
        { status: 400 }
      );
    }

    // Validate fiddahe or fiddec based on locale
    const record = await prisma.taeedprogram.findFirst({
      where: {
        sal: salNum,
        mah: mahNum,
        dahe: daheNum,
        fidpumpsta: fidPumpStaNum,
      },
      select: { taedabmantaghe: true, fiddahe: true, fiddec: true },
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

    return NextResponse.json([{ taedabmantaghe: record.taedabmantaghe }], {
      status: 200,
    });
  } catch (error) {
    console.error("خطا در دریافت اطلاعات:", error);
    return NextResponse.json(
      { error: "خطای سرور داخلی", details: error },
      { status: 500 }
    );
  }
}

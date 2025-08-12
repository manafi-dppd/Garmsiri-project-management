import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type TaeedProgramRequest = {
  FIdPumpSta: number;
  Sal: number;
  Mah: number;
  Dahe: number;
  field: string;
  locale: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TaeedProgramRequest;
    const { FIdPumpSta, Sal, Mah, Dahe, field, locale } = body;

    if (!FIdPumpSta || !Sal || !Mah || !Dahe || !field || !locale) {
      return NextResponse.json(
        { error: "پارامترهای ضروری وجود ندارد" },
        { status: 400 }
      );
    }

    // Validate fiddahe or fiddec based on locale
    const record = await prisma.taeedprogram.findFirst({
      where: { fidpumpsta: FIdPumpSta, sal: Sal, mah: Mah, dahe: Dahe },
      select: { [field]: true, fiddahe: true, fiddec: true },
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

    return NextResponse.json({ value: record[field] ?? "" }, { status: 200 });
  } catch (error) {
    console.error("خطا در دریافت اطلاعات TaeedProgram:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

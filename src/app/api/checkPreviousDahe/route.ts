import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type CheckPreviousDaheRequest = {
  FIdPumpSta: number;
  Sal: number;
  Mah: number;
  Dahe: number;
  FidDahe: number;
  locale: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckPreviousDaheRequest;
    const { FIdPumpSta, FidDahe, locale } = body;

    // بررسی ورودی‌ها
    if (!FIdPumpSta || FidDahe === undefined || !locale) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // یافتن کوچک‌ترین مقدار fiddahe یا fiddec
    const minFid = await prisma.taeedprogram.aggregate({
      where: {
        fidpumpsta: FIdPumpSta,
        ...(locale === "fa"
          ? { fiddahe: { not: null } }
          : { fiddec: { not: null } }),
      },
      _min: {
        ...(locale === "fa" ? { fiddahe: true } : { fiddec: true }),
      },
    });
    // دسترسی ایمن به fiddahe یا fiddec
    const minFidValue =
      locale === "fa"
        ? "fiddahe" in minFid._min
          ? minFid._min.fiddahe
          : null
        : "fiddec" in minFid._min
        ? minFid._min.fiddec
        : null;
    // بررسی دهه قبلی
    const previousDahe = FidDahe - 1;
    if (
      previousDahe < 1 ||
      (minFidValue !== null && previousDahe <= minFidValue)
    ) {
      return NextResponse.json({ hasPrevious: false }, { status: 200 });
    }
    // بررسی وجود رکورد برای دهه قبلی با شرط fiddahe یا fiddec
    const result = await prisma.taeedprogram.findFirst({
      where: {
        fidpumpsta: FIdPumpSta,
        ...(locale === "fa"
          ? { fiddahe: { equals: previousDahe, not: null } }
          : { fiddec: { equals: previousDahe, not: null } }),
      },
      select: { lastnersal: true },
    });
    return NextResponse.json(
      {
        hasPrevious: !!result,
        isPreviousSaved: !!result?.lastnersal,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking previous dahe:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

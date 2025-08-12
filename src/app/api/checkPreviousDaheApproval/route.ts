import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type CheckPreviousDaheApprovalRequest = {
  idPumpStation: number;
  fiddahe: number;
  locale: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckPreviousDaheApprovalRequest;
    const { idPumpStation, fiddahe, locale } = body;

    // بررسی ورودی‌ها
    if (!idPumpStation || fiddahe === undefined || !locale) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // یافتن کوچک‌ترین مقدار fiddahe یا fiddec
    const minFid = await prisma.taeedprogram.aggregate({
      where: {
        fidpumpsta: idPumpStation,
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
    const previousDahe = fiddahe - 1;
    if (
      previousDahe < 1 ||
      (minFidValue !== null && previousDahe <= minFidValue)
    ) {
      return NextResponse.json({ isApproved: false }, { status: 200 });
    }

    // بررسی وجود رکورد برای دهه قبلی با شرط fiddahe یا fiddec
    const previousDaheRecord = await prisma.taeedprogram.findFirst({
      where: {
        fidpumpsta: idPumpStation,
        ...(locale === "fa"
          ? { fiddahe: { equals: previousDahe, not: null } }
          : { fiddec: { equals: previousDahe, not: null } }),
      },
      select: { taedabmantaghe: true },
    });
    console.log(
      "previousDaheRecord?.taedabmantaghe: ",
      previousDaheRecord?.taedabmantaghe
    );
    return NextResponse.json(
      {
        isApproved: previousDaheRecord?.taedabmantaghe === true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking previous dahe approval:", error);
    return NextResponse.json(
      {
        error: `خطا در بررسی وضعیت دهه قبلی: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

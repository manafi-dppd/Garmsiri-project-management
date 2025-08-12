import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // بررسی فرمت بدنه درخواست
    if (
      typeof body?.fidpumpsta !== "number" ||
      typeof body?.sal !== "number" ||
      typeof body?.mah !== "number" ||
      typeof body?.dahe !== "number" ||
      typeof body?.firstnersal !== "string" ||
      typeof body?.lastnersal !== "string" ||
      (typeof body?.tozihersal !== "string" && body?.tozihersal !== null) ||
      typeof body?.locale !== "string"
    ) {
      console.error("[route.ts] Invalid request body:", body);
      return NextResponse.json(
        { error: "Invalid request body format" },
        { status: 400 }
      );
    }

    const {
      fidpumpsta,
      sal,
      mah,
      dahe,
      firstnersal,
      lastnersal,
      tozihersal,
      locale,
    } = body;
    const now = new Date();

    // لاگ برای دیباگ ورودی‌ها
    console.log("[route.ts] Input parameters:", {
      fidpumpsta,
      sal,
      mah,
      dahe,
      locale,
    });

    // تنظیم شرط where بر اساس locale
    const whereClause = {
      fidpumpsta: fidpumpsta,
      sal: sal,
      mah: mah,
      dahe: dahe,
      ...(locale === "fa"
        ? { fiddahe: { not: null } }
        : { fiddec: { not: null } }),
    };

    // لاگ برای دیباگ شرط where
    console.log("[route.ts] whereClause:", whereClause);

    const updatedRecords = await prisma.taeedprogram.updateMany({
      where: whereClause,
      data: {
        firstnersal: firstnersal,
        lastnersal: lastnersal,
        tozihersal: tozihersal,
        tarikhersal: now,
      },
    });

    // لاگ برای دیباگ تعداد رکوردهای به‌روزرسانی‌شده
    console.log("[route.ts] Updated records count:", updatedRecords.count);

    if (updatedRecords.count === 0) {
      return NextResponse.json(
        {
          error:
            locale === "fa"
              ? "رکوردی با fiddahe غیر NULL یافت نشد"
              : "No record found with non-NULL fiddec",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[route.ts] Failed to update TaeedProgram:", error);
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

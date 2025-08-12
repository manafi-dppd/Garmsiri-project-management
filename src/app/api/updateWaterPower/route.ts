import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      console.error("[updateWaterPower] Invalid request body:", body);
      return NextResponse.json(
        { error: "Invalid request body" },
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
      tozihAbNiroo = null,
      taedAbNiroo,
      locale,
    } = body;

    if (
      typeof idPumpStation !== "number" ||
      typeof sal !== "number" ||
      typeof mah !== "number" ||
      typeof dahe !== "number" ||
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof taedAbNiroo !== "boolean" ||
      typeof locale !== "string"
    ) {
      console.error(
        "[updateWaterPower] Missing or invalid required fields:",
        body
      );
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const now = new Date();

    // لاگ برای دیباگ ورودی‌ها
    console.log("[updateWaterPower] Input parameters:", {
      idPumpStation,
      sal,
      mah,
      dahe,
      locale,
    });

    // تنظیم شرط where بر اساس locale
    const whereClause = {
      fidpumpsta: idPumpStation,
      sal: sal,
      mah: mah,
      dahe: dahe,
      ...(locale === "fa"
        ? { fiddahe: { not: null } }
        : { fiddec: { not: null } }),
    };

    // لاگ برای دیباگ شرط where
    console.log("[updateWaterPower] whereClause:", whereClause);

    const updatedRecords = await prisma.taeedprogram.updateMany({
      where: whereClause,
      data: {
        firstnabniroo: firstName,
        lastnabniroo: lastName,
        tozihabniroo: tozihAbNiroo,
        tarikhabniroo: now,
        taedabniroo: taedAbNiroo,
      },
    });

    // لاگ برای دیباگ تعداد رکوردهای به‌روزرسانی‌شده
    console.log(
      "[updateWaterPower] Updated records count:",
      updatedRecords.count
    );

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
      { message: "Data updated successfully", count: updatedRecords.count },
      { status: 200 }
    );
  } catch (error) {
    console.error("[updateWaterPower] Failed to update TaeedProgram:", error);
    return NextResponse.json(
      {
        error: "Failed to update data",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

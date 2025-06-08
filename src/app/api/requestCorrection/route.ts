// src/app/api/requestCorrection/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { idPumpStation, sal, mah, dahe, correctionText } = body;

    if (
      typeof idPumpStation !== "number" ||
      typeof sal !== "number" ||
      typeof mah !== "number" ||
      typeof dahe !== "number" ||
      typeof correctionText !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    // حذف متغیر now که استفاده نشده بود
    // const currentDate = new Date();

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
      { message: "Correction requested successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to request correction:", error);
    return NextResponse.json(
      {
        error: "Failed to request correction",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

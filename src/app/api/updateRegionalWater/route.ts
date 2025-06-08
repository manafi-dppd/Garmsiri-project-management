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

    const {
      idPumpStation,
      sal,
      mah,
      dahe,
      firstName,
      lastName,
      tozihAbMantaghe = null,
      taedAbMantaghe,
    } = body;

    if (
      typeof idPumpStation !== "number" ||
      typeof sal !== "number" ||
      typeof mah !== "number" ||
      typeof dahe !== "number" ||
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof taedAbMantaghe !== "boolean"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const now = new Date();

    await prisma.taeedprogram.updateMany({
      where: {
        fidpumpsta: idPumpStation,
        sal: sal,
        mah: mah,
        dahe: dahe,
      },
      data: {
        firstnabmantaghe: firstName,
        lastnabmantaghe: lastName,
        tozihabmantaghe: tozihAbMantaghe,
        tarikhabmantaghe: now,
        taedabmantaghe: taedAbMantaghe,
      },
    });

    return NextResponse.json(
      { message: "Data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update TaeedProgram:", error);
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

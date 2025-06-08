import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (
      !body ||
      typeof body.idPumpStation !== "number" ||
      typeof body.sal !== "number" ||
      typeof body.mah !== "number" ||
      typeof body.dahe !== "number" ||
      typeof body.firstName !== "string" ||
      typeof body.lastName !== "string" ||
      typeof body.taedAbNiroo !== "boolean"
    ) {
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
    } = body;
    const now = new Date();

    const result = await prisma.taeedprogram.updateMany({
      where: {
        fidpumpsta: idPumpStation,
        sal: sal,
        mah: mah,
        dahe: dahe,
      },
      data: {
        firstnabniroo: firstName,
        lastnabniroo: lastName,
        tozihabniroo: tozihAbNiroo,
        tarikhabniroo: now,
        taedabniroo: taedAbNiroo,
      },
    });

    return NextResponse.json(
      { message: "Data updated successfully", count: result.count },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update TaeedProgram:", error);
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

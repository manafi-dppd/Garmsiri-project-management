import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (
      typeof body?.fidpumpsta !== "number" ||
      typeof body?.sal !== "number" ||
      typeof body?.mah !== "number" ||
      typeof body?.dahe !== "number" ||
      typeof body?.firstnersal !== "string" ||
      typeof body?.lastnersal !== "string" ||
      (typeof body?.tozihersal !== "string" && body?.tozihersal !== null)
    ) {
      return NextResponse.json(
        { error: "Invalid request body format" },
        { status: 400 }
      );
    }

    const { fidpumpsta, sal, mah, dahe, firstnersal, lastnersal, tozihersal } =
      body;
    const now = new Date();

    await prisma.taeedprogram.updateMany({
      where: {
        fidpumpsta: fidpumpsta,
        sal: sal,
        mah: mah,
        dahe: dahe,
      },
      data: {
        firstnersal: firstnersal,
        lastnersal: lastnersal,
        tozihersal: tozihersal,
        tarikhersal: now,
      },
    });

    return NextResponse.json(
      { message: "Data updated successfully" },
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

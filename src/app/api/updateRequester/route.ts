import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    if (
      !body ||
      typeof body.idpumpstation !== "number" ||
      typeof body.sal !== "number" ||
      typeof body.mah !== "number" ||
      typeof body.dahe !== "number" ||
      typeof body.firstname !== "string" ||
      typeof body.lastname !== "string" ||
      (typeof body.tozihersal !== "string" && body.tozihersal !== null) ||
      typeof body.taedabmantaghe !== "boolean"
    ) {
      return NextResponse.json(
        { error: "Invalid request body format" },
        { status: 400 }
      );
    }

    const {
      idpumpstation,
      sal,
      mah,
      dahe,
      firstname,
      lastname,
      tozihersal,
      taedabmantaghe,
    } = body;
    const now = new Date();

    const updatedProgram = await prisma.taeedprogram.updateMany({
      where: {
        fidpumpsta: idpumpstation,
        sal: sal,
        mah: mah,
        dahe: dahe,
      },
      data: {
        firstnersal: firstname,
        lastnersal: lastname,
        tozihersal: tozihersal,
        tarikhersal: now,
        taedabmantaghe: taedabmantaghe,
      },
    });

    return NextResponse.json(updatedProgram, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update TaeedProgram" },
      { status: 500 }
    );
  }
}

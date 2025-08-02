import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body.idpumpstation !== "number") {
      console.error("Validation failed:", body);
      return NextResponse.json(
        {
          error: "Invalid request body - idpumpstation is required",
          details: body,
        },
        { status: 400 }
      );
    }

    const { idpumpstation, sal, mah, dahe, firstname, lastname } = body;
    const now = new Date();

    const updateResult = await prisma.taeedprogram.updateMany({
      where: {
        fidpumpsta: idpumpstation,
        sal: sal,
        mah: mah,
        dahe: dahe,
      },
      data: {
        firstntaeednahaee: firstname || null,
        lastntaeednahaee: lastname || null,
        tarikhtaeednahaee: now,
        taeednahaee: true,
        toziheslah: null,
      },
    });

    if (updateResult.count === 0) {
      return NextResponse.json(
        { error: "No matching record found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Data updated successfully", count: updateResult.count },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      {
        error: "Database update failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

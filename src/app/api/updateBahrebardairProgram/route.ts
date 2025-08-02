import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { IdRanesh, IdTarDor, Tedad, Shorooe, Paian } = body;

    const convertToUTCTime = (
      timeString: string | null | undefined
    ): Date | null => {
      if (!timeString) return null;

      const [hours, minutes] = timeString.split(":").map(Number);
      const date = new Date();
      date.setUTCHours(hours, minutes, 0, 0);
      return date;
    };

    const updateData: {
      tedad?: number;
      shorooe?: Date | null;
      paian?: Date | null;
    } = {};

    if (Tedad !== undefined) {
      updateData.tedad = Tedad ?? 0;
    }

    if (Shorooe !== undefined) {
      updateData.shorooe = convertToUTCTime(Shorooe);
    }

    if (Paian !== undefined) {
      updateData.paian = convertToUTCTime(Paian);
    }

    const result = await prisma.bahrebardairprogram.updateMany({
      where: {
        fidranesh: IdRanesh,
        fidtardor: IdTarDor,
      },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Data updated successfully", count: result.count },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update bahrebardairprogram:", error);
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

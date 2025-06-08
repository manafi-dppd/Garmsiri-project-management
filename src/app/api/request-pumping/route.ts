import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const bahrebardairData = await prisma.bahrebardairprogram.findMany({
      where: { tedad: { gt: 0 } },
      select: {
        fidranesh: true,
        fidtardor: true,
        tedad: true,
        shorooe: true,
        paian: true,
      },
    });

    const bahrebardairSeghliData =
      await prisma.bahrebardairprogramseghli.findMany({
        where: { zarfiat: { not: null } },
        select: {
          fidranesh: true,
          fidtardor: true,
          zarfiat: true,
          shorooe: true,
          paian: true,
        },
      });

    return NextResponse.json({
      bahrebardair: bahrebardairData,
      bahrebardairSeghli: bahrebardairSeghliData,
    });
  } catch (error) {
    console.error("Error fetching all pump data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

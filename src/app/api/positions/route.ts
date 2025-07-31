import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const positions = await prisma.position.findMany({
      select: {
        id: true,
        title: true,
        title_fa: true,
        title_ar: true,
        title_tr: true,
        req_license: true,
        dependent: true,
      },
    });
    return NextResponse.json(positions);
  } catch (error) {
    console.error("[API] Error fetching positions:", error);
    return NextResponse.json(
      { message: "Error fetching positions" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface PumpDataRequest {
  fidranesh: number[];
  idtardors: number[];
}

export async function POST(request: NextRequest) {
  let body: PumpDataRequest | null = null;

  try {
    // سعی در parse body
    body = await request.json();
  } catch (parseError) {
    console.error("Error parsing request body:", parseError);
    return NextResponse.json(
      { error: "Invalid or empty JSON body" },
      { status: 400 }
    );
  }

  // ادامه اعتبارسنجی (اگر body null باشد، اینجا هندل می‌شود)
  try {
    // اعتبارسنجی ورودی‌ها
    if (
      !body ||
      !Array.isArray(body.fidranesh) ||
      body.fidranesh.length === 0 ||
      body.fidranesh.some((id) => typeof id !== "number" || isNaN(id)) ||
      !Array.isArray(body.idtardors) ||
      body.idtardors.length === 0 ||
      body.idtardors.some((id) => typeof id !== "number" || isNaN(id))
    ) {
      return NextResponse.json(
        {
          error: "Invalid parameters",
          received: body,
        },
        { status: 400 }
      );
    }

    const { fidranesh, idtardors } = body;

    // اجرای همزمان کوئری‌ها برای بهینه‌سازی
    const [bahrebardairData, bahrebardairSeghliData] = await Promise.all([
      prisma.bahrebardairprogram.findMany({
        where: {
          fidranesh: { in: fidranesh },
          fidtardor: { in: idtardors },
          tedad: { gt: 0 },
        },
        select: {
          fidranesh: true,
          fidtardor: true,
          tedad: true,
          shorooe: true,
          paian: true,
        },
      }),
      prisma.bahrebardairprogramseghli.findMany({
        where: {
          fidranesh: { in: fidranesh },
          fidtardor: { in: idtardors },
          zarfiat: { not: null },
        },
        select: {
          fidranesh: true,
          fidtardor: true,
          zarfiat: true,
          shorooe: true,
          paian: true,
        },
      }),
    ]);

    // اطمینان از بازگشت پاسخ معتبر حتی اگر داده‌ها خالی باشند
    return NextResponse.json(
      {
        bahrebardair: bahrebardairData || [],
        bahrebardairSeghli: bahrebardairSeghliData || [],
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching pump data:", error);
    return NextResponse.json(
      {
        error: "Server error",
        bahrebardair: [],
        bahrebardairSeghli: [],
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ApiKhatRanesh {
  idranesh: number;
  raneshname: string;
  fidpumpsta: number;
  fiddpipe: number;
  fidsepu: number;
  fidmeasuring: number;
  zarfiat?: number;
  active?: boolean;
}

interface PumpData {
  zarfiat?: number;
  [key: string]: unknown;
}

interface SegliData {
  zarfiat?: number;
}

const isKhatRanesh = (data: unknown): data is ApiKhatRanesh => {
  const d = data as ApiKhatRanesh;
  return (
    typeof d.idranesh === "number" &&
    typeof d.raneshname === "string" &&
    typeof d.fidpumpsta === "number" &&
    typeof d.fiddpipe === "number" &&
    typeof d.fidsepu === "number" &&
    typeof d.fidmeasuring === "number"
  );
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idPumpStation = parseInt(
      searchParams.get("idPumpStation") || "0",
      10
    );

    if (!idPumpStation) {
      return NextResponse.json(
        { error: "idPumpStation is required" },
        { status: 400 }
      );
    }

    const khatRaneshList = await prisma.khatranesh.findMany({
      where: { fidpumpsta: idPumpStation },
      select: {
        idranesh: true,
        raneshname: true,
        fidpumpsta: true,
        fiddpipe: true,
        fidsepu: true,
        fidmeasuring: true,
      },
    });

    const detailedKhatRaneshList = await Promise.all(
      khatRaneshList.map(async (ranesh: unknown) => {
        if (!isKhatRanesh(ranesh)) {
          return ranesh;
        }

        const enhancedRanesh: ApiKhatRanesh = {
          ...ranesh,
          zarfiat: 0,
          active: true,
        };

        if (ranesh.fidsepu === 1) {
          const pumpRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getKhatRaneshPump?idRanesh=${ranesh.idranesh}`
          );
          const pumpData = (await pumpRes.json()) as PumpData;
          return {
            ...ranesh,
            ...pumpData,
            zarfiat: pumpData.zarfiat ?? 0,
            active: ranesh.active ?? true,
          };
        } else {
          const segliData = (await prisma.khatraneshsegli.findFirst({
            where: { fidranesh: ranesh.idranesh },
            select: { zarfiat: true },
          })) as SegliData | null;
          enhancedRanesh.zarfiat = segliData?.zarfiat ?? 0;
        }

        return enhancedRanesh;
      })
    );

    return NextResponse.json(detailedKhatRaneshList);
  } catch (error) {
    console.error("❌ خطا در واکشی خطوط رانش:", error);
    return NextResponse.json(
      { error: "Failed to fetch KhatRanesh" },
      { status: 500 }
    );
  }
}

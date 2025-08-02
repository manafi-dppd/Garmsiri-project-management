import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

// export const dynamic = "force-static";

export async function GET(req: NextRequest) {
  const t = await getTranslations("PumpStations");
  const url = new URL(req.url);
  const networkId = Number(url.searchParams.get("networkId"));
  const FIdDP = Number(url.searchParams.get("FIdDP"));

  if (!networkId || FIdDP !== 2) {
    return NextResponse.json(
      { error: t("invalidParameters") },
      { status: 400 }
    );
  }

  try {
    const pumpStations = await prisma.pumpstation.findMany({
      where: {
        fidnet: networkId,
        fiddp: FIdDP,
        ready: true,
      },
      select: {
        idpumpsta: true,
        namestation: true,
        namestation_fa: true,
        namestation_ar: true,
        namestation_tr: true,
      },
    });

    return NextResponse.json(
      { pumpStations },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching pump stations:", error);
    return NextResponse.json({ error: t("fetchError") }, { status: 500 });
  }
}

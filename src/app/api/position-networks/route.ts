import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface PositionNetwork {
  fidnetwork: number | null; // اصلاح نوع به number | null
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const positionId = searchParams.get("positionId");

  if (!positionId || isNaN(parseInt(positionId))) {
    console.error("[PositionNetworksAPI] Invalid or missing positionId");
    return NextResponse.json({ error: "Invalid positionId" }, { status: 400 });
  }

  try {
    const positionNetworks = await prisma.position_network.findMany({
      where: {
        fidposition: parseInt(positionId),
      },
      select: {
        fidnetwork: true,
      },
    });

    if (!positionNetworks.length) {
      return NextResponse.json({ networks: [] }, { status: 200 });
    }

    const networkIds = positionNetworks
      .filter((pn): pn is { fidnetwork: number } => pn.fidnetwork !== null) // فیلتر کردن null
      .map((pn) => pn.fidnetwork);

    const networks = await prisma.network.findMany({
      where: {
        idnet: {
          in: networkIds,
        },
      },
      select: {
        idnet: true,
        network: true,
        network_fa: true,
        network_ar: true,
        network_tr: true,
        trustee: true,
      },
    });

    return NextResponse.json(
      { networks },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("[PositionNetworksAPI] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

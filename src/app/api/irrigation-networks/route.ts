import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

interface DecodedToken {
  userId: number;
  username: string;
}

export async function GET() {
  try {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secretKey = process.env.SECRET_KEY || "default-secret-key";
    const decoded = jwt.verify(token, secretKey) as DecodedToken;

    const userPositions = await prisma.position_on_user.findMany({
      where: { user_id: decoded.userId },
      include: { position: { select: { dependent: true } } },
    });

    const networks = await prisma.network.findMany({
      select: { idnet: true, network: true, trustee: true },
    });

    const hasAbNirooPosition = userPositions.some(
      (pos) => pos.position.dependent === "AbNiroo"
    );

    const filteredNetworks = hasAbNirooPosition
      ? networks.filter((net) => net.trustee !== "AbMantaghei")
      : networks;

    return NextResponse.json({ networks: filteredNetworks });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
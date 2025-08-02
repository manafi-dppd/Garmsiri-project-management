import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { locales, Locale, defaultLocale } from "@/i18n/config";

export const dynamic = "force-dynamic";

interface DecodedToken {
  userId: number;
  username: string;
}

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      console.error("[IrrigationNetworksAPI] No auth token found");
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    const secretKey = process.env.SECRET_KEY || "default-secret-key";
    const decoded = jwt.verify(token, secretKey) as DecodedToken;

    const locale =
      (request.headers.get("Accept-Language")?.split(",")[0] as Locale) ||
      defaultLocale;

    const networks = await prisma.network.findMany({
      select: {
        idnet: true,
        network: true,
        network_fa: true,
        network_ar: true,
        network_tr: true,
        trustee: true,
      },
    });

    const hasAbNirooPosition = (
      await prisma.position_on_user.findMany({
        where: { user_id: decoded.userId },
        include: { position: { select: { dependent: true } } },
      })
    ).some((pos) => pos.position.dependent === "AbNiroo");

    const filteredNetworks = hasAbNirooPosition
      ? networks.filter((net) => net.trustee !== "AbMantaghei")
      : networks;

    return NextResponse.json(
      { networks: filteredNetworks },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.error("[IrrigationNetworksAPI] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}

// برای درخواست‌های OPTIONS (در صورت نیاز مرورگر)
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}

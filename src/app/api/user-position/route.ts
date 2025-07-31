import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic"; // اجبار به رندر دینامیک

interface DecodedToken {
  userId: number;
  username: string;
}

interface Position {
  position: {
    title: string;
  };
}

export async function GET() {
  try {
    const token = cookies().get("auth_token")?.value;
    if (!token) {
      console.error("[UserPositionAPI] No auth token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      console.error("[UserPositionAPI] SECRET_KEY is not defined");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, secretKey) as DecodedToken;
    if (!decoded.userId) {
      console.error("[UserPositionAPI] No userId in token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userWithPositions = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        position_on_user: {
          include: {
            position: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });

    if (!userWithPositions) {
      console.error("[UserPositionAPI] User not found for id:", decoded.userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const positions = userWithPositions.position_on_user.map(
      (pu: Position) => pu.position.title
    );
    return NextResponse.json({
      username: userWithPositions.user_name,
      positions,
      firstname: userWithPositions.first_name,
      lastname: userWithPositions.last_name,
    });
  } catch (error) {
    console.error("[UserPositionAPI] Error in user-position route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic"; // استفاده از force-dynamic

interface DecodedToken {
  userId: number;
  username: string;
}

interface Position {
  position: {
    id: number; // اضافه کردن id
    title: string;
  };
}

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;

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
                id: true, // اضافه کردن id
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
      (pu: Position) => ({
        id: pu.position.id, // اضافه کردن id
        title: pu.position.title,
      })
    );

    return NextResponse.json(
      {
        username: userWithPositions.user_name,
        positions, // شامل id و title
        firstname: userWithPositions.first_name,
        lastname: userWithPositions.last_name,
      },
      {
        headers: {
          "Cache-Control": "no-store", // غیرفعال کردن کش
        },
      }
    );
  } catch (error) {
    console.error("[UserPositionAPI] Error in user-position route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

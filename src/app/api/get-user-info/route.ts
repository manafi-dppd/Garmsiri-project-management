import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

interface DecodedToken {
  userId: number;
  username: string;
  exp?: number;
  iss?: string;
}

interface Position {
  position: {
    title_fa: string;
  };
}

interface UserWithPositions {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  position_on_user: Position[];
}

export async function GET() {
  try {
    // 1. بررسی وجود کوکی auth_token
    const cookieStore = cookies();
    const token = (await cookieStore).get("auth_token")?.value;

    if (!token) {
      console.error("No auth token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // 2. اعتبارسنجی توکن
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      console.error("SECRET_KEY is not defined");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, secretKey) as DecodedToken;

    // 3. بررسی وجود userId در توکن
    if (!decoded.userId) {
      console.error("No userId in token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 4. جستجوی کاربر با روابط
    const user = (await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        position_on_user: {
          include: {
            position: {
              select: {
                title: true,
                title_fa: true,
              },
            },
          },
        },
      },
    })) as UserWithPositions | null;

    if (!user) {
      console.error("User not found for id:", decoded.userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 5. پردازش نتایج
    const positions = user.position_on_user.map((pos) => pos.position.title_fa);
    const username = user.user_name;
    const firstname = user.first_name;
    const lastname = user.last_name;

    return NextResponse.json(
      { username, positions, firstname, lastname },
      { status: 200 }
    );
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

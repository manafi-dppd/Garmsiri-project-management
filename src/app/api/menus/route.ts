import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

interface DecodedToken {
  userId: number;
}

export async function GET() {
  try {
    // 1. دریافت توکن احراز هویت از کوکی‌ها
    const cookieStore = cookies();
    const token = (await cookieStore).get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. بررسی SECRET_KEY
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // 3. اعتبارسنجی توکن
    const decoded = jwt.verify(token, secretKey) as DecodedToken;
    if (!decoded.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 4. دریافت منوهای قابل دسترس برای کاربر
    const accessibleMenus = await prisma.menu.findMany({
      where: {
        user_access: {
          some: {
            user_id: decoded.userId,
            has_access: true,
          },
        },
      },
      select: {
        id: true,
        title: true,
        title_fa: true,
        active: true,
        general: true,
        slug: true,
        parent_id: true,
      },
      orderBy: {
        id: "asc", // مرتب‌سازی بر اساس id
      },
    });

    return NextResponse.json(accessibleMenus);
  } catch (error) {
    console.error("Error fetching accessible menus:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

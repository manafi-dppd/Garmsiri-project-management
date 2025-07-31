import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { locales } from "@/i18n/config";

export const dynamic = "force-dynamic"; // اجبار به رندر دینامیک

interface DecodedToken {
  userId: number;
  username: string;
  exp?: number;
  iss?: string;
}

interface Position {
  position: {
    title: string;
    title_fa: string;
    title_ar: string;
    title_tr: string;
  };
}

interface UserWithPositions {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  position_on_user: Position[];
}

export async function GET(request: Request) {
  try {
    // 1. استخراج locale از کوکی NEXT_LOCALE
    const cookieStore = cookies();
    const locale = (cookieStore.get("NEXT_LOCALE")?.value || "fa") as
      | "en"
      | "fa"
      | "ar"
      | "tr";
    if (!locales.includes(locale)) {
      console.error("[GetUserInfoAPI] Invalid locale:", locale);
      return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
    }

    // 2. بررسی وجود کوکی auth_token
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      console.error("[GetUserInfoAPI] No auth token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. اعتبارسنجی توکن
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      console.error("[GetUserInfoAPI] SECRET_KEY is not defined");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, secretKey) as DecodedToken;

    // 4. بررسی وجود userId در توکن
    if (!decoded.userId) {
      console.error("[GetUserInfoAPI] No userId in token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 5. جستجوی کاربر با روابط
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        position_on_user: {
          include: {
            position: {
              select: {
                title: true,
                title_fa: true,
                title_ar: true,
                title_tr: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      console.error("[GetUserInfoAPI] User not found for id:", decoded.userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 6. انتخاب عنوان موقعیت بر اساس زبان و افزودن title انگلیسی
    const positions = user.position_on_user.map((pos: Position) => {
      return {
        positionTitle: (() => {
          switch (locale) {
            case "en":
              return pos.position.title;
            case "ar":
              return pos.position.title_ar;
            case "tr":
              return pos.position.title_tr;
            case "fa":
            default:
              return pos.position.title_fa;
          }
        })(),
        title: pos.position.title, // افزودن title انگلیسی برای isAdminOrCreator
      };
    });

    const username = user.user_name;
    const firstname = user.first_name;
    const lastname = user.last_name;

    return NextResponse.json(
      { username, positions, firstname, lastname },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GetUserInfoAPI] JWT Verification Error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

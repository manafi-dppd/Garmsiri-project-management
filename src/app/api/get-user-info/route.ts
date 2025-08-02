import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { locales, Locale, defaultLocale } from "@/i18n/config";

export const dynamic = "force-dynamic";

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

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const url = new URL(request.url);
    const urlLocale = url.searchParams.get("locale");
    const acceptLanguage = request.headers
      .get("Accept-Language")
      ?.split(",")[0];
    const localeBase = acceptLanguage
      ? acceptLanguage.split("-")[0]
      : defaultLocale;
    const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

    // اولویت: 1) پارامتر URL، 2) هدر Accept-Language، 3) کوکی NEXT_LOCALE، 4) defaultLocale
    const localeCandidate =
      urlLocale || localeBase || cookieLocale || defaultLocale;
    const locale = (
      locales.includes(localeCandidate as Locale)
        ? localeCandidate
        : defaultLocale
    ) as Locale;

    if (!locales.includes(locale)) {
      console.error("[GetUserInfoAPI] Invalid locale:", locale);
      return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
    }

    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      console.error("[GetUserInfoAPI] No auth token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      console.error("[GetUserInfoAPI] SECRET_KEY is not defined");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, secretKey) as DecodedToken;

    if (!decoded.userId) {
      console.error("[GetUserInfoAPI] No userId in token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

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

    const positions = user.position_on_user.map((pos: Position) => {
      return {
        positionTitle: (() => {
          switch (locale) {
            case "en":
              return pos.position.title;
            case "ar":
              return pos.position.title_ar || pos.position.title;
            case "tr":
              return pos.position.title_tr || pos.position.title;
            case "fa":
            default:
              return pos.position.title_fa || pos.position.title;
          }
        })(),
        title: pos.position.title,
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
    console.error("[GetUserInfoAPI] Error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

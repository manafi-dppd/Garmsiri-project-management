// src/app/api/menus/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface MenuLocalized {
  id: number;
  title: string;
  title_fa: string;
  title_ar?: string;
  title_tr?: string;
  active: boolean;
  general: boolean;
  slug: string;
  parent_id: number | null;
}

export async function GET(request: NextRequest) {
  try {
    // خواندن کوکی از headers به جای cookies()
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = parseCookies(cookieHeader);
    const token = cookies.auth_token;

    const locale = request.headers.get("x-next-intl-locale") || "fa";

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, secretKey) as { userId: number };

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
        title_ar: true,
        title_tr: true,
        active: true,
        general: true,
        slug: true,
        parent_id: true,
      },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(
      accessibleMenus.map((menu) => ({
        ...menu,
        localized_title: getLocalizedTitle(menu, locale),
      }))
    );
  } catch (error) {
    console.error("Error fetching accessible menus:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// تابع کمکی برای تجزیه کوکی‌ها
function parseCookies(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (cookieString) {
    cookieString.split(";").forEach((cookie) => {
      const [name, value] = cookie.split("=").map((c) => c.trim());
      cookies[name] = decodeURIComponent(value);
    });
  }
  return cookies;
}

function getLocalizedTitle(menu: MenuLocalized, locale: string): string {
  switch (locale) {
    case "fa":
      return menu.title_fa;
    case "ar":
      return menu.title_ar || menu.title;
    case "tr":
      return menu.title_tr || menu.title;
    default:
      return menu.title;
  }
}

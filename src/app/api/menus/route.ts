import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { locales, Locale, defaultLocale } from "@/i18n/config";

interface Menu {
  id: number;
  title: string;
  title_fa: string;
  title_ar: string;
  title_tr: string;
  active: boolean;
  general: boolean;
  slug: string;
  parent_id: number | null;
}

export const dynamic = "force-static"; // اطمینان از رندر استاتیک

export async function GET(request: Request) {
  try {
    // استخراج locale از هدر Accept-Language
    const localeFromHeader =
      request.headers.get("Accept-Language") || defaultLocale;
    const locale = locales.includes(localeFromHeader as Locale)
      ? localeFromHeader
      : defaultLocale;

    // کوئری برای دریافت منوهای در دسترس
    const accessibleMenus = await prisma.menu.findMany({
      where: {
        user_access: {
          some: {
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
      orderBy: {
        id: "asc",
      },
    });
    // تبدیل منوها برای افزودن displayTitle و parentSlug
    const transformedMenus = accessibleMenus.map((menu: Menu) => ({
      id: menu.id,
      title: menu.title,
      title_fa: menu.title_fa,
      title_ar: menu.title_ar,
      title_tr: menu.title_tr,
      active: menu.active,
      general: menu.general,
      slug: menu.slug,
      parent_id: menu.parent_id,
      displayTitle: getTitleByLocale(menu, locale as Locale),
      parentSlug: null,
    }));
    // افزودن parentSlug برای منوهای فرزند
    const menusWithParentSlug = transformedMenus.map((menu) => {
      if (menu.parent_id) {
        const parentMenu = transformedMenus.find(
          (m) => m.id === menu.parent_id
        );
        return {
          ...menu,
          parentSlug: parentMenu?.slug || null,
        };
      }
      return menu;
    });
    return NextResponse.json(menusWithParentSlug, {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // کش برای یک ساعت
      },
    });
  } catch (error) {
    console.error("[MenusAPI] Error fetching accessible menus:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getTitleByLocale(
  menu: {
    title: string;
    title_fa: string;
    title_ar: string;
    title_tr: string;
  },
  locale: Locale
): string {
  switch (locale) {
    case "en":
      return menu.title;
    case "ar":
      return menu.title_ar;
    case "tr":
      return menu.title_tr;
    case "fa":
    default:
      return menu.title_fa;
  }
}

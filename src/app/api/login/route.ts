import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getServerTranslations } from "@/lib/getServerTranslations";
import { locales, Locale, defaultLocale } from "@/i18n/config";

export const dynamic = "force-dynamic"; // فعال کردن رندرینگ پویا برای این مسیر

export async function POST(request: Request) {
  const cookieStore = cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    defaultLocale) as Locale;
  if (!locales.includes(locale)) {
    console.error("[LoginAPI] Invalid locale:", locale);
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const t = await getServerTranslations("login", locale);
  const { username, password } = await request.json();
  const ipAddress = request.headers.get("x-forwarded-for") || "Unknown";
  const userAgent = request.headers.get("user-agent") || "Unknown";

  if (!username || !password) {
    return NextResponse.json(
      { error: t("errors.missingCredentials") },
      { status: 400 }
    );
  }

  try {
    // بررسی جدول user
    const user = await prisma.user.findUnique({
      where: { user_name: username },
    });

    if (user) {
      if (user.end_date && new Date(user.end_date) < new Date()) {
        await prisma.user.update({
          where: { id: user.id },
          data: { active: false },
        });

        await prisma.user_login_history.updateMany({
          where: {
            user_id: user.id,
            logout_time: null,
          },
          data: {
            logout_time: new Date(),
            status: "Expired",
          },
        });

        return NextResponse.json(
          { error: t("errors.accountExpired") },
          { status: 403 }
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: t("errors.invalidCredentials") },
          { status: 401 }
        );
      }

      const payload = {
        userId: user.id,
        username: user.user_name,
        iss: "garmsiri",
      };
      const secretKey = process.env.SECRET_KEY;
      if (!secretKey) {
        console.error("[LoginAPI] SECRET_KEY is not defined");
        return NextResponse.json(
          { error: "Server configuration error" },
          { status: 500 }
        );
      }
      const token = jwt.sign(payload, secretKey, {
        expiresIn: "7d",
      });

      await prisma.user_login_history.create({
        data: {
          user_id: user.id,
          ip_address: ipAddress,
          user_agent: userAgent,
          status: "Success",
          login_time: new Date(),
        },
      });

      const response = NextResponse.json(
        {
          success: true,
          message: t("success"),
          token,
        },
        { status: 200 }
      );
      response.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    }

    // بررسی جدول invitation
    const invitation = await prisma.invitation.findUnique({
      where: { username },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: t("errors.userNotFound") },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, invitation.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: t("errors.invalidCredentials") },
        { status: 401 }
      );
    }

    return NextResponse.json({
      first_name: invitation.first_name,
      last_name: invitation.last_name,
      mobile: invitation.mobile,
      id: invitation.id,
      active: true,
    });
  } catch (error: any) {
    console.error("[LoginAPI] Server error:", error);
    return NextResponse.json(
      { error: error.message || t("errors.unknown") },
      { status: 500 }
    );
  }
}

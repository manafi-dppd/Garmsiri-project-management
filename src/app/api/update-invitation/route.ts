import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getServerTranslations } from "@/lib/getServerTranslations";
import { locales, Locale, defaultLocale } from "@/i18n/config";

interface PositionOnInvitation {
  position_id: number;
}

interface InvitationAccess {
  menu_id: number;
  has_access: boolean;
}

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    defaultLocale) as Locale;
  if (!locales.includes(locale)) {
    console.error("[UpdateInvitationAPI] Invalid locale:", locale);
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const t = await getServerTranslations("updateCredentials", locale);
  try {
    const requestData = await request.json();
    console.log("Request data:", requestData);
    const { id, username, passcode } = requestData;
    const parsedId = parseInt(id, 10);
    console.log("Parsed ID:", parsedId);

    if (!parsedId || isNaN(parsedId)) {
      return NextResponse.json(
        { error: t("errors.invalidId") },
        { status: 400 }
      );
    }

    const currentInvitation = await prisma.invitation.findUnique({
      where: { id: parsedId },
      include: {
        user: { select: { email: true } },
        position_on_invitation: true,
        invitation_access: true,
      },
    });
    console.log("Current invitation:", currentInvitation);

    if (!currentInvitation) {
      return NextResponse.json(
        { error: t("errors.invitationNotFound") },
        { status: 404 }
      );
    }

    if (!currentInvitation.mobile) {
      return NextResponse.json(
        { error: t("errors.missingMobile") },
        { status: 400 }
      );
    }

    // اعتبارسنجی mobile
    if (!currentInvitation.mobile.match(/^\+?\d{10,15}$/)) {
      return NextResponse.json(
        { error: t("errors.invalidMobile") },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.upsert({
      where: { mobile: currentInvitation.mobile },
      update: {
        first_name: currentInvitation.first_name || "",
        last_name: currentInvitation.last_name || "",
        email: currentInvitation.user?.email ?? null,
        user_name: username || currentInvitation.username || "",
        password: passcode
          ? await bcrypt.hash(passcode, 10)
          : currentInvitation.password,
        mobile: currentInvitation.mobile,
        gender: currentInvitation.gender || "",
        inviter_id: currentInvitation.id,
        invitation_time: currentInvitation.created_at,
        registration_time: new Date(),
        active: true,
      },
      create: {
        first_name: currentInvitation.first_name || "",
        last_name: currentInvitation.last_name || "",
        email: currentInvitation.user?.email ?? null,
        user_name: username || currentInvitation.username || "",
        password: passcode
          ? await bcrypt.hash(passcode, 10)
          : currentInvitation.password,
        mobile: currentInvitation.mobile,
        gender: currentInvitation.gender || "",
        inviter_id: currentInvitation.id,
        invitation_time: currentInvitation.created_at,
        registration_time: new Date(),
        active: true,
      },
    });
    console.log("Upserted user:", newUser);

    if (currentInvitation.invitation_access?.length) {
      await prisma.user_access.createMany({
        data: currentInvitation.invitation_access.map(
          (a: InvitationAccess) => ({
            user_id: newUser.id,
            menu_id: a.menu_id,
            has_access: a.has_access,
          })
        ),
        skipDuplicates: true,
      });
    }

    if (currentInvitation.position_on_invitation?.length) {
      await prisma.position_on_user.createMany({
        data: currentInvitation.position_on_invitation.map(
          (p: PositionOnInvitation) => ({
            user_id: newUser.id,
            position_id: p.position_id,
          })
        ),
        skipDuplicates: true,
      });
    }

    await prisma.invitation.update({
      where: { id: parsedId },
      data: { is_registered: true, user_id: newUser.id },
    });

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      console.error(
        "[UpdateInvitation] SECRET_KEY is not defined in environment variables"
      );
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const payload = {
      userId: newUser.id,
      username: newUser.user_name,
      iss: "garmsiri",
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });

    const response = NextResponse.json(
      {
        message: t("success"),
        token,
        user: {
          id: newUser.id,
          username: newUser.user_name,
        },
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
  } catch (error: any) {
    console.error("[UpdateInvitation] Full error details:", error);
    return NextResponse.json(
      { error: error.message || t("errors.serverError") },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { getServerTranslations } from "@/lib/getServerTranslations";
import { locales, Locale, defaultLocale } from "@/i18n/config";

interface InvitationRequest {
  first_name?: string;
  last_name: string;
  mobile: string;
  end_date?: string;
  gender?: string;
  letter_issuer?: string;
  letter_number?: string;
  letter_date?: string;
  letter_approver?: string;
  selectedPositions: number[];
  editedAccessLevel?: { menu_id: number; has_access: boolean }[];
}

interface Menu {
  id: number;
}

interface AccessLevel {
  menu_id: number;
  has_access: boolean;
}

export const dynamic = "force-dynamic"; // فعال کردن رندرینگ پویا برای این مسیر

export async function POST(req: Request) {
  const cookieStore = cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    defaultLocale) as Locale;
  if (!locales.includes(locale)) {
    console.error("[InvitationAPI] Invalid locale:", locale);
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const t = await getServerTranslations("ApiInvitation", locale);
  try {
    const body = (await req.json()) as InvitationRequest;
    const { mobile, selectedPositions, editedAccessLevel, ...rest } = body;

    const existing = await prisma.invitation.findUnique({ where: { mobile } });
    if (existing) {
      return NextResponse.json(
        { message: t("userAlreadyInvited") },
        { status: 409 }
      );
    }

    const username = nanoid(6);
    const rawPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    console.log("username: ", username);
    console.log("Password: ", rawPassword);

    const newInvitation = await prisma.invitation.create({
      data: {
        ...rest,
        mobile,
        username,
        password: hashedPassword,
        end_date: rest.end_date ? new Date(rest.end_date) : null,
        is_registered: false,
      },
    });

    if (Array.isArray(editedAccessLevel) && editedAccessLevel.length > 0) {
      const allMenus = await prisma.menu.findMany({ select: { id: true } });
      const menuIds = allMenus.map((m: Menu) => m.id);

      const invalidMenuIds = editedAccessLevel
        .map((a) => a.menu_id)
        .filter((id) => !menuIds.includes(id));

      if (invalidMenuIds.length > 0) {
        throw new Error(
          t("invalidMenus", { invalidMenuIds: invalidMenuIds.join(", ") })
        );
      }

      await prisma.invitation_access.createMany({
        data: editedAccessLevel.map((a) => ({
          invitation_id: newInvitation.id,
          menu_id: a.menu_id,
          has_access: a.has_access,
        })),
        skipDuplicates: true,
      });
    } else {
      const defaults = await prisma.access_level.findMany({
        where: { position_id: { in: selectedPositions } },
        select: { menu_id: true, has_access: true },
      });

      if (defaults.length > 0) {
        await prisma.invitation_access.createMany({
          data: defaults.map((a: AccessLevel) => ({
            invitation_id: newInvitation.id,
            menu_id: a.menu_id,
            has_access: a.has_access,
          })),
          skipDuplicates: true,
        });
      }
    }

    await prisma.position_on_invitation.createMany({
      data: selectedPositions.map((position_id) => ({
        invitation_id: newInvitation.id,
        position_id,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json(
      {
        message: t("invitationCreated"),
        invitation: newInvitation,
        rawPassword,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[Invitation] Error creating invitation:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : t("serverError"),
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const cookieStore = cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    defaultLocale) as Locale;
  if (!locales.includes(locale)) {
    console.error("[InvitationAPI] Invalid locale:", locale);
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const t = await getServerTranslations("ApiInvitation", locale);
  try {
    const invitations = await prisma.invitation.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        mobile: true,
        created_at: true,
        end_date: true,
        is_registered: true,
        invitation_access: {
          select: {
            menu_id: true,
            has_access: true,
          },
        },
      },
    });
    return NextResponse.json(invitations);
  } catch (error) {
    console.error("[Invitation] Error fetching invitations:", error);
    return NextResponse.json({ message: t("fetchError") }, { status: 500 });
  }
}

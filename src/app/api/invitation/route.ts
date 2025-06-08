import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as InvitationRequest;
    const { mobile, selectedPositions, editedAccessLevel, ...rest } = body;

    const existing = await prisma.invitation.findUnique({ where: { mobile } });
    if (existing) {
      return NextResponse.json(
        { message: "این کاربر قبلاً دعوت شده است." },
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

    if (editedAccessLevel) {
      const allMenus = await prisma.menu.findMany({ select: { id: true } });
      const menuIds = allMenus.map((m: Menu) => m.id);

      const invalidMenuIds = editedAccessLevel
        .map((a) => a.menu_id)
        .filter((id) => !menuIds.includes(id));

      if (invalidMenuIds.length > 0) {
        throw new Error(`منوهای نامعتبر: ${invalidMenuIds.join(", ")}`);
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
        });
      }
    }

    await prisma.position_on_invitation.createMany({
      data: selectedPositions.map((position_id) => ({
        invitation_id: newInvitation.id,
        position_id,
      })),
    });

    return NextResponse.json(
      {
        message: "دعوت‌نامه با موفقیت ثبت شد.",
        invitation: newInvitation,
        rawPassword,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("خطا در ثبت دعوت‌نامه:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "خطایی در سرور رخ داده است.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
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
      },
    });
    return NextResponse.json(invitations);
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return NextResponse.json(
      { message: "خطا در دریافت داده‌ها" },
      { status: 500 }
    );
  }
}

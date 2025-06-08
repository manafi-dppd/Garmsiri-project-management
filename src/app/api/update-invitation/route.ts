import { config } from "dotenv";
config();
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface PositionOnInvitation {
  position_id: number;
}

interface InvitationAccess {
  menu_id: number;
  has_access: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const { id, firstName, lastName, mobile, username, passcode, email } =
      requestData;
    const parsedId = parseInt(id, 10);

    const currentInvitation = await prisma.invitation.findUnique({
      where: { id: parsedId },
      include: {
        user: true,
        position_on_invitation: true,
        invitation_access: true,
      },
    });

    if (!currentInvitation) {
      return NextResponse.json(
        { error: "اطلاعات دعوت‌نامه یافت نشد." },
        { status: 404 }
      );
    }

    const newUser = await prisma.user.upsert({
      where: { id: parsedId },
      update: {
        first_name: firstName || currentInvitation.first_name || "",
        last_name: lastName || currentInvitation.last_name,
        email: email || null,
        user_name: username || currentInvitation.username || "",
        password: passcode
          ? await bcrypt.hash(passcode, 10)
          : currentInvitation.password,
        mobile: mobile,
        gender: currentInvitation.gender || "",
        inviter_id: currentInvitation.id,
        invitation_time: currentInvitation.created_at,
        registration_time: new Date(),
      },
      create: {
        first_name: firstName || currentInvitation.first_name || "",
        last_name: lastName || currentInvitation.last_name,
        mobile: mobile,
        email: email || null,
        gender: currentInvitation.gender || "",
        inviter_id: currentInvitation.id,
        user_name: username || currentInvitation.username || "",
        password: passcode
          ? await bcrypt.hash(passcode, 10)
          : currentInvitation.password,
        invitation_time: currentInvitation.created_at,
        registration_time: new Date(),
        active: true,
      },
    });

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

    if (currentInvitation.invitation_access?.length) {
      await prisma.user_access.createMany({
        data: currentInvitation.invitation_access.map(
          (a: InvitationAccess) => ({
            user_id: newUser.id,
            menu_id: a.menu_id,
            has_access: a.has_access,
          })
        ),
      });
    }

    await prisma.invitation.update({
      where: { id: parsedId },
      data: { is_registered: true, user_id: newUser.id },
    });

    const payload = {
      userId: newUser.id,
      username: newUser.user_name,
      iss: "garmsiri",
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      { message: "اطلاعات با موفقیت بروزرسانی شد." },
      { status: 200 }
    );
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("خطا در بروزرسانی اطلاعات:", error);
    return NextResponse.json(
      { error: "مشکلی در ثبت اطلاعات پیش آمده است." },
      { status: 500 }
    );
  }
}

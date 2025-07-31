import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

type AuthRequest = {
  username: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const { username, password } = (await req.json()) as AuthRequest;

    const user = await prisma.user.findUnique({
      where: { user_name: username },
      select: {
        id: true,
        user_name: true,
        password: true,
        first_name: true,
        last_name: true,
        mobile: true,
        active: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "نام کاربری یا رمز عبور نادرست است." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "نام کاربری یا رمز عبور نادرست است." },
        { status: 401 }
      );
    }

    if (!user.first_name || !user.last_name || !user.mobile || !user.active) {
      return NextResponse.json({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        mobile: user.mobile || "",
        id: user.id.toString(),
        active: user.active || false,
      });
    }

    const payload = {
      userId: user.id,
      username: user.user_name,
      iss: "garmsiri",
    };

    const secretKey = process.env.SECRET_KEY || "default-secret-key";
    const token = jwt.sign(payload, secretKey, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });
    response.headers.append(
      "Set-Cookie",
      serialize("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })
    );

    return response;
  } catch (error) {
    console.error("خطا در احراز هویت:", error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است." },
      { status: 500 }
    );
  }
}

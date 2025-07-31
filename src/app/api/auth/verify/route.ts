import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // اجبار به رندر دینامیک

interface DecodedToken {
  userId: number;
  username: string;
  exp?: number;
  iss?: string;
}

export async function GET(req: Request) {
  try {
    const token = cookies().get("auth_token")?.value;
    if (!token) {
      console.error("[VerifyAPI] No token provided");
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      console.error("[VerifyAPI] SECRET_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, secretKey) as DecodedToken;
    return NextResponse.json({ success: true, decoded });
  } catch (error) {
    console.error("[VerifyAPI] Error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

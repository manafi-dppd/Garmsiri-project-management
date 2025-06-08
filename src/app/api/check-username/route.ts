import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    const existingUser = await prisma.user.findFirst({
      where: { user_name: username }
    });

    const existingInvitation = await prisma.invitation.findFirst({
      where: { username }
    });

    return NextResponse.json({
      exists: !!existingUser || !!existingInvitation
    });
  } catch (error) {
    console.error('Error checking username:', error);
    return NextResponse.json({ error: 'خطا در بررسی نام کاربری' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type CheckDuplicateRequest = {
  mobile: string;
  email: string;
};

export async function POST(request: Request) {
  const { mobile, email } = (await request.json()) as CheckDuplicateRequest;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ mobile }, { email }]
      }
    });

    if (existingUser) {
      if (existingUser.mobile === mobile) {
        return NextResponse.json({ error: 'شماره تلفن وارد شده تکراری است.' }, { status: 400 });
      }
      if (existingUser.email === email) {
        return NextResponse.json({ error: 'ایمیل وارد شده تکراری است.' }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ خطا در بررسی تکراری بودن:', error);
    return NextResponse.json({ error: 'خطا در ارتباط با پایگاه داده.' }, { status: 500 });
  }
}

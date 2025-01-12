import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// بررسی اطلاعات کاربر با متد GET
export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const username = searchParams.get('username');
  const password = searchParams.get('password');

  if (!username || !password) {
    return NextResponse.json(
      {error: 'Username and password are required'},
      {status: 400},
    );
  }

  try {
    const user = await prisma.invitation.findUnique({
      where: {username},
    });

    if (!user) {
      return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({error: 'Invalid credentials'}, {status: 401});
    }

    // ارسال اطلاعات کاربر به فرم ثبت نام
    return NextResponse.json({
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
    });
  } catch (error) {
    return NextResponse.json({error: 'Server error'}, {status: 500});
  }
}

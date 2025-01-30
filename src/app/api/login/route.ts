require('dotenv').config();
import {NextResponse} from 'next/server';
import {sqliteClient, sqlServerClient} from '@prisma/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {serialize} from 'cookie'; // اصلاح ایمپورت

const prisma = sqliteClient;
const JWT_SECRET = process.env.SECRET_KEY || 'default-secret-key';

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const username = searchParams.get('username');
  const password = searchParams.get('password');
  const ipAddress =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('remote-addr') ||
    'Unknown';
  const userAgent = request.headers.get('user-agent') || 'Unknown';

  if (!username || !password) {
    return NextResponse.json(
      {error: 'Username and password are required'},
      {status: 400},
    );
  }

  try {
    // یافتن کاربر در جدول User
    const user = await prisma.user.findUnique({
      where: {userName: username},
    });

    if (user) {
      // بررسی وضعیت endDate
      if (user.endDate && new Date(user.endDate) < new Date()) {
        // غیرفعال کردن حساب کاربر
        await prisma.user.update({
          where: {id: user.id},
          data: {active: false},
        });

        // بروزرسانی جدول UserLoginHistory
        await prisma.userLoginHistory.updateMany({
          where: {
            userId: user.id,
            logoutTime: null, // فقط رکوردهایی که هنوز logoutTime تنظیم نشده‌اند
          },
          data: {
            logoutTime: new Date(),
            status: 'Expired', // وضعیت ورود تغییر می‌کند
          },
        });

        return NextResponse.json(
          {
            error:
              'Your account is expired and deactivated. Please contact support.',
          },
          {status: 403},
        );
      }

      // اعتبارسنجی رمز عبور
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({error: 'Invalid credentials'}, {status: 401});
      }

      // تولید توکن
      const payload = {
        userId: user.id,
        username: user.userName,
        iss: 'garmsiri',
      };
      const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '7d'});

      // ثبت تاریخچه ورود
      await prisma.userLoginHistory.create({
        data: {
          userId: user.id,
          ipAddress,
          deviceInfo: userAgent,
          status: 'Success',
        },
      });

      // ایجاد کوکی و ارسال پاسخ
      const response = NextResponse.json({message: 'Login successful'});
      response.headers.append(
        'Set-Cookie',
        serialize('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        }),
      );

      return response;
    }

    // بررسی جدول Invitation
    const invitation = await prisma.invitation.findUnique({
      where: {username},
    });

    if (!invitation) {
      return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    const isPasswordValid = await bcrypt.compare(password, invitation.password);
    if (!isPasswordValid) {
      return NextResponse.json({error: 'Invalid credentials'}, {status: 401});
    }

    return NextResponse.json({
      firstName: invitation.firstName,
      lastName: invitation.lastName,
      mobile: invitation.mobile,
      id: invitation.id,
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({error: 'Server error'}, {status: 500});
  }
}

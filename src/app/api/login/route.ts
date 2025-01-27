require('dotenv').config();
import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {serialize} from 'cookie'; // اصلاح ایمپورت

const prisma = new PrismaClient();
const JWT_SECRET = 'your_jwt_secret'; // این مقدار باید در فایل env ذخیره شود

// بررسی اطلاعات کاربر با متد GET
export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const username = searchParams.get('username'); // مقدار ورودی از درخواست
  const password = searchParams.get('password');

  if (!username || !password) {
    return NextResponse.json(
      {error: 'Username and password are required'},
      {status: 400},
    );
  }

  try {
    // بررسی در جدول User
    const user = await prisma.user.findUnique({
      where: {userName: username}, // اصلاح نام فیلد
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({error: 'Invalid credentials'}, {status: 401});
      }
      const jwt = require('jsonwebtoken');
      const payload = {
        userId: user.id, // هر دیتایی که نیاز است در توکن ذخیره شود
        username: user.userName,
        iss: 'garmsiri', // صادرکننده توکن
      };

      // تولید توکن
      const secretKey = process.env.SECRET_KEY || 'default-secret-key';
      const token = jwt.sign(payload, secretKey, {
        expiresIn: '7d', // اعتبار توکن
      });
      // console.log('SECRET_KEY:', process.env.SECRET_KEY);

      // ایجاد کوکی
      const response = NextResponse.json({message: 'Login successful'});
      response.headers.append(
        'Set-Cookie',
        serialize('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7, // اعتبار کوکی برای 7 روز,
          path: '/',
        }),
      );

      return response;
    }

    // اگر کاربر در جدول User نبود، بررسی جدول Invitation
    const invitation = await prisma.invitation.findUnique({
      where: {username}, // فرض بر اینکه در مدل Invitation فیلد username وجود دارد
    });

    if (!invitation) {
      return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    const isPasswordValid = await bcrypt.compare(password, invitation.password);
    if (!isPasswordValid) {
      return NextResponse.json({error: 'Invalid credentials'}, {status: 401});
    }

    // ارسال اطلاعات کاربر به فرم ثبت‌نام
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

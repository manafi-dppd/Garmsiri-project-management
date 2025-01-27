require('dotenv').config();
import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {serialize} from 'cookie';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {username, password} = await req.json();

    // یافتن کاربر در دیتابیس بر اساس نام کاربری
    const user = await prisma.user.findUnique({
      where: {userName: username},
    });

    if (!user) {
      return NextResponse.json(
        {error: 'نام کاربری یا رمز عبور نادرست است.'},
        {status: 401},
      );
    }

    // بررسی صحت رمز عبور
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {error: 'نام کاربری یا رمز عبور نادرست است.'},
        {status: 401},
      );
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

    // بازگشت توکن
    return NextResponse.json({token});
  } catch (error) {
    console.error('خطا در احراز هویت:', error);
    return NextResponse.json(
      {error: 'مشکلی در سرور رخ داده است.'},
      {status: 500},
    );
  }
}

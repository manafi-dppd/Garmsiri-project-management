require('dotenv').config();
import {NextRequest, NextResponse} from 'next/server';
import {sqliteClient, sqlServerClient} from '@prisma/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import {serialize} from 'cookie';

const prisma = sqliteClient;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const {id, firstName, lastName, mobile, username, passcode, email} =
      formData;
    const parsedId = parseInt(id, 10);
    if (!parsedId || isNaN(parsedId)) {
      return NextResponse.json({error: 'شناسه نامعتبر است.'}, {status: 400});
    }

    // دریافت رکورد فعلی
    const currentInvitation = await prisma.invitation.findUnique({
      where: {id: parsedId},
      include: {user: true, positions: true, accessLevels: true},
    });

    if (!currentInvitation) {
      return NextResponse.json(
        {error: 'اطلاعات دعوت‌نامه یافت نشد.'},
        {status: 404},
      );
    }

    // اعتبارسنجی عدم تغییرات
    const noChangesRequired =
      currentInvitation.firstName === firstName &&
      currentInvitation.lastName === lastName &&
      currentInvitation.mobile === mobile &&
      (!username || username.trim() === '') &&
      (!passcode || passcode.trim() === '');

    if (!noChangesRequired) {
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return NextResponse.json(
            {error: 'فرمت ایمیل معتبر نیست.'},
            {status: 400},
          );
        }

        const existingEmail = await prisma.user.findUnique({where: {email}});
        if (existingEmail) {
          return NextResponse.json(
            {error: 'این ایمیل قبلاً ثبت شده است.'},
            {status: 409},
          );
        }
      }

      if (
        firstName &&
        (firstName.length > 20 || !/^[\u0600-\u06FF\s]+$/.test(firstName))
      ) {
        return NextResponse.json(
          {error: 'نام باید حداکثر 20 کاراکتر و شامل حروف معتبر فارسی باشد.'},
          {status: 400},
        );
      }

      if (lastName.length > 20 || !/^[\u0600-\u06FF\s]+$/.test(lastName)) {
        return NextResponse.json(
          {
            error:
              'نام خانوادگی باید حداکثر 20 کاراکتر و شامل حروف معتبر فارسی باشد.',
          },
          {status: 400},
        );
      }

      if (!/^09\d{9}$/.test(mobile)) {
        return NextResponse.json(
          {error: 'شماره تلفن همراه باید عددی 11 رقمی و با 09 شروع شود.'},
          {status: 400},
        );
      }

      const existingMobile = await prisma.invitation.findFirst({
        where: {mobile, id: {not: parsedId}},
      });

      if (existingMobile || (await prisma.user.findFirst({where: {mobile}}))) {
        return NextResponse.json(
          {error: 'شماره تلفن همراه تکراری است.'},
          {status: 409},
        );
      }

      const validateUsername = (username: string) => {
        if (
          !username ||
          username.length > 20 ||
          !/^[a-zA-Z0-9]{1,20}$/.test(username)
        ) {
          return 'نام کاربری باید ترکیبی از حرف و عدد باشد و حداکثر 20 کاراکتر.';
        }
        return null;
      };

      const existingUsername =
        (await prisma.invitation.findFirst({where: {username}})) ||
        (await prisma.user.findFirst({where: {userName: username}}));

      if (existingUsername) {
        return NextResponse.json(
          {error: 'نام کاربری تکراری است.'},
          {status: 409},
        );
      }

      if (
        passcode &&
        (passcode.length < 8 ||
          passcode.length > 20 ||
          !/^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/.test(passcode))
      ) {
        return NextResponse.json(
          {
            error:
              'رمز عبور باید حداقل 8 و حداکثر 20 کاراکتر و ترکیبی از حروف انگلیسی و اعداد باشد.',
          },
          {status: 400},
        );
      }
    }

    const updatedData: {
      firstName?: string;
      lastName: string;
      mobile: string;
      username?: string;
      password?: string;
      isRegistered: boolean;
    } = {
      firstName,
      lastName,
      mobile,
      username: username || currentInvitation.username,
      password: passcode
        ? await bcrypt.hash(passcode, 10)
        : currentInvitation.password,
      isRegistered: true,
    };

    // بروزرسانی داده‌ها
    const updatedInvitation = await prisma.invitation.update({
      where: {id: parsedId},
      data: {
        firstName,
        lastName,
        mobile,
        username: username || currentInvitation.username,
        password: passcode
          ? await bcrypt.hash(passcode, 10)
          : currentInvitation.password,
        isRegistered: true,
      },
    });

    // انتقال اطلاعات به جدول User
    // const existingUser = await prisma.invitation.findUnique({
    //   where: {id: parsedId},
    // });
    // console.log('existingUser:', existingUser);
    // console.log('parsedId:', parsedId);

    const newUser = await prisma.user.upsert({
      where: {id: parsedId},
      update: {
        first_name: firstName || currentInvitation.firstName,
        last_name: lastName,
        email: email || currentInvitation.user?.email,
        userName: username || currentInvitation.username,
        password: passcode
          ? await bcrypt.hash(passcode, 10) // استفاده از رمز عبور جدید در صورت وجود
          : currentInvitation.password, // استفاده از رمز عبور قبلی در غیر این صورت
        introdPathLetter: currentInvitation.introdPathLetter,
        letterIssuer: currentInvitation.letterIssuer,
      },
      create: {
        first_name: firstName || currentInvitation.firstName,
        last_name: lastName,
        mobile,
        email,
        gender: currentInvitation.gender || '',
        inviterId: currentInvitation.id,
        invitationTime: currentInvitation.createdAt,
        userName: username || currentInvitation.username,
        password: passcode
          ? await bcrypt.hash(passcode, 10) // استفاده از رمز عبور جدید در صورت وجود
          : currentInvitation.password, // استفاده از رمز عبور قبلی در غیر این صورت
      },
    });

    // انتقال موقعیت‌ها
    for (const position of currentInvitation.positions) {
      await prisma.positionOnUser.create({
        data: {
          userId: newUser.id,
          positionId: position.positionId,
        },
      });
    }

    // انتقال سطح دسترسی‌ها
    for (const accessLevel of currentInvitation.accessLevels) {
      await prisma.userAccess.create({
        data: {
          userId: newUser.id,
          menuId: accessLevel.menuId,
          hasAccess: accessLevel.hasAccess,
        },
      });
    }

    // ایجاد تاریخچه ورود
    await prisma.userLoginHistory.create({
      data: {
        userId: newUser.id,
        ipAddress: request.headers.get('x-forwarded-for') || '',
        userAgent: request.headers.get('user-agent') || '',
        status: 'Active',
      },
    });
    const jwt = require('jsonwebtoken');
    const payload = {
      userId: newUser.id, // هر دیتایی که نیاز است در توکن ذخیره شود
      username: newUser.userName,
      iss: 'garmsiri', // صادرکننده توکن
    };
    // تولید توکن
    const secretKey = process.env.SECRET_KEY || 'default-secret-key';
    const token = jwt.sign(payload, secretKey, {
      expiresIn: '7d', // اعتبار توکن
    });
    let decodedToken: jwt.JwtPayload;
    decodedToken = jwt.verify(token, secretKey) as jwt.JwtPayload;

    // ایجاد کوکی
    const response = NextResponse.json(
      {
        message: 'اطلاعات با موفقیت بروزرسانی و منتقل شد.',
        data: updatedInvitation,
      },
      {
        status: 200,
      },
    );

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('خطا در بروزرسانی اطلاعات:', error);
    return NextResponse.json(
      {error: 'مشکلی در ثبت اطلاعات پیش آمده است.'},
      {status: 500},
    );
  }
}

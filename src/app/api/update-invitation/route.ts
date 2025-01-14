import {NextRequest, NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const {id, firstName, lastName, mobile, username, passcode, email} =
      formData;
    console.log('id: ', id);
    console.log('داده دریافتی:', formData);
    const parsedId = parseInt(id, 10);
    // دریافت رکورد فعلی بر اساس id
    const currentInvitation = await prisma.invitation.findUnique({
      where: {id: parsedId},
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

      if (
        existingMobile ||
        (await prisma.user.findFirst({where: {phone: mobile}}))
      ) {
        return NextResponse.json(
          {error: 'شماره تلفن همراه تکراری است.'},
          {status: 409},
        );
      }

      if (
        username &&
        (username.length > 20 || !/^[a-zA-Z0-9]{1,20}$/.test(username))
      ) {
        return NextResponse.json(
          {
            error:
              'نام کاربری می‌تواند شامل حروف انگلیسی و عدد باشد و حداکثر 20 کاراکتر است.',
          },
          {status: 400},
        );
      }

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

    const updatedInvitation = await prisma.invitation.update({
      where: {id: parsedId},
      data: updatedData,
    });

    return NextResponse.json({
      message: 'اطلاعات با موفقیت بروزرسانی شد.',
      data: updatedInvitation,
    });
  } catch (error: any) {
    console.error('خطا در بروزرسانی اطلاعات:', error);
    return NextResponse.json(
      {error: 'مشکلی در ثبت اطلاعات پیش آمده است.'},
      {status: 500},
    );
  }
}

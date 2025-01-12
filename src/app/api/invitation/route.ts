import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import {v4 as uuidv4} from 'uuid';
import {nanoid} from 'nanoid';

const prisma = new PrismaClient();

// تابع صحت‌سنجی اطلاعات
const validateInvitationServer = (data: {
  firstName: string;
  lastName: string;
  mobile: string;
  endDate: string;
  selectedPositions: number[];
}): string[] => {
  const errors: string[] = [];

  // Regex to allow only Persian characters and spaces
  const persianRegex = /^[\u0600-\u06FF\s]{0,20}$/;

  // Validate firstName (optional)
  if (
    data.firstName &&
    (!persianRegex.test(data.firstName) || data.firstName.length > 20)
  ) {
    errors.push(
      'نام باید حداکثر 20 کاراکتر و تنها شامل حروف فارسی یا فاصله باشد.',
    );
  }

  // Validate lastName (mandatory)
  if (
    !data.lastName ||
    !persianRegex.test(data.lastName) ||
    data.lastName.length > 20
  ) {
    errors.push(
      'نام خانوادگی الزامی است و باید حداکثر 20 کاراکتر و تنها شامل حروف فارسی یا فاصله باشد.',
    );
  }

  const phoneRegex = /^09\d{9}$/;
  if (!phoneRegex.test(data.mobile)) {
    errors.push('شماره تلفن وارد شده معتبر نیست.');
  }

  const today = new Date().toISOString().split('T')[0];
  if (new Date(data.endDate) < new Date(today)) {
    errors.push('تاریخ پایان عضویت نباید قبل از تاریخ امروز باشد.');
  }

  if (!data.selectedPositions || data.selectedPositions.length === 0) {
    errors.push('انتخاب حداقل یک سمت الزامی است.');
  }

  return errors;
};

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      mobile,
      endDate,
      gender,
      letterIssuer,
      letterNumber,
      letterDate,
      letterApprover,
      selectedPositions,
      editedAccessLevel,
    } = await req.json();

    // بررسی فیلدهای ضروری
    if (!lastName || !mobile || !selectedPositions) {
      return NextResponse.json(
        {message: 'تمام فیلدهای ضروری باید پر شوند.'},
        {status: 400},
      );
    }

    // بررسی تکراری بودن شماره موبایل
    const existingInvitation = await prisma.invitation.findUnique({
      where: {mobile},
    });

    if (existingInvitation) {
      return NextResponse.json(
        {message: 'این کاربر قبلاً دعوت شده است.'},
        {status: 409}, // وضعیت 409 برای تضاد داده‌ها
      );
    }

    // تولید username و password
    const username = nanoid(6);
    const rawPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    console.log('username: ', username);
    console.log('Password: ', rawPassword);

    // ذخیره دعوت‌نامه
    const newInvitation = await prisma.invitation.create({
      data: {
        firstName,
        lastName,
        mobile,
        username,
        password: hashedPassword,
        endDate: endDate ? new Date(endDate) : null,
        gender,
        letterIssuer,
        letterNumber,
        letterDate,
        letterApprover,
        isRegistered: false,
      },
    });

    // ذخیره دسترسی‌ها
    if (editedAccessLevel && Array.isArray(editedAccessLevel)) {
      // حذف عضو اول آرایه
      const filteredAccessLevel = editedAccessLevel.slice(1);

      // ذخیره داده‌ها در جدول
      // دریافت تمام رکوردهای جدول Menu
      const allMenuIds = await prisma.menu.findMany({
        select: {id: true},
      });

      // استخراج فقط idها از رکوردهای Menu
      const menuIds = allMenuIds.map((menu) => menu.id);

      // پیدا کردن idهای گم‌شده
      const existingMenuIds = filteredAccessLevel.map(
        (access) => access.menuId,
      );
      const missingMenuIds = menuIds.filter(
        (menuId) => !existingMenuIds.includes(menuId),
      );

      // اضافه کردن موارد گم‌شده به filteredAccessLevel با مقدار hasAccess برابر با true
      const completedAccessLevel = [
        ...filteredAccessLevel,
        ...missingMenuIds.map((menuId) => ({
          menuId,
          hasAccess: true, // مقدار پیش‌فرض
        })),
      ];

      // ذخیره داده‌ها در جدول InvitationAccess
      if (completedAccessLevel.length > 0) {
        await prisma.invitationAccess.createMany({
          data: completedAccessLevel.map((access) => ({
            invitationId: newInvitation.id,
            menuId: access.menuId,
            hasAccess: access.hasAccess,
          })),
        });
      }
    } else {
      // در صورت تهی بودن editedAccessLevel، انتقال داده‌ها از AccessLevel
      const relatedAccessLevels = await prisma.accessLevel.findMany({
        where: {
          positionId: {
            in: selectedPositions,
          },
        },
        select: {
          menuId: true,
          hasAccess: true,
        },
      });

      if (relatedAccessLevels.length > 0) {
        await prisma.invitationAccess.createMany({
          data: relatedAccessLevels.map((access) => ({
            invitationId: newInvitation.id,
            menuId: access.menuId,
            hasAccess: access.hasAccess,
          })),
        });
      }
    }

    // ذخیره سمت‌ها در جدول PositionOnInvitation
    if (selectedPositions && selectedPositions.length > 0) {
      await prisma.positionOnInvitation.createMany({
        data: selectedPositions.map((positionId: any) => ({
          invitationId: newInvitation.id,
          positionId,
        })),
      });
    }

    // بازگشت پاسخ موفقیت
    return NextResponse.json(
      {
        message: 'دعوت‌نامه با موفقیت ثبت شد.',
        invitation: newInvitation,
        rawPassword, // ارسال رمز عبور تصادفی در پاسخ برای نمایش به کاربر (در صورت نیاز)
      },
      {status: 201},
    );
  } catch (error: any) {
    if (error.code === 'P2002') {
      // خطای یکتا بودن شماره موبایل در Prisma
      return NextResponse.json(
        {
          message: 'این کاربر قبلاً دعوت شده است.',
        },
        {status: 400},
      );
    }
    console.error('Error creating invitation:', error);
    return NextResponse.json(
      {
        message: 'خطایی در سرور رخ داده است.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {status: 500},
    );
  }
}

export async function GET() {
  try {
    const invitations = await prisma.invitation.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        mobile: true,
        createdAt: true,
        endDate: true,
        isRegistered: true,
      },
    });
    return NextResponse.json(invitations);
  } catch (error) {
    console.error('Error fetching invitations:', error);
    return NextResponse.json({message: 'خطا در دریافت داده‌ها'}, {status: 500});
  }
}

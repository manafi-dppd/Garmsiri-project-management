import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import {v4 as uuidv4} from 'uuid';

const prisma = new PrismaClient();

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
    if (
      !firstName ||
      !lastName ||
      !mobile ||
      !selectedPositions ||
      !letterIssuer ||
      !letterNumber
    ) {
      return NextResponse.json(
        {message: 'تمام فیلدهای ضروری باید پر شوند.'},
        {status: 400},
      );
    }

    // تولید username و password
    const username = uuidv4();
    const rawPassword = Math.random().toString(36).slice(-8); // تولید رمز عبور تصادفی
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    console.log('Generated username:', username);
    console.log('Generated password:', rawPassword);

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

    // ذخیره موقعیت‌های انتخاب‌شده
    if (selectedPositions && Array.isArray(selectedPositions)) {
      await prisma.positionOnInvitation.createMany({
        data: selectedPositions.map((positionId: number) => ({
          invitationId: newInvitation.id,
          positionId,
        })),
      });
    }

    // ذخیره دسترسی‌ها
    if (editedAccessLevel && Array.isArray(editedAccessLevel)) {
      await prisma.invitationAccess.createMany({
        data: editedAccessLevel.map(
          (accessLevel: {menuId: number; hasAccess: boolean}) => ({
            invitationId: newInvitation.id,
            menuId: accessLevel.menuId,
            hasAccess: accessLevel.hasAccess,
          }),
        ),
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

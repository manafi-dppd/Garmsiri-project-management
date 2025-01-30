import {NextResponse} from 'next/server';
import {sqliteClient, sqlServerClient} from '@prisma/db';
// import {sqliteClient, sqlServerClient} from '@prisma/db';
import jwt from 'jsonwebtoken';
import {cookies} from 'next/headers';
const prisma = sqliteClient; // 🔹 مقداردهی صحیح کلاینت SQLite
// const prisma = sqliteClient;

export async function GET(req: Request) {
  try {
    // console.log('🚀 درخواست GET دریافت شد');

    // استخراج توکن از کوکی
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    // console.log('🔍 توکن دریافت شد:', token);

    if (!token) {
      // console.log('❌ توکن موجود نیست، ارسال خطای 401');
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    // بررسی و اعتبارسنجی توکن
    const secretKey = process.env.SECRET_KEY || 'default-secret-key';
    const decoded = jwt.verify(token, secretKey) as {userId: number};
    // console.log('✅ توکن تأیید شد، userId:', decoded.userId);
    const userId = decoded.userId;

    // دریافت اطلاعات کاربر از دیتابیس
    const user = await prisma.user.findUnique({
      where: {id: userId},
      include: {
        positions: {
          include: {
            Position: true,
          },
        },
      },
    });

    if (!user) {
      // console.log('❌ کاربر پیدا نشد، ارسال خطای 404');
      return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    // دریافت موقعیت‌های کاربر
    const positions = user.positions.map(
      (pos: {Position: {title_fa: string}}) => pos.Position.title_fa,
    );
    // console.log('✅ اطلاعات کاربر:', {
    //   first_name: user.first_name,
    //   last_name: user.last_name,
    //   positions,
    // });
    // بازگشت اطلاعات کاربر
    return NextResponse.json({
      first_name: user.first_name,
      last_name: user.last_name,
      positions,
    });
  } catch (error) {
    console.error('🔥 خطای داخلی سرور در API:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}

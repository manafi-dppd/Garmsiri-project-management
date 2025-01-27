import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';
import {cookies} from 'next/headers';

const prisma = new PrismaClient();
export async function GET(req: Request) {
  try {
    // استخراج توکن از کوکی
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    // بررسی و اعتبارسنجی توکن
    const secretKey = process.env.SECRET_KEY || 'default-secret-key';
    const decoded = jwt.verify(token, secretKey) as {userId: number};
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
      return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    // دریافت موقعیت‌های کاربر
    const positions = user.positions.map(
      (pos: {Position: {title_fa: string}}) => pos.Position.title_fa,
    );

    // بازگشت اطلاعات کاربر
    return NextResponse.json({
      first_name: user.first_name,
      last_name: user.last_name,
      positions,
    });
  } catch (error) {
    console.error('Error in GET /api/get-user-info:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}

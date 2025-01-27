import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const {mobile, email} = await request.json();

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{mobile: mobile}, {email}],
      },
    });

    if (existingUser) {
      if (existingUser.mobile === mobile) {
        return NextResponse.json(
          {error: 'شماره تلفن وارد شده تکراری است.'},
          {status: 400},
        );
      }
      if (existingUser.email === email) {
        return NextResponse.json(
          {error: 'ایمیل وارد شده تکراری است.'},
          {status: 400},
        );
      }
    }

    return NextResponse.json({success: true});
  } catch (error) {
    return NextResponse.json(
      {error: 'خطا در ارتباط با پایگاه داده.'},
      {status: 500},
    );
  }
}

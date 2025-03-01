import {NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db';

const prisma = sqlServerClient;

export async function PUT(request: Request) {
  try {
    const {IdRanesh, IdTarDor, Zarfiat, Shorooe, Paian} = await request.json();

    // تابع تبدیل مقدار ورودی به `Date` بدون تغییر منطقه زمانی
    const convertToDate = (timeString: string | undefined | null) => {
      if (!timeString || !timeString.includes(':')) {
        return null; // مقدار NULL
      }

      const [hours, minutes] = timeString.split(':').map(Number);
      return new Date(Date.UTC(1970, 0, 1, hours, minutes, 0, 0));
    };

    const shorooeDate = convertToDate(Shorooe);
    const paianDate = convertToDate(Paian);

    // به‌روزرسانی مقدار در پایگاه داده
    await prisma.bahrebardairProgramSeghli.updateMany({
      where: {
        FIdRanesh: IdRanesh,
        FIdTarDor: IdTarDor,
      },
      data: {
        Zarfiat: Zarfiat ?? null, // مقدار NULL در پایگاه داده تنظیم شود
        Shorooe: shorooeDate ?? null, // مقدار NULL در پایگاه داده تنظیم شود
        Paian: paianDate ?? null, // مقدار NULL در پایگاه داده تنظیم شود
      },
    });

    return NextResponse.json(
      {message: 'Data updated successfully'},
      {status: 200},
    );
  } catch (error) {
    console.error('Failed to update BahrebardairProgramSeghli:', error);
    return NextResponse.json({error: 'Failed to update data'}, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
}

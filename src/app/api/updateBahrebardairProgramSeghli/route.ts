import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RequestBody {
  IdRanesh: number;
  IdTarDor: number;
  Zarfiat?: number | null;
  Shorooe?: string | null;
  Paian?: string | null;
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const { IdRanesh, IdTarDor, Zarfiat, Shorooe, Paian } = body;

    // تابع تبدیل زمان رشته‌ای به DateTime با توجه به زمان محلی ایران
    const convertToTime = (timeString: string | null | undefined) => {
      if (!timeString) return null;

      // اعتبارسنجی فرمت زمان (HH:MM)
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(timeString)) {
        console.error('Invalid time format:', timeString);
        return null;
      }

      const [hours, minutes] = timeString.split(':').map(Number);

      // ایجاد تاریخ با زمان محلی ایران
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

      return date;
    };

    const updateData: {
      zarfiat?: number;
      shorooe?: Date | null;
      paian?: Date | null;
    } = {};

    if (Zarfiat !== undefined) {
      updateData.zarfiat = Zarfiat ?? 0;
    }

    if (Shorooe !== undefined) {
      updateData.shorooe = convertToTime(Shorooe);
    }

    if (Paian !== undefined) {
      updateData.paian = convertToTime(Paian);
    }

    const result = await prisma.bahrebardairprogramseghli.updateMany({
      where: {
        fidranesh: IdRanesh,
        fidtardor: IdTarDor
      },
      data: updateData
    });
    return NextResponse.json(
      { message: 'Data updated successfully', count: result.count },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to update bahrebardairprogramseghli:', error);
    return NextResponse.json(
      {
        error: 'Failed to update data',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

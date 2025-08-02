// src/app/api/checkPreviousDaheApproval/route.ts
import {NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const {idPumpStation, fiddahe} = await request.json();

    const previousDahe = await prisma.taeedprogram.findFirst({
      where: {
        fidpumpsta: idPumpStation,
        fiddahe: fiddahe - 1,
      },
      select: {
        taedabmantaghe: true,
      },
    });

    return NextResponse.json({
      isApproved: previousDahe?.taedabmantaghe === true,
    });
  } catch (error) {
    console.error('Error checking previous dahe approval:', error);
    return NextResponse.json(
      { error: `خطا در بررسی وضعیت دهه قبلی: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
}
}

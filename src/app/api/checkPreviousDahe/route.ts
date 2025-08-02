// src/app/api/checkPreviousDahe/route.ts
import {NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

type CheckPreviousDaheRequest = {
  FIdPumpSta: number;
  Sal: number;
  Mah: number;
  Dahe: number;
  FidDahe: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckPreviousDaheRequest;
    const {FIdPumpSta, FidDahe} = body;
    if (!FIdPumpSta || FidDahe === undefined) {
      return NextResponse.json(
        {error: 'Missing required parameters'},
        {status: 400},
      );
    }

    // بررسی وجود رکورد برای دهه قبلی
    const previousDahe = FidDahe - 1;
    if (previousDahe < 1) {
      return NextResponse.json({hasPrevious: false}, {status: 200});
    }

    const result = await prisma.taeedprogram.findFirst({
      where: {
        fidpumpsta: FIdPumpSta,
        fiddahe: previousDahe,
      },
      select: {lastnersal: true},
    });
    return NextResponse.json(
      {
        hasPrevious: !!result,
        isPreviousSaved: !!result?.lastnersal,
      },
      {status: 200},
    );
  } catch (error) {
    console.error('Error checking previous dahe:', error);
    return NextResponse.json({error: 'Server error'}, {status: 500});
  }
}

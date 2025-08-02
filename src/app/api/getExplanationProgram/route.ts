import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type TaeedProgramRequest = {
  FIdPumpSta: number;
  Sal: number;
  Mah: number;
  Dahe: number;
  field: string;
};
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TaeedProgramRequest;
    const { FIdPumpSta, Sal, Mah, Dahe, field } = body;

    if (!FIdPumpSta || !Sal || !Mah || !Dahe || !field) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }
    // دریافت مقدار موردنظر از جدول `TaeedProgram`
    const result = await prisma.taeedprogram.findFirst({
      where: { fidpumpsta: FIdPumpSta, sal: Sal, mah: Mah, dahe: Dahe },
      select: { [field]: true }
    });

    if (!result) {
      return NextResponse.json({ error: 'No matching record found' }, { status: 404 });
    }

    return NextResponse.json({ value: result[field] ?? '' }, { status: 200 });
  } catch (error) {
    console.error('Error fetching TaeedProgram data:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

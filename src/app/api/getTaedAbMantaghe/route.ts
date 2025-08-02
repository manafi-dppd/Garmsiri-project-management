import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // استفاده از اتصال PostgreSQL

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sal = searchParams.get('sal');
    const mah = searchParams.get('mah');
    const dahe = searchParams.get('dahe');
    const FIdPumpSta = searchParams.get('fidpumpsta');

    if (!sal || !mah || !dahe || !FIdPumpSta) {
      return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
    }

    const result = await prisma.taeedprogram.findMany({
      where: {
        sal: Number(sal),
        mah: Number(mah),
        dahe: Number(dahe),
        fidpumpsta: Number(FIdPumpSta)
      },
      select: {
        taedabmantaghe: true
      }
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
  }
}

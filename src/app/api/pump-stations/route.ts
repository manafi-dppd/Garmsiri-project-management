import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const networkId = Number(url.searchParams.get('networkId'));
  const FIdDP = Number(url.searchParams.get('FIdDP'));

  if (!networkId || FIdDP !== 2) {
    return NextResponse.json({ error: 'پارامترهای نامعتبر' }, { status: 400 });
  }

  try {
    const pumpStations = await prisma.pumpstation.findMany({
      where: {
        fidnet: networkId,
        fiddp: FIdDP,
        ready: true
      },
      select: {
        idpumpsta: true,
        namestation: true
      }
    });

    return NextResponse.json({ pumpStations });
  } catch (error) {
    console.error('خطا در واکشی اطلاعات:', error);
    return NextResponse.json({ error: 'خطا در واکشی اطلاعات' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idRanesh = parseInt(searchParams.get('idRanesh') || '0', 10);

    if (!idRanesh) {
      return NextResponse.json({ error: 'idRanesh is required' }, { status: 400 });
    }

    // استفاده از کلاینت PostgreSQL
    const khatRaneshPump = await prisma.khatraneshpump.findFirst({
      where: { fidranesh: idRanesh },
      select: {
        debipomp: true,
        tedadpump: true,
        fesharpump: true,
        randeman: true,
        tavanenami: true
      }
    });

    return NextResponse.json(khatRaneshPump);
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch KhatRaneshPump',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

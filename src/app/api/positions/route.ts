import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const positions = await prisma.position.findMany({
      select: {
        id: true,
        title: true,
        title_fa: true,
        req_license: true
      }
    });
    return NextResponse.json(positions, { status: 200 });
  } catch (error) {
    console.error('Error fetching positions:', error);
    return NextResponse.json({ error: 'Error fetching positions' }, { status: 500 });
  }
}

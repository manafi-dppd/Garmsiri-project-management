import {NextRequest, NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db';
const prisma = sqlServerClient;

export async function GET(req: NextRequest) {
  try {
    const {searchParams} = new URL(req.url);
    const idRanesh = parseInt(searchParams.get('idRanesh') || '0', 10);
    if (!idRanesh) {
      return NextResponse.json({error: 'idRanesh is required'}, {status: 400});
    }

    const khatRaneshPump = await prisma.khatRaneshPump.findFirst({
      where: {FIdRanesh: idRanesh},
      select: {
        DebiPomp: true,
        TedadPump: true,
        FesharPump: true,
        Randeman: true,
        TavaneNami: true,
      },
    });

    return NextResponse.json(khatRaneshPump);
  } catch (error) {
    return NextResponse.json(
      {error: 'Failed to fetch KhatRaneshPump', details: error},
      {status: 500},
    );
  }
}

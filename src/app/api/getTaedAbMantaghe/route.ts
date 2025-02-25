import {NextRequest, NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db';

const prisma = sqlServerClient;

export async function GET(req: NextRequest) {
  try {
    const {searchParams} = new URL(req.url);
    const sal = searchParams.get('sal');
    const mah = searchParams.get('mah');
    const dahe = searchParams.get('dahe');
    const FIdPumpSta = searchParams.get('FIdPumpSta');

    if (!sal || !mah || !dahe || !FIdPumpSta) {
      return NextResponse.json(
        {error: 'Missing required query parameters'},
        {status: 400},
      );
    }

    const result = await prisma.taeedProgram.findMany({
      where: {
        Sal: Number(sal),
        Mah: Number(mah),
        Dahe: Number(dahe),
        FIdPumpSta: Number(FIdPumpSta),
      },
      select: {
        TaedAbMantaghe: true,
      },
    });
    console.log('result: ', result);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {error: 'Internal Server Error', details: error},
      {status: 500},
    );
  }
}

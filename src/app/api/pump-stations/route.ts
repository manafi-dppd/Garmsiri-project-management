import {NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const networkId = Number(url.searchParams.get('networkId'));
  const FIdDP = Number(url.searchParams.get('FIdDP'));

  if (!networkId || FIdDP !== 2) {
    return NextResponse.json({error: 'پارامترهای نامعتبر'}, {status: 400});
  }

  try {
    const pumpStations = await sqlServerClient.$queryRaw`
  SELECT IdPumpSta, NameStation
  FROM PumpStation
  WHERE FIdNet = ${networkId} AND FIdDP = ${FIdDP};
`;

    return NextResponse.json({pumpStations});
  } catch (error) {
    console.error('خطا در واکشی اطلاعات:', error);
    return NextResponse.json({error: 'خطا در واکشی اطلاعات'}, {status: 500});
  }
}

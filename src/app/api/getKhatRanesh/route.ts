import {NextRequest, NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db';
const prisma = sqlServerClient;

export async function GET(req: NextRequest) {
  try {
    const {searchParams} = new URL(req.url);
    const idPumpStation = parseInt(
      searchParams.get('idPumpStation') || '0',
      10,
    );

    if (!idPumpStation) {
      return NextResponse.json(
        {error: 'idPumpStation is required'},
        {status: 400},
      );
    }

    const khatRaneshList = await prisma.khatRanesh.findMany({
      where: {FIdPumpSta: idPumpStation},
      select: {
        IdRanesh: true,
        RaneshName: true,
        FIdSePu: true,
        FIdDPipe: true,
        Active: true,
      },
    });

    const detailedKhatRaneshList = await Promise.all(
      khatRaneshList.map(async (ranesh) => {
        if (ranesh.Active === false || ranesh.FIdDPipe !== 1) {
          return ranesh; // اگر غیر فعال باشد یا `FIdDPipe !== 1`، داده‌ای اضافه نشود
        }

        if (ranesh.FIdSePu === 1) {
          // واکشی از API `getKhatRaneshPump`          
          const pumpRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getKhatRaneshPump?idRanesh=${ranesh.IdRanesh}`,
          );
          
          const pumpData = await pumpRes.json();          
          return {...ranesh, ...pumpData};
        } else {
          // واکشی مقدار `Zarfiat` از جدول `KhatRaneshSegli`
          const segliData = await prisma.khatRaneshSegli.findFirst({
            where: {FIdRanesh: ranesh.IdRanesh},
            select: {Zarfiat: true},
          });
          return {...ranesh, Zarfiat: segliData?.Zarfiat || null};
        }
      }),
    );

    return NextResponse.json(detailedKhatRaneshList);
  } catch (error) {
    return NextResponse.json(
      {error: 'Failed to fetch KhatRanesh', details: error},
      {status: 500},
    );
  }
}

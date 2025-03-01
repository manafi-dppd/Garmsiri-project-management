import {NextRequest, NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db';
const prisma = sqlServerClient;

export async function GET(req: NextRequest) {
  try {
    const {searchParams} = new URL(req.url);
    const idRanesh = Number(searchParams.get('idRanesh'));
    const idTarDor = Number(searchParams.get('idTarDor'));

    if (!idRanesh || !idTarDor) {
      return NextResponse.json({error: 'Invalid parameters'}, {status: 400});
    }

    // دریافت اطلاعات از دو جدول با توجه به شرایط خواسته‌شده
    const bahrebardair = await prisma.bahrebardairProgram.findFirst({
      where: {
        FIdRanesh: idRanesh,
        FIdTarDor: idTarDor,
        Tedad: {gt: 0},
      },
      select: {
        Tedad: true,
        Shorooe: true,
        Paian: true,
      },
    });

    const bahrebardairSeghli = await prisma.bahrebardairProgramSeghli.findFirst(
      {
        where: {
          FIdRanesh: idRanesh,
          FIdTarDor: idTarDor,
          Zarfiat: {not: null},
        },
        select: {
          Zarfiat: true,
        },
      },
    );
    return NextResponse.json({
      Tedad: bahrebardair?.Tedad || 0,
      Zarfiat: bahrebardairSeghli?.Zarfiat || null,
      Shorooe: bahrebardair?.Shorooe || null,
      Paian: bahrebardair?.Paian || null,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}

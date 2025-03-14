import {NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db';

const prisma = sqlServerClient;

export async function PUT(request: Request) {
  try {
    const {
      idPumpStation,
      sal,
      mah,
      dahe,
      firstName,
      lastName,
      tozihPeymankar,
      taedPeymankar,
    } = await request.json();

    // دریافت زمان حال در منطقه زمانی سرور
    const now = new Date();
    const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    await prisma.taeedProgram.updateMany({
      where: {
        FIdPumpSta: idPumpStation,
        Sal: sal,
        Mah: mah,
        Dahe: dahe,
      },
      data: {
        FirstNPeymankar: firstName,
        LastNPeymankar: lastName,
        TozihPeymankar: tozihPeymankar,
        TarikhPeymankar: localTime,
        TaedPeymankar: taedPeymankar,
        TaedAbMantaghe: taedPeymankar === false ? null : undefined,
      },
    });

    return NextResponse.json(
      {message: 'Data updated successfully'},
      {status: 200},
    );
  } catch (error) {
    console.error('Failed to update TaeedProgram:', error);
    return NextResponse.json({error: 'Failed to update data'}, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
}

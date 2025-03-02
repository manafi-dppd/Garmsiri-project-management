import {NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db';

const prisma = sqlServerClient;

export async function POST(request: Request) {
  try {
    const {FIdPumpSta, Sal, Mah, Dahe} = await request.json();

    if (!FIdPumpSta || !Sal || !Mah || !Dahe) {
      return NextResponse.json(
        {error: 'Missing required parameters'},
        {status: 400},
      );
    }

    // دریافت داده‌های موردنظر از پایگاه داده
    const result = await prisma.taeedProgram.findFirst({
      where: {FIdPumpSta, Sal, Mah, Dahe},
      select: {
        FirstNErsal: true,
        LastNErsal: true,
        TarikhErsal: true,
        FirstNAbMantaghe: true,
        LastNAbMantaghe: true,
        TarikhAbMantaghe: true,
        TaedAbMantaghe: true,
        FirstNPeymankar: true,
        LastNPeymankar: true,
        TarikhPeymankar: true,
        TaedPeymankar: true,
        FirstNAbNiroo: true,
        LastNAbNiroo: true,
        TarikhAbNiroo: true,
        TaedAbNiroo: true,
        FileNameNahaee: true,
        TarikhFileNahee: true,
        FirstNTaeedNahaee: true,
        LastNTaeedNahaee: true,
        TarikhTaeedNahaee: true,
        TaeedNahaee: true,
      },
    });

    if (!result) {
      console.log('FIdPumpSta: ', FIdPumpSta);
      console.log('Sal: ', Sal);
      console.log('Mah: ', Mah);
      console.log('Dahe: ', Dahe);
      return NextResponse.json(
        {error: 'No matching record found'},
        {status: 404},
      );
    }

    return NextResponse.json(result, {status: 200});
  } catch (error) {
    console.error('Error fetching TaeedProgram details:', error);
    return NextResponse.json({error: 'Server error'}, {status: 500});
  }
}

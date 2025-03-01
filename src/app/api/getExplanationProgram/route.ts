import {NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db';

const prisma = sqlServerClient;

export async function POST(request: Request) {
  try {
    const {FIdPumpSta, Sal, Mah, Dahe, field} = await request.json();

    if (!FIdPumpSta || !Sal || !Mah || !Dahe || !field) {
      return NextResponse.json(
        {error: 'Missing required parameters'},
        {status: 400},
      );
    }

    // دریافت مقدار موردنظر از جدول `TaeedProgram`
    const result = await prisma.taeedProgram.findFirst({
      where: {FIdPumpSta, Sal, Mah, Dahe},
      select: {[field]: true},
    });

    if (!result) {
      return NextResponse.json(
        {error: 'No matching record found'},
        {status: 404},
      );
    }

    return NextResponse.json({value: result[field] ?? ''}, {status: 200});
  } catch (error) {
    console.error('Error fetching TaeedProgram data:', error);
    return NextResponse.json({error: 'Server error'}, {status: 500});
  }
}

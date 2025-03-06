import {NextResponse} from 'next/server';
import fs from 'fs';
import path from 'path';
import {sqlServerClient} from '@prisma/db';

const prisma = sqlServerClient;

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const idPumpStation = searchParams.get('idPumpStation');
  const sal = searchParams.get('sal');
  const mah = searchParams.get('mah');
  const dahe = searchParams.get('dahe');

  if (!idPumpStation || !sal || !mah || !dahe) {
    return NextResponse.json(
      {message: 'Missing required parameters'},
      {status: 400},
    );
  }

  try {
    // واکشی اطلاعات فایل از جدول TaeedProgram
    const record = await prisma.taeedProgram.findFirst({
      where: {
        FIdPumpSta: parseInt(idPumpStation),
        Sal: parseInt(sal),
        Mah: parseInt(mah),
        Dahe: parseInt(dahe),
      },
      select: {
        FileNameNahaee: true,
        FilePathNahaee: true,
      },
    });

    if (!record || !record.FileNameNahaee || !record.FilePathNahaee) {
      return NextResponse.json({message: 'File not found'}, {status: 404});
    }

    // مسیر کامل فایل
    const filePath = path.join(process.cwd(), 'public', record.FilePathNahaee);

    // بررسی وجود فایل
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        {message: 'File not found on server'},
        {status: 404},
      );
    }

    // خواندن فایل و ارسال آن به عنوان پاسخ
    const fileBuffer = fs.readFileSync(filePath);
    const response = new NextResponse(fileBuffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${record.FileNameNahaee}"`, // ارسال نام فایل با پسوند
        'Content-Type': 'application/octet-stream',
      },
    });

    return response;
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json(
      {message: 'Error downloading file'},
      {status: 500},
    );
  }
}

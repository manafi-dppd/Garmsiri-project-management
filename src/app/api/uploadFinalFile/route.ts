import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get('file') as File | null;
    const idPumpStation = formData.get('idPumpStation') as string | null;
    const sal = formData.get('sal') as string | null;
    const mah = formData.get('mah') as string | null;
    const dahe = formData.get('dahe') as string | null;

    if (!file || !idPumpStation || !sal || !mah || !dahe) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Validate numeric fields
    const pumpStationId = parseInt(idPumpStation);
    const year = parseInt(sal);
    const month = parseInt(mah);
    const decade = parseInt(dahe);

    if (isNaN(pumpStationId) || isNaN(year) || isNaN(month) || isNaN(decade)) {
      return NextResponse.json({ message: 'Invalid numeric values' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // ساخت نام فایل ایمن
    const originalName = file.name;
    const fileExtension = originalName.split('.').pop();
    const safeFilename = `${Date.now()}_${pumpStationId}_${year}_${month}_${decade}.${fileExtension}`;
    const filePath = path.join(uploadDir, safeFilename);
    const now = new Date();

    const fileBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    const result = await prisma.taeedprogram.updateMany({
      where: {
        fidpumpsta: pumpStationId,
        sal: year,
        mah: month,
        dahe: decade
      },
      data: {
        filenamenahaee: originalName, // ذخیره نام اصلی فایل
        filepathnahaee: `/uploads/${safeFilename}`, // ذخیره مسیر فایل ایمن
        tarikhfilenahee: now
      }
    });

    if (result.count === 0) {
      return NextResponse.json({ message: 'No matching record found to update' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'File uploaded and database updated successfully'
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Error uploading file', error: errorMessage },
      { status: 500 }
    );
  }
}

// src/app/api/downloadFinalFile/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idPumpStation = searchParams.get('idPumpStation');
  const sal = searchParams.get('sal');
  const mah = searchParams.get('mah');
  const dahe = searchParams.get('dahe');
  const preview = searchParams.get('preview') === 'true';

  if (!idPumpStation || !sal || !mah || !dahe) {
    return NextResponse.json({ message: 'پارامترهای ضروری وجود ندارد' }, { status: 400 });
  }

  try {
    const record = await prisma.taeedprogram.findFirst({
      where: {
        fidpumpsta: parseInt(idPumpStation),
        sal: parseInt(sal),
        mah: parseInt(mah),
        dahe: parseInt(dahe)
      },
      select: {
        filenamenahaee: true,
        filepathnahaee: true
      }
    });

    if (!record?.filenamenahaee || !record?.filepathnahaee) {
      return NextResponse.json({ message: 'فایل یافت نشد' }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), 'public', record.filepathnahaee);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: 'فایل در سرور وجود ندارد' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const fileExtension = path.extname(record.filenamenahaee).toLowerCase();

    // برای حالت پیش نمایش
    if (preview) {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
      if (imageExtensions.includes(fileExtension)) {
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': `image/${fileExtension.slice(1)}`,
            'Cache-Control': 'public, max-age=3600'
          }
        });
      }
      return NextResponse.json(
        { message: 'پیش نمایش فقط برای تصاویر قابل نمایش است' },
        { status: 400 }
      );
    }

    // برای حالت دانلود
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${encodeURIComponent(record.filenamenahaee)}"`,
        'Content-Type': 'application/octet-stream'
      }
    });
  } catch (error) {
    console.error('خطا در دریافت فایل:', error);
    return NextResponse.json({ message: 'خطا در دریافت فایل' }, { status: 500 });
  }
}

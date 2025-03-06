import {NextResponse} from 'next/server';
import fs from 'fs';
import path from 'path';
import {sqlServerClient} from '@prisma/db';

const prisma = sqlServerClient;

export async function POST(req: Request) {
  try {
    // خواندن داده‌های فرم از درخواست
    const formData = await req.formData();

    // دریافت فایل و سایر فیلدها
    const file = formData.get('file') as File | null;
    const idPumpStation = formData.get('idPumpStation') as string | null;
    const sal = formData.get('sal') as string | null;
    const mah = formData.get('mah') as string | null;
    const dahe = formData.get('dahe') as string | null;
    // بررسی وجود تمام فیلدهای لازم
    if (!file || !idPumpStation || !sal || !mah || !dahe) {
      return NextResponse.json(
        {message: 'Missing required fields'},
        {status: 400},
      );
    }

    // ایجاد پوشه‌ی uploads در صورت عدم وجود
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {recursive: true});
    }

    // ایجاد نام فایل و مسیر ذخیره‌سازی
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    const now = new Date();
    const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    // تبدیل فایل به بافر و ذخیره‌سازی آن
    const fileBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    // بروزرسانی رکورد در جدول TaeedProgram
    await prisma.taeedProgram.updateMany({
      where: {
        FIdPumpSta: parseInt(idPumpStation),
        Sal: parseInt(sal),
        Mah: parseInt(mah),
        Dahe: parseInt(dahe),
      },
      data: {
        FileNameNahaee: fileName,
        FilePathNahaee: `/uploads/${fileName}`,
        TarikhFileNahee: localTime,
      },
    });

    // پاسخ موفقیت‌آمیز
    return NextResponse.json({
      message: 'File uploaded and database updated successfully',
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({message: 'Error uploading file'}, {status: 500});
  }
}

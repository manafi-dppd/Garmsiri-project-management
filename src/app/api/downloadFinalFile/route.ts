import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idPumpStation = searchParams.get("idPumpStation");
  const sal = searchParams.get("sal");
  const mah = searchParams.get("mah");
  const dahe = searchParams.get("dahe");
  const preview = searchParams.get("preview") === "true";
  const locale = searchParams.get("locale");

  // Validate required parameters
  if (!idPumpStation || !sal || !mah || !dahe || !locale) {
    return NextResponse.json(
      { message: "پارامترهای ضروری وجود ندارد" },
      { status: 400 }
    );
  }

  // Validate numeric fields
  const pumpStationId = parseInt(idPumpStation);
  const year = parseInt(sal);
  const month = parseInt(mah);
  const decade = parseInt(dahe);

  if (isNaN(pumpStationId) || isNaN(year) || isNaN(month) || isNaN(decade)) {
    return NextResponse.json(
      { message: "مقادیر عددی نامعتبر" },
      { status: 400 }
    );
  }

  try {
    // Fetch record to validate fiddahe or fiddec
    const record = await prisma.taeedprogram.findFirst({
      where: {
        fidpumpsta: pumpStationId,
        sal: year,
        mah: month,
        dahe: decade,
      },
      select: {
        filenamenahaee: true,
        filepathnahaee: true,
        fiddahe: true,
        fiddec: true,
      },
    });

    if (!record) {
      return NextResponse.json({ message: "رکوردی یافت نشد" }, { status: 404 });
    }

    // Validate fiddahe or fiddec based on locale
    if (locale === "fa" && record.fiddahe === null) {
      return NextResponse.json(
        { message: "fiddahe نمی‌تواند NULL باشد برای زبان فارسی" },
        { status: 400 }
      );
    }

    if (locale !== "fa" && record.fiddec === null) {
      return NextResponse.json(
        { message: "fiddec نمی‌تواند NULL باشد برای زبان‌های غیرفارسی" },
        { status: 400 }
      );
    }

    // Check if file exists in database
    if (!record.filenamenahaee || !record.filepathnahaee) {
      return NextResponse.json({ message: "فایل یافت نشد" }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), "public", record.filepathnahaee);

    // Check if file exists on server
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: "فایل در سرور وجود ندارد" },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);
    const fileExtension = path.extname(record.filenamenahaee).toLowerCase();

    // Handle preview mode
    if (preview) {
      const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
      if (imageExtensions.includes(fileExtension)) {
        return new NextResponse(fileBuffer, {
          headers: {
            "Content-Type": `image/${fileExtension.slice(1)}`,
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
      return NextResponse.json(
        { message: "پیش‌نمایش فقط برای تصاویر قابل نمایش است" },
        { status: 400 }
      );
    }

    // Handle download mode
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${encodeURIComponent(
          record.filenamenahaee
        )}"`,
        "Content-Type": "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("خطا در دریافت فایل:", error);
    return NextResponse.json(
      { message: "خطا در دریافت فایل" },
      { status: 500 }
    );
  }
}

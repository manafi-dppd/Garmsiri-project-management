import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const idPumpStation = formData.get("idPumpStation") as string | null;
    const sal = formData.get("sal") as string | null;
    const mah = formData.get("mah") as string | null;
    const dahe = formData.get("dahe") as string | null;
    const locale = formData.get("locale") as string | null;
    // Validate required fields
    if (!file || !idPumpStation || !sal || !mah || !dahe || !locale) {
      return NextResponse.json(
        { message: "Missing required fields" },
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
        { message: "Invalid numeric values" },
        { status: 400 }
      );
    }

    // Validate fiddahe or fiddec based on locale
    const record = await prisma.taeedprogram.findFirst({
      where: {
        fidpumpsta: pumpStationId,
        sal: year,
        mah: month,
        dahe: decade,
      },
      select: {
        fiddahe: true,
        fiddec: true,
      },
    });

    if (!record) {
      return NextResponse.json(
        { message: "No matching record found" },
        { status: 404 }
      );
    }

    if (locale === "fa" && record.fiddahe === null) {
      return NextResponse.json(
        { message: "fiddahe cannot be NULL for Persian locale" },
        { status: 400 }
      );
    }

    if (locale !== "fa" && record.fiddec === null) {
      return NextResponse.json(
        { message: "fiddec cannot be NULL for non-Persian locale" },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate safe filename
    const originalName = file.name;
    const fileExtension = originalName.split(".").pop();
    const safeFilename = `${Date.now()}_${pumpStationId}_${year}_${month}_${decade}.${fileExtension}`;
    const filePath = path.join(uploadDir, safeFilename);
    const now = new Date();

    // Write file using Uint8Array to avoid Buffer type issue
    const fileBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, new Uint8Array(fileBuffer));

    // Update database
    const result = await prisma.taeedprogram.updateMany({
      where: {
        fidpumpsta: pumpStationId,
        sal: year,
        mah: month,
        dahe: decade,
      },
      data: {
        filenamenahaee: originalName,
        filepathnahaee: `/uploads/${safeFilename}`,
        tarikhfilenahee: now,
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { message: "No matching record found to update" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "File uploaded and database updated successfully",
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error uploading file", error: errorMessage },
      { status: 500 }
    );
  }
}

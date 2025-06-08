import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // استفاده از کلاینت مشترک برای لوکال و سرور

// تعریف نوع برای درخواست ورودی
interface TaeedProgramRequest {
  fidpumpsta: number;
  sal: number;
  mah: number;
  dahe: number;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TaeedProgramRequest;

    // اعتبارسنجی پیشرفته‌تر
    if (
      !body ||
      typeof body.fidpumpsta !== "number" ||
      !body.sal ||
      !body.mah ||
      !body.dahe
    ) {
      return NextResponse.json(
        { error: "Invalid parameters", received: body },
        { status: 400 }
      );
    }
    const { fidpumpsta, sal, mah, dahe } = body;

    if (!fidpumpsta || !sal || !mah || !dahe) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const result = await prisma.taeedprogram.findFirst({
      where: {
        fidpumpsta: fidpumpsta,
        sal: sal,
        mah: mah,
        dahe: dahe,
      },
      select: {
        firstnersal: true,
        lastnersal: true,
        tarikhersal: true,
        firstnabmantaghe: true,
        lastnabmantaghe: true,
        tarikhabmantaghe: true,
        taedabmantaghe: true,
        firstnpeymankar: true,
        lastnpeymankar: true,
        tarikhpeymankar: true,
        taedpeymankar: true,
        firstnabniroo: true,
        lastnabniroo: true,
        tarikhabniroo: true,
        taedabniroo: true,
        filenamenahaee: true,
        tarikhfilenahee: true,
        firstntaeednahaee: true,
        lastntaeednahaee: true,
        tarikhtaeednahaee: true,
        taeednahaee: true,
        fiddahe: true,
        toziheslah: true,
      },
    });

    if (!result) {
      return NextResponse.json(
        { error: "No matching record found" },
        { status: 404 }
      );
    }
    const sanitized = {
      ...result,
      taedabmantaghe:
        result.taedabmantaghe === false &&
        !result.firstnabmantaghe &&
        !result.lastnabmantaghe &&
        !result.tarikhabmantaghe
          ? null
          : result.taedabmantaghe,
      taedpeymankar:
        result.taedpeymankar === false &&
        !result.firstnpeymankar &&
        !result.lastnpeymankar &&
        !result.tarikhpeymankar
          ? null
          : result.taedpeymankar,
      taedabniroo:
        result.taedabniroo === false &&
        !result.firstnabniroo &&
        !result.lastnabniroo &&
        !result.tarikhabniroo
          ? null
          : result.taedabniroo,
    };
    return NextResponse.json(sanitized, { status: 200 });
  } catch (error) {
    console.error("Error fetching TaeedProgram details:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

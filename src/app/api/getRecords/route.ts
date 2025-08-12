import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { locales, Locale, defaultLocale } from "@/i18n/config";

interface Record {
  idtardor: number;
  trikh: Date;
  dahe: number;
  sal: number;
  mah: number;
}

interface VolumeResult {
  fidranesh: number;
  _sum: { taghvim: Decimal | null };
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const urlLocale = url.searchParams.get("locale");
  const acceptLanguage = req.headers.get("Accept-Language")?.split(",")[0];
  const localeBase = acceptLanguage
    ? acceptLanguage.split("-")[0]
    : defaultLocale;
  const locale = (
    locales.includes(urlLocale as Locale)
      ? urlLocale
      : locales.includes(localeBase as Locale)
      ? localeBase
      : defaultLocale
  ) as Locale;
  // console.log("[route.ts] locale:", locale);

  const { searchParams } = url;
  const networkId = searchParams.get("networkId");
  const dahe = searchParams.get("dahe");
  const sal = searchParams.get("sal");
  const mah = searchParams.get("mah");
  const idsal = searchParams.get("idsal");
  const iddore = searchParams.get("iddore");

  if (!networkId || !idsal || !iddore) {
    return NextResponse.json(
      {
        error:
          locale === "fa"
            ? "شناسه شبکه، سال زراعی و دوره کشت الزامی است"
            : "Network ID, idsal, and iddore are required",
      },
      { status: 400 }
    );
  }

  try {
    const shabake = await prisma.shabakedorekesht.findFirst({
      where: {
        fidnet: Number(networkId),
        fidsal: Number(idsal),
        fiddore: Number(iddore),
      },
      select: { trikhshorooe: true, trikhpayan: true },
    });

    if (!shabake) {
      return NextResponse.json(
        {
          message:
            locale === "fa"
              ? "تقویم آبیاری برای این دوره کشت و سال زراعی یافت نشد"
              : "Irrigation calendar not found for this period and crop year",
        },
        { status: 404 }
      );
    }

    const startDate = new Date(
      Date.UTC(
        shabake.trikhshorooe.getFullYear(),
        shabake.trikhshorooe.getMonth(),
        shabake.trikhshorooe.getDate()
      )
    );
    const endDate = new Date(
      Date.UTC(
        shabake.trikhpayan.getFullYear(),
        shabake.trikhpayan.getMonth(),
        shabake.trikhpayan.getDate()
      )
    );

    // console.log("[route.ts] startDate:", startDate, "endDate:", endDate);
    // console.log("[route.ts] Input parameters:", { sal, mah, dahe });

    let whereClause: any = {
      trikh: {
        gte: startDate,
        lte: endDate,
      },
    };

    if (locale === "fa") {
      // برای زبان فارسی، مستقیماً از sal، mah و dahe استفاده می‌کنیم
      if (sal) whereClause.sal = Number(sal);
      if (mah) whereClause.mah = Number(mah);
      if (dahe) whereClause.dahe = Number(dahe);
    } else {
      // برای زبان غیرفارسی، بازه زمانی را بر اساس sal، mah و dahe محاسبه می‌کنیم
      if (sal && mah) {
        const year = Number(sal);
        const month = Number(mah) - 1; // ماه در Date از 0 شروع می‌شود
        // محاسبه آخرین روز ماه
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        let trikhClause = {
          gte: new Date(Date.UTC(year, month, 1)),
          lte: new Date(Date.UTC(year, month, lastDayOfMonth)),
        };

        if (dahe) {
          const daheNum = Number(dahe);
          const daheStartDay = daheNum === 1 ? 1 : daheNum === 2 ? 11 : 21;
          // برای دهه سوم، از lastDayOfMonth استفاده می‌کنیم
          const daheEndDay =
            daheNum === 1 ? 10 : daheNum === 2 ? 20 : lastDayOfMonth;
          trikhClause = {
            gte: new Date(Date.UTC(year, month, daheStartDay)),
            lte: new Date(Date.UTC(year, month, daheEndDay)),
          };
        }

        // ترکیب trikhClause با بازه shabake
        whereClause.trikh = {
          gte: new Date(
            Math.max(trikhClause.gte.getTime(), startDate.getTime())
          ),
          lte: new Date(Math.min(trikhClause.lte.getTime(), endDate.getTime())),
        };
      } else if (sal) {
        whereClause.trikh = {
          gte: new Date(Date.UTC(Number(sal), 0, 1)),
          lte: new Date(Date.UTC(Number(sal), 11, 31)),
        };
      }
    }

    // console.log("[route.ts] whereClause:", whereClause);

    const records = await prisma.trikhdorekesht.findMany({
      where: whereClause,
      select: {
        idtardor: true,
        trikh: true,
        dahe: true,
        sal: locale === "fa" ? true : false,
        mah: locale === "fa" ? true : false,
      },
      orderBy: { trikh: "asc" },
    });

    // console.log("[route.ts] records:", records);

    const mappedRecords = records.map((record) => {
      const day = record.trikh.getUTCDate();
      const calculatedDahe =
        locale !== "fa" ? (day < 11 ? 1 : day < 21 ? 2 : 3) : record.dahe;
      return {
        ...record,
        sal: locale === "fa" ? record.sal : record.trikh.getUTCFullYear(),
        mah: locale === "fa" ? record.mah : record.trikh.getUTCMonth() + 1,
        dahe: calculatedDahe,
      };
    });

    // console.log("[route.ts] mappedRecords:", mappedRecords);

    const predictedVolumes = await Promise.all(
      mappedRecords.map(async (record: Record) => {
        const raneshVolumes = await prisma.bahrebardaritaghvim.groupBy({
          by: ["fidranesh"],
          where: { fidtardor: record.idtardor },
          _sum: { taghvim: true },
        });
        return {
          idtardor: record.idtardor,
          volumes: raneshVolumes.map((rv: VolumeResult) => ({
            fidranesh: rv.fidranesh,
            totaltaghvim: rv._sum.taghvim ? Number(rv._sum.taghvim) : 0,
          })),
        };
      })
    );

    return NextResponse.json({ records: mappedRecords, predictedVolumes });
  } catch (error) {
    console.error("[route.ts] Database error:", error);
    return NextResponse.json(
      { error: locale === "fa" ? "خطای سرور" : "Internal Server Error" },
      { status: 500 }
    );
  }
}

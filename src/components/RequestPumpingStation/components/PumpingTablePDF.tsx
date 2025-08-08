import * as React from "react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import {
  toLocalizedWeekday,
  formatLocalizedDate,
} from "../../../utils/dateUtils";
import { KhatRanesh, RecordType, PumpingData } from "../types";

interface PumpingTablePDFProps {
  khatRaneshList: KhatRanesh[];
  records: RecordType[];
  pumpData: { [idTarDor: number]: { [idRanesh: number]: PumpingData } };
  selectedPumpCounts: { [key: number]: { [date: string]: number } };
  timeValues: {
    [key: number]: { [key: number]: { from: string; to: string } };
  };
  selectedZarfiat: { [key: number]: { [key: number]: number } };
  finalVolumes: { [key: number]: number };
  compactMode?: boolean;
}

const PumpingTablePDF: React.FC<PumpingTablePDFProps> = ({
  khatRaneshList,
  records,
  pumpData,
  selectedPumpCounts,
  timeValues,
  selectedZarfiat,
  finalVolumes,
  compactMode = false,
}) => {
  const locale = useLocale();
  const t = useTranslations("PumpingTable");
  const isRtl = locale === "fa" || locale === "ar";
  return (
    <table
      className="w-full border-collapse border border-orange-500"
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      <thead className="bg-blue-100">
        <tr style={{ height: compactMode ? "30px" : "30px" }}>
          <th
            className={`h-8 border border-gray-300 px-4 align-top font-bold ${
              isRtl
                ? "border-l-4 border-l-green-400"
                : "border-r-4 border-r-green-400"
            }`}
            colSpan={2}
          >
            {t("line")}
          </th>
          {khatRaneshList
            .filter(
              (ranesh) => ranesh.active !== false && ranesh.fiddpipe === 1
            )
            .map((ranesh) => (
              <th
                key={ranesh.idranesh}
                className={`h-8 border border-gray-300 px-4 text-center align-top ${
                  isRtl
                    ? "border-l-4 border-l-green-400"
                    : "border-r-4 border-r-green-400"
                }`}
                colSpan={ranesh.fidsepu === 1 ? 5 : 4}
                style={{ direction: "ltr" }}
              >
                {ranesh.raneshname}
              </th>
            ))}
        </tr>
        {/* سطر "دبی پمپ" */}
        <tr>
          <th
            className={`h-8 border border-gray-300 px-4 font-bold align-top ${
              isRtl
                ? "border-l-4 border-l-green-400"
                : "border-r-4 border-r-green-400"
            }`}
            colSpan={2}
          >
            {t("flow")}
          </th>
          {khatRaneshList
            .filter(
              (ranesh) => ranesh.active !== false && ranesh.fiddpipe === 1
            )
            .map((ranesh) => (
              <th
                key={ranesh.idranesh}
                className={`h-8 border border-gray-300 px-4 text-center align-top font-bold ${
                  isRtl
                    ? "border-l-4 border-l-green-400"
                    : "border-r-4 border-r-green-400"
                }`}
                colSpan={ranesh.fidsepu === 1 ? 5 : 4}
                dir="ltr"
              >
                {ranesh.fidsepu === 1
                  ? `${ranesh.debipomp} L/S`
                  : `${ranesh.zarfiat} L/S`}
              </th>
            ))}
        </tr>
        <tr>
          <th className="py-0.3 h-8 border border-gray-300 px-1 align-top font-bold">
            {t("day")}
          </th>
          <th
            className={`py-0.3 h-8 border border-gray-300 px-1 text-center align-top font-bold ${
              isRtl
                ? "border-l-4 border-l-green-400"
                : "border-r-4 border-r-green-400"
            }`}
          >
            {t("date")}
          </th>
          {khatRaneshList
            .filter(
              (ranesh) => ranesh.active !== false && ranesh.fiddpipe === 1
            )
            .map((ranesh) => (
              <React.Fragment key={ranesh.idranesh}>
                {ranesh.fidsepu === 1 && (
                  <th className="py-0.3 h-8 border border-gray-300 px-1 text-center align-top font-bold">
                    {t("count")}
                  </th>
                )}
                <th className="py-0.3 h-8 border border-gray-300 px-0.5 text-center align-top font-bold">
                  {t("flow")}
                </th>
                <th className="py-0.3 h-8 border border-gray-300 px-4 text-center align-top font-bold">
                  {t("start")}
                </th>
                <th className="py-0.3 h-8 border border-gray-300 px-4 text-center align-top font-bold">
                  {t("end")}
                </th>
                <th
                  className={`py-0.3 h-8 border border-gray-300 px-1 text-center align-top font-bold ${
                    isRtl
                      ? "border-l-4 border-l-green-400"
                      : "border-r-4 border-r-green-400"
                  }`}
                >
                  {t("duration")}
                </th>
              </React.Fragment>
            ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 text-sm">
        {records.map((record, index) => (
          <tr
            key={record.idtardor}
            className={`${index % 2 === 0 ? "bg-green-100" : "bg-white"} h-7`}
            style={{ height: compactMode ? "25px" : "35px" }}
          >
            <td className="py-0.3 border border-gray-300 px-1 align-top">
              {toLocalizedWeekday(record.trikh, locale as any)}
            </td>
            <td
              className={`py-0.3 border border-gray-300 px-1 text-center align-top font-bold ${
                isRtl
                  ? "border-l-4 border-l-green-400"
                  : "border-r-4 border-r-green-400"
              }`}
            >
              {formatLocalizedDate(record.trikh, locale as any)}
            </td>
            {khatRaneshList
              .filter(
                (ranesh) => ranesh.active !== false && ranesh.fiddpipe === 1
              )
              .map((ranesh) => {
                const raneshInfo = pumpData[record.idtardor]?.[ranesh.idranesh];
                const fromValue =
                  timeValues[record.idtardor]?.[ranesh.idranesh]?.from ||
                  (raneshInfo?.shorooe
                    ? new Date(raneshInfo.shorooe).toISOString().slice(11, 16)
                    : "");
                const toValue =
                  timeValues[record.idtardor]?.[ranesh.idranesh]?.to ||
                  (raneshInfo?.paian
                    ? new Date(raneshInfo.paian).toISOString().slice(11, 16)
                    : "");

                const durationMinutes =
                  fromValue && toValue
                    ? (() => {
                        const [fromHours, fromMinutes] = fromValue
                          .split(":")
                          .map(Number);
                        const [toHours, toMinutes] = toValue
                          .split(":")
                          .map(Number);
                        let duration =
                          toHours * 60 +
                          toMinutes -
                          (fromHours * 60 + fromMinutes);
                        if (duration <= 0) duration += 1440;
                        return duration;
                      })()
                    : null;

                return (
                  <React.Fragment key={ranesh.idranesh}>
                    {ranesh.fidsepu === 1 && (
                      <td className="py-0.3 border border-gray-300 px-1 text-center align-top">
                        {selectedPumpCounts[record.idtardor]?.[
                          ranesh.idranesh
                        ] ||
                          raneshInfo?.tedad ||
                          0}
                      </td>
                    )}
                    <td className="py-0.3 border border-gray-300 px-1 text-center align-top">
                      {ranesh.fidsepu === 2
                        ? selectedZarfiat[record.idtardor]?.[ranesh.idranesh] ||
                          raneshInfo?.zarfiat ||
                          0
                        : (
                            (raneshInfo?.tedad || 0) *
                            (khatRaneshList.find(
                              (khat) => khat.idranesh === ranesh.idranesh
                            )?.debipomp || 0)
                          ).toFixed(1)}
                    </td>
                    <td className="py-0.3 border border-gray-300 px-1 text-center align-top">
                      {fromValue || "-"}
                    </td>
                    <td className="py-0.3 border border-gray-300 px-1 text-center align-top">
                      {toValue || "-"}
                    </td>
                    <td
                      className={`py-0.3 border border-gray-300 px-1 text-center align-top ${
                        isRtl
                          ? "border-l-4 border-l-green-400"
                          : "border-r-4 border-r-green-400"
                      }`}
                    >
                      {durationMinutes
                        ? `${Math.floor(durationMinutes / 60)
                            .toString()
                            .padStart(2, "0")}:${(durationMinutes % 60)
                            .toString()
                            .padStart(2, "0")}`
                        : "-"}
                    </td>
                  </React.Fragment>
                );
              })}
          </tr>
        ))}
        {/* سطرهای "حجم درخواستی"، "حجم پیش‌بینی" و "اضافه درخواست" */}
        <tr className="bg-yellow-100 font-semibold">
          <td
            className={`py-0.3 h-6 border border-gray-300 px-4 align-top text-xs font-bold ${
              isRtl
                ? "border-l-4 border-l-green-400"
                : "border-r-4 border-r-green-400"
            }`}
            colSpan={2}
          >
            {t("requested_volume")}
          </td>
          {khatRaneshList
            .filter(
              (ranesh) => ranesh.active !== false && ranesh.fiddpipe === 1
            )
            .map((ranesh) => {
              const totalWaterVolume = records.reduce((sum, record) => {
                const pumpInfo = pumpData[record.idtardor];
                const raneshInfo = pumpInfo?.[ranesh.idranesh];

                if (!raneshInfo) return sum;

                const debi =
                  ranesh.fidsepu === 2
                    ? Number(raneshInfo?.zarfiat ?? 0)
                    : (raneshInfo?.tedad ?? 0) *
                      (khatRaneshList.find(
                        (khat) => khat.idranesh === ranesh.idranesh
                      )?.debipomp ?? 0);

                const fromValue =
                  timeValues[record.idtardor]?.[ranesh.idranesh]?.from ||
                  (raneshInfo.shorooe
                    ? new Date(raneshInfo.shorooe).toISOString().slice(11, 16)
                    : "");
                const toValue =
                  timeValues[record.idtardor]?.[ranesh.idranesh]?.to ||
                  (raneshInfo.paian
                    ? new Date(raneshInfo.paian).toISOString().slice(11, 16)
                    : "");

                if (fromValue && toValue) {
                  const [fromHours, fromMinutes] = fromValue
                    .split(":")
                    .map(Number);
                  const [toHours, toMinutes] = toValue.split(":").map(Number);
                  let durationMinutes =
                    toHours * 60 + toMinutes - (fromHours * 60 + fromMinutes);
                  if (durationMinutes <= 0) durationMinutes += 1440;
                  const durationHours = durationMinutes / 60;
                  return sum + debi * durationHours * 3.6;
                }
                return sum;
              }, 0);

              return (
                <td
                  key={ranesh.idranesh}
                  className={`py-0.3 border border-gray-300 px-1 text-center align-top ${
                    isRtl
                      ? "border-l-4 border-l-green-400"
                      : "border-r-4 border-r-green-400"
                  }`}
                  colSpan={ranesh.fidsepu === 1 ? 5 : 4}
                >
                  {totalWaterVolume
                    .toFixed(1)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
              );
            })}
        </tr>
        <tr className="bg-gray-200 font-bold">
          <td
            className={`py-0.3 h-6 border border-gray-300 px-4 align-top text-xs font-bold ${
              isRtl
                ? "border-l-4 border-l-green-400"
                : "border-r-4 border-r-green-400"
            }`}
            colSpan={2}
          >
            {t("predicted_volume")}
          </td>
          {khatRaneshList
            .filter(
              (ranesh) => ranesh.active !== false && ranesh.fiddpipe === 1
            )
            .map((ranesh) => (
              <td
                key={ranesh.idranesh}
                className={`py-0.3 h-6 border border-gray-300 px-4 text-center align-top text-xs font-semibold ${
                  isRtl
                    ? "border-l-4 border-l-green-400"
                    : "border-r-4 border-r-green-400"
                }`}
                colSpan={ranesh.fidsepu === 1 ? 5 : 4}
              >
                {finalVolumes[ranesh.idranesh] !== undefined
                  ? finalVolumes[ranesh.idranesh]
                      .toFixed(1)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : "-"}
              </td>
            ))}
        </tr>
        <tr className="bg-gray-100 font-bold">
          <td
            className={`py-0.3 h-6 border border-gray-300 px-4 align-top text-xs font-bold ${
              isRtl
                ? "border-l-4 border-l-green-400"
                : "border-r-4 border-r-green-400"
            }`}
            colSpan={2}
          >
            {t("extra_request")}
          </td>
          {khatRaneshList
            .filter(
              (ranesh) => ranesh.active !== false && ranesh.fiddpipe === 1
            )
            .map((ranesh) => {
              const totalWaterVolume = records.reduce((sum, record) => {
                const pumpInfo = pumpData[record.idtardor];
                const raneshInfo = pumpInfo?.[ranesh.idranesh];

                if (!raneshInfo) return sum;

                const debi =
                  ranesh.fidsepu === 2
                    ? Number(raneshInfo?.zarfiat ?? 0)
                    : (raneshInfo?.tedad ?? 0) *
                      (khatRaneshList.find(
                        (khat) => khat.idranesh === ranesh.idranesh
                      )?.debipomp ?? 0);

                const fromValue =
                  timeValues[record.idtardor]?.[ranesh.idranesh]?.from ||
                  (raneshInfo.shorooe
                    ? new Date(raneshInfo.shorooe).toISOString().slice(11, 16)
                    : "");
                const toValue =
                  timeValues[record.idtardor]?.[ranesh.idranesh]?.to ||
                  (raneshInfo.paian
                    ? new Date(raneshInfo.paian).toISOString().slice(11, 16)
                    : "");

                if (fromValue && toValue) {
                  const [fromHours, fromMinutes] = fromValue
                    .split(":")
                    .map(Number);
                  const [toHours, toMinutes] = toValue.split(":").map(Number);
                  let durationMinutes =
                    toHours * 60 + toMinutes - (fromHours * 60 + fromMinutes);
                  if (durationMinutes <= 0) durationMinutes += 1440;
                  const durationHours = durationMinutes / 60;
                  return sum + debi * durationHours * 3.6;
                }
                return sum;
              }, 0);

              const predictedVolume = finalVolumes[ranesh.idranesh] ?? 0;
              const extraRequest = totalWaterVolume - predictedVolume;
              const bgColor = extraRequest > 0 ? "bg-red-100" : "bg-gray-100";
              const textColor =
                extraRequest > 0 ? "text-red-700" : "text-black";

              return (
                <td
                  key={ranesh.idranesh}
                  className={`py-0.3 border border-gray-300 px-4 text-center ${bgColor} ${textColor} h-6 ${
                    isRtl
                      ? "border-l-4 border-l-green-400"
                      : "border-r-4 border-r-green-400"
                  } align-top text-xs`}
                  colSpan={ranesh.fidsepu === 1 ? 5 : 4}
                >
                  {extraRequest
                    .toFixed(1)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
              );
            })}
        </tr>
      </tbody>
    </table>
  );
};

export default PumpingTablePDF;

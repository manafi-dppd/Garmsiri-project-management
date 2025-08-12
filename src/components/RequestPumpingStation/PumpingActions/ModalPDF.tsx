import * as React from "react";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import Image from "next/image";
import { toPersianDate, formatDateForNonPersian } from "@/utils/dateUtils";
import { convertMahToPersian } from "../PaginationForMah";
import PumpingTablePDF from "../components/PumpingTablePDF";
import { KhatRanesh, RecordType, PumpingData } from "../types";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

interface ModalPDFProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  khatRaneshList: KhatRanesh[];
  records: RecordType[];
  pumpData: { [idTarDor: number]: { [idRanesh: number]: PumpingData } };
  selectedPumpCounts: { [idTarDor: number]: { [idRanesh: number]: number } };
  selectedZarfiat: { [idTarDor: number]: { [idRanesh: number]: number } };
  timeValues: {
    [idTarDor: number]: { [idRanesh: number]: { from: string; to: string } };
  };
  finalVolumes: { [idRanesh: number]: number };
  dahe: number;
  mah: number;
  pumpStationName: string;
  networkName: string;
  saleZeraee: string;
  doreKesht: string;
}

const ModalPDF: React.FC<ModalPDFProps> = ({
  isOpen,
  onClose,
  khatRaneshList,
  records,
  pumpData,
  selectedPumpCounts,
  selectedZarfiat,
  timeValues,
  finalVolumes,
  dahe,
  mah,
  pumpStationName,
}) => {
  const locale = useLocale();
  const today = new Date().toISOString();
  const t = useTranslations("");
  const [isFormatMenuOpen, setIsFormatMenuOpen] = useState(false);
  const pumpStationText = pumpStationName;
  const daheText =
    dahe === 1
      ? t("Pagination.first")
      : dahe === 2
      ? t("Pagination.second")
      : t("Pagination.third");
  const mahText =
    locale === "fa" ? convertMahToPersian(mah) : t(`Months.month${mah}`);
  const handleGenerateOutput = (
    format: "pdf" | "jpg" | "jpeg" | "bmp" | "png"
  ) => {
    const element = document.getElementById("modal-content");

    if (element) {
      // ذخیره موقعیت اسکرول فعلی
      const initialScrollX = window.scrollX;
      const initialScrollY = window.scrollY;

      // اسکرول به بالاترین نقطه برای گرفتن تمام محتوا
      window.scrollTo(0, 0);

      // تنظیمات html2canvas برای گرفتن تمام محتوا
      html2canvas(element, {
        scale: 2, // افزایش کیفیت
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#FFFFFF",
      }).then((canvas) => {
        // بازگشت به موقعیت اسکرول اولیه
        window.scrollTo(initialScrollX, initialScrollY);

        if (format === "pdf") {
          const imgData = canvas.toDataURL("image/png", 1.0);
          const pdf = new jsPDF("landscape", "mm", "a4");

          // ابعاد A4 به میلیمتر (لنداسکیپ)
          const pageWidth = 297; // عرض A4
          const pageHeight = 210; // ارتفاع A4

          // حاشیه‌ها (میلیمتر)
          const margin = 10;
          const contentWidth = pageWidth - margin * 2;
          const contentHeight = pageHeight - margin * 2;

          // محاسبه نسبت برای فیت کردن در صفحه با حاشیه
          const imgRatio = canvas.width / canvas.height;
          let imgWidth = contentWidth;
          let imgHeight = contentWidth / imgRatio;

          // اگر ارتفاع محتوا بیشتر از فضای موجود است
          if (imgHeight > contentHeight) {
            imgHeight = contentHeight;
            imgWidth = contentHeight * imgRatio;
          }

          // محاسبه موقعیت برای وسط صفحه با حاشیه
          const xPos = (pageWidth - imgWidth) / 2;
          const yPos = (pageHeight - imgHeight) / 2;

          pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);
          pdf.save(`${daheText} ${mahText} ${pumpStationText}.pdf`);
        } else {
          const imgData = canvas.toDataURL(`image/${format}`, 1.0);
          const link = document.createElement("a");
          link.href = imgData;
          link.download = `${daheText} ${mahText} ${pumpStationText}.${format}`;
          link.click();
        }
      });
    }
  };

  const handleGenerateExcel = () => {
    const element = document.getElementById("modal-content");
    if (element) {
      const table = element.querySelector("table");
      if (table) {
        // تابع تبدیل تاریخ به عدد سریال اکسل
        const convertToExcelDate = (dateString: string) => {
          const date = new Date(dateString);
          // عدد سریال اکسل برای تاریخ (تعداد روزها از 1 ژانویه 1900)
          const excelDate =
            (date.getTime() - new Date("1899-12-30").getTime()) /
            (1000 * 60 * 60 * 24);
          return Math.floor(excelDate);
        };

        // تبدیل جدول به شیت اکسل
        const ws = XLSX.utils.table_to_sheet(table);

        // پیدا کردن ایندکس ستون‌های مورد نظر
        let dateColIndex = -1;
        const startTimeColIndices: number[] = [];
        const endTimeColIndices: number[] = [];

        // بررسی هدرهای جدول برای پیدا کردن ستون‌ها
        const headers = table.querySelectorAll("thead tr:last-child th");
        headers.forEach((header, index) => {
          const text = header.textContent?.trim();
          if (text === "تاریخ") {
            dateColIndex = index;
          } else if (text === "شروع") {
            startTimeColIndices.push(index);
          } else if (text === "پایان") {
            endTimeColIndices.push(index);
          }
        });

        // اعمال فرمت‌بندی روی سلول‌ها
        Object.keys(ws).forEach((cellAddress) => {
          if (cellAddress.startsWith("!")) return; // Skip special sheet keys
          const cell = ws[cellAddress];
          const colIndex = XLSX.utils.decode_cell(cellAddress).c;
          const { r } = XLSX.utils.decode_cell(cellAddress);

          // سلول‌های هدر (ردیف اول) را تغییر ندهیم
          if (r < 3) {
            cell.t = "s"; // نوع string
            delete cell.z; // حذف فرمت برای هدرها
            return;
          }

          // فرمت تاریخ فارسی
          if (colIndex === dateColIndex && cell.v) {
            cell.z = "[$-fa-IR,96]yyyy/mm/dd;@";
            // تبدیل تاریخ به عدد سریال اکسل
            try {
              cell.v = convertToExcelDate(
                records.find(
                  (r) => toPersianDate(r.trikh, "YYYY/MM/DD") === cell.v
                )?.trikh || cell.v
              );
              cell.t = "n"; // نوع number
            } catch {
              cell.t = "s"; // اگر تبدیل ناموفق بود، به صورت رشته باقی بماند
            }
          }

          // فرمت زمان برای ستون‌های شروع و پایان
          if (
            startTimeColIndices.includes(colIndex) ||
            endTimeColIndices.includes(colIndex)
          ) {
            if (cell.v && /^\d{2}:\d{2}$/.test(cell.v)) {
              cell.z = "hh:mm";
              // تبدیل زمان به فرمت عددی اکسل
              const [hours, minutes] = cell.v.split(":").map(Number);
              cell.v = hours / 24 + minutes / 1440;
              cell.t = "n"; // نوع number
            }
          }
        });

        // ایجاد کتاب کار و ذخیره فایل
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${daheText} ${mahText} ${pumpStationText}.xlsx`);
      } else {
        alert(t("No_table_found_Excel"));
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="landscape z-60 relative max-h-[210mm] max-w-[350mm] overflow-auto rounded-lg bg-white p-4 pb-12 shadow-2xl print:max-h-full print:max-w-full print:bg-transparent print:p-0 print:shadow-none">
        <div
          id="modal-content"
          className="print:mx-auto print:my-4 print:flex print:min-h-[297mm] print:min-w-[210mm] print:items-center print:justify-center print:border print:border-gray-200 print:bg-white print:shadow-lg"
          style={{
            width: "297mm", // عرض A4 در حالت لنداسکیپ
            minHeight: "210mm", // ارتفاع A4 در حالت لنداسکیپ
          }}
        >
          <div
            className="print:h-full print:w-full print:p-8"
            style={{ width: "100%" }}
          >
            <div className="landscape w-full overflow-auto bg-white px-4">
              <div className="relative">
                <Image
                  src="/Untitled.png"
                  alt="Logo"
                  width={64}
                  height={64}
                  className={`absolute ${
                    locale === "en" || locale === "tr" ? "right-2" : "left-2"
                  } top-2`}
                />
                <div
                  className={`absolute ${
                    locale === "en" || locale === "tr" ? "right-20" : "left-20"
                  } top-11 flex items-center gap-2 pl-6`}
                >
                  <span className="text-sm text-gray-600">
                    {t("ModalPDF.date")}
                  </span>
                  <span className="text-sm text-gray-600">
                    {locale === "fa"
                      ? toPersianDate(today, "YYYY/MM/DD")
                      : formatDateForNonPersian(today)}
                  </span>
                </div>
              </div>
              <div className="font-IranNastaliq right-2 top-2 pb-2 pr-2 text-2xl text-gray-600">
                {t("ModalPDF.Company")}
              </div>

              <div
                className="mb-4 flex items-center gap-1 font-b-zar text-lg font-bold"
                style={{ textRendering: "optimizeLegibility" }}
              >
                {t("ModalPDF.irrigation_program", {
                  daheText: daheText,
                  mahText: mahText,
                  pumpStationText: pumpStationText,
                })}
                <div>
                  {/* {(() => {
                    const isLastCharNumber = /\d$/.test(pumpStationName);
                    return isLastCharNumber ? (
                      <span>
                        <span>{pumpStationName.slice(0, -1)}</span>
                        <span className="ml-1">
                          {pumpStationName.slice(-1)}
                        </span>
                      </span>
                    ) : (
                      <span>{pumpStationName}</span>
                    );
                  })()} */}
                </div>
              </div>

              <PumpingTablePDF
                khatRaneshList={khatRaneshList}
                records={records}
                pumpData={pumpData}
                selectedPumpCounts={selectedPumpCounts}
                timeValues={timeValues}
                selectedZarfiat={selectedZarfiat}
                finalVolumes={finalVolumes}
              />
              <div className="mt-4 flex">
                <div
                  className="relative flex-1 border border-gray-300 p-3"
                  style={{ height: "17vh" }}
                >
                  <div
                    className={`absolute top-0 text-xs text-gray-600 ${
                      locale === "fa" || locale === "ar" ? "right-2" : "left-2"
                    }`}
                  >
                    {t("ModalPDF.representativeRegionalWaterCooperative")}
                  </div>
                </div>

                <div
                  className="relative flex-1 border border-gray-300 p-3"
                  style={{ height: "17vh" }}
                >
                  <div
                    className={`absolute top-0 text-xs text-gray-600 ${
                      locale === "fa" || locale === "ar" ? "right-2" : "left-2"
                    }`}
                  >
                    {t("ModalPDF.representativeExecutiveBranch")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute bottom-2 right-2 rounded bg-red-500 px-3 py-1 font-bold text-white print:hidden"
        >
          {t("ModalPDF.close")}
        </button>
        <div className="absolute bottom-2 left-2">
          <button
            onClick={() => setIsFormatMenuOpen(!isFormatMenuOpen)}
            className="rounded bg-blue-500 px-3 py-1 font-bold text-white print:hidden"
          >
            {t("ModalPDF.downloadFile")}
          </button>
          {isFormatMenuOpen && (
            <div className="absolute bottom-10 left-0 rounded-lg border border-gray-300 bg-white shadow-lg">
              <button
                onClick={() => {
                  handleGenerateOutput("pdf");
                  setIsFormatMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                PDF
              </button>
              <button
                onClick={() => {
                  handleGenerateOutput("jpg");
                  setIsFormatMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                JPG
              </button>
              <button
                onClick={() => {
                  handleGenerateOutput("jpeg");
                  setIsFormatMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                JPEG
              </button>
              <button
                onClick={() => {
                  handleGenerateOutput("bmp");
                  setIsFormatMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                BMP
              </button>
              <button
                onClick={() => {
                  handleGenerateOutput("png");
                  setIsFormatMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                PNG
              </button>
              <button
                onClick={() => {
                  handleGenerateExcel();
                  setIsFormatMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Excel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPDF;

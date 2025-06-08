import * as React from "react";
import { useState } from "react";

interface AdditionalFormFieldsProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formData: {
    introductionLetter: string;
    letterIssuer: string;
    letterNumber: string;
    letterDate: string;
    letterApprover: string;
    attachment: File | null;
  };
}

const AdditionalFormFields: React.FC<AdditionalFormFieldsProps> = ({
  onChange,
  formData,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(1403); // مقدار پیش‌فرض سال
  const [selectedMonth, setSelectedMonth] = useState(1); // مقدار پیش‌فرض ماه
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const daysInMonth = (month: number, year: number) => {
    // چک کردن سال کبیسه در تقویم جلالی
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    return isLeapYear(year) ? 30 : 29;
  };

  const isLeapYear = (year: number) => {
    return ((year + 38) * 31) % 128 < 31;
  };

  const generateCalendar = (month: number, year: number): number[] => {
    const days: number[] = [];
    const totalDays = daysInMonth(month, year);

    for (let day = 1; day <= totalDays; day++) {
      days.push(day);
    }
    return days;
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(
      `${selectedYear}/${selectedMonth.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}`
    );
    setIsCalendarOpen(false);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
  };

  const days = generateCalendar(selectedMonth, selectedYear);

  return (
    <div className="space-y-4 rounded-md bg-gray-100 p-1 shadow-md">
      <div>
        <label
          htmlFor="introductionLetter"
          className="block text-sm font-medium text-gray-700"
        >
          آپلود معرفی‌نامه
        </label>
        <input
          type="file"
          id="introductionLetter"
          name="introductionLetter"
          accept="image/*,.pdf"
          onChange={onChange}
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="letterIssuer"
          className="block text-sm font-medium text-gray-700"
        >
          صادرکننده معرفی‌نامه
        </label>
        <input
          list="issuerOptions"
          type="text"
          id="letterIssuer"
          name="letterIssuer"
          value={formData.letterIssuer}
          onChange={onChange}
          onKeyDown={(event) => {
            // فقط اجازه ورود اعداد را بدهید
            if (!/^[\u0600-\u06FFa-zA-Z\s]*$/.test(event.key)) {
              event.preventDefault();
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <datalist id="issuerOptions">
          <option value="شرکت آب منطقه‌ای کرمانشاه" />
          <option value="سازمان جهاد کشاورزی استان کرمانشاه" />
        </datalist>
      </div>
      <div>
        <label
          htmlFor="letterNumber"
          className="block text-sm font-medium text-gray-700"
        >
          شماره معرفی‌نامه
        </label>
        <input
          type="text"
          id="letterNumber"
          name="letterNumber"
          // value={formData.letterNumber}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div className="rounded border shadow-md">
        <span className="text-sm font-medium text-gray-700">
          تاریخ معرفی‌نامه
        </span>
        <div className="mb-2 items-center justify-between">
          <button
            type="button"
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white shadow hover:bg-blue-600"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          >
            انتخاب
          </button>
          <button
            type="button"
            onClick={() => setSelectedDate(null)} // مقدار تاریخ را پاک می‌کند
            disabled={!selectedDate}
            className={`rounded px-3 py-1 text-sm text-white ${
              selectedDate
                ? "bg-red-500 hover:bg-red-600" // حالت فعال
                : "cursor-not-allowed bg-gray-400" // حالت غیرفعال
            }`}
          >
            حذف
          </button>
        </div>
        {selectedDate && (
          <div className="mb-2">
            <span className="block text-sm text-gray-600">{selectedDate}</span>
          </div>
        )}
        {isCalendarOpen && (
          <div className="mt-2 rounded-md border bg-white p-2 shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <select
                className="rounded border px-2 py-1 text-sm"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {Array.from({ length: 9 }, (_, i) => 1402 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                className="rounded border px-2 py-1 text-sm"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                {months.map((month, index) => (
                  <option key={index + 1} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2 text-center font-bold text-gray-800">
              {`${months[selectedMonth - 1]} - ${selectedYear}`}
            </div>
            <div className="grid grid-cols-7 gap-1 text-sm">
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  className="h-8 w-8 rounded border border-gray-200 bg-gray-50 hover:bg-blue-100"
                  onClick={() => handleDateSelect(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <label
          htmlFor="letterApprover"
          className="block text-sm font-medium text-gray-700"
        >
          تاییدکننده
        </label>
        <input
          type="text"
          id="letterApprover"
          name="letterApprover"
          value={formData.letterApprover}
          onChange={onChange}
          onKeyDown={(event) => {
            // فقط اجازه ورود اعداد را بدهید
            if (!/^[\u0600-\u06FFa-zA-Z\s]*$/.test(event.key)) {
              event.preventDefault();
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
};

export default AdditionalFormFields;

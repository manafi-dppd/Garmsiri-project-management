import * as React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { faIR as fa, enUS as en, ar, tr } from "date-fns/locale";
import { format, parse } from "date-fns";
import { useTranslations, useLocale } from "next-intl";

registerLocale("fa", fa);
registerLocale("en", en);
registerLocale("ar", ar);
registerLocale("tr", tr);

interface DatePickerComponentProps {
  selectedDate: string | null;
  onChange: (date: string | null) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  selectedDate,
  onChange,
}) => {
  const locale = useLocale();
  const t = useTranslations("AdditionalFormFields");
  const isPersian = locale === "fa";
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const JalaliDatePicker: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState(1403);
    const [selectedMonth, setSelectedMonth] = useState(1);

    const months = [
      t("months.farvardin"),
      t("months.ordibehesht"),
      t("months.khordad"),
      t("months.tir"),
      t("months.mordad"),
      t("months.shahrivar"),
      t("months.mehr"),
      t("months.aban"),
      t("months.azar"),
      t("months.dey"),
      t("months.bahman"),
      t("months.esfand"),
    ];

    const daysInMonth = (month: number, year: number) => {
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
      const formattedDate = `${selectedYear}/${selectedMonth
        .toString()
        .padStart(2, "0")}/${day.toString().padStart(2, "0")}`;
      onChange(formattedDate);
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
      <div className="rounded border shadow-md">
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white shadow hover:bg-blue-600"
            onClick={() => {
              setIsCalendarOpen(!isCalendarOpen);
            }}
          >
            {t("select")}
          </button>
          <button
            type="button"
            onClick={() => {
              onChange(null);
            }}
            disabled={!selectedDate}
            className={`rounded px-3 py-1 text-sm text-white ${
              selectedDate
                ? "bg-red-500 hover:bg-red-600"
                : "cursor-not-allowed bg-gray-400"
            }`}
          >
            {t("clear")}
          </button>
        </div>
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
    );
  };

  const GregorianDatePicker: React.FC = () => {
    const getDatePickerLocale = () => {
      switch (locale) {
        case "en":
          return en;
        case "ar":
          return ar;
        case "tr":
          return tr;
        default:
          return en;
      }
    };

    const parsedDate = selectedDate
      ? parse(selectedDate, "yyyy/MM/dd", new Date())
      : null;

    const handleDateChange = (date: Date | null) => {
      const formattedDate = date ? format(date, "yyyy/MM/dd") : null;
      onChange(formattedDate);
      setIsCalendarOpen(false);
    };

    return (
      <div className="rounded border shadow-md">
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white shadow hover:bg-blue-600"
            onClick={() => {
              setIsCalendarOpen(!isCalendarOpen);
            }}
          >
            {t("select")}
          </button>
          <button
            type="button"
            onClick={() => {
              onChange(null);
            }}
            disabled={!selectedDate}
            className={`rounded px-3 py-1 text-sm text-white ${
              selectedDate
                ? "bg-red-500 hover:bg-red-600"
                : "cursor-not-allowed bg-gray-400"
            }`}
          >
            {t("clear")}
          </button>
        </div>
        {isCalendarOpen && (
          <div className="mt-2 rounded-md border bg-white p-2 shadow-md">
            <DatePicker
              selected={parsedDate}
              onChange={handleDateChange}
              locale={getDatePickerLocale()}
              dateFormat="yyyy/MM/dd"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 text-right shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholderText={t("selectDate")}
              inline
            />
          </div>
        )}
      </div>
    );
  };

  return isPersian ? <JalaliDatePicker /> : <GregorianDatePicker />;
};

export default DatePickerComponent;

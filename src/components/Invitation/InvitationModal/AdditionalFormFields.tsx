import React, {useState} from 'react';

interface AdditionalFormFieldsProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  formData: {
    introductionLetter: string;
    issuer: string;
    letterNumber: string;
    letterDate: string;
    confirmer: string;
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
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ];

  const daysInMonth = (month: number, year: any) => {
    // چک کردن سال کبیسه در تقویم جلالی
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    return isLeapYear(year) ? 30 : 29;
  };

  const isLeapYear = (year: number) => {
    return ((year + 38) * 31) % 128 < 31;
  };

  const generateCalendar = (month: number, year: number) => {
    const days = [];
    const totalDays = daysInMonth(month, year);

    for (let day = 1; day <= totalDays; day++) {
      days.push(day);
    }
    return days;
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(
      `${selectedYear}/${selectedMonth.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`,
    );
    setIsCalendarOpen(false);
  };

  const handleYearChange = (event: {target: {value: any}}) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event: {target: {value: any}}) => {
    setSelectedMonth(Number(event.target.value));
  };

  const days = generateCalendar(selectedMonth, selectedYear);

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md space-y-4">
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
          onChange={onChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="issuer"
          className="block text-sm font-medium text-gray-700"
        >
          صادرکننده معرفی‌نامه
        </label>
        <input
          list="issuerOptions"
          type="text"
          id="issuer"
          name="issuer"
          value={formData.issuer}
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
      <div className="p-4 border rounded shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            تاریخ معرفی‌نامه
          </span>
          <button
            type="button"
            className="px-3 py-1 text-sm text-white bg-blue-500 rounded shadow hover:bg-blue-600"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          >
            انتخاب تاریخ
          </button>
          <button
            type="button"
            onClick={() => setSelectedDate(null)} // مقدار تاریخ را پاک می‌کند
            className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
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
          <div className="border mt-2 rounded-md shadow-md bg-white p-2">
            <div className="flex justify-between items-center mb-3">
              <select
                className="border rounded px-2 py-1 text-sm"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {Array.from({length: 9}, (_, i) => 1402 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                className="border rounded px-2 py-1 text-sm"
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
            <div className="text-center text-gray-800 font-bold mb-2">
              {`${months[selectedMonth - 1]} - ${selectedYear}`}
            </div>
            <div className="grid grid-cols-7 gap-1 text-sm">
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  className="w-8 h-8 rounded hover:bg-blue-100 bg-gray-50 border border-gray-200"
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
          htmlFor="confirmer"
          className="block text-sm font-medium text-gray-700"
        >
          تاییدکننده
        </label>
        <input
          type="text"
          id="confirmer"
          name="confirmer"
          value={formData.confirmer}
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

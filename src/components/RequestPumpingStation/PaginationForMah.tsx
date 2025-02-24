import React from 'react';

export function convertMahToPersian(mah: number): string {
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
  return months[mah - 1] || 'نامعتبر';
}

interface DateRecord {
  Mah: number;
  Dahe: number;
}

interface PaginationForMahProps {
  selectedMah: number;
  sal: number;
  selectedDahe: number; // دریافت selectedDahe به عنوان prop
  setSelectedDahe: (value: number) => void; // دریافت تابع setSelectedDahe
  setDahe: (value: number) => void; // دریافت تابع setDahe
  allDates: {Mah: number; Dahe: number}[];
}

const PaginationForMah: React.FC<PaginationForMahProps> = ({
  selectedMah,
  sal,
  selectedDahe, // استفاده از selectedDahe
  setSelectedDahe, // استفاده از setSelectedDahe
  setDahe, // استفاده از setDahe
  allDates,
}) => {
  const handlePrevDahe = () => {
    if (selectedDahe > 1) {
      setSelectedDahe(selectedDahe - 1);
      setDahe(selectedDahe - 1); // به‌روزرسانی دهه در BodyRequestPumping.tsx
    }
  };

  const handleNextDahe = () => {
    if (selectedDahe < 3) {
      setSelectedDahe(selectedDahe + 1);
      setDahe(selectedDahe + 1); // به‌روزرسانی دهه در BodyRequestPumping.tsx
    }
  };

  return (
    <div
      className="flex items-center justify-right gap-4 mt-4"
      style={{
        transform: 'scale(0.70)',
      }}
    >
      {/* دکمه "دهه قبل" */}
      <button
        onClick={handlePrevDahe}
        disabled={selectedDahe === 1}
        className={`px-3 py-2 text-lg font-semibold rounded-md transition-all duration-300 flex items-center gap-2
          ${
            selectedDahe === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-700'
          }`}
      >
        <span className="text-xl">&lt;</span>
      </button>

      {/* نمایش دهه فعلی */}
      <span className="text-lg font-bold text-gray-900 bg-yellow-300 px-4 py-2 rounded-md shadow-lg ring-2 ring-yellow-400">
        دهه {selectedDahe === 1 ? 'اول' : selectedDahe === 2 ? 'دوم' : 'سوم'}
      </span>

      {/* دکمه "دهه بعد" */}
      <button
        onClick={handleNextDahe}
        disabled={selectedDahe === 3}
        className={`px-3 py-2 text-lg font-semibold rounded-md transition-all duration-300 flex items-center gap-2
          ${
            selectedDahe === 3
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-700'
          }`}
      >
        <span className="text-xl">&gt;</span>
      </button>
    </div>
  );
};

export default PaginationForMah;

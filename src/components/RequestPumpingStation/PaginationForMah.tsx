import * as React from "react";

export function convertMahToPersian(mah: number): string {
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
  return months[mah - 1] || "نامعتبر";
}

interface PaginationForMahProps {
  selectedMah: number;
  sal: number;
  selectedDahe: number;
  dahe: number;
  setSelectedDahe: (value: number) => void;
  setDahe: (value: number) => void;
  allDates: { mah: number; dahe: number }[];
  onDaheChange?: () => void;
}

const PaginationForMah: React.FC<PaginationForMahProps> = ({
  dahe,
  setSelectedDahe,
  setDahe,
  onDaheChange,
}) => {
  const handlePrevDahe = () => {
    if (dahe > 1) {
      const newDahe = dahe - 1;
      setSelectedDahe(newDahe);
      setDahe(newDahe);
      onDaheChange?.();
    }
  };

  const handleNextDahe = () => {
    if (dahe < 3) {
      const newDahe = dahe + 1;
      setSelectedDahe(newDahe);
      setDahe(newDahe);
      onDaheChange?.();
    }
  };

  return (
    <div
      className="justify-right flex items-center gap-4"
      style={{
        transform: "scale(0.70)",
      }}
    >
      {/* دکمه "دهه قبل" */}
      <button
        onClick={handlePrevDahe}
        disabled={dahe === 1}
        className={`flex items-center gap-2 rounded-md px-3 py-1 text-lg font-semibold transition-all duration-300 ${
          dahe === 1
            ? "cursor-not-allowed bg-gray-300 text-gray-500"
            : "bg-blue-500 text-white hover:bg-blue-700"
        }`}
      >
        <span className="text-xl">&lt;</span>
      </button>

      {/* نمایش دهه فعلی */}
      <span className="rounded-md bg-yellow-300 px-4 py-1 text-lg font-bold text-gray-900 shadow-lg ring-2 ring-yellow-400">
        دهه {dahe === 1 ? "اول" : dahe === 2 ? "دوم" : "سوم"}
      </span>

      {/* دکمه "دهه بعد" */}
      <button
        onClick={handleNextDahe}
        disabled={dahe === 3}
        className={`flex items-center gap-2 rounded-md px-3 py-1 text-lg font-semibold transition-all duration-300 ${
          dahe === 3
            ? "cursor-not-allowed bg-gray-300 text-gray-500"
            : "bg-blue-500 text-white hover:bg-blue-700"
        }`}
      >
        <span className="text-xl">&gt;</span>
      </button>
    </div>
  );
};

export default PaginationForMah;

import React, {useState} from 'react';
import {validatePumpingData} from '../utils/validationUtils';
import {KhatRanesh, RecordType, PumpingData} from '../types';
import {ValidationError} from '../utils/validationUtils'; // ایمپورت تایپ ValidationError

interface PumpingActionsProps {
  onSave: () => void;
  onReset: () => void;
  disabled?: boolean;
  isFormDisabled: boolean;
  isFormFilled: boolean;
  khatRaneshList: KhatRanesh[];
  records: RecordType[];
  pumpData: {[idTarDor: number]: {[idRanesh: number]: PumpingData}};
  selectedPumpCounts: {[key: number]: {[date: string]: number}};
  timeValues: {[key: number]: {[key: number]: {from: string; to: string}}};
  setValidationErrors: (
    errors: {date: string; raneshName: string; message: string}[],
  ) => void;
}

const PumpingActions: React.FC<PumpingActionsProps> = ({
  onSave,
  onReset,
  disabled,
  khatRaneshList,
  records,
  pumpData,
  selectedPumpCounts,
  timeValues,
  setValidationErrors,
  isFormDisabled,
  isFormFilled,
}) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const handleSave = () => {
    setErrors([]);
    setValidationErrors([]);

    const newErrors = validatePumpingData(
      records,
      khatRaneshList,
      pumpData, // جایگزینی selectedPumpCounts
      timeValues, // جایگزینی timeValues
    );

    console.log('📌 مقدار جدید newErrors بعد از اصلاح فرم:', newErrors);

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setValidationErrors(newErrors);
    } else {
      setValidationErrors([]);
      console.log('✅ خطاها پاک شدند.');
      onSave();
    }
  };
  console.log('isFormDisabled: ', isFormDisabled);
  console.log('isFormFilled: ', isFormFilled);
  return (
    <div className="flex flex-row gap-4 mt-4">
      {/* Div 1: درخواست کننده */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1">
        <div className="font-bold mb-2">درخواست کننده</div>
        <div className="flex gap-2 mb-2">
          <button
            className={`px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
              isFormDisabled || !isFormFilled
                ? 'opacity-50 cursor-not-allowed' // اصلاح این خط
                : ''
            }`}
            disabled={isFormDisabled || !isFormFilled}
            onClick={() => alert('توضیحات درخواست کننده')}
          >
            توضیحات
          </button>
          <button
            className={`px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 ${
              isFormDisabled || isFormFilled
                ? 'opacity-50 cursor-not-allowed' // اصلاح این خط
                : ''
            }`}
            disabled={isFormDisabled || isFormFilled}
            onClick={handleSave}
          >
            ذخیره
          </button>
        </div>
        <div className="text-sm">نام: [نام درخواست کننده]</div>
        <div className="text-sm">زمان: [زمان درخواست]</div>
      </div>

      {/* Div 2: آب منطقه‌ای */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1">
        <div className="font-bold mb-2">آب منطقه‌ای</div>
        <div className="flex gap-2 mb-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="region-water" value="approve" />
            تایید
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="region-water" value="reject" />
            رد
          </label>
        </div>
        <div className="flex gap-2 mb-2">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => alert('توضیحات آب منطقه‌ای')}
          >
            توضیحات
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={() => alert('ارسال آب منطقه‌ای')}
          >
            ارسال
          </button>
        </div>
        <div className="text-sm">نام: [نام آب منطقه‌ای]</div>
        <div className="text-sm">زمان: [زمان آب منطقه‌ای]</div>
      </div>

      {/* Div 3: پیمانکار پمپاژ */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1">
        <div className="font-bold mb-2">پیمانکار پمپاژ</div>
        <div className="flex gap-2 mb-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="contractor" value="approve" />
            تایید
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="contractor" value="reject" />
            رد
          </label>
        </div>
        <div className="flex gap-2 mb-2">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => alert('توضیحات پیمانکار پمپاژ')}
          >
            توضیحات
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={() => alert('ارسال پیمانکار پمپاژ')}
          >
            ارسال
          </button>
        </div>
        <div className="text-sm">نام: [نام پیمانکار پمپاژ]</div>
        <div className="text-sm">زمان: [زمان پیمانکار پمپاژ]</div>
      </div>

      {/* Div 4: آب نیرو */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1">
        <div className="font-bold mb-2">آب نیرو</div>
        <div className="flex gap-2 mb-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="water-power" value="approve" />
            تایید
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="water-power" value="reject" />
            رد
          </label>
        </div>
        <div className="flex gap-2 mb-2">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => alert('توضیحات آب نیرو')}
          >
            توضیحات
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={() => alert('ارسال آب نیرو')}
          >
            ارسال
          </button>
        </div>
        <div className="text-sm">نام: [نام آب نیرو]</div>
        <div className="text-sm">زمان: [زمان آب نیرو]</div>
      </div>

      {/* Div 5: دریافت PDF و تایید نهایی */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1">
        <div className="flex gap-2 mb-2">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => alert('دریافت PDF')}
          >
            دریافت PDF
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={() => alert('بارگذاری فایل نهایی')}
          >
            بارگذاری فایل نهایی
          </button>
          <button
            className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
            onClick={() => alert('مشاهده فایل نهایی')}
          >
            مشاهده فایل نهایی
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="final-approval" />
          <label htmlFor="final-approval">تایید نهایی</label>
        </div>
      </div>
    </div>
  );
};

export default PumpingActions;

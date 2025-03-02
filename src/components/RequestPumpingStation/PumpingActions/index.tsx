import React, {useEffect, useState} from 'react';
import {validatePumpingData} from '../utils/validationUtils';
import {KhatRanesh, RecordType, PumpingData} from '../types';
import {ValidationError} from '../utils/validationUtils';
import Modal from './Modal';
import {formatDateTime, formatLocalDateTime} from '@/utils/dateUtils';

interface TaeedProgramData {
  FirstNErsal: string;
  LastNErsal: string;
  TarikhErsal: string;
  TaedAbMantaghe: boolean;
  TaedPeymankar: boolean;
  TaedAbNiroo: boolean;
  FileNameNahaee: boolean;
  FirstNAbMantaghe: string;
  LastNAbMantaghe: string;
  TarikhAbMantaghe: string;
  FirstNPeymankar: string;
  LastNPeymankar: string;
  TarikhPeymankar: string;
  FirstNAbNiroo: string;
  LastNAbNiroo: string;
  TarikhAbNiroo: string;
  TarikhFileNahee: string;
  FirstNTaeedNahaee: string;
  LastNTaeedNahaee: string;
  TarikhTaeedNahaee: string;
}

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
  userRole: string[];
  idPumpStation: number;
  sal: number; // سال
  mah: number; // ماه
  dahe: number; // دهه
  firstName: string; // اضافه کردن firstName به پراپ‌ها
  lastName: string; // اضافه کردن lastName به پراپ‌ها
  taedProgramData: TaeedProgramData | null;
  selectedZarfiat: {[key: number]: {[key: number]: number}};
  setSelectedZarfiat: (data: {[key: number]: {[key: number]: number}}) => void;
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
  userRole,
  idPumpStation,
  sal,
  mah,
  dahe,
  firstName,
  lastName,
  taedProgramData,
  selectedZarfiat,
  setSelectedZarfiat,
}) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [modalContent, setModalContent] = useState<{[key: string]: string}>({});
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false); // State برای مدیریت وضعیت ذخیره‌سازی
  const [currentDateTime, setCurrentDateTime] = useState<string>(''); // State برای تاریخ و زمان فعلی
  // State برای مدیریت وضعیت دکمه‌های رادیویی
  const [taedAbMantaghe, setTaedAbMantaghe] = useState<boolean | null>(
    taedProgramData?.TaedAbMantaghe ?? null,
  );
  const [taedPeymankar, setTaedPeymankar] = useState<boolean | null>(
    taedProgramData?.TaedPeymankar ?? null,
  );
  const [taedAbNiroo, setTaedAbNiroo] = useState<boolean | null>(
    taedProgramData?.TaedAbNiroo ?? null,
  );

  // توابع onChange برای به‌روزرسانی state
  const handleTaedAbMantagheChange = (value: boolean) => {
    setTaedAbMantaghe(value);
  };

  const handleTaedPeymankarChange = (value: boolean) => {
    setTaedPeymankar(value);
  };

  const handleTaedAbNirooChange = (value: boolean) => {
    setTaedAbNiroo(value);
  };

  // Effect برای به‌روزرسانی state در صورت تغییر taedProgramData
  useEffect(() => {
    setTaedAbMantaghe(taedProgramData?.TaedAbMantaghe ?? null);
    setTaedPeymankar(taedProgramData?.TaedPeymankar ?? null);
    setTaedAbNiroo(taedProgramData?.TaedAbNiroo ?? null);
  }, [taedProgramData]);
  // بررسی وضعیت TarikhErsal
  const isTarikhErsalNull = taedProgramData?.TarikhErsal === null;

  // بررسی وضعیت TaedAbMantaghe
  const isTaedAbMantagheTrue = taedProgramData?.TaedAbMantaghe === true;
  const isTaedAbMantagheFalse = taedProgramData?.TaedAbMantaghe === false;
  const isTaedAbMantagheNull = taedProgramData?.TaedAbMantaghe === null;

  // بررسی وضعیت TaedPeymankar
  const isTaedPeymankarTrue = taedProgramData?.TaedPeymankar === true;
  const isTaedPeymankarFalse = taedProgramData?.TaedPeymankar === false;
  const isTaedPeymankarNull = taedProgramData?.TaedPeymankar === null;

  // بررسی وضعیت TaedAbNiroo
  const isTaedAbNirooTrue = taedProgramData?.TaedAbNiroo === true;
  const isTaedAbNirooFalse = taedProgramData?.TaedAbNiroo === false;
  const isTaedAbNirooNull = taedProgramData?.TaedAbNiroo === null;

  // بررسی وضعیت FileNameNahaee
  const isFileNameNahaeeNull = taedProgramData?.FileNameNahaee === null;

  const handleSave = async () => {
    setErrors([]);
    setValidationErrors([]);

    const newErrors = validatePumpingData(
      records,
      khatRaneshList,
      pumpData,
      selectedPumpCounts,
      selectedZarfiat,
      timeValues,
    );

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setValidationErrors(newErrors);
      return;
    }

    try {
      for (const record of records) {
        for (const ranesh of khatRaneshList) {
          const raneshInfo = pumpData[record.IdTarDor]?.[ranesh.IdRanesh];
          const timeValue = timeValues[record.IdTarDor]?.[ranesh.IdRanesh];
          const selectedPumpCount =
            selectedPumpCounts[record.IdTarDor]?.[ranesh.IdRanesh] ?? 0;
          const zarfiatValue =
            selectedZarfiat[record.IdTarDor]?.[ranesh.IdRanesh] ?? 0;

          // جایگزینی مقادیر ویرایش شده در raneshInfo
          const updatedRaneshInfo = {
            ...raneshInfo,
            Tedad:
              selectedPumpCount !== undefined
                ? selectedPumpCount
                : raneshInfo?.Tedad,
            Zarfiat:
              zarfiatValue !== undefined ? zarfiatValue : raneshInfo?.Zarfiat,
            Shorooe:
              timeValue?.from !== undefined
                ? timeValue.from
                : raneshInfo?.Shorooe,
            Paian:
              timeValue?.to !== undefined ? timeValue.to : raneshInfo?.Paian,
          };

          if (ranesh.FIdSePu === 1) {
            await fetch('/api/updateBahrebardairProgram', {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                IdRanesh: ranesh.IdRanesh,
                IdTarDor: record.IdTarDor,
                Tedad: updatedRaneshInfo.Tedad,
                Shorooe: updatedRaneshInfo.Shorooe,
                Paian: updatedRaneshInfo.Paian,
              }),
            });
          } else if (ranesh.FIdSePu === 2) {
            await fetch('/api/updateBahrebardairProgramSeghli', {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                IdRanesh: ranesh.IdRanesh,
                IdTarDor: record.IdTarDor,
                Zarfiat: updatedRaneshInfo.Zarfiat,
                Shorooe: updatedRaneshInfo.Shorooe,
                Paian: updatedRaneshInfo.Paian,
              }),
            });
          }
        }
      }

      // بروزرسانی TaeedProgram
      await fetch('/api/updateTaeedProgram', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          FIdPumpSta: idPumpStation,
          Sal: sal,
          Mah: mah,
          Dahe: dahe,
          FirstNErsal: firstName,
          LastNErsal: lastName,
          TozihErsal: modalContent[`${sal}-${mah}-${dahe}-requester`] || '',
        }),
      });

      setIsSaved(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
      onSave();

      alert(`اطلاعات دهه ${dahe} ماه ${mah} با موفقیت ذخیره شد`);
    } catch (error) {
      console.error('Failed to save data:', error);
      setErrors([
        {date: '', raneshName: '', message: 'خطا در ذخیره‌سازی داده‌ها'},
      ]);
    }
  };

  const handleModalSave = (key: string, content: string) => {
    setModalContent((prev) => ({...prev, [key]: content}));
    setOpenModal(null);
  };

  const getIsReadOnly = (modalKey: string) => {
    switch (modalKey) {
      case 'requester':
        return !userRole.some((role) =>
          [
            'Website Creator',
            'Website Admin',
            'Ezgele Water Users Representative',
            'Jegiran Water Users Representative',
            'Northern Zahab Water Users Representative',
            'Southern Zahab Water Users Representative',
            'Hoomeh Qaraviz Water Users Representative',
            'Beshiveh Water Users Representative',
            'Ghaleh Shahin Water Users Representative',
            'Water Users Representative South Jagarlu',
          ].includes(role),
        );
      case 'regionalWater':
        return !userRole.some((role) =>
          [
            'Website Creator',
            'Website Admin',
            'Regional Water Representative',
          ].includes(role),
        );
      case 'pumpingContractor':
        return !userRole.some((role) =>
          [
            'Website Creator',
            'Website Admin',
            'Supervisor of the First Pumping Set',
            'Supervisor of the Second Pumping Set',
          ].includes(role),
        );
      case 'waterPower':
        return !userRole.some((role) =>
          ['Website Creator', 'Website Admin', 'Operation Manager'].includes(
            role,
          ),
        );
      default:
        return true;
    }
  };
  const getModalKey = (modalType: string) => {
    return `${sal}-${mah}-${dahe}-${modalType}`;
  };

  const handleOpenModal = async (modalType: string) => {
    const modalKey = getModalKey(modalType);

    // اگر مقدار قبلاً تنظیم شده باشد، مستقیماً مودال را باز کنید
    if (modalContent[modalKey]) {
      setOpenModal(modalKey);
      return;
    }

    // مشخص کردن فیلد مرتبط با هر دکمه
    let field = '';
    switch (modalType) {
      case 'requester':
        field = 'TozihErsal';
        break;
      case 'regionalWater':
        field = 'TozihAbMantaghe';
        break;
      case 'pumpingContractor':
        field = 'TozihPeymankar';
        break;
      case 'waterPower':
        field = 'TozihAbNiroo';
        break;
      default:
        return;
    }

    try {
      const response = await fetch('/api/getExplanationProgram', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          FIdPumpSta: idPumpStation,
          Sal: sal,
          Mah: mah,
          Dahe: dahe,
          field,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalContent((prev) => ({
          ...prev,
          [modalKey]: data.value,
        }));
      } else {
        setModalContent((prev) => ({
          ...prev,
          [modalKey]: 'خطا در دریافت اطلاعات',
        }));
      }
    } catch (error) {
      console.error('Error fetching modal data:', error);
      setModalContent((prev) => ({
        ...prev,
        [modalKey]: 'خطا در دریافت اطلاعات',
      }));
    }

    // باز کردن مودال پس از دریافت مقدار
    setOpenModal(modalKey);
  };

  return (
    <div className="flex flex-row gap-4 mt-4">
      {/* Div 1: درخواست کننده */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1 relative">
        <div className="font-bold mb-2">درخواست کننده</div>
        <div className="flex gap-2 mb-2">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => handleOpenModal('requester')}
          >
            توضیحات
          </button>
          {!getIsReadOnly('requester') && (
            <button
              className={`px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 ${
                isFormDisabled ||
                isFormFilled ||
                (!isTarikhErsalNull && isTaedAbMantagheTrue)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={
                isFormDisabled ||
                isFormFilled ||
                (!isTarikhErsalNull && isTaedAbMantagheTrue)
              }
              onClick={handleSave}
            >
              ذخیره
            </button>
          )}
        </div>
        {/* نام و زمان درخواست کننده */}
        {taedProgramData?.FirstNErsal && taedProgramData?.LastNErsal && (
          <div className="text-xs italic text-gray-500 absolute bottom-1 right-2">
            {isSaved
              ? `${firstName} ${lastName}`
              : `${taedProgramData.FirstNErsal} ${taedProgramData.LastNErsal}`}
          </div>
        )}
        {taedProgramData?.TarikhErsal && (
          <div className="text-xs italic text-gray-500 absolute bottom-1 left-2">
            {isSaved
              ? currentDateTime
              : formatDateTime(taedProgramData.TarikhErsal)}
          </div>
        )}
      </div>

      {/* Div 2: آب منطقه‌ای */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1 relative">
        <div className="font-bold mb-2">آب منطقه‌ای</div>
        <div className="flex gap-2 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="region-water"
              value="approve"
              disabled={
                getIsReadOnly('regionalWater') ||
                isTaedAbMantagheTrue ||
                isTarikhErsalNull
              }
              checked={taedAbMantaghe === true}
              onChange={() => handleTaedAbMantagheChange(true)}
            />
            تایید
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="region-water"
              value="reject"
              disabled={
                getIsReadOnly('regionalWater') ||
                isTaedAbMantagheTrue ||
                isTarikhErsalNull
              }
              checked={taedAbMantaghe === false}
              onChange={() => handleTaedAbMantagheChange(false)}
            />
            رد
          </label>
        </div>
        <div className="flex gap-2 mb-2">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => handleOpenModal('regionalWater')}
          >
            توضیحات
          </button>
          {!getIsReadOnly('regionalWater') && (
            <button
              className={`px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 ${
                isTaedAbMantagheTrue || isTarikhErsalNull
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={isTaedAbMantagheTrue || isTarikhErsalNull}
              onClick={() => alert('ارسال آب منطقه‌ای')}
            >
              ارسال
            </button>
          )}
        </div>
        {/* نام و زمان آب منطقه‌ای */}
        {taedProgramData?.FirstNAbMantaghe &&
          taedProgramData?.LastNAbMantaghe && (
            <div className="text-xs italic text-gray-500 absolute bottom-1 right-2">
              {taedProgramData.FirstNAbMantaghe}{' '}
              {taedProgramData.LastNAbMantaghe}
            </div>
          )}
        {taedProgramData?.TarikhAbMantaghe && (
          <div className="text-xs italic text-gray-500 absolute bottom-1 left-2">
            {formatDateTime(taedProgramData.TarikhAbMantaghe)}
          </div>
        )}
      </div>

      {/* Div 3: پیمانکار پمپاژ */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1 relative">
        <div className="font-bold mb-2">پیمانکار پمپاژ</div>
        <div className="flex gap-2 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="contractor"
              value="approve"
              disabled={
                getIsReadOnly('pumpingContractor') ||
                isTaedPeymankarTrue ||
                !isTaedAbMantagheTrue
              }
              checked={taedPeymankar === true}
              onChange={() => handleTaedPeymankarChange(true)}
            />
            تایید
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="contractor"
              value="reject"
              disabled={
                getIsReadOnly('pumpingContractor') ||
                isTaedPeymankarTrue ||
                !isTaedAbMantagheTrue
              }
              checked={taedPeymankar === false}
              onChange={() => handleTaedPeymankarChange(false)}
            />
            رد
          </label>
        </div>
        <div className="flex gap-2 mb-2">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => handleOpenModal('pumpingContractor')}
          >
            توضیحات
          </button>
          {!getIsReadOnly('pumpingContractor') && (
            <button
              className={`px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 ${
                isTaedPeymankarTrue || !isTaedAbMantagheTrue
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={isTaedPeymankarTrue || !isTaedAbMantagheTrue}
              onClick={() => alert('ارسال پیمانکار پمپاژ')}
            >
              ارسال
            </button>
          )}
        </div>
        {/* نام و زمان پیمانکار پمپاژ */}
        {taedProgramData?.FirstNPeymankar &&
          taedProgramData?.LastNPeymankar && (
            <div className="text-xs italic text-gray-500 absolute bottom-1 right-2">
              {taedProgramData.FirstNPeymankar} {taedProgramData.LastNPeymankar}
            </div>
          )}
        {taedProgramData?.TarikhPeymankar && (
          <div className="text-xs italic text-gray-500 absolute bottom-1 left-2">
            {formatDateTime(taedProgramData.TarikhPeymankar)}
          </div>
        )}
      </div>

      {/* Div 4: آب نیرو */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1 relative">
        <div className="font-bold mb-2">آب نیرو</div>
        <div className="flex gap-2 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="water-power"
              value="approve"
              disabled={
                getIsReadOnly('waterPower') ||
                isTaedAbNirooTrue ||
                !isTaedPeymankarTrue
              }
              checked={taedAbNiroo === true}
              onChange={() => handleTaedAbNirooChange(true)}
            />
            تایید
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="water-power"
              value="reject"
              disabled={
                getIsReadOnly('waterPower') ||
                isTaedAbNirooTrue ||
                !isTaedPeymankarTrue
              }
              checked={taedAbNiroo === false}
              onChange={() => handleTaedAbNirooChange(false)}
            />
            رد
          </label>
        </div>
        <div className="flex gap-2 mb-2">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => handleOpenModal('waterPower')}
          >
            توضیحات
          </button>
          {!getIsReadOnly('waterPower') && (
            <button
              className={`px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 ${
                isTaedAbNirooTrue || !isTaedPeymankarTrue
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={isTaedAbNirooTrue || !isTaedPeymankarTrue}
              onClick={() => alert('ارسال آب نیرو')}
            >
              ارسال
            </button>
          )}
        </div>
        {/* نام و زمان آب نیرو */}
        {taedProgramData?.FirstNAbNiroo && taedProgramData?.LastNAbNiroo && (
          <div className="text-xs italic text-gray-500 absolute bottom-1 right-2">
            {taedProgramData.FirstNAbNiroo} {taedProgramData.LastNAbNiroo}
          </div>
        )}
        {taedProgramData?.TarikhAbNiroo && (
          <div className="text-xs italic text-gray-500 absolute bottom-1 left-2">
            {formatDateTime(taedProgramData.TarikhAbNiroo)}
          </div>
        )}
      </div>

      {/* Div 5: دریافت PDF و تایید نهایی */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1">
        <div className="flex gap-2 mb-2">
          <button
            className={`px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
              isTaedAbNirooTrue ? '' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!isTaedAbNirooTrue}
            onClick={() => alert('دریافت PDF')}
          >
            دریافت PDF
          </button>
          <button
            className={`px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 ${
              isTaedAbNirooTrue ? '' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!isTaedAbNirooTrue}
            onClick={() => alert('بارگذاری فایل نهایی')}
          >
            بارگذاری فایل نهایی
          </button>
          <button
            className={`px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 ${
              isFileNameNahaeeNull ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isFileNameNahaeeNull}
            onClick={() => alert('مشاهده فایل نهایی')}
          >
            مشاهده فایل نهایی
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="final-approval"
            disabled={isFileNameNahaeeNull}
          />
          <label htmlFor="final-approval">تایید نهایی</label>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <Modal
          isOpen={!!openModal}
          onClose={() => setOpenModal(null)}
          content={modalContent[openModal] || ''}
          onSave={(content) => handleModalSave(openModal, content)}
          isReadOnly={getIsReadOnly(openModal.split('-')[3])} // بررسی modalKey
        />
      )}
    </div>
  );
};

export default PumpingActions;

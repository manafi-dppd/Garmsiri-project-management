import React, {useState} from 'react';
import {validatePumpingData} from '../utils/validationUtils';
import {KhatRanesh, RecordType, PumpingData} from '../types';
import {ValidationError} from '../utils/validationUtils';
import Modal from './Modal';

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
  sal: number; // سال
  mah: number; // ماه
  dahe: number; // دهه
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
  sal,
  mah,
  dahe,
}) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [modalContent, setModalContent] = useState<{[key: string]: string}>({});
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleSave = () => {
    setErrors([]);
    setValidationErrors([]);

    const newErrors = validatePumpingData(
      records,
      khatRaneshList,
      pumpData,
      selectedPumpCounts,
      timeValues,
    );

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setValidationErrors(newErrors);
    } else {
      setValidationErrors([]);
      onSave();
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
  return (
    <div className="flex flex-row gap-4 mt-4">
      {/* Div 1: درخواست کننده */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1">
        <div className="font-bold mb-2">درخواست کننده</div>
        <div className="flex gap-2 mb-2">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => setOpenModal(getModalKey('requester'))}
          >
            توضیحات
          </button>
          <button
            className={`px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 ${
              isFormDisabled || isFormFilled
                ? 'opacity-50 cursor-not-allowed'
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
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => setOpenModal(getModalKey('regionalWater'))}
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
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => setOpenModal(getModalKey('pumpingContractor'))}
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
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => setOpenModal(getModalKey('waterPower'))}
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

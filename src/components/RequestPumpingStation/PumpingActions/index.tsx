import React, {useEffect, useState} from 'react';
import {validatePumpingData} from '../utils/validationUtils';
import {KhatRanesh, RecordType, PumpingData} from '../types';
import {ValidationError} from '../utils/validationUtils';
import {toPersianDate} from '@/utils/dateUtils';
import Modal from './Modal';
import ModalPDF from './ModalPDF';
import HeaderRequestPumping from '../HeaderForm';
import PumpingTable from '../components/PumpingTable';
import {convertMahToPersian} from '../PaginationForMah';
import {formatDateTime, formatLocalDateTime} from '@/utils/dateUtils';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  isFormFilled: boolean;
  setValidationErrors: (
    errors: {date: string; raneshName: string; message: string}[],
  ) => void;
  sal: number; // سال
  mah: number; // ماه
  dahe: number; // دهه
  taedProgramData: TaeedProgramData | null;
  setSelectedZarfiat: (data: {[key: number]: {[key: number]: number}}) => void;
  userName: string;
  userRole: string[];
  firstName: string;
  lastName: string;
  networkName: string;
  pumpStationName: string;
  selectedNetworkId: number | null;
  idPumpStation: number;
  saleZeraee: string;
  doreKesht: string;
  idShDo: number;
  khatRaneshList: KhatRanesh[];
  records: RecordType[];
  pumpData: {[idTarDor: number]: {[idRanesh: number]: PumpingData}};
  selectedPumpCounts: {[key: number]: {[date: string]: number}};
  timeValues: {[key: number]: {[key: number]: {from: string; to: string}}};
  finalVolumes: {[key: number]: number};
  isFormDisabled: boolean;
  selectedZarfiat: {[key: number]: {[key: number]: number}};
}

const PumpingActions: React.FC<PumpingActionsProps> = ({
  onSave,
  onReset,
  disabled,
  setValidationErrors,
  isFormFilled,
  sal,
  mah,
  dahe,
  taedProgramData,
  setSelectedZarfiat,
  userName,
  userRole,
  firstName,
  lastName,
  networkName,
  pumpStationName,
  selectedNetworkId,
  idPumpStation,
  saleZeraee,
  doreKesht,
  idShDo,
  khatRaneshList,
  records,
  pumpData,
  selectedPumpCounts,
  timeValues,
  finalVolumes,
  isFormDisabled,
  selectedZarfiat,
}) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [modalContent, setModalContent] = useState<{[key: string]: string}>({});
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSavedRegionalWater, setIsSavedRegionalWater] = useState(false);
  const [isSavedPumpingContractor, setIsSavedPumpingContractor] =
    useState(false);
  const [isSavedWaterPower, setIsSavedWaterPower] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState<string>(''); // State برای تاریخ و زمان فعلی
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const handleGeneratePDF = () => {
    setIsPdfModalOpen(true);
  };
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

  const [isRegionalWaterSubmitDisabled, setIsRegionalWaterSubmitDisabled] =
    useState(false);
  const [
    isPumpingContractorSubmitDisabled,
    setIsPumpingContractorSubmitDisabled,
  ] = useState(false);
  const [isWaterPowerSubmitDisabled, setIsWaterPowerSubmitDisabled] =
    useState(false);

  // تابع برای ارسال درخواست به API
  const updateTaeedProgram = async (endpoint: string, data: any) => {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('اطلاعات با موفقیت ذخیره شد');
      } else {
        alert('خطا در ذخیره‌سازی اطلاعات');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // توابع برای ارسال درخواست‌های مختلف
  // const handleRequesterSubmit = async () => {
  //   await updateTaeedProgram('updateRequester', {
  //     idPumpStation,
  //     sal,
  //     mah,
  //     dahe,
  //     firstName,
  //     lastName,
  //     tozihErsal: modalContent[`${sal}-${mah}-${dahe}-requester`],
  //     taedAbMantaghe,
  //   });
  // };

  const handleRegionalWaterSubmit = async () => {
    if (
      taedAbMantaghe === false &&
      !modalContent[`${sal}-${mah}-${dahe}-regionalWater`]
    ) {
      alert('در صورت رد برنامه ارائه توضیحات الزامی است');
      return;
    }

    try {
      await updateTaeedProgram('updateRegionalWater', {
        idPumpStation,
        sal,
        mah,
        dahe,
        firstName,
        lastName,
        tozihAbMantaghe: modalContent[`${sal}-${mah}-${dahe}-regionalWater`],
        taedAbMantaghe,
      });

      // اگر دکمه رادیویی "تایید" انتخاب شده باشد، دکمه "ارسال" را disable کنید
      if (taedAbMantaghe === true) {
        setIsRegionalWaterSubmitDisabled(true);
      }
      setIsSavedRegionalWater(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
    } catch (error) {
      console.error('Error updating TaeedProgram:', error);
    }
  };

  const handlePumpingContractorSubmit = async () => {
    if (
      taedPeymankar === false &&
      !modalContent[`${sal}-${mah}-${dahe}-pumpingContractor`]
    ) {
      alert('در صورت رد برنامه ارائه توضیحات الزامی است');
      return;
    }

    try {
      await updateTaeedProgram('updatePumpingContractor', {
        idPumpStation,
        sal,
        mah,
        dahe,
        firstName,
        lastName,
        tozihPeymankar: modalContent[`${sal}-${mah}-${dahe}-pumpingContractor`],
        taedPeymankar,
      });

      // اگر دکمه رادیویی "تایید" انتخاب شده باشد، دکمه "ارسال" را disable کنید
      if (taedPeymankar === true) {
        setIsPumpingContractorSubmitDisabled(true);
      }
      setIsSavedPumpingContractor(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
    } catch (error) {
      console.error('Error updating TaeedProgram:', error);
    }
  };

  const handleWaterPowerSubmit = async () => {
    if (
      taedAbNiroo === false &&
      !modalContent[`${sal}-${mah}-${dahe}-waterPower`]
    ) {
      alert('در صورت رد برنامه ارائه توضیحات الزامی است');
      return;
    }

    try {
      await updateTaeedProgram('updateWaterPower', {
        idPumpStation,
        sal,
        mah,
        dahe,
        firstName,
        lastName,
        tozihAbNiroo: modalContent[`${sal}-${mah}-${dahe}-waterPower`],
        taedAbNiroo,
      });

      // اگر دکمه رادیویی "تایید" انتخاب شده باشد، دکمه "ارسال" را disable کنید
      if (taedAbNiroo === true) {
        setIsWaterPowerSubmitDisabled(true);
      }
      setIsSavedWaterPower(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
    } catch (error) {
      console.error('Error updating TaeedProgram:', error);
    }
  };

  const handleFinalApprovalSubmit = async () => {
    await updateTaeedProgram('updateFinalApproval', {
      idPumpStation,
      sal,
      mah,
      dahe,
      firstName,
      lastName,
      tozihAbNiroo: modalContent[`${sal}-${mah}-${dahe}-waterPower`],
    });
  };

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

  const generatePDF = async () => {
    // انتخاب عناصر HTML مربوط به PumpingTable و HeaderForm
    const pumpingTableElement = document.getElementById('pumping-table');
    const headerFormElement = document.getElementById('header-form');

    if (!pumpingTableElement || !headerFormElement) {
      alert('عناصر مورد نظر برای تولید PDF یافت نشدند.');
      return;
    }

    // ایجاد یک PDF جدید با اندازه A4 و حالت landscape
    const pdf = new jsPDF('landscape', 'mm', 'a4');

    // تبدیل محتوای HeaderForm به تصویر
    const headerCanvas = await html2canvas(headerFormElement);
    const headerImgData = headerCanvas.toDataURL('image/png');

    // تبدیل محتوای PumpingTable به تصویر
    const tableCanvas = await html2canvas(pumpingTableElement);
    const tableImgData = tableCanvas.toDataURL('image/png');

    // اضافه کردن تصویر HeaderForm به PDF
    pdf.addImage(headerImgData, 'PNG', 10, 10, 280, 50); // تنظیم موقعیت و اندازه تصویر

    // اضافه کردن تصویر PumpingTable به PDF
    pdf.addImage(tableImgData, 'PNG', 10, 70, 280, 150); // تنظیم موقعیت و اندازه تصویر

    // ذخیره PDF
    pdf.save('pumping-report.pdf');
  };

  return (
    <div className="flex flex-row gap-4 mt-4 overflow-x-auto">
      {/* Div 1: درخواست کننده */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1 relative min-w-[200px]">
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
        {(taedProgramData?.FirstNErsal && taedProgramData?.LastNErsal) ||
        isSaved ? (
          <div className="text-xs italic text-gray-500 absolute bottom-1 right-2">
            {isSaved
              ? `${firstName} ${lastName}`
              : `${taedProgramData?.FirstNErsal} ${taedProgramData?.LastNErsal}`}
          </div>
        ) : null}
        {taedProgramData?.TarikhErsal || isSaved ? (
          <div className="text-xs italic text-gray-500 absolute bottom-1 left-2">
            {isSaved
              ? currentDateTime
              : taedProgramData?.TarikhErsal &&
                formatDateTime(taedProgramData.TarikhErsal)}
          </div>
        ) : null}
      </div>

      {/* Div 2: آب منطقه‌ای */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1 relative min-w-[200px]">
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
                isTarikhErsalNull ||
                isRegionalWaterSubmitDisabled
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
                isTarikhErsalNull ||
                isRegionalWaterSubmitDisabled
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
                isTaedAbMantagheTrue ||
                isTarikhErsalNull ||
                taedAbMantaghe === null ||
                isRegionalWaterSubmitDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={
                isTaedAbMantagheTrue ||
                isTarikhErsalNull ||
                taedAbMantaghe === null ||
                isRegionalWaterSubmitDisabled
              }
              onClick={handleRegionalWaterSubmit}
            >
              ارسال
            </button>
          )}
        </div>
        {/* نام و زمان آب منطقه‌ای */}
        {(taedProgramData?.FirstNAbMantaghe &&
          taedProgramData?.LastNAbMantaghe) ||
        isSavedRegionalWater ? (
          <div className="text-xs italic text-gray-500 absolute bottom-1 right-2">
            {isSavedRegionalWater
              ? `${firstName} ${lastName}`
              : `${taedProgramData?.FirstNAbMantaghe} ${taedProgramData?.LastNAbMantaghe}`}
          </div>
        ) : null}
        {taedProgramData?.TarikhAbMantaghe || isSavedRegionalWater ? (
          <div className="text-xs italic text-gray-500 absolute bottom-1 left-2">
            {isSavedRegionalWater
              ? currentDateTime
              : taedProgramData?.TarikhAbMantaghe &&
                formatDateTime(taedProgramData.TarikhAbMantaghe)}
          </div>
        ) : null}
      </div>

      {/* Div 3: پیمانکار پمپاژ */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1 relative min-w-[200px]">
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
                !isTaedAbMantagheTrue ||
                isPumpingContractorSubmitDisabled
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
                !isTaedAbMantagheTrue ||
                isPumpingContractorSubmitDisabled
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
                isTaedPeymankarTrue ||
                !isTaedAbMantagheTrue ||
                taedPeymankar === null ||
                isPumpingContractorSubmitDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={
                isTaedPeymankarTrue ||
                !isTaedAbMantagheTrue ||
                taedPeymankar === null ||
                isPumpingContractorSubmitDisabled
              }
              onClick={handlePumpingContractorSubmit}
            >
              ارسال
            </button>
          )}
        </div>
        {/* نام و زمان پیمانکار پمپاژ */}
        {(taedProgramData?.FirstNPeymankar &&
          taedProgramData?.LastNPeymankar) ||
        isSavedPumpingContractor ? (
          <div className="text-xs italic text-gray-500 absolute bottom-1 right-2">
            {isSavedPumpingContractor
              ? `${firstName} ${lastName}`
              : `${taedProgramData?.FirstNPeymankar} ${taedProgramData?.LastNPeymankar}`}
          </div>
        ) : null}
        {taedProgramData?.TarikhPeymankar || isSavedPumpingContractor ? (
          <div className="text-xs italic text-gray-500 absolute bottom-1 left-2">
            {isSavedPumpingContractor
              ? currentDateTime
              : taedProgramData?.TarikhPeymankar &&
                formatDateTime(taedProgramData?.TarikhPeymankar)}
          </div>
        ) : null}
        {taedProgramData?.TarikhPeymankar || isSavedPumpingContractor ? (
          <div className="text-xs italic text-gray-500 absolute bottom-1 left-2">
            {isSavedPumpingContractor
              ? currentDateTime
              : taedProgramData?.TarikhPeymankar &&
                formatDateTime(taedProgramData?.TarikhPeymankar)}
          </div>
        ) : null}
      </div>

      {/* Div 4: آب نیرو */}
      <div className="p-4 border border-gray-300 rounded-lg flex-1 relative min-w-[200px]">
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
                !isTaedPeymankarTrue ||
                isWaterPowerSubmitDisabled
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
                !isTaedPeymankarTrue ||
                isWaterPowerSubmitDisabled
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
                isTaedAbNirooTrue ||
                !isTaedPeymankarTrue ||
                taedAbNiroo === null ||
                isWaterPowerSubmitDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={
                isTaedAbNirooTrue ||
                !isTaedPeymankarTrue ||
                taedAbNiroo === null ||
                isWaterPowerSubmitDisabled
              }
              onClick={handleWaterPowerSubmit}
            >
              ارسال
            </button>
          )}
        </div>
        {/* نام و زمان آب نیرو */}
        {(taedProgramData?.FirstNAbNiroo && taedProgramData?.LastNAbNiroo) ||
        isSavedWaterPower ? (
          <div className="text-xs italic text-gray-500 absolute bottom-1 right-2">
            {isSavedWaterPower
              ? `${firstName} ${lastName}`
              : `${taedProgramData?.FirstNAbNiroo} ${taedProgramData?.LastNAbNiroo}`}
          </div>
        ) : null}
        {taedProgramData?.TarikhAbNiroo || isSavedWaterPower ? (
          <div className="text-xs italic text-gray-500 absolute bottom-1 left-2">
            {isSavedWaterPower
              ? currentDateTime
              : taedProgramData?.TarikhAbNiroo &&
                formatDateTime(taedProgramData.TarikhAbNiroo)}
          </div>
        ) : null}
      </div>

      {/* Div 5: دریافت PDF و بارگذاری فایل نهایی */}
      <div className="p-4 border border-gray-300 rounded-lg flex-[1.6] min-w-[290px]">
        <div className="font-bold mb-2">فایل‌های نهایی</div>
        <div className="flex gap-2 mb-2">
          <button
            className={`px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
              isTaedAbNirooTrue ? '' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!isTaedAbNirooTrue}
            onClick={handleGeneratePDF}
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
      </div>
      {/* مودال برای نمایش PDF */}
      {isPdfModalOpen && (
        <ModalPDF
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
        >
          <div className="p-4 bg-white w-[297mm] max-h-[80vh] overflow-auto landscape">
            {/* نمایش مقادیر HeaderForm */}
            <div className="flex flex-wrap gap-4 mb-4">
              {/* <div className="flex items-center gap-1">
                <label className="font-semibold text-sm">شبکه آبیاری:</label>
                <span>{networkName}</span>
              </div> */}
              <div className="flex items-center gap-1">
                {/* <label className="font-semibold text-sm">ایستگاه پمپاژ:</label> */}
                <span>برنامه آبیاری</span>
                <span>
                  دهه {dahe === 1 ? 'اول ' : dahe === 2 ? 'دوم ' : 'سوم '}
                </span>
                <span>{convertMahToPersian(mah)}</span>
                <span>{pumpStationName}</span>
              </div>
              {/* <div className="flex items-center gap-1">
                <label className="font-semibold text-sm">سال زراعی:</label>
                <span>{saleZeraee}</span>
              </div>
              <div className="flex items-center gap-1">
                <label className="font-semibold text-sm">دوره کشت:</label>
                <span>{doreKesht}</span>
              </div> */}
            </div>

            {/* نمایش مقادیر PumpingTable */}
            <table className="w-full border-collapse border border-orange-500">
              <thead className="bg-blue-100">
                <tr>
                  <th
                    className="border border-gray-300 px-4 font-bold border-l-4 border-l-green-400"
                    colSpan={2}
                  >
                    خط رانش
                  </th>
                  {khatRaneshList
                    .filter(
                      (ranesh) =>
                        ranesh.Active !== false && ranesh.FIdDPipe === 1,
                    )
                    .map((ranesh) => (
                      <th
                        key={ranesh.IdRanesh}
                        className="border border-gray-300 px-4 font-normal border-l-4 border-l-green-400"
                        colSpan={ranesh.FIdSePu === 1 ? 5 : 4}
                      >
                        {ranesh.RaneshName}
                      </th>
                    ))}
                </tr>
                {/* سطر "دبی پمپ" */}
                <tr>
                  <th
                    className="border border-gray-300 px-4 font-bold border-l-4 border-l-green-400"
                    colSpan={2}
                  >
                    دبی پمپ
                  </th>
                  {khatRaneshList
                    .filter(
                      (ranesh) =>
                        ranesh.Active !== false && ranesh.FIdDPipe === 1,
                    )
                    .map((ranesh) => (
                      <th
                        key={ranesh.IdRanesh}
                        className="border border-gray-300 px-4 font-normal border-l-4 border-l-green-400"
                        style={{fontWeight: 300}}
                        colSpan={ranesh.FIdSePu === 1 ? 5 : 4}
                        dir="ltr"
                      >
                        {ranesh.FIdSePu === 1
                          ? `${ranesh.DebiPomp} L/S`
                          : `${ranesh.Zarfiat} L/S`}
                      </th>
                    ))}
                </tr>
                <tr>
                  <th className="border border-gray-300 px-1 py-0.3 font-bold">
                    روز
                  </th>
                  <th className="border border-gray-300 px-1 py-0.3 font-bold border-l-4 border-l-green-400">
                    تاریخ
                  </th>
                  {khatRaneshList
                    .filter(
                      (ranesh) =>
                        ranesh.Active !== false && ranesh.FIdDPipe === 1,
                    )
                    .map((ranesh) => (
                      <React.Fragment key={ranesh.IdRanesh}>
                        {ranesh.FIdSePu === 1 && (
                          <th className="border border-gray-300 px-1 py-0.3 font-bold border-r-4 border-r-green-400">
                            تعداد
                          </th>
                        )}
                        <th className="border border-gray-300 px-0.5 py-0.3 font-bold">
                          دبی
                        </th>
                        <th className="border border-gray-300 px-4 py-0.3 font-bold">
                          شروع
                        </th>
                        <th className="border border-gray-300 px-4 py-0.3 font-bold">
                          پایان
                        </th>
                        <th className="border border-gray-300 px-1 py-0.3 font-bold border-l-4 border-l-green-400">
                          مدت
                        </th>
                      </React.Fragment>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {records.map((record, index) => (
                  <tr
                    key={record.IdTarDor}
                    className={`${index % 2 === 0 ? 'bg-green-100' : 'bg-white'}`}
                  >
                    <td className="border border-gray-300 px-1 py-0.3">
                      {toPersianDate(record.Trikh, 'dddd')}
                    </td>
                    <td className="border border-gray-300 px-1 py-0.3 font-bold border-l-4 border-l-green-400">
                      {toPersianDate(record.Trikh, 'YYYY/MM/DD')}
                    </td>
                    {khatRaneshList
                      .filter(
                        (ranesh) =>
                          ranesh.Active !== false && ranesh.FIdDPipe === 1,
                      )
                      .map((ranesh) => {
                        const raneshInfo =
                          pumpData[record.IdTarDor]?.[ranesh.IdRanesh];
                        const fromValue =
                          timeValues[record.IdTarDor]?.[ranesh.IdRanesh]
                            ?.from ||
                          (raneshInfo?.Shorooe
                            ? new Date(raneshInfo.Shorooe)
                                .toISOString()
                                .slice(11, 16)
                            : '');
                        const toValue =
                          timeValues[record.IdTarDor]?.[ranesh.IdRanesh]?.to ||
                          (raneshInfo?.Paian
                            ? new Date(raneshInfo.Paian)
                                .toISOString()
                                .slice(11, 16)
                            : '');

                        const durationMinutes =
                          fromValue && toValue
                            ? (() => {
                                const [fromHours, fromMinutes] = fromValue
                                  .split(':')
                                  .map(Number);
                                const [toHours, toMinutes] = toValue
                                  .split(':')
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
                          <React.Fragment key={ranesh.IdRanesh}>
                            {ranesh.FIdSePu === 1 && (
                              <td className="border border-gray-300 px-1 py-0.3">
                                {selectedPumpCounts[record.IdTarDor]?.[
                                  ranesh.IdRanesh
                                ] ||
                                  raneshInfo?.Tedad ||
                                  0}
                              </td>
                            )}
                            <td className="border border-gray-300 px-1 py-0.3">
                              {ranesh.FIdSePu === 2
                                ? selectedZarfiat[record.IdTarDor]?.[
                                    ranesh.IdRanesh
                                  ] ||
                                  raneshInfo?.Zarfiat ||
                                  0
                                : (raneshInfo?.Tedad || 0) *
                                  (khatRaneshList.find(
                                    (khat) => khat.IdRanesh === ranesh.IdRanesh,
                                  )?.DebiPomp || 0)}
                            </td>
                            <td className="border border-gray-300 px-1 py-0.3">
                              {fromValue || '-'}
                            </td>
                            <td className="border border-gray-300 px-1 py-0.3">
                              {toValue || '-'}
                            </td>
                            <td className="border border-gray-300 px-1 py-0.3 border-l-4 border-l-green-400">
                              {durationMinutes
                                ? `${Math.floor(durationMinutes / 60)
                                    .toString()
                                    .padStart(2, '0')}:${(durationMinutes % 60)
                                    .toString()
                                    .padStart(2, '0')}`
                                : '-'}
                            </td>
                          </React.Fragment>
                        );
                      })}
                  </tr>
                ))}
                {/* سطرهای "حجم درخواستی"، "حجم پیش‌بینی" و "اضافه درخواست" */}
                <tr className="bg-yellow-100 font-semibold">
                  <td
                    className="border border-gray-300 px-4 py-0.3 font-bold border-l-4 border-l-green-400 text-xs"
                    colSpan={2}
                  >
                    حجم درخواستی
                  </td>
                  {khatRaneshList
                    .filter(
                      (ranesh) =>
                        ranesh.Active !== false && ranesh.FIdDPipe === 1,
                    )
                    .map((ranesh) => {
                      const totalWaterVolume = records.reduce((sum, record) => {
                        const pumpInfo = pumpData[record.IdTarDor];
                        const raneshInfo = pumpInfo?.[ranesh.IdRanesh];

                        if (!raneshInfo) return sum;

                        const debi =
                          ranesh.FIdSePu === 2
                            ? Number(raneshInfo?.Zarfiat ?? 0)
                            : (raneshInfo?.Tedad ?? 0) *
                              (khatRaneshList.find(
                                (khat) => khat.IdRanesh === ranesh.IdRanesh,
                              )?.DebiPomp ?? 0);

                        const fromValue =
                          timeValues[record.IdTarDor]?.[ranesh.IdRanesh]
                            ?.from ||
                          (raneshInfo.Shorooe
                            ? new Date(raneshInfo.Shorooe)
                                .toISOString()
                                .slice(11, 16)
                            : '');
                        const toValue =
                          timeValues[record.IdTarDor]?.[ranesh.IdRanesh]?.to ||
                          (raneshInfo.Paian
                            ? new Date(raneshInfo.Paian)
                                .toISOString()
                                .slice(11, 16)
                            : '');

                        if (fromValue && toValue) {
                          const [fromHours, fromMinutes] = fromValue
                            .split(':')
                            .map(Number);
                          const [toHours, toMinutes] = toValue
                            .split(':')
                            .map(Number);
                          let durationMinutes =
                            toHours * 60 +
                            toMinutes -
                            (fromHours * 60 + fromMinutes);
                          if (durationMinutes <= 0) durationMinutes += 1440;
                          const durationHours = durationMinutes / 60;
                          return sum + debi * durationHours * 3.6;
                        }
                        return sum;
                      }, 0);

                      return (
                        <td
                          key={ranesh.IdRanesh}
                          className="border border-gray-300 px-4 py-0.3 text-center font-bold border-l-4 border-l-green-400 text-xs"
                          colSpan={ranesh.FIdSePu === 1 ? 5 : 4}
                        >
                          {totalWaterVolume
                            .toFixed(1)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </td>
                      );
                    })}
                </tr>
                <tr className="bg-gray-200 font-bold">
                  <td
                    className="border border-gray-300 px-4 py-0.3 font-bold border-l-4 border-l-green-400 text-xs"
                    colSpan={2}
                  >
                    حجم پیش‌بینی
                  </td>
                  {khatRaneshList
                    .filter(
                      (ranesh) =>
                        ranesh.Active !== false && ranesh.FIdDPipe === 1,
                    )
                    .map((ranesh) => (
                      <td
                        key={ranesh.IdRanesh}
                        className="border border-gray-300 px-4 py-0.3 text-center font-semibold border-l-4 border-l-green-400 text-xs"
                        colSpan={ranesh.FIdSePu === 1 ? 5 : 4}
                      >
                        {finalVolumes[ranesh.IdRanesh] !== undefined
                          ? finalVolumes[ranesh.IdRanesh]
                              .toFixed(1)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : '-'}
                      </td>
                    ))}
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td
                    className="border border-gray-300 px-4 py-0.3 font-bold border-l-4 border-l-green-400 text-xs"
                    colSpan={2}
                  >
                    اضافه درخواست
                  </td>
                  {khatRaneshList
                    .filter(
                      (ranesh) =>
                        ranesh.Active !== false && ranesh.FIdDPipe === 1,
                    )
                    .map((ranesh) => {
                      const totalWaterVolume = records.reduce((sum, record) => {
                        const pumpInfo = pumpData[record.IdTarDor];
                        const raneshInfo = pumpInfo?.[ranesh.IdRanesh];

                        if (!raneshInfo) return sum;

                        const debi =
                          ranesh.FIdSePu === 2
                            ? Number(raneshInfo?.Zarfiat ?? 0)
                            : (raneshInfo?.Tedad ?? 0) *
                              (khatRaneshList.find(
                                (khat) => khat.IdRanesh === ranesh.IdRanesh,
                              )?.DebiPomp ?? 0);

                        const fromValue =
                          timeValues[record.IdTarDor]?.[ranesh.IdRanesh]
                            ?.from ||
                          (raneshInfo.Shorooe
                            ? new Date(raneshInfo.Shorooe)
                                .toISOString()
                                .slice(11, 16)
                            : '');
                        const toValue =
                          timeValues[record.IdTarDor]?.[ranesh.IdRanesh]?.to ||
                          (raneshInfo.Paian
                            ? new Date(raneshInfo.Paian)
                                .toISOString()
                                .slice(11, 16)
                            : '');

                        if (fromValue && toValue) {
                          const [fromHours, fromMinutes] = fromValue
                            .split(':')
                            .map(Number);
                          const [toHours, toMinutes] = toValue
                            .split(':')
                            .map(Number);
                          let durationMinutes =
                            toHours * 60 +
                            toMinutes -
                            (fromHours * 60 + fromMinutes);
                          if (durationMinutes <= 0) durationMinutes += 1440;
                          const durationHours = durationMinutes / 60;
                          return sum + debi * durationHours * 3.6;
                        }
                        return sum;
                      }, 0);

                      const predictedVolume =
                        finalVolumes[ranesh.IdRanesh] ?? 0;
                      const extraRequest = totalWaterVolume - predictedVolume;
                      const bgColor =
                        extraRequest > 0 ? 'bg-red-100' : 'bg-gray-100';
                      const textColor =
                        extraRequest > 0 ? 'text-red-700' : 'text-black';

                      return (
                        <td
                          key={ranesh.IdRanesh}
                          className={`border border-gray-300 px-4 py-0.3 text-center ${bgColor} ${textColor} border-l-4 border-l-green-400 text-xs`}
                          colSpan={ranesh.FIdSePu === 1 ? 5 : 4}
                        >
                          {extraRequest
                            .toFixed(1)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </td>
                      );
                    })}
                </tr>
              </tbody>
            </table>
            <div className="flex mt-4">
              {/* کادر سمت راست */}
              <div className="flex-1 border border-gray-300 p-4 relative h-32">
                <div className="absolute top-2 right-2 text-sm text-gray-600">
                  نماینده شرکت آب منطقه ای/ تعاونی روستایی :
                </div>
              </div>

              {/* کادر سمت چپ */}
              <div className="flex-1 border border-gray-300 p-4 relative h-32">
                <div className="absolute top-2 right-2 text-sm text-gray-600">
                  نماینده دستگاه اجرایی (آب نیرو/ عمراب) :
                </div>
              </div>
            </div>
          </div>
        </ModalPDF>
      )}

      {/* Div 6: تایید نهایی و ارسال */}
      <div className="p-4 border border-gray-300 rounded-lg flex-[0.4] min-w-[110px]">
        <div className="font-bold mb-2">تایید نهایی</div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id="final-approval"
            disabled={isFileNameNahaeeNull}
          />
          <label htmlFor="final-approval">تایید نهایی</label>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 ${
              isFileNameNahaeeNull ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isFileNameNahaeeNull}
            onClick={handleFinalApprovalSubmit}
          >
            ارسال
          </button>
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

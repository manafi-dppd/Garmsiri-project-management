/* eslint-disable @next/next/no-img-element */
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
import Image from 'next/image';

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
  TaeedNahaee: boolean;
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
  const [isWaterPowerSubmitted, setIsWaterPowerSubmitted] = useState(false); // وضعیت ارسال "آب نیرو"
  const [isFinalFileUploaded, setIsFinalFileUploaded] = useState(false); // وضعیت بارگذاری فایل نهایی
  const [isFinalApprovalSubmitted, setIsFinalApprovalSubmitted] =
    useState(false); // وضعیت ارسال "تایید نهایی"
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

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
    setIsSubmitButtonDisabled(true);
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
    } finally {
      setIsSubmitButtonDisabled(false);
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
      setIsWaterPowerSubmitted(true);
      setIsWaterPowerSubmitDisabled(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
    } catch (error) {
      console.error('Error updating TaeedProgram:', error);
    }
  };

  const handleFinalApprovalSubmit = async () => {
    try {
      await updateTaeedProgram('updateFinalApproval', {
        idPumpStation,
        sal,
        mah,
        dahe,
        firstName,
        lastName,
      });
      setIsFinalApprovalSubmitted(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
    } catch (error) {
      console.error('Error updating TaeedProgram:', error);
    }
  };

  const handleSave = async () => {
    setIsSaveButtonDisabled(true);
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
      setIsSaveButtonDisabled(false);
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
    } finally {
      setIsSaveButtonDisabled(false);
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
  // تابع برای مدیریت آپلود فایل
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/bmp',
    ];
    if (!allowedTypes.includes(file.type)) {
      alert(
        'فرمت فایل مجاز نیست. لطفا یک فایل با فرمت PDF، JPG، JPEG، PNG یا BMP انتخاب کنید.',
      );
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('idPumpStation', idPumpStation.toString());
    formData.append('sal', sal.toString());
    formData.append('mah', mah.toString());
    formData.append('dahe', dahe.toString());
    try {
      const response = await fetch('/api/uploadFinalFile', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('فایل با موفقیت آپلود شد.');
        setIsFinalFileUploaded(true);
        // بروزرسانی وضعیت UI یا انجام عملیات دیگر پس از آپلود موفق
      } else {
        alert('خطا در آپلود فایل.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('خطا در آپلود فایل.');
    }
  };

  const handleDownloadFile = async () => {
    try {
      // ایجاد URL برای درخواست دانلود فایل
      const url = `/api/downloadFinalFile?idPumpStation=${idPumpStation}&sal=${sal}&mah=${mah}&dahe=${dahe}`;

      // ارسال درخواست GET به API
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      // دریافت فایل به صورت blob
      const blob = await response.blob();

      // دریافت نام فایل از هدر Content-Disposition
      const contentDisposition = response.headers.get('Content-Disposition');
      let fileName = `final_file_${sal}_${mah}_${dahe}`; // نام پیش‌فرض

      if (contentDisposition && contentDisposition.includes('filename=')) {
        // استخراج نام فایل از هدر Content-Disposition
        fileName = contentDisposition
          .split('filename=')[1]
          .split(';')[0]
          .replace(/['"]/g, ''); // حذف کوتیشن‌ها
      }

      // ایجاد لینک دانلود
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName); // استفاده از نام فایل استخراج شده
      document.body.appendChild(link);
      link.click();

      // حذف لینک از DOM
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('خطا در دانلود فایل.');
    }
  };

  const [isFinalApprovalChecked, setIsFinalApprovalChecked] = useState(
    taedProgramData?.TaeedNahaee ?? false,
  );

  useEffect(() => {
    setIsFinalApprovalChecked(taedProgramData?.TaeedNahaee ?? false);
  }, [taedProgramData]);
  // تابع برای تغییر وضعیت چک‌باکس
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFinalApprovalChecked(event.target.checked);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4 overflow-x-auto">
      {/* Div 1: درخواست کننده */}
      <div className="w-full sm:w-auto p-4 border border-gray-300 rounded-lg flex-grow min-w-[150px] max-w-[200px] relative mb-4 sm:mb-0">
        <div className="font-bold mb-2">درخواست کننده</div>
        <div className="flex flex-col xl:flex-row gap-2 mb-2">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => handleOpenModal('requester')}
          >
            توضیحات
          </button>
          {!getIsReadOnly('requester') && (
            <button
              className={`px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 ${
                isSaveButtonDisabled ||
                isFormDisabled ||
                isFormFilled ||
                (!isTarikhErsalNull && isTaedAbMantagheTrue)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={
                isSaveButtonDisabled ||
                isFormDisabled ||
                isFormFilled ||
                (!isTarikhErsalNull && isTaedAbMantagheTrue)
              }
              onClick={handleSave}
            >
              {isSaveButtonDisabled ? 'ذخیره...' : 'ذخیره'}
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
      <div className="w-full sm:w-auto p-4 border border-gray-300 rounded-lg flex-grow min-w-[150px] max-w-[200px] relative mb-4 sm:mb-0">
        <div className="font-bold mb-2">آب منطقه‌ای</div>
        <div className="flex flex-col xl:flex-row gap-2 mb-2">
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
        <div className="flex flex-col xl:flex-row gap-2 mb-2">
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
      <div className="w-full sm:w-auto p-4 border border-gray-300 rounded-lg flex-grow min-w-[150px] max-w-[200px] relative mb-4 sm:mb-0">
        <div className="font-bold mb-2">پیمانکار پمپاژ</div>
        <div className="flex flex-col xl:flex-row gap-2 mb-2">
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
        <div className="flex flex-col xl:flex-row gap-2 mb-2">
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
      </div>

      {/* Div 4: آب نیرو */}
      <div className="w-full sm:w-auto p-4 border border-gray-300 rounded-lg flex-grow min-w-[150px] max-w-[200px] relative mb-4 sm:mb-0">
        <div className="font-bold mb-2">آب نیرو</div>
        <div className="flex flex-col xl:flex-row gap-2 mb-2">
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
        <div className="flex flex-col xl:flex-row gap-2 mb-2">
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
      <div className="w-full sm:w-auto px-4 border border-gray-300 rounded-lg flex-grow min-w-[150px] max-w-[200px] flex items-center justify-center h-full mb-4 sm:mb-0">
        <div className="w-full text-center">
          <div className="font-bold mb-2">فایل‌های نهایی</div>
          <div className="flex flex-col gap-2">
            <button
              className={`w-full px-4 py-1.5 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
                isTaedAbNirooTrue || isWaterPowerSubmitted
                  ? ''
                  : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!isTaedAbNirooTrue && !isWaterPowerSubmitted}
              onClick={handleGeneratePDF}
            >
              پیش نمایش
            </button>
            <button
              className={`w-full px-4 py-1.5 text-white bg-green-500 rounded-md hover:bg-green-600 ${
                (isTaedAbNirooTrue || isWaterPowerSubmitted) &&
                !isFinalApprovalSubmitted &&
                !taedProgramData?.TaeedNahaee
                  ? ''
                  : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={
                (!isTaedAbNirooTrue && !isWaterPowerSubmitted) ||
                isFinalApprovalSubmitted ||
                taedProgramData?.TaeedNahaee
              }
              onClick={() => {
                document.getElementById('file-input')?.click();
              }}
            >
              بارگذاری فایل نهایی
            </button>
            <input
              id="file-input"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.bmp"
              style={{display: 'none'}}
              onChange={handleFileUpload}
            />
            <button
              className={`w-full px-4 py-1.5 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 ${
                isFileNameNahaeeNull && !isFinalFileUploaded
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={isFileNameNahaeeNull && !isFinalFileUploaded}
              onClick={() => {
                handleDownloadFile();
              }}
            >
              دریافت فایل نهایی
            </button>
          </div>
        </div>
      </div>

      {/* مودال برای نمایش PDF */}
      {isPdfModalOpen && (
        <ModalPDF
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
        >
          <div className="px-4 bg-white w-[297mm] max-h-[80vh] overflow-auto landscape">
            <div className="relative">
              {/* لوگو */}
              <Image
                src="/Untitled.png"
                alt="Logo"
                width={64}
                height={64}
                className="absolute top-2 left-2"
              />
              {/* تاریخ در کنار لوگو و هم‌تراز با لبه پایینی آن */}
              <div className="absolute top-11 left-20 flex items-center gap-2 pl-6">
                {' '}
                {/* left-20 برای فاصله از لوگو */}
                <span className="text-sm text-gray-600">تاریخ:</span>
                <span className="text-sm text-gray-600">
                  {toPersianDate(new Date().toISOString(), 'YYYY/MM/DD')}
                </span>
              </div>
            </div>
            <div className="top-2 right-2 font-IranNastaliq text-2xl text-gray-600 pb-2 pr-2">
              شرکت سهامی آب منطقه ای کرمانشاه
            </div>

            {/* نمایش مقادیر HeaderForm */}
            <div className="flex flex-wrap gap-4 mb-1">
              {/* <div className="flex items-center gap-1">
                <label className="font-semibold text-sm">شبکه آبیاری:</label>
                <span>{networkName}</span>
              </div> */}
              <div
                className="flex items-center gap-1 text-lg font-b-zar font-bold mb-1"
                style={{textRendering: 'optimizeLegibility'}}
              >
                <span>برنامه آبیاری</span>
                <span>
                  دهه {dahe === 1 ? 'اول ' : dahe === 2 ? 'دوم ' : 'سوم '}
                </span>
                <span>{convertMahToPersian(mah)}</span>
                {(() => {
                  const isLastCharNumber = /\d$/.test(pumpStationName);
                  return isLastCharNumber ? (
                    <span>
                      <span>{pumpStationName.slice(0, -1)}</span>
                      <span className="ml-1">{pumpStationName.slice(-1)}</span>
                    </span>
                  ) : (
                    <span>{pumpStationName}</span>
                  );
                })()}
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
            <table
              className="w-full border-collapse border border-orange-500"
              style={{fontSize: '12px'}}
            >
              <thead className="bg-blue-100">
                <tr>
                  <th
                    className="border border-gray-300 px-4 font-bold border-l-4 border-l-green-400 align-top h-6"
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
                        className="border border-gray-300 px-4 border-l-4 border-l-green-400 align-top h-6 text-center"
                        colSpan={ranesh.FIdSePu === 1 ? 5 : 4}
                        style={{direction: 'ltr'}}
                      >
                        {ranesh.RaneshName}
                      </th>
                    ))}
                </tr>
                {/* سطر "دبی پمپ" */}
                <tr>
                  <th
                    className="border border-gray-300 px-4 font-bold border-l-4 border-l-green-400 align-top h-6"
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
                        className="border border-gray-300 px-4 font-bold border-l-4 border-l-green-400 text-center align-top h-6"
                        // style={{fontWeight: 300}}
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
                  <th className="border border-gray-300 px-1 py-0.3 font-bold align-top h-6">
                    روز
                  </th>
                  <th className="border border-gray-300 px-1 py-0.3 font-bold border-l-4 border-l-green-400 text-center align-top h-6">
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
                          <th className="border px-1 py-0.3 font-bold border-r-4 text-center align-top h-6">
                            تعداد
                          </th>
                        )}
                        <th className="border border-gray-300 px-0.5 py-0.3 font-bold text-center align-top h-6">
                          دبی
                        </th>
                        <th className="border border-gray-300 px-4 py-0.3 font-bold text-center align-top h-6">
                          شروع
                        </th>
                        <th className="border border-gray-300 px-4 py-0.3 font-bold text-center align-top h-6">
                          پایان
                        </th>
                        <th className="border px-1 py-0.3 font-bold border-l-4 border-l-green-400 text-center align-top h-6">
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
                    className={`${index % 2 === 0 ? 'bg-green-100' : 'bg-white'} h-7`}
                  >
                    <td className="border border-gray-300 px-1 py-0.3 align-top">
                      {toPersianDate(record.Trikh, 'dddd')}
                    </td>
                    <td className="border border-gray-300 px-1 py-0.3 font-bold border-l-4 border-l-green-400 text-center align-top">
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
                              <td className="border border-gray-300 px-1 py-0.3 text-center align-top">
                                {selectedPumpCounts[record.IdTarDor]?.[
                                  ranesh.IdRanesh
                                ] ||
                                  raneshInfo?.Tedad ||
                                  0}
                              </td>
                            )}
                            <td className="border border-gray-300 px-1 py-0.3 text-center align-top">
                              {ranesh.FIdSePu === 2
                                ? selectedZarfiat[record.IdTarDor]?.[
                                    ranesh.IdRanesh
                                  ] ||
                                  raneshInfo?.Zarfiat ||
                                  0
                                : (
                                    (raneshInfo?.Tedad || 0) *
                                    (khatRaneshList.find(
                                      (khat) =>
                                        khat.IdRanesh === ranesh.IdRanesh,
                                    )?.DebiPomp || 0)
                                  ).toFixed(1)}
                            </td>
                            <td className="border border-gray-300 px-1 py-0.3 text-center align-top">
                              {fromValue || '-'}
                            </td>
                            <td className="border border-gray-300 px-1 py-0.3 text-center align-top">
                              {toValue || '-'}
                            </td>
                            <td className="border border-gray-300 px-1 py-0.3 border-l-4 border-l-green-400 text-center align-top">
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
                    className="border border-gray-300 px-4 py-0.3 font-bold border-l-4 border-l-green-400 text-xs h-6 align-top"
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
                          className="border border-gray-300 px-4 py-0.3 text-center font-bold border-l-4 border-l-green-400 text-xs align-top h-6"
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
                    className="border border-gray-300 px-4 py-0.3 font-bold border-l-4 border-l-green-400 text-xs align-top h-6"
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
                        className="border border-gray-300 px-4 py-0.3 text-center font-semibold border-l-4 border-l-green-400 text-xs h-6 align-top"
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
                    className="border border-gray-300 px-4 py-0.3 font-bold border-l-4 border-l-green-400 text-xs h-6 align-top"
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
                          className={`border border-gray-300 px-4 py-0.3 text-center ${bgColor} ${textColor} border-l-4 border-l-green-400 text-xs align-top h-6`}
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
              <div
                className="flex-1 border border-gray-300 p-3 relative"
                style={{height: '10vh'}}
              >
                <div className="absolute top-0 right-2 text-xs text-gray-600">
                  نماینده شرکت آب منطقه ای/ تعاونی روستایی :
                </div>
              </div>

              {/* کادر سمت چپ */}
              <div
                className="flex-1 border border-gray-300 p-3 relative"
                style={{height: '10vh'}}
              >
                <div className="absolute top-0 right-2 text-xs text-gray-600">
                  نماینده دستگاه اجرایی (آب نیرو/ عمراب) :
                </div>
              </div>
            </div>
          </div>
        </ModalPDF>
      )}

      {/* Div 6: تایید نهایی و ارسال */}
      <div className="w-full sm:w-auto p-4 border border-gray-300 rounded-lg flex-grow min-w-[150px] max-w-[200px] relative mb-4 sm:mb-0">
        <div className="font-bold mb-2">تایید نهایی</div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id="final-approval"
            disabled={
              (!isFinalFileUploaded && isFileNameNahaeeNull) ||
              isFinalApprovalSubmitted ||
              taedProgramData?.TaeedNahaee
            }
            checked={
              isFinalApprovalChecked || (taedProgramData?.TaeedNahaee ?? false)
            }
            onChange={handleCheckboxChange}
          />
          <label htmlFor="final-approval">تایید نهایی</label>
        </div>
        {!getIsReadOnly('waterPower') && (
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 ${
                (!isFinalFileUploaded && isFileNameNahaeeNull) ||
                isFinalApprovalSubmitted ||
                !isFinalApprovalChecked ||
                taedProgramData?.TaeedNahaee
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={
                (!isFinalFileUploaded && isFileNameNahaeeNull) ||
                isFinalApprovalSubmitted ||
                !isFinalApprovalChecked ||
                taedProgramData?.TaeedNahaee
              }
              onClick={handleFinalApprovalSubmit}
            >
              ارسال
            </button>
          </div>
        )}
        {/* نام در گوشه سمت راست پایین */}
        {(taedProgramData?.FirstNTaeedNahaee &&
          taedProgramData?.LastNTaeedNahaee) ||
        isFinalApprovalSubmitted ? (
          <div className="text-xs italic text-gray-500 absolute bottom-1 right-2">
            {isFinalApprovalSubmitted
              ? `${firstName} ${lastName}`
              : `${taedProgramData?.FirstNTaeedNahaee} ${taedProgramData?.LastNTaeedNahaee}`}
          </div>
        ) : null}

        {/* تاریخ در گوشه سمت چپ پایین */}
        {taedProgramData?.TarikhTaeedNahaee || isFinalApprovalSubmitted ? (
          <div className="text-xs italic text-gray-500 absolute bottom-1 left-2">
            {isFinalApprovalSubmitted
              ? currentDateTime
              : taedProgramData?.TarikhTaeedNahaee &&
                formatDateTime(taedProgramData.TarikhTaeedNahaee)}
          </div>
        ) : null}
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

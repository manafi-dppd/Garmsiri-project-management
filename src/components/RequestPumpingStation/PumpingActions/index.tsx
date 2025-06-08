import * as React from "react";
import { useEffect, useState } from "react";
import { validatePumpingData } from "../utils/validationUtils";
import { KhatRanesh, RecordType, PumpingData } from "../types";
import { convertMahToPersian } from "../PaginationForMah";
import { formatLocalDateTime } from "../../../utils/dateUtils";
import Modal from "./Modal";
import ModalPDF from "./ModalPDF";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import ViewFinalFileModal from "./ViewFinalFileModal";
import CorrectionModal from "./CorrectionModal";

interface TaeedProgramData {
  firstnersal: string;
  lastnersal: string;
  tarikhersal: string;
  taedabmantaghe: boolean | null;
  taedpeymankar: boolean | null;
  taedabniroo: boolean | null;
  filenamenahaee: boolean;
  firstnabmantaghe: string;
  lastnabmantaghe: string;
  tarikhabmantaghe: string;
  firstnpeymankar: string;
  lastnpeymankar: string;
  tarikhpeymankar: string;
  firstnabniroo: string;
  lastnabniroo: string;
  tarikhabniroo: string;
  tarikhfilenahee: string;
  firstntaeednahaee: string;
  lastntaeednahaee: string;
  tarikhtaeednahaee: string;
  taeednahaee: boolean;
  toziheslah: string;
}

interface PumpingActionsProps {
  onSave: () => void;
  isFormFilled: boolean;
  setValidationErrors: (
    errors: { date: string; raneshName: string; message: string }[]
  ) => void;
  sal: number;
  mah: number;
  dahe: number;
  taedProgramData: TaeedProgramData | null;
  firstName: string;
  lastName: string;
  networkName: string;
  pumpStationName: string;
  idPumpStation: number;
  saleZeraee: string;
  doreKesht: string;
  khatRaneshList: KhatRanesh[];
  records: RecordType[];
  pumpData: { [idTarDor: number]: { [idRanesh: number]: PumpingData } };
  selectedPumpCounts: { [key: number]: { [date: string]: number } };
  timeValues: {
    [key: number]: { [key: number]: { from: string; to: string } };
  };
  finalVolumes: { [key: number]: number };
  isFormDisabled: boolean;
  selectedZarfiat: { [key: number]: { [key: number]: number } };
  networkTrustee: string | null;
  isSaving: boolean;
  setIsSaving: (value: boolean) => void;
  isFiddaheValid: boolean;
  disabled: boolean;
  userRole: string[];
  onReset?: () => void;
  setSelectedZarfiat: React.Dispatch<
    React.SetStateAction<{ [key: number]: { [key: number]: number } }>
  >;
  userName: string;
  selectedNetworkId: number | null;
  idShDo: number;
}

interface SuccessAlertProps {
  message: React.ReactNode;
  onClose: () => void;
}

const PumpingActions: React.FC<PumpingActionsProps> = ({
  onSave,
  // isFormFilled,
  setValidationErrors,
  sal,
  mah,
  dahe,
  taedProgramData,
  firstName,
  lastName,
  networkName,
  pumpStationName,
  idPumpStation,
  saleZeraee,
  doreKesht,
  khatRaneshList,
  records,
  pumpData,
  selectedPumpCounts,
  timeValues,
  finalVolumes,
  // isFormDisabled,
  selectedZarfiat,
  networkTrustee,
  isSaving,
  setIsSaving,
  isFiddaheValid,
  userRole,
}) => {
  const [modalContent, setModalContent] = useState<{ [key: string]: string }>(
    {}
  );
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSavedRegionalWater, setIsSavedRegionalWater] = useState(false);
  const [isSavedPumpingContractor, setIsSavedPumpingContractor] =
    useState(false);
  const [isSavedWaterPower, setIsSavedWaterPower] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isWaterPowerSubmitted, setIsWaterPowerSubmitted] = useState(false);
  const [isFinalFileUploaded, setIsFinalFileUploaded] = useState(false);
  const [isFinalApprovalSubmitted, setIsFinalApprovalSubmitted] =
    useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>("");
  const [isViewFileModalOpen, setIsViewFileModalOpen] = useState(false);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [isRegionalWaterSubmitDisabled, setIsRegionalWaterSubmitDisabled] =
    useState(false);
  const [
    isPumpingContractorSubmitDisabled,
    setIsPumpingContractorSubmitDisabled,
  ] = useState(false);
  const [isWaterPowerSubmitDisabled, setIsWaterPowerSubmitDisabled] =
    useState(false);

  // بررسی وضعیت‌ها بر اساس نام فیلدهای کوچک شده
  const isTarikhErsalNull = taedProgramData?.tarikhersal === null;
  const isTaedAbMantagheTrue = taedProgramData?.taedabmantaghe === true;
  const isTaedAbNirooTrue = taedProgramData?.taedabniroo === true;
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [isTaedPeymankarSavedInDB, setIsTaedPeymankarSavedInDB] =
    useState(false);
  const isFileNameNahaeeNullOrEmpty =
    taedProgramData?.filenamenahaee === null ||
    (typeof taedProgramData?.filenamenahaee === "string" &&
      taedProgramData.filenamenahaee === "");

  const handleGeneratePDF = () => {
    setIsPdfModalOpen(true);
  };

  const [taedAbMantaghe, setTaedAbMantaghe] = useState<boolean | null>(
    taedProgramData?.taedabmantaghe ?? null
  );
  const [taedPeymankar, setTaedPeymankar] = useState<boolean | null>(
    taedProgramData?.taedpeymankar ?? null
  );
  const [taedAbNiroo, setTaedAbNiroo] = useState<boolean | null>(
    taedProgramData?.taedabniroo ?? null
  );
  const [isPeymankarApprovedInDB, setIsPeymankarApprovedInDB] = useState(false);
  const [isAbNirooApprovedInDB, setIsAbNirooApprovedInDB] = useState(false);
  const showPumpingContractor = networkTrustee !== "AbMantaghei";
  const showWaterPower = networkTrustee !== "AbMantaghei";
  const isPdfButtonEnabled =
    networkTrustee === "AbMantaghei"
      ? isTaedAbMantagheTrue || isSavedRegionalWater
      : isTaedAbNirooTrue || isWaterPowerSubmitted;

  const handleTaedAbMantagheChange = (value: boolean) => {
    setTaedAbMantaghe(value);
  };

  const handleTaedPeymankarChange = (value: boolean) => {
    setTaedPeymankar(value);
  };

  const handleTaedAbNirooChange = (value: boolean) => {
    setTaedAbNiroo(value);
  };

  useEffect(() => {
    if (taedProgramData) {
      setTaedAbMantaghe(
        typeof taedProgramData.taedabmantaghe === "boolean"
          ? taedProgramData.taedabmantaghe
          : null
      );
      setTaedPeymankar(
        typeof taedProgramData.taedpeymankar === "boolean"
          ? taedProgramData.taedpeymankar
          : null
      );
      setIsTaedPeymankarSavedInDB(taedProgramData.taedpeymankar === true);
      setTaedAbNiroo(
        typeof taedProgramData.taedabniroo === "boolean"
          ? taedProgramData.taedabniroo
          : null
      );
      setIsPeymankarApprovedInDB(taedProgramData.taedpeymankar === true);
      setIsAbNirooApprovedInDB(taedProgramData.taedabniroo === true);
    }
  }, [taedProgramData]);

  const handleRegionalWaterSubmit = async () => {
    if (
      taedAbMantaghe === false &&
      !modalContent[`${sal}-${mah}-${dahe}-regionalWater`]
    ) {
      alert("در صورت رد برنامه ارائه توضیحات الزامی است");
      return;
    }

    try {
      const response = await fetch("/api/updateRegionalWater", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idPumpStation: idPumpStation,
          sal: sal,
          mah: mah,
          dahe: dahe,
          firstName: firstName,
          lastName: lastName,
          tozihAbMantaghe:
            modalContent[`${sal}-${mah}-${dahe}-regionalWater`] || null,
          taedAbMantaghe: taedAbMantaghe,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        throw new Error(errorData.error || "Failed to update");
      }

      // اگر دکمه رادیویی "تایید" انتخاب شده باشد، دکمه "ارسال" را disable کنید
      if (taedAbMantaghe === true) {
        setIsRegionalWaterSubmitDisabled(true);
      }
      setIsSavedRegionalWater(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
      alert("اطلاعات با موفقیت ذخیره شد");
    } catch (error) {
      console.error("Error updating TaeedProgram:", error);
      alert("خطا در ذخیره‌سازی اطلاعات");
    }
  };

  const handlePumpingContractorSubmit = async () => {
    if (
      taedPeymankar === false &&
      !modalContent[`${sal}-${mah}-${dahe}-pumpingContractor`]
    ) {
      alert("در صورت رد برنامه ارائه توضیحات الزامی است");
      return;
    }

    try {
      const response = await fetch("/api/updatePumpingContractor", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idPumpStation: idPumpStation,
          sal: sal,
          mah: mah,
          dahe: dahe,
          firstName: firstName,
          lastName: lastName,
          tozihPeymankar:
            modalContent[`${sal}-${mah}-${dahe}-pumpingContractor`] || null,
          taedPeymankar: taedPeymankar,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        throw new Error(errorData.error || "Failed to update");
      }

      // اگر دکمه رادیویی "تایید" انتخاب شده باشد، دکمه "ارسال" را disable کنید
      if (taedPeymankar === true) {
        setIsPumpingContractorSubmitDisabled(true);
      }
      setIsSavedPumpingContractor(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
      alert("اطلاعات با موفقیت ذخیره شد");
    } catch (error) {
      console.error("Error updating TaeedProgram:", error);
      alert("خطا در ذخیره‌سازی اطلاعات");
    }
  };

  const handleWaterPowerSubmit = async () => {
    if (
      taedAbNiroo === false &&
      !modalContent[`${sal}-${mah}-${dahe}-waterPower`]
    ) {
      alert("در صورت رد برنامه ارائه توضیحات الزامی است");
      return;
    }

    try {
      const response = await fetch("/api/updateWaterPower", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idPumpStation: idPumpStation,
          sal: sal,
          mah: mah,
          dahe: dahe,
          firstName: firstName,
          lastName: lastName,
          tozihAbNiroo:
            modalContent[`${sal}-${mah}-${dahe}-waterPower`] || null,
          taedAbNiroo: taedAbNiroo,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        throw new Error(errorData.error || "Failed to update");
      }

      if (taedAbNiroo === true) {
        setIsWaterPowerSubmitDisabled(true);
      }
      setIsSavedWaterPower(true);
      setIsWaterPowerSubmitted(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
      alert("اطلاعات با موفقیت ذخیره شد");
    } catch (error) {
      console.error("Error updating TaeedProgram:", error);
      alert("خطا در ذخیره‌سازی اطلاعات");
    }
  };

  const handleFinalApprovalSubmit = async () => {
    try {
      if (!firstName || !lastName) {
        alert("لطفا نام و نام خانوادگی را وارد کنید");
        return;
      }

      const response = await fetch("/api/updateFinalApproval", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idpumpstation: idPumpStation, // تغییر نام فیلد به idpumpstation
          sal: sal,
          mah: mah,
          dahe: dahe,
          firstname: firstName,
          lastname: lastName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update");
      }

      setIsFinalApprovalSubmitted(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
      alert("تایید نهایی با موفقیت ثبت شد");
    } catch (error) {
      console.error("Error updating TaeedProgram:", error);
      alert(
        `خطا در ثبت تایید نهایی: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };
  const daheText = `دهه ${dahe === 1 ? "اول" : dahe === 2 ? "دوم" : "سوم"}`;
  const mahText = convertMahToPersian(mah);
  function SuccessAlert({ message, onClose }: SuccessAlertProps) {
    return (
      <div
        className="animate-fade-in fixed right-4 top-4 z-50 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <div className="flex items-center gap-2 rounded-lg border border-green-400 bg-green-100 px-4 py-3 text-green-700 shadow-lg">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <span>{message}</span>
        </div>
      </div>
    );
  }
  const handleSave = async () => {
    setIsSaving(true);
    setIsSaveButtonDisabled(true);
    setValidationErrors([]);

    const newErrors = validatePumpingData(
      records,
      khatRaneshList,
      pumpData,
      selectedPumpCounts,
      selectedZarfiat,
      timeValues
    );

    if (newErrors.length > 0) {
      setValidationErrors(newErrors);
      setIsSaveButtonDisabled(false);
      return;
    }

    try {
      for (const record of records) {
        for (const ranesh of khatRaneshList) {
          const raneshInfo = pumpData[record.idtardor]?.[ranesh.idranesh];
          const timeValue = timeValues[record.idtardor]?.[ranesh.idranesh];
          const selectedPumpCount =
            selectedPumpCounts[record.idtardor]?.[ranesh.idranesh] ?? 0;
          const zarfiatValue =
            selectedZarfiat[record.idtardor]?.[ranesh.idranesh] ?? 0;

          // جایگزینی مقادیر ویرایش شده در raneshInfo
          const updatedRaneshInfo = {
            ...raneshInfo,
            Tedad:
              selectedPumpCount !== undefined
                ? selectedPumpCount
                : raneshInfo?.tedad,
            Zarfiat:
              zarfiatValue !== undefined ? zarfiatValue : raneshInfo?.zarfiat,
            Shorooe:
              timeValue?.from !== undefined
                ? timeValue.from
                : raneshInfo?.shorooe,
            Paian:
              timeValue?.to !== undefined ? timeValue.to : raneshInfo?.paian,
          };
          const isValidTime = (time: string | undefined) => {
            if (!time) return true;
            return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
          };

          // در حلقه بروزرسانی داده‌ها
          if (
            updatedRaneshInfo.Shorooe &&
            !isValidTime(updatedRaneshInfo.Shorooe)
          ) {
            alert(
              `فرمت زمان شروع برای خط رانش ${ranesh.raneshname} نامعتبر است`
            );
            return;
          }

          if (
            updatedRaneshInfo.Paian &&
            !isValidTime(updatedRaneshInfo.Paian)
          ) {
            alert(
              `فرمت زمان پایان برای خط رانش ${ranesh.raneshname} نامعتبر است`
            );
            return;
          }
          if (ranesh.fidsepu === 1) {
            const response = await fetch("/api/updateBahrebardairProgram", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                IdRanesh: ranesh.idranesh,
                IdTarDor: record.idtardor,
                Tedad: updatedRaneshInfo.Tedad,
                Shorooe: updatedRaneshInfo.Shorooe,
                Paian: updatedRaneshInfo.Paian,
              }),
            });

            if (!response.ok) {
              console.error("Update failed:", await response.json());
              throw new Error("Failed to update bahrebardairprogram");
            }
          } else if (ranesh.fidsepu === 2) {
            await fetch("/api/updateBahrebardairProgramSeghli", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                IdRanesh: ranesh.idranesh,
                IdTarDor: record.idtardor,
                Zarfiat: updatedRaneshInfo.Zarfiat,
                Shorooe: updatedRaneshInfo.Shorooe,
                Paian: updatedRaneshInfo.Paian,
              }),
            });
          }
        }
      }

      // بروزرسانی TaeedProgram
      await fetch("/api/updateTaeedProgram", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fidpumpsta: idPumpStation,
          sal: sal,
          mah: mah,
          dahe: dahe,
          firstnersal: firstName,
          lastnersal: lastName,
          tozihersal: modalContent[`${sal}-${mah}-${dahe}-requester`] || "",
        }),
      });
      setAlertMessage(
        <span>
          اطلاعات <span className="font-bold text-green-800">{daheText}</span>{" "}
          <span className="font-bold text-green-800">{mahText}</span> ماه
          ایستگاه پمپاژ{" "}
          <span className="font-bold text-green-800">{pumpStationName}</span> با
          موفقیت ذخیره شد
        </span>
      );
      setIsSaved(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
      onSave(); // اگر onSave async است از await استفاده کنید
      setShowAlert(true);

      // مخفی کردن Alert بعد از 5 ثانیه
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error) {
      console.error("Failed to save data:", error);
    } finally {
      setIsSaving(false);
      setIsSaveButtonDisabled(false);
    }
  };

  const handleModalSave = (key: string, content: string) => {
    setModalContent((prev) => ({ ...prev, [key]: content }));
    setOpenModal(null);
  };

  const getIsReadOnly = (modalKey: string) => {
    switch (modalKey) {
      case "requester":
        return !userRole.some((role) =>
          [
            "Website Creator",
            "Website Admin",
            "Ezgele Water Users Representative",
            "Jegiran Water Users Representative",
            "Northern Zahab Water Users Representative",
            "Southern Zahab Water Users Representative",
            "Hoomeh Qaraviz Water Users Representative",
            "Beshiveh Water Users Representative",
            "Ghaleh Shahin Water Users Representative",
            "Water Users Representative South Jagarlu",
          ].includes(role)
        );
      case "regionalWater":
        return !userRole.some((role) =>
          [
            "Website Creator",
            "Website Admin",
            "Regional Water Representative",
          ].includes(role)
        );
      case "pumpingContractor":
        return !userRole.some((role) =>
          [
            "Website Creator",
            "Website Admin",
            "Supervisor of the First Pumping Set",
            "Supervisor of the Second Pumping Set",
          ].includes(role)
        );
      case "waterPower":
        return !userRole.some((role) =>
          ["Website Creator", "Website Admin", "Operation Manager"].includes(
            role
          )
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
    let field = "";
    switch (modalType) {
      case "requester":
        field = "tozihersal";
        break;
      case "regionalWater":
        field = "tozihabmantaghe";
        break;
      case "pumpingContractor":
        field = "tozihpeymankar";
        break;
      case "waterPower":
        field = "tozihabniroo";
        break;
      default:
        return;
    }
    try {
      const response = await fetch("/api/getExplanationProgram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          [modalKey]: "خطا در دریافت اطلاعات",
        }));
      }
    } catch (error) {
      console.error("Error fetching modal data:", error);
      setModalContent((prev) => ({
        ...prev,
        [modalKey]: "خطا در دریافت اطلاعات",
      }));
    }

    // باز کردن مودال پس از دریافت مقدار
    setOpenModal(modalKey);
  };

  const convertToFinglish = (persianText: string) => {
    const persianMap: Record<string, string> = {
      ا: "a",
      آ: "a",
      ب: "b",
      پ: "p",
      ت: "t",
      ث: "s",
      ج: "j",
      چ: "ch",
      ح: "h",
      خ: "kh",
      د: "d",
      ذ: "z",
      ر: "r",
      ز: "z",
      ژ: "zh",
      س: "s",
      ش: "sh",
      ص: "s",
      ض: "z",
      ط: "t",
      ظ: "z",
      ع: "a",
      غ: "gh",
      ف: "f",
      ق: "gh",
      ک: "k",
      گ: "g",
      ل: "l",
      م: "m",
      ن: "n",
      و: "v",
      ه: "eh",
      ی: "y",
      " ": "_",
    };

    return persianText
      .split("")
      .map((char) => persianMap[char] || char)
      .join("")
      .replace(/[^\w-]/g, "");
  };

  // تابع handleFileUpload را با این کد جایگزین کنید:
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/bmp",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert(
        "فرمت فایل مجاز نیست. لطفا یک فایل با فرمت PDF، JPG، JPEG، PNG یا BMP انتخاب کنید."
      );
      return;
    }

    // ساخت نام فایل جدید
    const currentDate = new Date();
    const year = currentDate.getFullYear(); // سال میلادی
    const finglishPumpName = convertToFinglish(pumpStationName);
    const fileExtension = file.name.split(".").pop();
    const newFileName = `${finglishPumpName}_${mah}_${dahe}_${year}.${fileExtension}`;
    // ایجاد FormData و ارسال به سرور
    const formData = new FormData();
    formData.append("file", file, newFileName); // استفاده از نام جدید برای فایل
    formData.append("idPumpStation", idPumpStation.toString());
    formData.append("sal", sal.toString());
    formData.append("mah", mah.toString());
    formData.append("dahe", dahe.toString());

    try {
      const response = await fetch("/api/uploadFinalFile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("فایل با موفقیت آپلود شد.");
        setIsFinalFileUploaded(true);
      } else {
        alert("خطا در آپلود فایل.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("خطا در آپلود فایل.");
    }
  };

  const handleDownloadFile = async () => {
    try {
      const url = `/api/downloadFinalFile?idPumpStation=${idPumpStation}&sal=${sal}&mah=${mah}&dahe=${dahe}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      let fileName = `final_file_${sal}_${mah}_${dahe}`;

      if (contentDisposition && contentDisposition.includes("filename=")) {
        fileName = contentDisposition
          .split("filename=")[1]
          .split(";")[0]
          .replace(/['"]/g, "");
      }

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("خطا در دریافت فایل.");
    }
  };

  const [isFinalApprovalChecked, setIsFinalApprovalChecked] = useState(
    taedProgramData?.taeednahaee ?? false
  );

  useEffect(() => {
    setIsFinalApprovalChecked(taedProgramData?.taeednahaee ?? false);
  }, [taedProgramData]);
  // تابع برای تغییر وضعیت چک‌باکس
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFinalApprovalChecked(event.target.checked);
  };

  const handleViewFile = async () => {
    try {
      const url = `/api/downloadFinalFile?idPumpStation=${idPumpStation}&sal=${sal}&mah=${mah}&dahe=${dahe}&preview=true`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setFilePreviewUrl(objectUrl);
      setIsViewFileModalOpen(true);
    } catch (error) {
      console.error("Error viewing file:", error);
      alert("خطا در مشاهده فایل.");
    }
  };

  const getModalTitle = (modalKey: string) => {
    const modalType = modalKey.split("-")[3];
    switch (modalType) {
      case "requester":
        return "درخواست کننده";
      case "regionalWater":
        return "آب منطقه‌ای";
      case "pumpingContractor":
        return "پیمانکار پمپاژ";
      case "waterPower":
        return "آب نیرو";
      default:
        return "";
    }
  };

  return (
    <div className={isSaving ? "opacity-50" : ""}>
      <div
        className={`
    mt-4 grid gap-4
    grid-cols-2  // همیشه 2 ستونه در موبایل
    ${
      networkTrustee !== "AbMantaghei"
        ? "lg:grid-cols-6" // 6 ستونه در دسکتاپ اگر آب منطقه‌ای نیست
        : "lg:grid-cols-4" // 4 ستونه در دسکتاپ اگر آب منطقه‌ای است
    }
  `}
      >
        {/* Div 1: درخواست کننده */}
        <div className="relative rounded-lg border border-gray-300 p-4">
          <div className="mb-2 font-bold">درخواست کننده</div>
          <div className="mb-2 flex flex-col gap-2 xl:flex-row">
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={() => handleOpenModal("requester")}
            >
              توضیحات
            </button>
            {!getIsReadOnly("requester") && (
              <button
                className={`rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 ${
                  isTaedAbMantagheTrue ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={isTaedAbMantagheTrue}
                onClick={handleSave}
              >
                {isSaveButtonDisabled || isSaving ? (
                  <span className="flex items-center justify-center gap-2">
                    {/* <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white"></span> */}
                    منتظر بمانید...
                  </span>
                ) : (
                  "ذخیره"
                )}
                {showAlert && (
                  <SuccessAlert
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                  />
                )}
              </button>
            )}
          </div>
          {/* نام و زمان درخواست کننده */}
          {(taedProgramData?.firstnersal && taedProgramData?.lastnersal) ||
          isSaved ? (
            <div className="absolute bottom-1 right-2 text-xs italic text-gray-500">
              {isSaved
                ? `${firstName} ${lastName}`
                : `${taedProgramData?.firstnersal} ${taedProgramData?.lastnersal}`}
            </div>
          ) : null}
          {taedProgramData?.tarikhersal || isSaved ? (
            <div className="absolute bottom-1 left-2 text-xs italic text-gray-500">
              {isSaved
                ? currentDateTime
                : taedProgramData?.tarikhersal &&
                  new Intl.DateTimeFormat("fa-IR", {
                    timeZone: "Asia/Tehran",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                    .format(new Date(taedProgramData.tarikhersal))
                    .replace(/،/g, " - ")}
            </div>
          ) : null}
        </div>

        {/* Div 2: آب منطقه‌ای */}
        <div className="relative rounded-lg border border-gray-300 p-4">
          <div className="mb-2 font-bold">آب منطقه‌ای</div>
          <div className="mb-2 flex flex-col gap-2 xl:flex-row">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="region-water"
                value="approve"
                disabled={
                  getIsReadOnly("regionalWater") ||
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
                  getIsReadOnly("regionalWater") ||
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
          <div className="mb-2 flex flex-col gap-2 xl:flex-row">
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={() => handleOpenModal("regionalWater")}
            >
              توضیحات
            </button>
            {!getIsReadOnly("regionalWater") && (
              <button
                className={`rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 ${
                  isTaedAbMantagheTrue ||
                  isTarikhErsalNull ||
                  taedAbMantaghe === null ||
                  isRegionalWaterSubmitDisabled
                    ? "cursor-not-allowed opacity-50"
                    : ""
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
          {(taedProgramData?.firstnabmantaghe &&
            taedProgramData?.lastnabmantaghe) ||
          isSavedRegionalWater ? (
            <div className="absolute bottom-1 right-2 text-xs italic text-gray-500">
              {isSavedRegionalWater
                ? `${firstName} ${lastName}`
                : `${taedProgramData?.firstnabmantaghe} ${taedProgramData?.lastnabmantaghe}`}
            </div>
          ) : null}
          {taedProgramData?.tarikhabmantaghe || isSavedRegionalWater ? (
            <div className="absolute bottom-1 left-2 text-xs italic text-gray-500">
              {isSavedRegionalWater
                ? currentDateTime
                : taedProgramData?.tarikhabmantaghe &&
                  new Intl.DateTimeFormat("fa-IR", {
                    timeZone: "Asia/Tehran",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                    .format(new Date(taedProgramData.tarikhabmantaghe))
                    .replace(/،/g, " - ")}
            </div>
          ) : null}
        </div>

        {/* Div 3: پیمانکار پمپاژ */}
        {showPumpingContractor && (
          <div className="relative rounded-lg border border-gray-300 p-4">
            <div className="mb-2 font-bold">پیمانکار پمپاژ</div>
            <div className="mb-2 flex flex-col gap-2 xl:flex-row">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="contractor"
                  value="approve"
                  disabled={
                    getIsReadOnly("pumpingContractor") ||
                    !isTaedAbMantagheTrue ||
                    isPumpingContractorSubmitDisabled ||
                    isTaedPeymankarSavedInDB // ✅ فقط اگر از پایگاه‌داده تایید شده باشد
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
                    getIsReadOnly("pumpingContractor") ||
                    !isTaedAbMantagheTrue ||
                    isPumpingContractorSubmitDisabled ||
                    isTaedPeymankarSavedInDB // ✅ فقط اگر از پایگاه‌داده تایید شده باشد
                  }
                  checked={taedPeymankar === false}
                  onChange={() => handleTaedPeymankarChange(false)}
                />
                رد
              </label>
            </div>
            <div className="mb-2 flex flex-col gap-2 xl:flex-row">
              <button
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => handleOpenModal("pumpingContractor")}
              >
                توضیحات
              </button>
              {!getIsReadOnly("pumpingContractor") && (
                <button
                  className={`rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 ${
                    taedPeymankar === null ||
                    !isTaedAbMantagheTrue ||
                    isPumpingContractorSubmitDisabled ||
                    isTaedPeymankarSavedInDB
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  disabled={
                    taedPeymankar === null ||
                    !isTaedAbMantagheTrue ||
                    isPumpingContractorSubmitDisabled ||
                    isTaedPeymankarSavedInDB // ✅ فقط اگر قبلاً ذخیره شده باشد، غیر فعال شود
                  }
                  onClick={handlePumpingContractorSubmit}
                >
                  ارسال
                </button>
              )}
            </div>
            {/* نام و زمان پیمانکار پمپاژ */}
            {(taedProgramData?.firstnpeymankar &&
              taedProgramData?.lastnpeymankar) ||
            isSavedPumpingContractor ? (
              <div className="absolute bottom-1 right-2 text-xs italic text-gray-500">
                {isSavedPumpingContractor
                  ? `${firstName} ${lastName}`
                  : `${taedProgramData?.firstnpeymankar} ${taedProgramData?.lastnpeymankar}`}
              </div>
            ) : null}
            {taedProgramData?.tarikhpeymankar || isSavedPumpingContractor ? (
              <div className="absolute bottom-1 left-2 text-xs italic text-gray-500">
                {isSavedPumpingContractor
                  ? currentDateTime
                  : taedProgramData?.tarikhpeymankar &&
                    new Intl.DateTimeFormat("fa-IR", {
                      timeZone: "Asia/Tehran",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                      .format(new Date(taedProgramData.tarikhpeymankar))
                      .replace(/،/g, " - ")}
              </div>
            ) : null}
          </div>
        )}

        {/* Div 4: آب نیرو */}
        {showWaterPower && (
          <div className="relative rounded-lg border border-gray-300 p-4">
            <div className="mb-2 font-bold">آب نیرو</div>
            <div className="mb-2 flex flex-col gap-2 xl:flex-row">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="water-power"
                  value="approve"
                  disabled={
                    getIsReadOnly("waterPower") ||
                    isTaedAbNirooTrue ||
                    isWaterPowerSubmitDisabled ||
                    !isPeymankarApprovedInDB ||
                    isAbNirooApprovedInDB
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
                    getIsReadOnly("waterPower") ||
                    isTaedAbNirooTrue ||
                    isWaterPowerSubmitDisabled ||
                    !isPeymankarApprovedInDB ||
                    isAbNirooApprovedInDB
                  }
                  checked={taedAbNiroo === false}
                  onChange={() => handleTaedAbNirooChange(false)}
                />
                رد
              </label>
            </div>
            <div className="mb-2 flex flex-col gap-2 xl:flex-row">
              <button
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => handleOpenModal("waterPower")}
              >
                توضیحات
              </button>
              {!getIsReadOnly("waterPower") && (
                <button
                  className={`rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 ${
                    taedAbNiroo === null ||
                    isWaterPowerSubmitDisabled ||
                    isAbNirooApprovedInDB
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  disabled={
                    taedAbNiroo === null ||
                    isWaterPowerSubmitDisabled ||
                    isAbNirooApprovedInDB
                  }
                  onClick={handleWaterPowerSubmit}
                >
                  ارسال
                </button>
              )}
            </div>
            {/* نام و زمان آب نیرو */}
            {(taedProgramData?.firstnabniroo &&
              taedProgramData?.lastnabniroo) ||
            isSavedWaterPower ? (
              <div className="absolute bottom-1 right-2 text-xs italic text-gray-500">
                {isSavedWaterPower
                  ? `${firstName} ${lastName}`
                  : `${taedProgramData?.firstnabniroo} ${taedProgramData?.lastnabniroo}`}
              </div>
            ) : null}
            {taedProgramData?.tarikhabniroo || isSavedWaterPower ? (
              <div className="absolute bottom-1 left-2 text-xs italic text-gray-500">
                {isSavedWaterPower
                  ? currentDateTime
                  : taedProgramData?.tarikhabniroo &&
                    new Intl.DateTimeFormat("fa-IR", {
                      timeZone: "Asia/Tehran",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                      .format(new Date(taedProgramData.tarikhabniroo))
                      .replace(/،/g, " - ")}
              </div>
            ) : null}
          </div>
        )}
        {/* Div 5: دریافت PDF و بارگذاری فایل نهایی */}
        <div className="flex h-full items-center justify-center rounded-lg border border-gray-300 px-4">
          <div className="w-full text-center">
            <div className="mb-2 font-bold">فایل‌های نهایی</div>
            <div className="flex flex-col gap-2">
              <button
                className={`w-full rounded-md bg-blue-500 px-4 py-1.5 text-white hover:bg-blue-600 ${
                  isPdfButtonEnabled ? "" : "cursor-not-allowed opacity-50"
                }`}
                disabled={
                  (networkTrustee === "AbMantaghei" &&
                    taedAbMantaghe !== true) ||
                  !isPdfButtonEnabled
                }
                onClick={handleGeneratePDF}
              >
                پیش نمایش
              </button>
              <button
                className={`w-full rounded-md bg-green-500 px-4 py-1.5 text-white hover:bg-green-600 ${
                  (networkTrustee !== "AbMantaghei" ||
                    isSavedRegionalWater ||
                    isTaedAbMantagheTrue) &&
                  (networkTrustee === "AbMantaghei" ||
                    isTaedAbNirooTrue ||
                    isWaterPowerSubmitted) &&
                  !isFinalApprovalSubmitted &&
                  !taedProgramData?.taeednahaee &&
                  !taedProgramData?.filenamenahaee
                    ? ""
                    : "cursor-not-allowed opacity-50"
                }`}
                disabled={
                  (networkTrustee === "AbMantaghei" &&
                    !isSavedRegionalWater &&
                    !isTaedAbMantagheTrue) ||
                  (networkTrustee !== "AbMantaghei" &&
                    !isTaedAbNirooTrue &&
                    !isWaterPowerSubmitted) ||
                  isFinalApprovalSubmitted ||
                  taedProgramData?.taeednahaee ||
                  taedProgramData?.filenamenahaee
                }
                onClick={() => {
                  document.getElementById("file-input")?.click();
                }}
              >
                بارگذاری فایل نهایی
              </button>
              <input
                id="file-input"
                type="file"
                accept=".jpg,.jpeg,.png,.bmp"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <button
                className={`w-full rounded-md bg-yellow-500 px-4 py-1.5 text-white hover:bg-yellow-600 ${
                  isFileNameNahaeeNullOrEmpty && !isFinalFileUploaded
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                disabled={isFileNameNahaeeNullOrEmpty && !isFinalFileUploaded}
                onClick={handleViewFile}
              >
                مشاهده فایل نهایی
              </button>
              <ViewFinalFileModal
                isOpen={isViewFileModalOpen}
                onClose={() => {
                  setIsViewFileModalOpen(false);
                  if (filePreviewUrl) {
                    URL.revokeObjectURL(filePreviewUrl);
                    setFilePreviewUrl(null);
                  }
                }}
                onDownload={handleDownloadFile}
                fileUrl={filePreviewUrl}
              />
            </div>
          </div>
        </div>

        {/* مودال برای نمایش PDF */}
        {isPdfModalOpen && (
          <ModalPDF
            isOpen={isPdfModalOpen}
            onClose={() => setIsPdfModalOpen(false)}
            khatRaneshList={khatRaneshList}
            records={records}
            pumpData={pumpData}
            selectedPumpCounts={selectedPumpCounts}
            selectedZarfiat={selectedZarfiat}
            timeValues={timeValues}
            finalVolumes={finalVolumes}
            dahe={dahe}
            mah={mah}
            pumpStationName={pumpStationName}
            networkName={networkName}
            saleZeraee={saleZeraee}
            doreKesht={doreKesht}
          />
        )}

        {/* Div 6: تایید نهایی و ارسال */}
        <div className="relative rounded-lg border border-gray-300 p-4">
          {/* <div className="mb-2 font-bold">تایید نهایی</div> */}
          <div className="mb-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="final-approval"
              disabled={
                (networkTrustee === "AbMantaghei" &&
                  getIsReadOnly("regionalWater")) ||
                (networkTrustee !== "AbMantaghei" &&
                  getIsReadOnly("waterPower")) ||
                (!isFinalFileUploaded && isFileNameNahaeeNullOrEmpty) ||
                isFinalApprovalSubmitted ||
                taedProgramData?.taeednahaee
              }
              checked={
                isFinalApprovalChecked ||
                (taedProgramData?.taeednahaee ?? false)
              }
              onChange={handleCheckboxChange}
            />
            <label htmlFor="final-approval">تایید نهایی</label>
          </div>
          {networkTrustee === "AbMantaghei"
            ? !getIsReadOnly("regionalWater") && (
                <div className="flex gap-2">
                  <button
                    className={`w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 ${
                      (!isFinalFileUploaded && isFileNameNahaeeNullOrEmpty) ||
                      isFinalApprovalSubmitted ||
                      !isFinalApprovalChecked ||
                      taedProgramData?.taeednahaee
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    disabled={
                      (!isFinalFileUploaded && isFileNameNahaeeNullOrEmpty) ||
                      isFinalApprovalSubmitted ||
                      !isFinalApprovalChecked ||
                      taedProgramData?.taeednahaee
                    }
                    onClick={handleFinalApprovalSubmit}
                  >
                    ارسال
                  </button>
                </div>
              )
            : !getIsReadOnly("waterPower") && (
                <div className="flex gap-2">
                  <button
                    className={`w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 ${
                      (!isFinalFileUploaded && isFileNameNahaeeNullOrEmpty) ||
                      isFinalApprovalSubmitted ||
                      !isFinalApprovalChecked ||
                      taedProgramData?.taeednahaee
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    disabled={
                      (!isFinalFileUploaded && isFileNameNahaeeNullOrEmpty) ||
                      isFinalApprovalSubmitted ||
                      !isFinalApprovalChecked ||
                      taedProgramData?.taeednahaee
                    }
                    onClick={handleFinalApprovalSubmit}
                  >
                    ارسال
                  </button>
                </div>
              )}

          {((((networkTrustee !== "AbMantaghei" &&
            !getIsReadOnly("waterPower")) ||
            (networkTrustee === "AbMantaghei" &&
              !getIsReadOnly("regionalWater"))) &&
            (taedProgramData?.taeednahaee || taedProgramData?.toziheslah) &&
            isFiddaheValid) ||
            (!(
              (networkTrustee !== "AbMantaghei" &&
                !getIsReadOnly("waterPower")) ||
              (networkTrustee === "AbMantaghei" &&
                !getIsReadOnly("regionalWater"))
            ) &&
              taedProgramData?.toziheslah &&
              isFiddaheValid)) && (
            <div className="mt-2">
              <button
                className="w-full rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                onClick={() => setIsCorrectionModalOpen(true)}
              >
                اصلاحیه
              </button>
            </div>
          )}
          {/* نام در گوشه سمت راست پایین */}
          {(taedProgramData?.firstntaeednahaee &&
            taedProgramData?.lastntaeednahaee) ||
          isFinalApprovalSubmitted ? (
            <div className="absolute bottom-1 right-2 text-xs italic text-gray-500">
              {isFinalApprovalSubmitted
                ? `${firstName} ${lastName}`
                : `${taedProgramData?.firstntaeednahaee} ${taedProgramData?.lastntaeednahaee}`}
            </div>
          ) : null}

          {/* تاریخ در گوشه سمت چپ پایین */}
          {taedProgramData?.tarikhtaeednahaee || isFinalApprovalSubmitted ? (
            <div className="absolute bottom-1 left-2 text-xs italic text-gray-500">
              {isFinalApprovalSubmitted
                ? currentDateTime
                : taedProgramData?.tarikhtaeednahaee &&
                  new Intl.DateTimeFormat("fa-IR", {
                    timeZone: "Asia/Tehran",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                    .format(new Date(taedProgramData.tarikhtaeednahaee))
                    .replace(/،/g, " - ")}
            </div>
          ) : null}
        </div>

        {/* Modal */}
        {openModal && (
          <Modal
            isOpen={!!openModal}
            onClose={() => setOpenModal(null)}
            title={`توضیحات ${getModalTitle(openModal)}`}
            size="md"
          >
            <textarea
              className="w-full rounded-md border border-gray-300 p-2"
              style={{ height: "200px" }}
              value={modalContent[openModal] || ""}
              onChange={(e) => {
                const newContent = { ...modalContent };
                newContent[openModal] = e.target.value;
                setModalContent(newContent);
              }}
              readOnly={getIsReadOnly(openModal.split("-")[3])}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400"
                onClick={() => setOpenModal(null)}
              >
                بستن
              </button>
              {!getIsReadOnly(openModal.split("-")[3]) && isFiddaheValid && (
                <button
                  className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  onClick={() => {
                    if (modalContent[openModal]) {
                      handleModalSave(openModal, modalContent[openModal]);
                    }
                    setOpenModal(null);
                  }}
                >
                  ذخیره
                </button>
              )}
            </div>
          </Modal>
        )}
      </div>
      <CorrectionModal
        isOpen={isCorrectionModalOpen}
        onClose={() => setIsCorrectionModalOpen(false)}
        initialText={taedProgramData?.toziheslah || ""}
        isEditable={
          taedProgramData?.taeednahaee === true &&
          ((networkTrustee !== "AbMantaghei" && !getIsReadOnly("waterPower")) ||
            (networkTrustee === "AbMantaghei" &&
              !getIsReadOnly("regionalWater")))
        }
        daheText={daheText}
        mahText={mahText}
        pumpStationName={pumpStationName}
        idPumpStation={idPumpStation}
        sal={sal}
        mah={mah}
        dahe={dahe}
      />
    </div>
  );
};

export default PumpingActions;

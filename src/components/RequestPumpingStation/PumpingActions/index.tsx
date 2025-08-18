import * as React from "react";
import { useEffect, useState } from "react";
import { validatePumpingData } from "../utils/validationUtils";
import { KhatRanesh, RecordType, PumpingData } from "../types";
import { convertMahToPersian } from "../PaginationForMah";
import {
  formatDateTimeForNonPersian,
  formatLocalDateTime,
} from "../../../utils/dateUtils";
import Modal from "./Modal";
import ModalPDF from "./ModalPDF";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import ViewFinalFileModal from "./ViewFinalFileModal";
import CorrectionModal from "./CorrectionModal";
import AlertModal from "../../AlertModal";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

interface TaeedProgramData {
  fiddahe?: number | null;
  fiddec?: number | null;
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
  showAlert?: (
    title: string,
    message: React.ReactNode,
    type?: "info" | "warning" | "success" | "error",
    buttons?: {
      text: string;
      variant: "primary" | "secondary" | "danger" | "success";
      onClick: () => void;
    }[]
  ) => void;
}

interface SuccessAlertProps {
  message: React.ReactNode;
  onClose: () => void;
}

const PumpingActions: React.FC<PumpingActionsProps> = ({
  onSave,
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
  selectedZarfiat,
  networkTrustee,
  isSaving,
  setIsSaving,
  isFiddaheValid,
  userRole,
}) => {
  const t = useTranslations("PumpingActions");
  const locale = useLocale();
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
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [isTaedPeymankarSavedInDB, setIsTaedPeymankarSavedInDB] =
    useState(false);
  const [isPeymankarApprovedInDB, setIsPeymankarApprovedInDB] = useState(false);
  const [isAbNirooApprovedInDB, setIsAbNirooApprovedInDB] = useState(false);

  const isTarikhErsalNull = taedProgramData?.tarikhersal === null;
  const isTaedAbMantagheTrue = taedProgramData?.taedabmantaghe === true;
  const isTaedAbNirooTrue = taedProgramData?.taedabniroo === true;
  const isFileNameNahaeeNullOrEmpty =
    taedProgramData?.filenamenahaee === null ||
    (typeof taedProgramData?.filenamenahaee === "string" &&
      taedProgramData.filenamenahaee === "");

  const showPumpingContractor = networkTrustee !== "AbMantaghei";
  const showWaterPower = networkTrustee !== "AbMantaghei";
  const isPdfButtonEnabled =
    networkTrustee === "AbMantaghei"
      ? isTaedAbMantagheTrue || isSavedRegionalWater
      : isTaedAbNirooTrue || isWaterPowerSubmitted;

  const [taedAbMantaghe, setTaedAbMantaghe] = useState<boolean | null>(
    taedProgramData?.taedabmantaghe ?? null
  );
  const [taedPeymankar, setTaedPeymankar] = useState<boolean | null>(
    taedProgramData?.taedpeymankar ?? null
  );
  const [taedAbNiroo, setTaedAbNiroo] = useState<boolean | null>(
    taedProgramData?.taedabniroo ?? null
  );

  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
    type: "info" | "warning" | "success" | "error";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "error",
  });

  // بررسی isFiddaheValid بر اساس locale
  const isFiddaheValidComputed = React.useMemo(() => {
    if (!taedProgramData) return false;
    const fidValue =
      locale === "fa" ? taedProgramData.fiddahe : taedProgramData.fiddec;
    console.log("[PumpingActions] Computing isFiddaheValid:", {
      locale,
      fiddahe: taedProgramData.fiddahe,
      fiddec: taedProgramData.fiddec,
      fidValue,
      currentFiddahe: taedProgramData.fiddahe || taedProgramData.fiddec,
    });
    return (
      fidValue != null &&
      fidValue >
        ((locale === "fa" ? taedProgramData.fiddahe : taedProgramData.fiddec) ||
          0) -
          20
    );
  }, [taedProgramData, locale]);

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

  const handleTaedAbMantagheChange = (value: boolean) => {
    setTaedAbMantaghe(value);
  };

  const handleTaedPeymankarChange = (value: boolean) => {
    setTaedPeymankar(value);
  };

  const handleTaedAbNirooChange = (value: boolean) => {
    setTaedAbNiroo(value);
  };

  // تعریف تابع handleGeneratePDF
  const handleGeneratePDF = () => {
    setIsPdfModalOpen(true);
  };

  const handleRegionalWaterSubmit = async () => {
    if (
      taedAbMantaghe === false &&
      !modalContent[`${sal}-${mah}-${dahe}-regionalWater`]
    ) {
      setAlertState({
        isOpen: true,
        title: t("title_error"),
        message: t("error_explanation_required"),
        type: "error",
      });
      return;
    }

    if (!taedProgramData) {
      setAlertState({
        isOpen: true,
        title: t("title_error"),
        message: t("error_program_data_missing"),
        type: "error",
      });
      return;
    }

    const fidValue =
      locale === "fa" ? taedProgramData.fiddahe : taedProgramData.fiddec;
    if (fidValue != null && fidValue > 1) {
      try {
        const response = await fetch("/api/checkPreviousDaheApproval", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idPumpStation,
            fiddahe: fidValue,
            locale: locale,
          }),
        });

        const { isApproved } = await response.json();

        if (!isApproved) {
          setAlertState({
            isOpen: true,
            title: t("title_error_confirmation"),
            message: t("error_previous_dahe_not_approved", {
              pumpStationName: pumpStationName,
            }),
            type: "error",
          });
          return;
        }
      } catch (error) {
        console.error("Error checking previous dahe approval:", error);
        setAlertState({
          isOpen: true,
          title: t("title_error"),
          message: t("error_checking_previous_dahe"),
          type: "error",
        });
        return;
      }
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
          locale: locale,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        throw new Error(errorData.error || "Failed to update");
      }

      if (taedAbMantaghe === true) {
        setIsRegionalWaterSubmitDisabled(true);
      }
      setIsSavedRegionalWater(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
      setAlertState({
        isOpen: true,
        title: t("title_success"),
        message: t("success_data_saved"),
        type: "success",
      });
    } catch (error) {
      console.error("Error updating TaeedProgram:", error);
      setAlertState({
        isOpen: true,
        title: t("title_error"),
        message: t("error_saving_data"),
        type: "error",
      });
      setIsSavedRegionalWater(false);
    }
  };

  const handlePumpingContractorSubmit = async () => {
    if (
      taedPeymankar === false &&
      !modalContent[`${sal}-${mah}-${dahe}-pumpingContractor`]
    ) {
      setAlertState({
        isOpen: true,
        title: t("title_error"),
        message: t("error_explanation_required"),
        type: "error",
      });
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
          locale: locale,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        throw new Error(errorData.error || "Failed to update");
      }

      if (taedPeymankar === true) {
        setIsPumpingContractorSubmitDisabled(true);
      }
      setIsSavedPumpingContractor(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
      setAlertState({
        isOpen: true,
        title: t("title_success"),
        message: t("success_data_saved"),
        type: "success",
      });
    } catch (error) {
      console.error("Error updating TaeedProgram:", error);
      setAlertState({
        isOpen: true,
        title: t("title_error"),
        message: t("error_saving_data"),
        type: "error",
      });
    }
  };

  const handleWaterPowerSubmit = async () => {
    if (
      taedAbNiroo === false &&
      !modalContent[`${sal}-${mah}-${dahe}-waterPower`]
    ) {
      setAlertState({
        isOpen: true,
        title: t("title_error"),
        message: t("error_explanation_required"),
        type: "error",
      });
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
          locale: locale,
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
      setAlertState({
        isOpen: true,
        title: t("title_success"),
        message: t("success_data_saved"),
        type: "success",
      });
    } catch (error) {
      console.error("Error updating TaeedProgram:", error);
      setAlertState({
        isOpen: true,
        title: t("title_error"),
        message: t("error_saving_data"),
        type: "error",
      });
    }
  };

  const handleFinalApprovalSubmit = async () => {
    try {
      if (!firstName || !lastName) {
        setAlertState({
          isOpen: true,
          title: t("title_error"),
          message: t("error_no_first_last_name"),
          type: "error",
        });
        return;
      }

      const response = await fetch("/api/updateFinalApproval", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idpumpstation: idPumpStation,
          sal: sal,
          mah: mah,
          dahe: dahe,
          firstname: firstName,
          lastname: lastName,
          locale: locale,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update");
      }

      setIsFinalApprovalSubmitted(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
      setAlertState({
        isOpen: true,
        title: t("title_success"),
        message: t("success_final_approval"),
        type: "success",
      });
    } catch (error) {
      console.error("Error updating TaeedProgram:", error);
      setAlertState({
        isOpen: true,
        title: t("title_error"),
        message: t("error_saving", {
          errorMessage: error instanceof Error ? error.message : String(error),
        }),
        type: "error",
      });
    }
  };

  const daheText =
    dahe === 1 ? t("first") : dahe === 2 ? t("second") : t("third");
  const mahText =
    locale === "fa" ? convertMahToPersian(mah) : t(`Months.month${mah}`);

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

  const checkPreviousDahe = async () => {
    if (!taedProgramData) {
      return true;
    }

    const fidValue =
      locale === "fa" ? taedProgramData.fiddahe : taedProgramData.fiddec;
    if (fidValue == null || fidValue <= 1) {
      return true;
    }

    try {
      const response = await fetch("/api/checkPreviousDahe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FIdPumpSta: idPumpStation,
          FidDahe: fidValue,
          locale: locale,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to check previous dahe");
      }

      const data = await response.json();
      return data.isPreviousSaved;
    } catch (error) {
      console.error("Error checking previous dahe:", error);
      return true;
    }
  };
  const formatTime = (time: string | undefined): string | undefined => {
    if (!time) return time;

    if (time.includes("T")) {
      try {
        const date = new Date(time);
        if (isNaN(date.getTime())) return undefined;
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      } catch {
        return undefined;
      }
    }
    if (time.match(/^\d{2}:\d{2}:\d{2}$/)) {
      return time.slice(0, 5);
    }
    return time;
  };
  const handleSave = async () => {
    const isPreviousSaved = await checkPreviousDahe();
    if (!isPreviousSaved) {
      setAlertState({
        isOpen: true,
        title: t("title_error_saving"),
        message: t("error_saving", {
          pumpStationName: pumpStationName,
        }),
        type: "error",
      });
      return;
    }

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

          // تعیین مقدار Tedad
          const tedad =
            selectedPumpCounts[record.idtardor]?.[ranesh.idranesh] !== undefined
              ? selectedPumpCounts[record.idtardor][ranesh.idranesh]
              : raneshInfo?.tedad ?? 0;

          // تعیین مقدار Zarfiat
          const zarfiat =
            selectedZarfiat[record.idtardor]?.[ranesh.idranesh] !== undefined
              ? selectedZarfiat[record.idtardor][ranesh.idranesh]
              : raneshInfo?.zarfiat ?? 0;

          // تعیین مقادیر زمان شروع و پایان
          const timeValue = timeValues[record.idtardor]?.[ranesh.idranesh];
          const shorooe =
            timeValue?.from !== undefined
              ? timeValue.from
              : raneshInfo?.shorooe
              ? new Date(raneshInfo.shorooe).toISOString().slice(11, 16)
              : "";

          const paian =
            timeValue?.to !== undefined
              ? timeValue.to
              : raneshInfo?.paian
              ? new Date(raneshInfo.paian).toISOString().slice(11, 16)
              : "";

          // فرمت کردن زمان‌ها
          const formattedShorooe = formatTime(shorooe || undefined);
          const formattedPaian = formatTime(paian || undefined);

          // اعتبارسنجی زمان‌ها
          const isValidTime = (time: string | undefined) => {
            if (!time) return true;
            return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
          };

          if (formattedShorooe && !isValidTime(formattedShorooe)) {
            setAlertState({
              isOpen: true,
              title: t("title_error"),
              message: t("error_invalid_start_time_format", {
                raneshName: ranesh.raneshname,
              }),
              type: "error",
            });
            return;
          }

          if (formattedPaian && !isValidTime(formattedPaian)) {
            setAlertState({
              isOpen: true,
              title: t("title_error"),
              message: t("error_invalid_end_time_format", {
                raneshName: ranesh.raneshname,
              }),
              type: "error",
            });
            return;
          }

          // ارسال به API مناسب بر اساس نوع رانش
          if (ranesh.fidsepu === 1) {
            const response = await fetch("/api/updateBahrebardairProgram", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                IdRanesh: ranesh.idranesh,
                IdTarDor: record.idtardor,
                Tedad: tedad,
                Shorooe: formattedShorooe,
                Paian: formattedPaian,
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
                Zarfiat: zarfiat,
                Shorooe: formattedShorooe,
                Paian: formattedPaian,
              }),
            });
          }
        }
      }

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
          locale: locale,
        }),
      });

      setAlertMessage(
        <span>
          {t("successfully_saved_decade", {
            daheText: daheText,
            mahText: mahText,
            pumpStationName,
          })}
        </span>
      );
      setIsSaved(true);
      setCurrentDateTime(formatLocalDateTime(new Date().toISOString()));
      onSave();
      setShowAlert(true);

      setTimeout(() => setShowAlert(false), 5000);
    } catch (error) {
      console.error("Failed to save data:", error);
      setIsSaved(false);
      setAlertState({
        isOpen: true,
        title: t("title_error"),
        message: t("error_saving_data", {
          errorMessage: error instanceof Error ? error.message : String(error),
        }),
        type: "error",
      });
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

    if (modalContent[modalKey]) {
      setOpenModal(modalKey);
      return;
    }

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
          locale,
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
          [modalKey]: t("fetchError"),
        }));
      }
    } catch (error) {
      console.error("Error fetching modal data:", error);
      setModalContent((prev) => ({
        ...prev,
        [modalKey]: t("fetchError"),
      }));
    }

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
      setAlertState({
        isOpen: true,
        title: t("title_error"),
        message: t("error_invalid_file_format"),
        type: "error",
      });
      return;
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const finglishPumpName = convertToFinglish(pumpStationName);
    const fileExtension = file.name.split(".").pop();
    const newFileName = `${finglishPumpName}_${mah}_${dahe}_${year}.${fileExtension}`;

    const formData = new FormData();
    formData.append("file", file, newFileName);
    formData.append("idPumpStation", idPumpStation.toString());
    formData.append("sal", sal.toString());
    formData.append("mah", mah.toString());
    formData.append("dahe", dahe.toString());
    formData.append("locale", locale.toString());

    try {
      const response = await fetch("/api/uploadFinalFile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setAlertState({
          isOpen: true,
          title: t("title_success"),
          message: t("success_file_uploaded"),
          type: "success",
        });
        setIsFinalFileUploaded(true);
      } else {
        setAlertState({
          isOpen: true,
          title: t("title_error"),
          message: t("error_file_upload"),
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setAlertState({
        isOpen: true,
        title: t("title_error"),
        message: t("error_file_upload"),
        type: "error",
      });
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
      setAlertState({
        isOpen: true,
        title: t("title_error"),
        message: t("error_file_download"),
        type: "error",
      });
    }
  };

  const [isFinalApprovalChecked, setIsFinalApprovalChecked] = useState(
    taedProgramData?.taeednahaee ?? false
  );

  useEffect(() => {
    setIsFinalApprovalChecked(taedProgramData?.taeednahaee ?? false);
  }, [taedProgramData]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFinalApprovalChecked(event.target.checked);
  };

  const handleViewFile = async () => {
    try {
      const url = `/api/downloadFinalFile?idPumpStation=${idPumpStation}&sal=${sal}&mah=${mah}&dahe=${dahe}&preview=true&locale=${locale}`;
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
      setAlertState({
        isOpen: true,
        title: t("title_error"),
        message: t("error_file_view"),
        type: "error",
      });
    }
  };

  const getModalTitle = (modalKey: string) => {
    const modalType = modalKey.split("-")[3];
    switch (modalType) {
      case "requester":
        return t("requester");
      case "regionalWater":
        return t("regionalWater");
      case "pumpingContractor":
        return t("pumpingContractor");
      case "waterPower":
        return t("powerWater");
      default:
        return "";
    }
  };

  return (
    <div className={isSaving ? "opacity-50" : ""}>
      <div
        className={`
    mt-4 grid gap-4
    grid-cols-2
    ${networkTrustee !== "AbMantaghei" ? "lg:grid-cols-6" : "lg:grid-cols-4"}
  `}
      >
        {/* Div 1: درخواست کننده */}
        <div className="relative rounded-lg border border-gray-300 p-4">
          <div className="mb-2 font-bold">{t("requester")}</div>
          <div className="mb-2 flex flex-col gap-2">
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={() => handleOpenModal("requester")}
            >
              {t("description")}
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
                    {t("wait")}
                  </span>
                ) : (
                  t("save")
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
          {(taedProgramData?.firstnersal && taedProgramData?.lastnersal) ||
          isSaved ? (
            <div
              className={`absolute bottom-1 text-xs italic text-gray-500 ${
                locale === "fa" || locale === "ar" ? "right-2" : "left-2"
              }`}
            >
              <span>✔</span>
              {isSaved
                ? `${firstName} ${lastName}`
                : `${taedProgramData?.firstnersal} ${taedProgramData?.lastnersal}`}
            </div>
          ) : null}
          {taedProgramData?.tarikhersal || isSaved ? (
            <div
              className={`absolute bottom-1 text-xs italic text-gray-500 ${
                locale === "fa" || locale === "ar" ? "left-2" : "right-2"
              }`}
            >
              {isSaved
                ? currentDateTime
                : locale === "fa"
                ? taedProgramData?.tarikhersal &&
                  new Intl.DateTimeFormat("fa-IR", {
                    timeZone: "Asia/Tehran",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                    .format(new Date(taedProgramData.tarikhersal))
                    .replace(/،/g, " - ")
                : taedProgramData?.tarikhersal &&
                  formatDateTimeForNonPersian(taedProgramData.tarikhersal)}
            </div>
          ) : null}
        </div>

        {/* Div 2: آب منطقه‌ای */}
        <div className="relative rounded-lg border border-gray-300 p-4">
          <div className="mb-2 font-bold">{t("regionalWater")}</div>
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
              {t("confirmation")}
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
              {t("reject")}
            </label>
          </div>
          <div className="mb-2 flex flex-col gap-2">
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={() => handleOpenModal("regionalWater")}
            >
              {t("description")}
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
                {t("send")}
              </button>
            )}
          </div>
          {(taedProgramData?.firstnabmantaghe &&
            taedProgramData?.lastnabmantaghe) ||
          isSavedRegionalWater ? (
            <div
              className={`absolute bottom-1 text-xs italic text-gray-500 ${
                locale === "fa" || locale === "ar" ? "right-2" : "left-2"
              }`}
            >
              {isSavedRegionalWater
                ? `${firstName} ${lastName}`
                : `${taedProgramData?.firstnabmantaghe} ${taedProgramData?.lastnabmantaghe}`}
            </div>
          ) : null}
          {taedProgramData?.tarikhabmantaghe || isSavedRegionalWater ? (
            <div
              className={`absolute bottom-1 text-xs italic text-gray-500 ${
                locale === "fa" || locale === "ar" ? "left-2" : "right-2"
              }`}
            >
              {isSavedRegionalWater
                ? currentDateTime
                : locale === "fa"
                ? taedProgramData?.tarikhabmantaghe &&
                  new Intl.DateTimeFormat("fa-IR", {
                    timeZone: "Asia/Tehran",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                    .format(new Date(taedProgramData.tarikhabmantaghe))
                    .replace(/،/g, " - ")
                : taedProgramData?.tarikhabmantaghe &&
                  formatDateTimeForNonPersian(taedProgramData.tarikhabmantaghe)}
            </div>
          ) : null}
        </div>

        {showPumpingContractor && (
          <div className="relative rounded-lg border border-gray-300 p-4">
            <div className="mb-2 font-bold">{t("pumpingContractor")}</div>
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
                    isTaedPeymankarSavedInDB
                  }
                  checked={taedPeymankar === true}
                  onChange={() => handleTaedPeymankarChange(true)}
                />
                {t("confirmation")}
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
                    isTaedPeymankarSavedInDB
                  }
                  checked={taedPeymankar === false}
                  onChange={() => handleTaedPeymankarChange(false)}
                />
                {t("reject")}
              </label>
            </div>
            <div className="mb-2 flex flex-col gap-2">
              <button
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => handleOpenModal("pumpingContractor")}
              >
                {t("description")}
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
                    isTaedPeymankarSavedInDB
                  }
                  onClick={handlePumpingContractorSubmit}
                >
                  {t("send")}
                </button>
              )}
            </div>
            {(taedProgramData?.firstnpeymankar &&
              taedProgramData?.lastnpeymankar) ||
            isSavedPumpingContractor ? (
              <div
                className={`absolute bottom-1 text-xs italic text-gray-500 ${
                  locale === "fa" || locale === "ar" ? "right-2" : "left-2"
                }`}
              >
                {isSavedPumpingContractor
                  ? `${firstName} ${lastName}`
                  : `${taedProgramData?.firstnpeymankar} ${taedProgramData?.lastnpeymankar}`}
              </div>
            ) : null}
            {taedProgramData?.tarikhpeymankar || isSavedPumpingContractor ? (
              <div
                className={`absolute bottom-1 text-xs italic text-gray-500 ${
                  locale === "fa" || locale === "ar" ? "left-2" : "right-2"
                }`}
              >
                {isSavedPumpingContractor
                  ? currentDateTime
                  : locale === "fa"
                  ? taedProgramData?.tarikhpeymankar &&
                    new Intl.DateTimeFormat("fa-IR", {
                      timeZone: "Asia/Tehran",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                      .format(new Date(taedProgramData.tarikhpeymankar))
                      .replace(/،/g, " - ")
                  : taedProgramData?.tarikhpeymankar &&
                    formatDateTimeForNonPersian(
                      taedProgramData.tarikhpeymankar
                    )}
              </div>
            ) : null}
          </div>
        )}

        {showWaterPower && (
          <div className="relative rounded-lg border border-gray-300 p-4">
            <div className="mb-2 font-bold">{t("powerWater")}</div>
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
                {t("confirmation")}
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
                {t("reject")}
              </label>
            </div>
            <div className="mb-2 flex flex-col gap-2">
              <button
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => handleOpenModal("waterPower")}
              >
                {t("description")}
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
                  {t("send")}
                </button>
              )}
            </div>
            {(taedProgramData?.firstnabniroo &&
              taedProgramData?.lastnabniroo) ||
            isSavedWaterPower ? (
              <div
                className={`absolute bottom-1 text-xs italic text-gray-500 ${
                  locale === "fa" || locale === "ar" ? "right-2" : "left-2"
                }`}
              >
                {isSavedWaterPower
                  ? `${firstName} ${lastName}`
                  : `${taedProgramData?.firstnabniroo} ${taedProgramData?.lastnabniroo}`}
              </div>
            ) : null}
            {taedProgramData?.tarikhabniroo || isSavedWaterPower ? (
              <div
                className={`absolute bottom-1 text-xs italic text-gray-500 ${
                  locale === "fa" || locale === "ar" ? "left-2" : "right-2"
                }`}
              >
                {isSavedWaterPower
                  ? currentDateTime
                  : locale === "fa"
                  ? taedProgramData?.tarikhabniroo &&
                    new Intl.DateTimeFormat("fa-IR", {
                      timeZone: "Asia/Tehran",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                      .format(new Date(taedProgramData.tarikhabniroo))
                      .replace(/،/g, " - ")
                  : taedProgramData?.tarikhabniroo &&
                    formatDateTimeForNonPersian(taedProgramData.tarikhabniroo)}
              </div>
            ) : null}
          </div>
        )}

        <div className="flex h-full items-center justify-center rounded-lg border border-gray-300 px-4">
          <div className="w-full text-center">
            <div className="mb-2 font-bold">{t("finalFiles")}</div>
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
                {t("preview")}
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
                {t("uploadFinalFile")}
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
                {t("viewFinalFile")}
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

        <div className="relative rounded-lg border border-gray-300 p-4">
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
            <label htmlFor="final-approval">{t("finalApproval")}</label>
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
                    {t("send")}
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
                    {t("send")}
                  </button>
                </div>
              )}

          {((((networkTrustee !== "AbMantaghei" &&
            !getIsReadOnly("waterPower")) ||
            (networkTrustee === "AbMantaghei" &&
              !getIsReadOnly("regionalWater"))) &&
            (taedProgramData?.taeednahaee || taedProgramData?.toziheslah) &&
            isFiddaheValidComputed) ||
            (!(
              (networkTrustee !== "AbMantaghei" &&
                !getIsReadOnly("waterPower")) ||
              (networkTrustee === "AbMantaghei" &&
                !getIsReadOnly("regionalWater"))
            ) &&
              taedProgramData?.toziheslah &&
              isFiddaheValidComputed)) && (
            <div className="mt-2">
              <button
                className="w-full rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                onClick={() => setIsCorrectionModalOpen(true)}
              >
                {t("amendment")}
              </button>
            </div>
          )}
          {(taedProgramData?.firstntaeednahaee &&
            taedProgramData?.lastntaeednahaee) ||
          isFinalApprovalSubmitted ? (
            <div
              className={`absolute bottom-1 text-xs italic text-gray-500 ${
                locale === "fa" || locale === "ar" ? "right-2" : "left-2"
              }`}
            >
              {isFinalApprovalSubmitted
                ? `${firstName} ${lastName}`
                : `${taedProgramData?.firstntaeednahaee} ${taedProgramData?.lastntaeednahaee}`}
            </div>
          ) : null}
          {taedProgramData?.tarikhtaeednahaee || isFinalApprovalSubmitted ? (
            <div
              className={`absolute bottom-1 text-xs italic text-gray-500 ${
                locale === "fa" || locale === "ar" ? "left-2" : "right-2"
              }`}
            >
              {isFinalApprovalSubmitted
                ? currentDateTime
                : locale === "fa"
                ? taedProgramData?.tarikhtaeednahaee &&
                  new Intl.DateTimeFormat("fa-IR", {
                    timeZone: "Asia/Tehran",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                    .format(new Date(taedProgramData.tarikhtaeednahaee))
                    .replace(/،/g, " - ")
                : taedProgramData?.tarikhtaeednahaee &&
                  formatDateTimeForNonPersian(
                    taedProgramData.tarikhtaeednahaee
                  )}
            </div>
          ) : null}
        </div>

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

        {openModal && (
          <Modal
            isOpen={!!openModal}
            onClose={() => setOpenModal(null)}
            title={`${t("description")} ${getModalTitle(openModal)}`}
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
                {t("close")}
              </button>
              {!getIsReadOnly(openModal.split("-")[3]) &&
                isFiddaheValidComputed && (
                  <button
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => {
                      if (modalContent[openModal]) {
                        handleModalSave(openModal, modalContent[openModal]);
                      }
                      setOpenModal(null);
                    }}
                  >
                    {t("save")}
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
      <AlertModal
        isOpen={alertState.isOpen}
        onClose={() => setAlertState({ ...alertState, isOpen: false })}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
      />
    </div>
  );
};

export default PumpingActions;

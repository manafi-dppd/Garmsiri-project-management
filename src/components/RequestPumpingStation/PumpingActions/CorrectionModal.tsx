// src/components/RequestPumpingStation/PumpingActions/CorrectionModal.tsx
import { useState, useEffect } from "react";
import * as React from "react";
import Modal from "./../../Modal";
import AlertModal from "../../AlertModal";

interface CorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText: string;
  isEditable: boolean;
  daheText: string;
  mahText: string;
  pumpStationName: string;
  idPumpStation: number;
  sal: number;
  mah: number;
  dahe: number;
}

const CorrectionModal: React.FC<CorrectionModalProps> = ({
  isOpen,
  onClose,
  initialText,
  isEditable,
  daheText,
  mahText,
  pumpStationName,
  idPumpStation,
  sal,
  mah,
  dahe,
}) => {
  const [text, setText] = useState(initialText);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("برای درخواست اصلاحیه بایستی توضیحات ارائه شود");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/requestCorrection", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idPumpStation,
          sal,
          mah,
          dahe,
          correctionText: text,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit correction");
      }

      setShowSuccessAlert(true);
      onClose();

      setTimeout(() => setShowSuccessAlert(false), 5000);
    } catch (error) {
      console.error("Error submitting correction:", error);
      alert(
        error instanceof Error ? error.message : "خطا در ثبت درخواست اصلاحیه"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmationMessage = (
    <div className="text-right" style={{ direction: "rtl" }}>
      <span className="text-yellow-500">⚠️</span>
      با ارسال درخواست اصلاحیه مراحل ارسال و تایید برنامه{" "}
      <span className="font-bold">
        {daheText} {mahText} ماه ایستگاه {pumpStationName}
      </span>{" "}
      حذف خواهد شد و بایستی دومرتبه انجام شود.
      <br />
      آیا از ارسال درخواست مطمئن هستید؟
    </div>
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="اصلاحات" size="md">
        <div className="space-y-4">
          <textarea
            className="w-full rounded-md border border-gray-300 p-2"
            style={{ height: "200px" }}
            value={text}
            onChange={(e) => isEditable && setText(e.target.value)}
            readOnly={!isEditable}
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400"
            onClick={onClose}
          >
            بستن
          </button>
          {isEditable && (
            <button
              className={`rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 ${
                !text.trim() ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleSubmit}
              disabled={!text.trim() || isSubmitting}
            >
              {isSubmitting ? "در حال ارسال..." : "ارسال"}
            </button>
          )}
        </div>
      </Modal>

      <AlertModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="تأیید ارسال اصلاحیه"
        message={confirmationMessage}
        type="warning"
        buttons={[
          {
            text: "خیر",
            variant: "secondary",
            onClick: () => setShowConfirmation(false),
          },
          {
            text: "بله",
            variant: "primary",
            onClick: handleConfirmSubmit,
          },
        ]}
        center
        size="sm"
      />

      {showSuccessAlert && (
        <AlertModal
          isOpen={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
          title="موفقیت"
          message="درخواست اصلاحیه با موفقیت ثبت شد"
          type="success"
        />
      )}
    </>
  );
};

export default CorrectionModal;

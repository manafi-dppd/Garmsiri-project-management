// src/components/RequestPumpingStation/PumpingActions/CorrectionModal.tsx
import { useState, useEffect } from "react";
import * as React from "react";
import Modal from "./../../Modal";
import AlertModal from "../../AlertModal";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

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
  const locale = useLocale();
  const t = useTranslations("CorrectionModal");
  const [text, setText] = useState(initialText);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert(t("error_empty_text"));
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
          locale: locale,
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
        error instanceof Error ? error.message : t("error_submission_failed")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmationMessage = (
    <div className="text-right" style={{ direction: "rtl" }}>
      <span className="text-yellow-500">⚠️</span>
      {t("confirmation_message", { daheText, mahText, pumpStationName })}
    </div>
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={t("title")} size="md">
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
            {t("close_button")}
          </button>
          {isEditable && (
            <button
              className={`rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 ${
                !text.trim() ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleSubmit}
              disabled={!text.trim() || isSubmitting}
            >
              {isSubmitting ? t("submitting") : t("submit_button")}
            </button>
          )}
        </div>
      </Modal>

      <AlertModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title={t("confirmation_title")}
        message={confirmationMessage}
        type="warning"
        buttons={[
          {
            text: t("no"),
            variant: "secondary",
            onClick: () => setShowConfirmation(false),
          },
          {
            text: t("yes"),
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
          title={t("success")}
          message={t("success_message")}
          type="success"
        />
      )}
    </>
  );
};

export default CorrectionModal;

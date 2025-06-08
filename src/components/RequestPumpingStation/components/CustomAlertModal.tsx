// src/components/CustomAlertModal.tsx
import * as React from "react";
import Modal from "./../../Modal";

interface CustomAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: React.ReactNode;
}

const CustomAlertModal: React.FC<CustomAlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="تأیید ارسال اصلاحیه"
      size="sm"
      center
    >
      <div className="py-4 text-center">{message}</div>
      <div className="mt-4 flex justify-center gap-4">
        <button
          className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400"
          onClick={onClose}
        >
          خیر
        </button>
        <button
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          onClick={onConfirm}
        >
          بله
        </button>
      </div>
    </Modal>
  );
};

export default CustomAlertModal;

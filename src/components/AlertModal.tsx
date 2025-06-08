// src/components/AlertModal.tsx
import * as React from "react";
import Modal from "./Modal";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: React.ReactNode;
  type?: "info" | "warning" | "success" | "error";
  buttons?: {
    text: string;
    variant: "primary" | "secondary" | "danger" | "success";
    onClick: () => void;
    disabled?: boolean;
  }[];
  center?: boolean;
  size?: "sm" | "md" | "lg";
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  buttons = [],
  center = false,
  size = "md",
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-100";
      case "warning":
        return "bg-yellow-100";
      case "error":
        return "bg-red-100";
      default:
        return "bg-blue-100";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      center={center}
      className={getBgColor()}
    >
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="text-4xl">{getIcon()}</div>
        <div className="text-center">{message}</div>
        <div className="mt-4 flex w-full justify-center gap-4">
          {buttons.length === 0 ? (
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={onClose}
            >
              OK
            </button>
          ) : (
            buttons.map((button, index) => (
              <button
                key={index}
                className={`rounded-md px-4 py-2 ${
                  button.variant === "primary"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : button.variant === "secondary"
                    ? "bg-gray-300 hover:bg-gray-400"
                    : button.variant === "danger"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                } ${button.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={button.onClick}
                disabled={button.disabled}
              >
                {button.text}
              </button>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;
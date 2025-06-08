// src/components/Modal.tsx
import * as React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  center?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  center = false,
  className = "",
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        <div
          className={`relative w-full transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all ${sizeClasses[size]} ${className} ${
            center ? "text-center" : ""
          }`}
        >
          {title && (
            <div className="mb-4 flex items-center justify-between border-b pb-2">
              <h3 className="text-lg font-medium">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          )}
          <div className="py-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
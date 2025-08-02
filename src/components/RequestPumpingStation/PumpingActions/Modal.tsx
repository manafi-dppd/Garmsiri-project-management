import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  footer?: ReactNode;
  center?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  title = "",
  size = "lg",
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto ${center ? 'flex items-center justify-center' : ''}">
      <div
        className="flex flex-col rounded-lg bg-white p-6"
        style={{
          width: size === "md" ? "400px" : size === "lg" ? "600px" : "800px",
          maxWidth: "90vw",
          maxHeight: "90vh",
        }}
      >
        {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}

        <div className="flex-grow overflow-auto">{children}</div>

        {footer}
      </div>
    </div>
  );
};

export default Modal;

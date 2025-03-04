import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-[350mm] max-h-[210mm] overflow-auto landscape z-60 relative shadow-2xl pb-12">
        {' '}
        {/* اضافه کردن pb-12 برای فاصله از پایین */}
        {children}
        {/* انتقال دکمه به پایین */}
        <button
          onClick={onClose}
          className="absolute bottom-2 right-2 font-bold bg-red-500 text-white px-3 py-1 rounded"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default Modal;

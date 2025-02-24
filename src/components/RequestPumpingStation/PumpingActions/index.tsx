import React from 'react';

interface PumpingActionsProps {
  onSave: () => void;
  onReset: () => void;
  disabled?: boolean; // اضافه کردن پروپ disabled
}

const PumpingActions: React.FC<PumpingActionsProps> = ({
  onSave,
  onReset,
  disabled,
}) => {
  return (
    <div className="flex justify-end gap-4 mt-4">
      {/* <button
        onClick={onSave}
        disabled={disabled} // غیرفعال کردن دکمه ذخیره بر اساس مقدار disabled
        className={`px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        ذخیره
      </button>
      <button
        onClick={onReset}
        disabled={disabled} // غیرفعال کردن دکمه بازنشانی بر اساس مقدار disabled
        className={`px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        بازنشانی
      </button> */}
    </div>
  );
};

export default PumpingActions;

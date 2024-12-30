import React from 'react';

interface AdditionalFormFieldsProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  formData: {
    introductionLetter: string;
    issuer: string;
    letterNumber: string;
    letterDate: string;
    confirmer: string;
    attachment: File | null;
  };
}

const AdditionalFormFields: React.FC<AdditionalFormFieldsProps> = ({
  onChange,
  formData,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md space-y-4">
      <div>
        <label
          htmlFor="introductionLetter"
          className="block text-sm font-medium text-gray-700"
        >
          آپلود معرفی‌نامه
        </label>
        <input
          type="file"
          id="introductionLetter"
          name="introductionLetter"
          onChange={onChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="issuer"
          className="block text-sm font-medium text-gray-700"
        >
          صادرکننده معرفی‌نامه
        </label>
        <input
          list="issuerOptions"
          type="text"
          id="issuer"
          name="issuer"
          value={formData.issuer}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <datalist id="issuerOptions">
          <option value="شرکت آب منطقه‌ای کرمانشاه" />
          <option value="سازمان جهاد کشاورزی استان کرمانشاه" />
        </datalist>
      </div>
      <div>
        <label
          htmlFor="letterNumber"
          className="block text-sm font-medium text-gray-700"
        >
          شماره معرفی‌نامه
        </label>
        <input
          type="text"
          id="letterNumber"
          name="letterNumber"
          value={formData.letterNumber}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            تاریخ معرفی‌نامه
          </span>
          <button
            type="button"
            className="px-3 py-1 text-sm text-white bg-blue-500 rounded shadow hover:bg-blue-600"
            onClick={() => console.log('Open Date Picker')}
          >
            انتخاب تاریخ
          </button>
        </div>
        <span className="block mt-1 text-sm text-gray-600">
          {formData.letterDate}
        </span>
      </div>
      <div>
        <label
          htmlFor="confirmer"
          className="block text-sm font-medium text-gray-700"
        >
          تاییدکننده
        </label>
        <input
          type="text"
          id="confirmer"
          name="confirmer"
          value={formData.confirmer}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
};

export default AdditionalFormFields;

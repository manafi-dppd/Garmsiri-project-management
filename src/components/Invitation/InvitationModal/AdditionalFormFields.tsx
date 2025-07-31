import React from "react";
import { useTranslations } from "next-intl";

interface AdditionalFormFieldsProps {
  formData: {
    introductionLetter: File | null;
    letterIssuer: string;
    letterNumber: string;
    letterDate: string;
    letterApprover: string;
    attachment: File | null;
  };
  onChange: (name: string, value: string | File | null) => void;
}

const AdditionalFormFields: React.FC<AdditionalFormFieldsProps> = ({
  formData,
  onChange,
}) => {
  const t = useTranslations("AdditionalFormFields");

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="letterIssuer"
          className="block text-sm font-medium text-gray-700"
        >
          {t("letterIssuer")}
        </label>
        <input
          type="text"
          id="letterIssuer"
          name="letterIssuer"
          value={formData.letterIssuer}
          onChange={(e) => onChange("letterIssuer", e.target.value)}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="letterNumber"
          className="block text-sm font-medium text-gray-700"
        >
          {t("letterNumber")}
        </label>
        <input
          type="text"
          id="letterNumber"
          name="letterNumber"
          value={formData.letterNumber}
          onChange={(e) => onChange("letterNumber", e.target.value)}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="letterDate"
          className="block text-sm font-medium text-gray-700"
        >
          {t("letterDate")}
        </label>
        <input
          type="date"
          id="letterDate"
          name="letterDate"
          value={formData.letterDate}
          onChange={(e) => onChange("letterDate", e.target.value)}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="letterApprover"
          className="block text-sm font-medium text-gray-700"
        >
          {t("letterApprover")}
        </label>
        <input
          type="text"
          id="letterApprover"
          name="letterApprover"
          value={formData.letterApprover}
          onChange={(e) => onChange("letterApprover", e.target.value)}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="introductionLetter"
          className="block text-sm font-medium text-gray-700"
        >
          {t("attachment")}
        </label>
        <input
          type="file"
          id="introductionLetter"
          name="introductionLetter"
          onChange={(e) =>
            onChange("introductionLetter", e.target.files?.[0] || null)
          }
          accept=".png,.jpg,.jpeg,.pdf"
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {formData.introductionLetter && (
          <span className="mt-2 block text-sm text-gray-600">
            {formData.introductionLetter.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default AdditionalFormFields;

import * as React from "react";
import { useTranslations } from "next-intl";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  const t = useTranslations("LoadingSpinner");
  const defaultMessage = t("loading");

  return (
    <>
      <div className="fixed inset-0 z-40 bg-white bg-opacity-80" />
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center"></div>
        </div>
        <p className="font-medium text-gray-600">{message || defaultMessage}</p>
      </div>
    </>
  );
};

export default LoadingSpinner;

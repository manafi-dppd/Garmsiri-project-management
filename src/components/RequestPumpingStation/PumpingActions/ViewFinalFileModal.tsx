// components/RequestPumpingStation/PumpingActions/ViewFinalFileModal.tsx
import { useState } from 'react';
import Modal from './Modal';
import Image from 'next/image';

interface ViewFinalFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  fileUrl: string | null;
}

const ViewFinalFileModal: React.FC<ViewFinalFileModalProps> = ({
  isOpen,
  onClose,
  onDownload,
  fileUrl
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      // title="مشاهده فایل نهایی"
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <button
            onClick={onDownload}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            دریافت فایل
          </button>
          <button
            onClick={onClose}
            className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            بستن
          </button>
        </div>
      }
    >
      <div className="relative h-full min-h-[400px] w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            در حال بارگذاری فایل...
          </div>
        )}
        {fileUrl ? (
          <>
            <Image
              src={fileUrl}
              alt="فایل نهایی"
              fill
              style={{ objectFit: 'contain' }}
              onLoadingComplete={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              unoptimized // اگر تصاویر از دامنه خارجی هستند
            />
            {/* {!isLoading && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                برای ذخیره فایل، روی دکمه «دریافت فایل» کلیک کنید
              </div>
            )} */}
          </>
        ) : (
          <div className="flex h-full items-center justify-center">فایلی برای نمایش وجود ندارد</div>
        )}
      </div>
    </Modal>
  );
};

export default ViewFinalFileModal;

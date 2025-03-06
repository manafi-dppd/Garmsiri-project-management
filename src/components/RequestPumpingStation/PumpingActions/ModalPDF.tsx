import React, {useState} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalPDF: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
  const [isFormatMenuOpen, setIsFormatMenuOpen] = useState(false);

  const handleGenerateOutput = (
    format: 'pdf' | 'jpg' | 'jpeg' | 'bmp' | 'png',
  ) => {
    const element = document.getElementById('modal-content');

    if (element) {
      html2canvas(element, {
        scale: window.devicePixelRatio * 2, // ضریب ۲ برای افزایش کیفیت
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFFFFF',
      }).then((canvas) => {
        if (format === 'pdf') {
          const imgData = canvas.toDataURL('image/png', 1.0);
          const pdf = new jsPDF('landscape', 'mm', 'a4');
          const imgWidth = 297;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save('modal-content.pdf');
        } else {
          const imgData = canvas.toDataURL(`image/${format}`, 1.0);
          const link = document.createElement('a');
          link.href = imgData;
          link.download = `modal-content.${format}`;
          link.click();
        }
      });
    }
  };

  const handleGenerateExcel = () => {
    const element = document.getElementById('modal-content');

    if (element) {
      // استخراج داده‌ها از جدول یا سایر عناصر
      const table = element.querySelector('table'); // فرض کنید محتوا شامل یک جدول است
      if (table) {
        const workbook = XLSX.utils.table_to_book(table); // تبدیل جدول به کتاب اکسل
        XLSX.writeFile(workbook, 'modal-content.xlsx'); // ذخیره فایل اکسل
      } else {
        alert('جدولی برای تبدیل به اکسل یافت نشد.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-[350mm] max-h-[210mm] overflow-auto landscape z-60 relative shadow-2xl pb-12 print:p-0 print:max-w-full print:max-h-full print:shadow-none print:bg-transparent">
        <div
          id="modal-content"
          className="print:flex print:justify-center print:items-center print:min-h-[297mm] print:min-w-[210mm] print:mx-auto print:my-4 print:bg-white print:shadow-lg print:border print:border-gray-200"
        >
          <div className="print:p-8 print:w-full print:h-full">{children}</div>
        </div>
        <button
          onClick={onClose}
          className="absolute bottom-2 right-2 font-bold bg-red-500 text-white px-3 py-1 rounded print:hidden"
        >
          بستن
        </button>
        <div className="absolute bottom-2 left-2">
          <button
            onClick={() => setIsFormatMenuOpen(!isFormatMenuOpen)}
            className="font-bold bg-blue-500 text-white px-3 py-1 rounded print:hidden"
          >
            خروجی
          </button>
          {isFormatMenuOpen && (
            <div className="absolute bottom-10 left-0 bg-white border border-gray-300 rounded-lg shadow-lg">
              <button
                onClick={() => {
                  handleGenerateOutput('pdf');
                  setIsFormatMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                PDF
              </button>
              <button
                onClick={() => {
                  handleGenerateOutput('jpg');
                  setIsFormatMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                JPG
              </button>
              <button
                onClick={() => {
                  handleGenerateOutput('jpeg');
                  setIsFormatMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                JPEG
              </button>
              <button
                onClick={() => {
                  handleGenerateOutput('bmp');
                  setIsFormatMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                BMP
              </button>
              <button
                onClick={() => {
                  handleGenerateOutput('png');
                  setIsFormatMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                PNG
              </button>
              <button
                onClick={() => {
                  handleGenerateExcel();
                  setIsFormatMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Excel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPDF;

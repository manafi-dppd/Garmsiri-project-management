import React, {useState, useEffect} from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  onSave: (content: string) => void;
  isReadOnly: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  content,
  onSave,
  isReadOnly,
}) => {
  const [text, setText] = useState(content);

  useEffect(() => {
    setText(content); // مقدار جدید را تنظیم کنید
  }, [content]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg" style={{width: '600px'}}>
        {' '}
        {/* افزایش عرض مودال */}
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          style={{height: '200px'}} // افزایش ارتفاع textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          readOnly={isReadOnly}
        />
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md mr-2"
            onClick={onClose}
          >
            بستن
          </button>
          {!isReadOnly && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => onSave(text)}
            >
              ذخیره
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

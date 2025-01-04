import React, {useState, useEffect} from 'react';
import AccessLevelModal from './AccessLevelModal';
import {toPersianDate} from '@/utils/dateUtils';
import AdditionalFormFields from './AdditionalFormFields';
import FormSection from './FormSection';

type ToPersianDate = (date: string | Date | undefined) => string;
interface Position {
  id: number;
  title_fa: string;
  req_license: boolean;
}

interface InvitationModalProps {
  showModal: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onAccessLevelsUpdate: (updatedLevels: any) => void;
  onAccessLevelSubmit: (submittedData: any) => void;
  positionsFromParent?: Position[];
}

const InvitationModal: React.FC<InvitationModalProps> = ({
  showModal,
  onClose,
  positionsFromParent,
}) => {
  const [formData, setFormData] = useState({
    introductionLetter: '',
    attachment: null,
    file: null,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    endDate: '',
    gender: 'مرد', // مقدار پیش‌فرض
    issuer: '',
    letterNumber: '',
    letterDate: '',
    confirmer: '',
  });
  const [requiresLicense, setRequiresLicense] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);
  const [listSize, setListSize] = useState(10);
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const [showAccessLevelModal, setShowAccessLevelModal] = useState(false);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [editedAccessLevel, setEditedAccessLevel] = useState<any>(null);
  const [isAccessLevelButtonDisabled, setIsAccessLevelButtonDisabled] =
    useState(false);
  const today = new Date().toISOString().split('T')[0];
  const existingAccessLevels =
    Array.isArray(editedAccessLevel) && editedAccessLevel.length > 0
      ? editedAccessLevel
      : [];
  const [phoneNumber, setPhoneNumber] = useState('');
  useEffect(() => {
    if (positionsFromParent?.length) {
      // استفاده از داده‌های props اگر موجود باشند
      setPositions(positionsFromParent);
    } else {
      // بارگذاری داده‌ها از API
      const fetchPositions = async () => {
        try {
          const response = await fetch('/api/positions');
          if (!response.ok) throw new Error('Fetch failed');
          const data = await response.json();
          console.log('Fetched Positions:', data);
          setPositions(data);
        } catch (error) {
          console.error('Error fetching positions:', error);
        }
      };
      fetchPositions();
    }
  }, [positionsFromParent]);

  useEffect(() => {
    const hasLicense = selectedPositions.some((position) =>
      positions.find((p) => p.id === position.id && p.req_license),
    );
    setRequiresLicense(hasLicense);
  }, [selectedPositions, positions]);

  const resetEditedAccessLevel = () => {
    setEditedAccessLevel(null);
  };

  const handlePositionChange = (selectedIds: number[]) => {
    const updatedPositions = selectedIds.map(
      (id) => positions.find((position) => position.id === id) as Position,
    );
    setSelectedPositions(updatedPositions);
    if (updatedPositions.length > 0) {
      setSelectedPosition(String(updatedPositions[0].id)); // مقدار اولین آیتم انتخاب‌شده
    }
    setEditedAccessLevel(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const {name, value, files} = e.target as HTMLInputElement;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setListSize(parseInt(e.target.value, 10)); // `value` از نوع string است، برای تبدیل به عدد از `parseInt` استفاده کنید
    const selectedValues = Array.from(e.target.selectedOptions, (option) => {
      const value = (option as HTMLOptionElement).value; // تبدیل گزینه به `HTMLOptionElement`
      return positions.find((p) => p.id === parseInt(value, 10));
    }).filter(Boolean) as Position[];
    setSelectedPositions(selectedValues);
  };

  const handleSubmit = () => {
    // e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Selected Positions:', selectedPositions);
    onClose();
  };

  const toggleDatePickerModal = () => {
    setShowDatePickerModal((prev) => !prev);
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = date.toISOString(); // یا استفاده از فرمت دلخواه شما
    setFormData((prev) => ({...prev, letterDate: formattedDate}));
  };

  const openAccessLevelModal = () => {
    setShowAccessLevelModal(true);
  };

  const handleAccessLevelSubmit = (accessLevels: any) => {
    console.log('Access Levels:', accessLevels);
    setShowAccessLevelModal(false);
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.phoneNumber &&
      formData.gender &&
      selectedPositions.length > 0
    );
  };
  const hasLicenseRequirement = selectedPositions.some(
    (pos) => pos.req_license,
  );

  useEffect(() => {
    console.log('Updated Positions:', positions);
  }, [positions]);

  useEffect(() => {
    console.log('Selected Positions:', selectedPositions);
  }, [selectedPositions]);
  return (
    <div>
      {showModal && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`modal-body invitation-modal bg-gray-50 p-1 rounded-md ${
              showAdditionalInputs ? 'w-full md:w-[50%]' : 'w-full md:w-[30%]'
            } ${requiresLicense ? 'overflow-y-auto max-h-full' : ''} mx-auto`}
            style={{
              transition: 'max-height 0.3s ease-in-out',
            }}
          >
            <h5 className="text-xl font-semibold mb-4">دعوتنامه</h5>
            <button
              type="button"
              className="btn-close ms-auto"
              onClick={onClose}
              style={{position: 'absolute', left: '10px'}}
            ></button>
            <FormSection
              showAdditionalInputs={showAdditionalInputs}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              toPersianDate={toPersianDate as ToPersianDate}
              today={today}
              selectedPositions={selectedPositions.map(
                (position) => position.id,
              )} // ارسال فقط id‌ها
              positions={positions}
              handlePositionChange={(newSelectedPositions) => {
                const updatedPositions = newSelectedPositions.map(
                  (id) =>
                    positions.find(
                      (position) => position.id === id,
                    ) as Position,
                );
                setSelectedPositions(updatedPositions);
                if (updatedPositions.length > 0) {
                  setSelectedPosition(String(updatedPositions[0].id)); // مقدار اولین آیتم انتخاب‌شده
                }
              }}
              requiresLicense={requiresLicense}
              hasLicenseRequirement={hasLicenseRequirement}
              openAccessLevelModal={() => setShowAccessLevelModal(true)}
              resetEditedAccessLevel={resetEditedAccessLevel}
            />

            <div className="p-3 modal-footer flex justify-between mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={onClose}
              >
                انصراف
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                disabled={!isFormValid()}
                onClick={handleSubmit}
              >
                ارسال دعوتنامه
              </button>
            </div>
            {showAccessLevelModal && (
              <AccessLevelModal
                show={showAccessLevelModal}
                onClose={() => setShowAccessLevelModal(false)}
                positionId={
                  selectedPosition ? parseInt(selectedPosition, 10) : 0
                } // positionId مورد نیاز است
                onAccessLevelSubmit={(accessLevels: any) => {
                  console.log('Submitted Access Levels:', accessLevels);
                }}
                updateAccessLevels={(checkedState: any) => {
                  setEditedAccessLevel(checkedState);
                  console.log('Updated Access Levels:', checkedState);
                }}
                checkedState={editedAccessLevel} // ارسال آرایه ذخیره‌شده به فرزند
                mode="accessLevel"
                initialAccessLevels={existingAccessLevels} // ارسال مقدار اولیه
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default InvitationModal;

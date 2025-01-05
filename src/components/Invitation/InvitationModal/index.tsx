import React, {useState, useEffect} from 'react';
import AccessLevelModal from './AccessLevelModal';
import {toPersianDate} from '@/utils/dateUtils';
import AdditionalFormFields from './AdditionalFormFields';
import FormSection from './FormSection';
import {validateInvitation} from '@/utils/InvitationModal/validation';

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

interface FormData {
  attachment: File | null;
  file: File | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  endDate: string;
  gender: string;
  issuer: string;
  letterNumber: string;
  letterDate: string;
  confirmer: string;
  selectedPositions: number[];
  introductionLetter: File | null;
}

const InvitationModal: React.FC<InvitationModalProps> = ({
  showModal,
  onClose,
  positionsFromParent,
}) => {
  const [formData, setFormData] = useState<FormData>({
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
    selectedPositions: [] as number[],
    introductionLetter: null,
  });
  const [requiresLicense, setRequiresLicense] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);
  const [listSize, setListSize] = useState(10);
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const [showAccessLevelModal, setShowAccessLevelModal] = useState(false);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [isFormValidState, setIsFormValidState] = useState(false);
  const [editedAccessLevel, setEditedAccessLevel] = useState<any>(null);
  const [isAccessLevelButtonDisabled, setIsAccessLevelButtonDisabled] =
    useState(false);
  const today = new Date().toISOString().split('T')[0];
  const existingAccessLevels =
    Array.isArray(editedAccessLevel) && editedAccessLevel.length > 0
      ? editedAccessLevel
      : [];
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
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

    setFormData((prev) => ({
      ...prev,
      selectedPositions: selectedIds, // به‌صورت مستقیم لیست اعداد را ذخیره کنید
    }));
  };

  const handleFormValidation = (isValid: boolean) => {
    setIsFormValidState(isValid);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // دریافت تاریخ امروز به صورت رشته
    const today = new Date().toISOString().split('T')[0];
    console.log('Selected Positions:', formData.selectedPositions);
    // صحت‌سنجی داده‌های فرم
    const validationErrors = validateInvitation(
      formData.firstName,
      formData.lastName,
      formData.phoneNumber,
      formData.endDate,
      today,
      formData.selectedPositions,
      formData.introductionLetter,
    );

    if (validationErrors.length > 0) {
      // نمایش خطاها
      setErrors(validationErrors);
    } else {
      setErrors([]); // پاک کردن خطاها
      alert('Form submitted successfully!');
      console.log('Form Data:', formData);
      console.log('Selected Positions:', selectedPositions);
      onClose();
    }
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
        <div className="modal fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div
            className="relative bg-white rounded"
            style={{maxWidth: '50%', margin: 'auto'}}
          >
            <div
              className={`modal-body invitation-modal bg-gray-50 p-1 rounded-md mx-auto`}
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
                selectedPositions={formData.selectedPositions} // ارسال فقط id‌ها
                onFormValidation={setIsFormValidState}
                positions={positions}
                handlePositionChange={(newSelectedPositions) => {
                  setFormData((prev) => ({
                    ...prev,
                    selectedPositions: newSelectedPositions,
                  })); // به‌روزرسانی selectedPositions در formData
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
                onPositionChange={handlePositionChange}
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
                  disabled={!isFormValidState}
                  onClick={handleSubmit}
                >
                  ارسال دعوتنامه
                </button>
                {/* نمایش خطاها */}
              </div>
              {errors.length > 0 && (
                <ul style={{color: 'red'}}>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
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
        </div>
      )}
    </div>
  );
};
export default InvitationModal;

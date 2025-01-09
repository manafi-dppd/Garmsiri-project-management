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
  mobile: string;
  endDate: string;
  gender: string;
  letterIssuer: string;
  letterNumber: string;
  letterDate: string;
  letterApprover: string;
  selectedPositions: number[];
  introductionLetter: File | null;
  editedAccessLevel: {menuId: number; hasAccess: boolean}[];
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
    mobile: '',
    endDate: '',
    gender: 'مرد', // مقدار پیش‌فرض
    letterIssuer: '',
    letterNumber: '',
    letterDate: '',
    letterApprover: '',
    selectedPositions: [] as number[],
    introductionLetter: null,
    editedAccessLevel: [],
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
  const [mobile, setmobile] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const handleClose = () => {
    setIsVisible(false); // مخفی کردن div
    onClose();
    window.location.reload();
  };
  useEffect(() => {
    if (positionsFromParent?.length) {
      // استفاده از داده‌های props اگر موجود باشند
      setPositions(positionsFromParent);
    } else {
      // بارگذاری داده‌ها از API
      const fetchPositions = async () => {
        try {
          const response = await fetch('/api/positions');
          if (!response.ok) {
            const responseData = await response.json().catch(() => null);
            console.error('Server Error:', responseData || 'Response is empty');
            alert(
              responseData?.message ||
                'An error occurred while submitting the invitation.',
            );
            return;
          }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      mobile,
      endDate,
      gender,
      letterIssuer,
      letterNumber,
      letterDate,
      letterApprover,
      selectedPositions,
      // editedAccessLevel,
    } = formData;
    // console.log('editedAccessLevel:', editedAccessLevel);
    // console.log({
    //   firstName,
    //   lastName,
    //   mobile,
    //   endDate,
    //   gender,
    //   letterIssuer,
    //   letterNumber,
    //   letterDate,
    //   letterApprover,
    //   selectedPositions,
    //   editedAccessLevel,
    // });

    const today = new Date().toISOString().split('T')[0];
    const validationErrors = validateInvitation(
      firstName,
      lastName,
      mobile,
      endDate,
      today,
      selectedPositions,
      formData.file,
    );
    console.log('validationErrors: ', validationErrors);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
      try {
        const response = await fetch('/api/invitation', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            firstName,
            lastName,
            mobile,
            endDate,
            gender,
            letterIssuer,
            letterNumber,
            letterDate,
            letterApprover,
            selectedPositions,
            editedAccessLevel,
          }),
        });

        const responseData = await response.json();

        if (response.ok) {
          setIsVisible(true);
        } else {
          // console.error('Server Error:', responseData);
          alert(
            responseData.message ||
              'An error occurred while submitting the invitation.',
          );
        }

        console.log('Invitation submitted:', responseData);
      } catch (error) {
        console.error('Error submitting invitation:', error);
        alert('An error occurred while submitting the invitation.');
      }
    }
  };

  const validateRequiredInvitation = (
    // firstName: string,
    lastName: string,
    mobile: string,
    endDate: string,
    today: string,
    selectedPositions: number[],
    // file: File | null,
  ) => {
    const errors = [];
    // if (!firstName.trim()) errors.push('First name is required.');
    if (!lastName.trim()) errors.push('Last name is required.');
    if (!mobile.trim()) errors.push('Phone number is required.');
    if (new Date(endDate) < new Date(today))
      errors.push('End date must be in the future.');
    if (!selectedPositions.length)
      errors.push('At least one position must be selected.');
    return errors;
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
      formData.mobile &&
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
              {isVisible && (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-100 text-gray-800 px-6 py-4 rounded-lg shadow-lg flex flex-col items-center w-96 z-50 animate-fade-in">
                  {/* علامت تیک */}
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full mb-3 shadow-md">
                    ✓
                  </div>
                  {/* پیام */}
                  <p className="text-center font-medium">
                    دعوتنامه با موفقیت ارسال شد
                  </p>
                  {/* دکمه */}
                  <button
                    onClick={handleClose}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default InvitationModal;

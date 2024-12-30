import React, {useState, useEffect} from 'react';
import AccessLevelModal from './AccessLevelModal';
import {toPersianDate} from '@/utils/dateUtils';
import AdditionalFormFields from './AdditionalFormFields';
import FormSection from './FormSection';

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
    gender: '',
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
  const [isAccessLevelButtonDisabled, setIsAccessLevelButtonDisabled] =
    useState(false);
  const today = new Date().toISOString().split('T')[0];

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
          setPositions(data);
        } catch (error) {
          console.error('Error fetching positions:', error);
        }
      };
      fetchPositions();
    }
  }, [positionsFromParent]);

  useEffect(() => {
    const hasLicense = selectedPositions.some((id) =>
      positions.find((position) => position.id === id && position.req_license),
    );
    setRequiresLicense(hasLicense);
  }, [selectedPositions, positions]);

  const handlePositionChange = (selectedIds: number[]) => {
    setSelectedPositions(selectedIds);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value, files} = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSizeChange = (e) => {
    setListSize(e.target.value);
    const selectedValues = Array.from(e.target.selectedOptions, (option) =>
      positions.find((p) => p.id === parseInt(option.value, 10)),
    ).filter(Boolean) as Position[];
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

  const handleDateSelect = (date) => {
    setFormData((prev) => ({...prev, letterDate: date}));
  };

  const openAccessLevelModal = () => {
    setShowAccessLevelModal(true);
  };

  const handleAccessLevelSubmit = (accessLevels) => {
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
  return (
    <div>
      {showModal && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`modal-body invitation-modal bg-gray-50 p-6 rounded-md ${
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
              toPersianDate={toPersianDate}
              today={today}
              selectedPositions={selectedPositions}
              positions={positions}
              handlePositionChange={handlePositionChange}
              requiresLicense={requiresLicense}
              hasLicenseRequirement={hasLicenseRequirement}
              openAccessLevelModal={openAccessLevelModal}
              // isAccessLevelButtonDisabled={isAccessLevelButtonDisabled}
            />
            <div className="modal-footer flex justify-between mt-4">
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
                onAccessLevelSubmit={handleAccessLevelSubmit}
                selectedPosition={selectedPosition}
                updateAccessLevels={(checkedState) => {
                  setFinalAccessLevel(checkedState);
                  console.log('Updated Access Levels:', checkedState);
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default InvitationModal;
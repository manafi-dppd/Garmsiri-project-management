import * as React from "react";
import { useState, useEffect } from "react";
import AccessLevelModal from "./AccessLevelModal";
import { toPersianDate } from "../../../utils/dateUtils";
import FormSection from "./FormSection";
import { validateInvitation } from "../../../utils/InvitationModal/validation";

type ToPersianDate = (date: string | Date | undefined) => string;
interface Position {
  id: number;
  title_fa: string;
  req_license: boolean;
}

interface InvitationModalProps {
  showModal: boolean;
  onClose: () => void;
  positionsFromParent?: Position[];
}

interface FormData {
  attachment: File | null;
  file: File | null;
  first_name: string;
  last_name: string;
  mobile: string;
  end_date: string;
  gender: string;
  letter_issuer: string;
  letter_number: string;
  letter_date: string;
  letter_approver: string;
  selectedPositions: number[];
  introductionLetter: File | null;
  editedAccessLevel: { menu_id: number; has_access: boolean }[];
}

const InvitationModal: React.FC<InvitationModalProps> = ({
  showModal,
  onClose,
  positionsFromParent,
}) => {
  const [formData, setFormData] = useState<FormData>({
    attachment: null,
    file: null,
    first_name: "",
    last_name: "",
    mobile: "",
    end_date: "",
    gender: "مرد", // مقدار پیش‌فرض
    letter_issuer: "",
    letter_number: "",
    letter_date: "",
    letter_approver: "",
    selectedPositions: [] as number[],
    introductionLetter: null,
    editedAccessLevel: [],
  });
  const [requiresLicense, setRequiresLicense] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);
  const [showAccessLevelModal, setShowAccessLevelModal] = useState(false);
  const [isFormValidState, setIsFormValidState] = useState(false);
  const [editedAccessLevel, setEditedAccessLevel] = useState<
    { menu_id: number; has_access: boolean }[]
  >([]);
  const today = new Date().toISOString().split("T")[0];
  const [errors, setErrors] = useState<Array<string>>([]);
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
          const response = await fetch("/api/positions");
          if (!response.ok) {
            const responseData = await response.json().catch(() => null);
            console.error("Server Error:", responseData || "Response is empty");
            alert(
              responseData?.message ||
                "An error occurred while submitting the invitation."
            );
            return;
          }
          const data = await response.json();
          setPositions(data);
        } catch (error) {
          console.error("Error fetching positions:", error);
        }
      };
      fetchPositions();
    }
  }, [positionsFromParent]);

  useEffect(() => {
    const hasLicense = selectedPositions.some((position) =>
      positions.find((p) => p.id === position.id && p.req_license)
    );
    setRequiresLicense(hasLicense);
  }, [selectedPositions, positions]);

  const resetEditedAccessLevel = () => {
    setEditedAccessLevel([]); 
  };

  const handlePositionChange = (selectedIds: number[]) => {
    const updatedPositions = selectedIds.map(
      (id) => positions.find((position) => position.id === id) as Position
    );

    setSelectedPositions(updatedPositions);

    setFormData((prev) => ({
      ...prev,
      selectedPositions: selectedIds, // به‌صورت مستقیم لیست اعداد را ذخیره کنید
    }));
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      first_name,
      last_name,
      mobile,
      end_date,
      gender,
      letter_issuer,
      letter_number,
      letter_date,
      letter_approver,
      selectedPositions,
    } = formData;

    const today = new Date().toISOString().split("T")[0];
    const validationErrors = validateInvitation(
      first_name,
      last_name,
      mobile,
      end_date,
      today,
      selectedPositions,
      formData.file
    );

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
      try {
        const response = await fetch("/api/invitation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name,
            last_name,
            mobile,
            end_date,
            gender,
            letter_issuer,
            letter_number,
            letter_date,
            letter_approver,
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
              "An error occurred while submitting the invitation."
          );
        }

      } catch (error) {
        console.error("Error submitting invitation:", error);
        alert("An error occurred while submitting the invitation.");
      }
    }
  };

  const hasLicenseRequirement = selectedPositions.some(
    (pos) => pos.req_license
  );

  return (
    <div>
      {showModal && (
        <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="relative rounded bg-white"
            style={{ maxWidth: "50%", margin: "auto" }}
          >
            <div
              className={`modal-body invitation-modal mx-auto rounded-md bg-gray-50 p-1 ${
                hasLicenseRequirement ? "w-full" : "w-80"
              }`}
              style={{
                transition: "max-height 0.3s ease-in-out",
              }}
            >
              <h5 className="mb-4 text-xl font-semibold">دعوتنامه</h5>
              <button
                type="button"
                className="btn-close ms-auto"
                onClick={onClose}
                style={{ position: "absolute", left: "10px" }}
              ></button>
              <FormSection
                formData={{
                  ...formData,
                  introductionLetter: formData.introductionLetter ? formData.introductionLetter.name : "", // تبدیل File به نام فایل (string)
                  endDate: formData.end_date,
                  showAdditionalInputs: false
                }}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                toPersianDate={toPersianDate as ToPersianDate}
                today={today}
                selectedPositions={formData.selectedPositions}
                onFormValidation={setIsFormValidState}
                positions={positions}
                handlePositionChange={handlePositionChange}
                requiresLicense={requiresLicense}
                openAccessLevelModal={() => setShowAccessLevelModal(true)}
                resetEditedAccessLevel={resetEditedAccessLevel}
              />

              <div className="modal-footer mt-4 flex justify-between p-3">
                <button
                  type="button"
                  className="rounded-lg bg-red-500 px-4 py-2 text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={onClose}
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-green-500 px-4 py-2 text-white shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  disabled={!isFormValidState}
                  onClick={handleSubmit}
                >
                  ارسال دعوتنامه
                </button>
                {/* نمایش خطاها */}
              </div>
              {errors.length > 0 && (
                <ul style={{ color: "red" }}>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
              {showAccessLevelModal && (
                <AccessLevelModal
                  show={showAccessLevelModal}
                  onClose={() => setShowAccessLevelModal(false)}
                  position_id={selectedPositions[0]?.id || 0}
                  updateAccessLevels={(
                    checkedState: { menu_id: number; has_access: boolean }[]
                  ) => {
                    setEditedAccessLevel(checkedState);
                  }}
                  checkedState={editedAccessLevel}
                  mode="accessLevel"
                />
              )}
              {isVisible && (
                <div className="animate-fade-in fixed left-1/2 top-5 z-50 flex w-96 -translate-x-1/2 transform flex-col items-center rounded-lg bg-gray-100 px-6 py-4 text-gray-800 shadow-lg">
                  {/* علامت تیک */}
                  <div className="mb-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                    ✓
                  </div>
                  {/* پیام */}
                  <p className="text-center font-medium">
                    دعوتنامه با موفقیت ارسال شد
                  </p>
                  {/* دکمه */}
                  <button
                    onClick={handleClose}
                    className="mt-4 rounded-lg bg-green-500 px-4 py-2 text-white shadow transition-all hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
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

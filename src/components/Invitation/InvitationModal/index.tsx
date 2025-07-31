import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import AccessLevelModal from "./AccessLevelModal";
import { toPersianDate } from "../../../utils/dateUtils";
import FormSection from "./FormSection";
import { validateInvitation } from "../../../utils/InvitationModal/validation";
import { useTranslations, useLocale } from "next-intl";

interface Position {
  id: number;
  title: string;
  title_fa: string;
  title_ar: string;
  title_tr: string;
  req_license: boolean;
  dependent: string | null;
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
    gender: "",
    letter_issuer: "",
    letter_number: "",
    letter_date: "",
    letter_approver: "",
    selectedPositions: [],
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
  const locale = useLocale();
  const t = useTranslations("InvitationModal");
  const tValidation = useTranslations("Validation");

  const handleClose = () => {
    setIsVisible(false);
    onClose();
    window.location.reload();
  };

  const getLocalizedTitle = useCallback(
    (position: Position): string => {
      switch (locale) {
        case "en":
          return position.title;
        case "ar":
          return position.title_ar;
        case "tr":
          return position.title_tr;
        case "fa":
        default:
          return position.title_fa;
      }
    },
    [locale]
  );

  useEffect(() => {
    if (positionsFromParent?.length) {
      setPositions(positionsFromParent);
    } else {
      const fetchPositions = async () => {
        try {
          const response = await fetch(`/api/positions`, {
            headers: {
              "Accept-Language": locale,
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            const responseData = await response.json().catch(() => null);
            console.error(
              "[InvitationModal] Server Error:",
              responseData || "Response is empty"
            );
            alert(responseData?.message || t("errorSubmitting"));
            return;
          }
          const data = await response.json();
          if (Array.isArray(data)) {
            setPositions(data);
          } else {
            console.error("[InvitationModal] Invalid positions data:", data);
            setPositions([]);
          }
        } catch (error) {
          console.error("[InvitationModal] Error fetching positions:", error);
          alert(t("errorSubmitting"));
        }
      };
      fetchPositions();
    }
  }, [positionsFromParent, t, locale]);

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
      selectedPositions: selectedIds,
    }));
  };

  const handleChange = (name: string, value: string | File | null) => {
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: value,
      };
      return newFormData;
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

    const validationErrors = validateInvitation(
      first_name,
      last_name,
      mobile,
      end_date,
      today,
      selectedPositions,
      formData.file,
      tValidation // پاس دادن تابع tValidation
    );

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
      try {
        const response = await fetch(`/api/invitation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": locale,
          },
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
          alert(responseData.message || t("errorSubmitting"));
        }
      } catch (error) {
        console.error("[InvitationModal] Error submitting invitation:", error);
        alert(t("errorSubmitting"));
      }
    }
  };

  const getFieldName = (
    first_name: string,
    last_name: string,
    letter_issuer: string,
    letter_number: string,
    letter_approver: string,
    error: string
  ): string => {
    if (error.includes("last_name")) return t("userInvitationTable.lastName");
    if (error.includes("first_name")) return t("userInvitationTable.firstName");
    if (error.includes("letter_issuer"))
      return t("AdditionalFormFields.letterIssuer");
    if (error.includes("letter_number"))
      return t("AdditionalFormFields.letterNumber");
    if (error.includes("letter_approver"))
      return t("AdditionalFormFields.letterApprover");
    if (error.includes("attachment"))
      return t("AdditionalFormFields.attachment");
    return "";
  };

  const hasLicenseRequirement = selectedPositions.some(
    (pos) => pos.req_license
  );

  return (
    <div>
      {showModal && (
        <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="relative rounded bg-white overflow-y-auto max-h-[90vh] w-full"
            style={{ maxWidth: hasLicenseRequirement ? "800px" : "500px" }}
          >
            <div className="modal-body rounded-md bg-gray-50 p-4">
              <h5 className="mb-4 text-xl font-semibold">{t("invitation")}</h5>
              <button
                type="button"
                className="btn-close ms-auto"
                onClick={onClose}
                style={{ position: "absolute", left: "10px", top: "10px" }}
              ></button>
              <FormSection
                formData={{
                  ...formData,
                  attachment: formData.attachment,
                  letter_date: formData.letter_date,
                  letter_approver: formData.letter_approver,
                  letter_number: formData.letter_number,
                  letter_issuer: formData.letter_issuer,
                  introductionLetter: formData.introductionLetter,
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  mobile: formData.mobile,
                  endDate: formData.end_date,
                  gender: formData.gender,
                  showAdditionalInputs: hasLicenseRequirement,
                }}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                toPersianDate={(date: string | Date) =>
                  toPersianDate(date, "yyyy/MM/dd")
                }
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
                  {t("cancellation")}
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-green-500 px-4 py-2 text-white shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  disabled={!isFormValidState}
                  onClick={handleSubmit}
                >
                  {t("sendInvitation")}
                </button>
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
                  <div className="mb-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                    ✓
                  </div>
                  <p className="text-center font-medium">{t("successfully")}</p>
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

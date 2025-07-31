import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { faIR as fa, enUS as en, ar, tr } from "date-fns/locale";
import { format, parse } from "date-fns";
import React, { useEffect, useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import AdditionalFormFields from "./AdditionalFormFields";

registerLocale("fa", fa);
registerLocale("en", en);
registerLocale("ar", ar);
registerLocale("tr", tr);

interface Position {
  id: number;
  title: string;
  title_fa: string;
  title_ar: string;
  title_tr: string;
  req_license: boolean;
}

interface FormData {
  attachment: File | null;
  letter_date: string;
  letter_approver: string;
  letter_number: string;
  letter_issuer: string;
  introductionLetter: File | null;
  first_name: string;
  last_name: string;
  mobile: string;
  endDate?: string;
  gender: string;
  showAdditionalInputs: boolean;
}

interface FormSectionProps {
  formData: FormData;
  handleChange: (name: string, value: string | File | null) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  toPersianDate: (date: string | Date, format: string) => string;
  today: string;
  selectedPositions: number[];
  positions: Position[];
  handlePositionChange: (positions: number[]) => void;
  requiresLicense: boolean;
  openAccessLevelModal: () => void;
  resetEditedAccessLevel: () => void;
  onFormValidation: (isValid: boolean) => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  formData,
  positions,
  selectedPositions,
  requiresLicense,
  handleChange,
  handleSubmit,
  handlePositionChange,
  openAccessLevelModal,
  toPersianDate,
  today,
  resetEditedAccessLevel,
  onFormValidation,
}) => {
  const [endDate, setEndDate] = useState<Date | null>(
    formData.endDate ? parse(formData.endDate, "yyyy-MM-dd", new Date()) : null
  );
  const t = useTranslations();
  const locale = useLocale();

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

  const getDatePickerLocale = useCallback(() => {
    switch (locale) {
      case "en":
        return en;
      case "ar":
        return ar;
      case "tr":
        return tr;
      case "fa":
      default:
        return fa;
    }
  }, [locale]);

  const textDirection =
    locale === "en" || locale === "tr" ? "text-left" : "text-right";
  const directionStyle: React.CSSProperties = {
    direction: locale === "en" || locale === "tr" ? "ltr" : "rtl",
  };

  useEffect(() => {
    const isValid =
      formData.last_name.trim() !== "" &&
      formData.mobile.trim() !== "" &&
      selectedPositions.length > 0 &&
      formData.gender !== "";
    onFormValidation(isValid);
  }, [
    formData.last_name,
    formData.mobile,
    formData.gender,
    selectedPositions,
    onFormValidation,
  ]);

  const isAccessLevelButtonDisabled = !selectedPositions.some((position_id) => {
    const position = positions.find((pos) => pos.id === position_id);
    return position && position.title_fa !== "ادمین وبسایت";
  });

  const handleDateChange = (date: Date | null) => {
    setEndDate(date);
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    handleChange("endDate", formattedDate);
  };

  const handleAdditionalFormChange = (
    name: string,
    value: string | File | null
  ) => {
    const mappedName =
      name === "letterDate"
        ? "letter_date"
        : name === "letterIssuer"
        ? "letter_issuer"
        : name === "letterNumber"
        ? "letter_number"
        : name === "letterApprover"
        ? "letter_approver"
        : name;
    handleChange(mappedName, value);
  };

  return (
    <div className="modal-body rounded-md bg-gray-50 p-4 overflow-y-auto max-h-[80vh]">
      <span>{t("FormSection.completionMessage")}</span>
      <div className="w-full">
        <div
          className={`grid ${
            requiresLicense ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          } gap-4 md:gap-6`}
        >
          <div className="w-full">
            <form
              onSubmit={handleSubmit}
              className={`space-y-4 ${textDirection} w-full`}
              style={directionStyle}
            >
              <div className="w-full rounded-lg bg-white p-4 shadow-lg">
                <div>
                  <label
                    htmlFor="first_name"
                    className={`block text-sm font-medium text-gray-700 ${textDirection}`}
                  >
                    {t("userInvitationTable.firstName")}
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={(e) => handleChange("first_name", e.target.value)}
                    onKeyDown={(event) => {
                      if (!/^[\u0600-\u06FFa-zA-Z\s]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    className={`mt-1 block w-full rounded-md border-2 border-gray-300 ${textDirection} shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="last_name"
                    className={`block text-sm font-medium text-gray-700 ${textDirection}`}
                  >
                    *{t("userInvitationTable.lastName")}
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleChange("last_name", e.target.value)}
                    onKeyDown={(event) => {
                      if (!/^[\u0600-\u06FFa-zA-Z\s]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    required
                    className={`mt-1 block w-full rounded-md border-2 border-gray-300 ${textDirection} shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile"
                    className={`block text-sm font-medium text-gray-700 ${textDirection}`}
                  >
                    *{t("userInvitationTable.mobilePhone")}
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    onKeyDown={(event) => {
                      if (
                        !/[0-9]/.test(event.key) &&
                        event.key !== "Backspace"
                      ) {
                        event.preventDefault();
                      }
                    }}
                    required
                    pattern="09[0-9]{9}"
                    maxLength={11}
                    placeholder="09XXXXXXXXX"
                    className={`mt-1 block w-full rounded-md border-2 border-gray-300 ${textDirection} shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className={`block text-sm font-medium text-gray-700 ${textDirection}`}
                  >
                    {t("userInvitationTable.expirationTime")}:{" "}
                    {formData.endDate
                      ? toPersianDate(formData.endDate, "yyyy/MM/dd")
                      : ""}
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={handleDateChange}
                    minDate={new Date(today)}
                    locale={getDatePickerLocale()}
                    dateFormat="yyyy/MM/dd"
                    className={`mt-1 block w-full rounded-md border-2 border-gray-300 ${textDirection} shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                    placeholderText={t("FormSection.selectDate")}
                  />
                </div>

                <div>
                  <label
                    className={`mb-1 block text-sm font-medium text-gray-700 ${textDirection}`}
                  >
                    {t("FormSection.gender")}:
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="male"
                        name="gender"
                        value="male"
                        type="radio"
                        checked={formData.gender === "male"}
                        onChange={(e) => handleChange("gender", e.target.value)}
                        required
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="male"
                        className={`ml-2 text-sm text-gray-700 ${textDirection}`}
                      >
                        {t("FormSection.male")}
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="female"
                        name="gender"
                        value="female"
                        type="radio"
                        checked={formData.gender === "female"}
                        onChange={(e) => handleChange("gender", e.target.value)}
                        required
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="female"
                        className={`ml-2 text-sm text-gray-700 ${textDirection}`}
                      >
                        {t("FormSection.female")}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-lg">
                  <div className="space-y-1">
                    <div className="invitation-modal">
                      <label
                        htmlFor="position"
                        className={`block text-sm font-medium text-gray-700 ${textDirection}`}
                      >
                        *{t("FormSection.roleSelection")}
                      </label>
                      <select
                        id="position"
                        multiple
                        value={selectedPositions.map(String)}
                        onChange={(e) => {
                          const selected = Array.from(
                            e.target.selectedOptions,
                            (option) => Number(option.value)
                          );
                          handlePositionChange(selected);
                          resetEditedAccessLevel();
                        }}
                        className={`block w-full rounded-md border-2 border-gray-300 ${textDirection} shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                      >
                        {positions.length > 0 ? (
                          [...positions]
                            .sort((a, b) => a.id - b.id)
                            .map((position) => (
                              <option key={position.id} value={position.id}>
                                {getLocalizedTitle(position)}
                              </option>
                            ))
                        ) : (
                          <option disabled>{t("FormSection.loading")}</option>
                        )}
                      </select>
                    </div>
                    <div className="w-full p-1">
                      <button
                        type="button"
                        onClick={openAccessLevelModal}
                        disabled={isAccessLevelButtonDisabled}
                        className={`w-full px-4 py-2 ${
                          isAccessLevelButtonDisabled
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        } rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                      >
                        {t("FormSection.editAccessLevel")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {requiresLicense && (
            <div className="w-full rounded-lg bg-white p-4 shadow-lg">
              <AdditionalFormFields
                onChange={handleAdditionalFormChange}
                formData={{
                  introductionLetter: formData.introductionLetter,
                  letterIssuer: formData.letter_issuer,
                  letterNumber: formData.letter_number,
                  letterDate: formData.letter_date,
                  letterApprover: formData.letter_approver,
                  attachment: formData.attachment,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormSection;

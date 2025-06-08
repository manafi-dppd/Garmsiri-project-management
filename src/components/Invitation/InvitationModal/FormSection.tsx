import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { faIR as fa } from "date-fns/locale";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import AdditionalFormFields from "./AdditionalFormFields";

registerLocale("fa", fa);

interface FormSectionProps {
  formData: {
    attachment: File | null;
    letter_date: string;
    letter_approver: string;
    letter_number: string;
    letter_issuer: string;
    introductionLetter: string;
    first_name: string;
    last_name: string;
    mobile: string;
    endDate?: string;
    gender: string;
    showAdditionalInputs: boolean;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  toPersianDate: (date: string | undefined) => string;
  today: string;
  selectedPositions: number[];
  positions: { id: number; title_fa: string }[];
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
  today,
  resetEditedAccessLevel,
  onFormValidation,
}) => {
  const [displayDate, setDisplayDate] = useState<string>("-");
  const [endDate, setEndDate] = useState<Date | null>(
    formData.endDate ? parse(formData.endDate, "yyyy-MM-dd", new Date()) : null
  );
  useEffect(() => {
    const isValid =
      formData.last_name.trim() !== "" &&
      formData.mobile.trim() !== "" &&
      selectedPositions.length > 0;
    onFormValidation(isValid);
  }, [
    formData.last_name,
    formData.mobile,
    selectedPositions,
    onFormValidation,
  ]);
  // Check if at least one non-"ادمین وبسایت" position is selected
  const isAccessLevelButtonDisabled = !selectedPositions.some((position_id) => {
    const position = positions.find((pos) => pos.id === position_id);
    return position && position.title_fa !== "ادمین وبسایت";
  });
  const { showAdditionalInputs } = formData;

  const displayPersianDate = (date: string | undefined): string => {
    if (!date) return "-";
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return "-";

      return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        calendar: "persian",
      }).format(dateObj);
    } catch {
      return "-";
    }
  };
  const handleDateChange = (date: Date | null) => {
    setEndDate(date);
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";

    setDisplayDate(displayPersianDate(formattedDate)); // ذخیره تاریخ نمایشی

    handleChange({
      target: {
        name: "endDate",
        value: formattedDate,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };
  return (
    <div className="modal-body rounded-md bg-gray-50 p-2">
      <span>تکمیل موارد ستاره‌دار الزامیست</span>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            className={`col-span-1 ${showAdditionalInputs ? "md:col-span-1" : "md:col-span-2"}`}
          >
            <form onSubmit={handleSubmit} className="space-y-4 text-right">
              <div className="flex max-h-screen flex-col justify-between gap-4 overflow-auto md:max-h-none md:flex-row md:space-x-4 md:overflow-visible">
                <div className="w-full rounded-lg bg-white p-2 shadow-lg">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      نام
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      onKeyDown={(event) => {
                        // فقط اجازه ورود اعداد را بدهید
                        if (!/^[\u0600-\u06FFa-zA-Z\s]*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      required
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 text-right shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      *نام خانوادگی
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      onKeyDown={(event) => {
                        // فقط اجازه ورود اعداد را بدهید
                        if (!/^[\u0600-\u06FFa-zA-Z\s]*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      required
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 text-right shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      *تلفن همراه
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      onKeyDown={(event) => {
                        // فقط اجازه ورود اعداد را بدهید
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
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 text-right shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      تاریخ پایان عضویت: {displayDate}
                    </label>
                    <DatePicker
                      selected={endDate}
                      onChange={handleDateChange}
                      minDate={new Date(today)}
                      locale="fa"
                      dateFormat="yyyy/MM/dd"
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 text-right shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholderText="انتخاب تاریخ"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      جنسیت:
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          id="male"
                          name="gender"
                          value="مرد"
                          type="radio"
                          checked={formData.gender === "مرد"}
                          onChange={handleChange}
                          required
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="male"
                          className="ml-2 text-sm text-gray-700"
                        >
                          مرد
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="female"
                          name="gender"
                          value="زن"
                          type="radio"
                          checked={formData.gender === "زن"}
                          onChange={handleChange}
                          required
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="female"
                          className="ml-2 text-sm text-gray-700"
                        >
                          زن
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={`rounded-lg bg-white p-2 shadow-lg`}>
                    <div className="space-y-1">
                      <div className="invitation-modal">
                        <label
                          htmlFor="position"
                          className="block text-sm font-medium text-gray-700"
                        >
                          *انتخاب سمت
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
                          className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          {positions.length > 0 ? (
                            positions.map((position) => (
                              <option key={position.id} value={position.id}>
                                {position.title_fa}
                              </option>
                            ))
                          ) : (
                            <option disabled>در حال بارگذاری...</option>
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
                          ویرایش سطح دسترسی
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {requiresLicense && (
                  <div className="mt-4 w-full md:mt-0 md:w-[80%]">
                    <AdditionalFormFields
                      onChange={handleChange}
                      formData={{
                        introductionLetter: formData.introductionLetter || "",
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection;

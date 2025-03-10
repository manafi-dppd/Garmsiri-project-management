import {useEffect} from 'react';
import AdditionalFormFields from './AdditionalFormFields';

interface FormSectionProps {
  showAdditionalInputs: boolean;
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  toPersianDate: (date: string | undefined) => string;
  today: string;
  selectedPositions: number[];
  positions: {id: number; title_fa: string}[];
  handlePositionChange: (positions: number[]) => void;
  requiresLicense: boolean;
  hasLicenseRequirement: boolean;
  openAccessLevelModal: () => void;
  resetEditedAccessLevel: () => void;
  onFormValidation: (isValid: boolean) => void;
  onPositionChange: (selectedIds: number[]) => void;
  // isAccessLevelButtonDisabled: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({
  showAdditionalInputs,
  formData,
  positions,
  selectedPositions,
  requiresLicense,
  hasLicenseRequirement,
  // isAccessLevelButtonDisabled,
  handleChange,
  handleSubmit,
  handlePositionChange,
  openAccessLevelModal,
  toPersianDate,
  today,
  resetEditedAccessLevel,
  onFormValidation,
  onPositionChange,
}) => {
  useEffect(() => {
    // اعتبارسنجی فرم
    const isValid =
      formData.lastName.trim() !== '' &&
      formData.mobile.trim() !== '' &&
      selectedPositions.length > 0;
    onFormValidation(isValid);
  }, [formData.lastName, formData.mobile, selectedPositions, onFormValidation]);
  // Check if at least one non-"ادمین وبسایت" position is selected
  const isAccessLevelButtonDisabled = !selectedPositions.some((positionId) => {
    const position = positions.find((pos) => pos.id === positionId);
    return position && position.title_fa !== 'ادمین وبسایت';
  });
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (option) =>
      Number(option.value),
    );
    onPositionChange(selected);
    resetEditedAccessLevel(); // ریست کردن دسترسی‌ها
    handlePositionChange(selected);
  };

  return (
    <div className="modal-body bg-gray-50 p-2 rounded-md">
      <span>تکمیل موارد ستاره‌دار الزامیست</span>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`col-span-1 ${showAdditionalInputs ? 'md:col-span-1' : 'md:col-span-2'}`}
          >
            <form onSubmit={handleSubmit} className="text-right space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4 md:space-x-4 overflow-auto md:overflow-visible max-h-screen md:max-h-none">
                <div className="bg-white rounded-lg shadow-lg p-2 w-full">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      نام
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onKeyDown={(event) => {
                        // فقط اجازه ورود اعداد را بدهید
                        if (!/^[\u0600-\u06FFa-zA-Z\s]*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      required
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-right"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      *نام خانوادگی
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onKeyDown={(event) => {
                        // فقط اجازه ورود اعداد را بدهید
                        if (!/^[\u0600-\u06FFa-zA-Z\s]*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      required
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-right"
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
                          event.key !== 'Backspace'
                        ) {
                          event.preventDefault();
                        }
                      }}
                      required
                      pattern="09[0-9]{9}"
                      maxLength={11}
                      placeholder="09XXXXXXXXX"
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-right"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      تاریخ پایان عضویت: {toPersianDate(formData.endDate) || ''}
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate || ''}
                      onChange={handleChange}
                      min={today}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      جنسیت:
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          id="male"
                          name="gender"
                          value="مرد"
                          type="radio"
                          checked={formData.gender === 'مرد'}
                          onChange={handleChange}
                          required
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
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
                          checked={formData.gender === 'زن'}
                          onChange={handleChange}
                          required
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
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
                  <div className={`p-2 bg-white rounded-lg shadow-lg`}>
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
                              (option) => Number(option.value),
                            );
                            handlePositionChange(selected);
                            resetEditedAccessLevel();
                          }}
                          className="block w-full rounded-md shadow-sm border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
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
                          className={`w-full py-2 px-4 ${
                            isAccessLevelButtonDisabled
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-indigo-600 hover:bg-indigo-700'
                          } text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          ویرایش سطح دسترسی
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {requiresLicense && (
                  <div className="w-full md:w-[80%] mt-4 md:mt-0">
                    <AdditionalFormFields
                      onChange={handleChange}
                      formData={formData}
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

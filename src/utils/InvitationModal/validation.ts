/**
 * تابع برای بررسی صحت فایل آپلود شده
 * @param file - فایل انتخاب شده
 * @param fieldName - نام فیلد برای پیام خطا
 * @returns آرایه‌ای از پیام‌های خطا
 */

export const validateFileFormat = (
  file: File | null,
  fieldName: string,
): string[] => {
  const errors: string[] = [];

  if (file) {
    const allowedFormats = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'application/pdf',
    ];
    if (!allowedFormats.includes(file.type)) {
      errors.push(`${fieldName} باید تصویر (PNG, JPG, JPEG) یا PDF باشد.`);
    }
  }

  return errors;
};

/**
 * تابع برای بررسی صحت فرم دعوتنامه
 * @param firstName - نام
 * @param lastName - نام خانوادگی
 * @param mobile - شماره تلفن همراه
 * @param endDate - تاریخ پایان عضویت
 * @param today - تاریخ امروز
 * @param selectedPositions - آرایه‌ای از مقادیر انتخاب شده برای سمت‌ها
 * @param file - فایل معرفی‌نامه
 * @returns آرایه‌ای از پیام‌های خطا
 */
export const validateInvitation = (
  firstName: string,
  lastName: string,
  mobile: string,
  endDate: string,
  today: string,
  selectedPositions: number[],
  file: File | null,
): string[] => {
  let errors: string[] = [];

  // صحت‌سنجی نام
  errors = [...errors, ...validateField(firstName, 'نام', false, 20)];

  // صحت‌سنجی نام خانوادگی
  errors = [...errors, ...validateField(lastName, 'نام خانوادگی', true, 20)];

  // صحت‌سنجی شماره تلفن همراه
  errors = [...errors, ...validatemobile(mobile)];

  // صحت‌سنجی تاریخ پایان عضویت
  errors = [...errors, ...validateEndDate(endDate, today)];

  // صحت‌سنجی انتخاب سمت
  errors = [...errors, ...validatePositionSelection(selectedPositions)];

  // صحت‌سنجی فایل معرفی‌نامه
  errors = [...errors, ...validateFileFormat(file, 'معرفی‌نامه')];

  return errors;
};
function validateField(
  value: string,
  fieldName: string,
  isRequired: boolean,
  maxLength: number,
): string[] {
  const errors: string[] = [];
  const persianRegex = /^[آ-ی\s]*$/; // حروف فارسی و فضای خالی

  if (isRequired && !value) {
    errors.push(`${fieldName} الزامی است.`);
  } else if (value && !persianRegex.test(value)) {
    errors.push(`${fieldName} باید فقط شامل حروف فارسی و فاصله باشد.`);
  } else if (value.length > maxLength) {
    errors.push(`${fieldName} نباید بیشتر از ${maxLength} کاراکتر باشد.`);
  }
  return errors;
}

function validatemobile(mobile: string): string[] {
  const errors: string[] = [];
  const phoneRegex = /^09\d{9}$/; // مثال برای صحت‌سنجی شماره موبایل ایرانی
  if (!phoneRegex.test(mobile)) {
    errors.push('شماره تلفن وارد شده معتبر نیست.');
  }
  return errors;
}

function validateEndDate(endDate: string, today: string): string[] {
  const errors: string[] = [];
  if (new Date(endDate) < new Date(today)) {
    errors.push('تاریخ پایان عضویت نباید قبل از تاریخ امروز باشد.');
  }
  return errors;
}

function validatePositionSelection(selectedPositions: number[]): string[] {
  const errors: string[] = [];
  if (selectedPositions.length === 0) {
    errors.push('انتخاب حداقل یک سمت الزامی است.');
  }
  return errors;
}

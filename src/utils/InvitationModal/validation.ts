// utils/validation.ts

/**
 * تابع برای بررسی صحت نام
 * @param firstName - نام ورودی برای صحت‌سنجی
 * param lastName - نام خانوادگی ورودی برای صحت‌سنجی
 * @returns آرایه‌ای از پیام‌های خطا (در صورت وجود)
 */
export const validateInvitation = (
  firstName: string,
  lastName: string,
): string[] => {
  const errorMessages: string[] = [];

  // بررسی اینکه فقط حروف فارسی، انگلیسی و فاصله مجاز است
  let regex = /^[\u0600-\u06FFa-zA-Z\s]*$/;
  if (!regex.test(firstName)) {
    errorMessages.push('نام فقط باید حروف و فاصله باشد.');
  }

  // بررسی طول ورودی
  if (firstName.length > 20) {
    errorMessages.push('نام نباید بیشتر از 20 کاراکتر باشد.');
  }

  // بررسی پر بودن مقدار
  if (!lastName.trim()) {
    errorMessages.push('تکمیل نام خانوادگی الزامی است.');
    return errorMessages; // از بررسی‌های بعدی صرف‌نظر کنید
  }

  // بررسی اینکه فقط حروف فارسی، انگلیسی و فاصله مجاز است
  regex = /^[\u0600-\u06FFa-zA-Z\s]*$/;
  if (!regex.test(lastName)) {
    errorMessages.push('نام خانوادگی فقط باید شامل حروف و فاصله باشد.');
  }

  // بررسی طول ورودی
  if (lastName.length > 20) {
    errorMessages.push('نام خانوادگی نباید بیشتر از 20 کاراکتر باشد.');
  }

  return errorMessages;
};

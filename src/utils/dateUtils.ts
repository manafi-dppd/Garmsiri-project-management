// src/utils/dateUtils.ts
export const toPersianDate = (date: string | Date): string => {
  // تبدیل تاریخ به فرمت فارسی
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('fa-IR', options);
};

// src/utils/dateUtils.ts
export const toPersianDate = (date: string | Date, format: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  // تبدیل تاریخ به روز هفته
  if (format === 'dddd') {
    return new Date(date).toLocaleDateString('fa-IR', {weekday: 'long'});
  }

  // تبدیل تاریخ به فرمت شمسی
  return new Date(date).toLocaleDateString('fa-IR', options);
};
export const formatDateTime = (date: string | Date): string => {
  // ایجاد یک شیء Date از تاریخ ورودی
  const dateObj = new Date(date);

  // دریافت سال، ماه و روز به‌صورت UTC
  const year = dateObj.getUTCFullYear();
  const month = dateObj.getUTCMonth() + 1; // ماه‌ها از ۰ شروع می‌شوند، بنابراین +۱ می‌کنیم
  const day = dateObj.getUTCDate();

  // ایجاد یک تاریخ جدید بر اساس UTC
  const utcDate = new Date(Date.UTC(year, month - 1, day));

  // تبدیل تاریخ به فرمت شمسی
  const persianDate = toPersianDate(utcDate, 'yyyy/MM/dd');

  // دریافت ساعت و دقیقه به‌صورت UTC
  const hours = dateObj.getUTCHours().toString().padStart(2, '0'); // ساعت با دو رقم
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0'); // دقیقه با دو رقم

  // ترکیب تاریخ شمسی و زمان
  return `${persianDate}-${hours}:${minutes}`;
};
export function getCurrentSalMahDahe(): {
  sal: number;
  mah: number;
  dahe: number;
} {
  const today = new Date();

  // دریافت تاریخ شمسی به‌صورت رشته‌ای
  const persianDate = today.toLocaleDateString('fa-IR'); // مثلاً "۱۴۰۳/۱۱/۲۷"

  // تبدیل اعداد فارسی به انگلیسی
  const toEnglishDigits = (str: string) =>
    str.replace(/[\u06F0-\u06F9]/g, (d) =>
      String.fromCharCode(d.charCodeAt(0) - 1728),
    );

  // پردازش تاریخ
  const [salStr, mahStr, dayStr] = toEnglishDigits(persianDate).split('/'); // ["1403", "11", "27"]

  const sal = parseInt(salStr, 10); // سال شمسی
  const mah = parseInt(mahStr, 10); // ماه شمسی
  const day = parseInt(dayStr, 10); // روز شمسی
  const dahe = Math.ceil(day / 10); // دهه (1 برای 1-10، 2 برای 11-20 و 3 برای 21-31)

  return {sal, mah, dahe};
}

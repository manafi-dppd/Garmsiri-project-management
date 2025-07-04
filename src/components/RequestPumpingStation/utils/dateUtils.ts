// src/utils/dateUtils.ts
export const toPersianDate = (date: string | Date, format: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };

  // تبدیل تاریخ به روز هفته
  if (format === 'dddd') {
    return new Date(date).toLocaleDateString('fa-IR', { weekday: 'long' });
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
export const formatLocalDateTime = (date: string | Date): string => {
  // ایجاد یک شیء Date از تاریخ ورودی
  const dateObj = new Date(date);

  // دریافت سال، ماه و روز به‌صورت محلی
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // ماه‌ها از ۰ شروع می‌شوند، بنابراین +۱ می‌کنیم
  const day = dateObj.getDate();

  // ایجاد یک تاریخ جدید بر اساس زمان محلی
  const localDate = new Date(year, month - 1, day);

  // تبدیل تاریخ به فرمت شمسی
  const persianDate = toPersianDate(localDate, 'yyyy/MM/dd');

  // دریافت ساعت و دقیقه به‌صورت محلی
  const hours = dateObj.getHours().toString().padStart(2, '0'); // ساعت با دو رقم
  const minutes = dateObj.getMinutes().toString().padStart(2, '0'); // دقیقه با دو رقم

  // ترکیب تاریخ شمسی و زمان محلی
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
    str.replace(/[\u06F0-\u06F9]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728));

  // پردازش تاریخ
  const [salStr, mahStr, dayStr] = toEnglishDigits(persianDate).split('/'); // ["1403", "11", "27"]

  const sal = parseInt(salStr, 10); // سال شمسی
  const mah = parseInt(mahStr, 10); // ماه شمسی
  const day = parseInt(dayStr, 10); // روز شمسی
  const dahe = Math.ceil(day / 10); // دهه (1 برای 1-10، 2 برای 11-20 و 3 برای 21-31)

  return { sal, mah, dahe };
}

// src/utils/dateUtils.ts

export const toPersianDateOnly = (date: string | Date | undefined): string => {
  if (!date) return '-';
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    calendar: 'persian',
    numberingSystem: 'arab'
  };

  try {
    // اگر تاریخ به فرمت YYYY-MM-DD HH:mm:ss.SSS باشد
    if (typeof date === 'string' && date.includes('-') && date.includes(' ')) {
      const [datePart] = date.split(' ');
      const [year, month, day] = datePart.split('-');
      return new Date(`${year}-${month}-${day}`)
        .toLocaleDateString('fa-IR', options);
    }
    // اگر تاریخ به فرمت YYYY/MM/DD باشد
    else if (typeof date === 'string' && date.includes('/')) {
      const [year, month, day] = date.split('/');
      return new Date(`${year}-${month}-${day}`)
        .toLocaleDateString('fa-IR', options);
    }
    // اگر شیء Date باشد
    else if (date instanceof Date) {
      return date.toLocaleDateString('fa-IR', options);
    }
    return '-';
  } catch (e) {
    console.error('Error converting date:', e);
    return '-';
  }
};
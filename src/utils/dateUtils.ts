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
export function getCurrentSalMahDahe() {
  const today = new Date();
  const sal = today.getFullYear(); // دریافت سال میلادی (در صورت نیاز تبدیل به شمسی شود)
  const mah = today.getMonth() + 1; // دریافت ماه (از 0 شروع می‌شود، پس 1 اضافه شده)
  const dahe = Math.floor(today.getDate() / 10) + 1; // دهه (1 برای 1-10، 2 برای 11-20 و 3 برای 21-31)

  return { sal, mah, dahe };
}


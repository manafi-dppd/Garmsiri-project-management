export const locales = ["en", "fa", "ar", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = "en";

export const localeNames = {
  en: "English",
  fa: "فارسی",
  ar: "العربية",
  tr: "Türkçe",
};

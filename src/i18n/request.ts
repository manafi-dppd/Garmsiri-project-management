import { getRequestConfig } from "next-intl/server";
import { locales } from "./config";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) {
    locale = "en"; // مقدار پیش‌فرض
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
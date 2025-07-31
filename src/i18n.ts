import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale, Locale } from "./i18n/config";

export default getRequestConfig(async ({ locale }: { locale?: string }) => {
  const validLocale: Locale =
    locale && locales.includes(locale as Locale)
      ? (locale as Locale)
      : defaultLocale;
  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
  };
});

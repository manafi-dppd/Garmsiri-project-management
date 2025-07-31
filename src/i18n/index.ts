import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "fa", "ar", "tr"] as const;
export const defaultLocale = "en";

export default getRequestConfig(async ({ locale }: { locale?: string }) => {
  const validLocale =
    locale && locales.includes(locale as any) ? locale : defaultLocale;

  return {
    locale: validLocale as (typeof locales)[number],
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});

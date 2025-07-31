import { createTranslator } from "next-intl";
import { locales, Locale, defaultLocale } from "@/i18n/config";

export async function getServerTranslations(namespace: string, locale: Locale) {
  try {
    const localeValidated = locales.includes(locale) ? locale : defaultLocale;
    const messages = (await import(`@/messages/${localeValidated}.json`))
      .default;
    return createTranslator({ locale: localeValidated, messages, namespace });
  } catch (error) {
    console.error("Error loading translations:", error);
    const messages = (await import(`@/messages/${defaultLocale}.json`)).default;
    return createTranslator({ locale: defaultLocale, messages, namespace });
  }
}

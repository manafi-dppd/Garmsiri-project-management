import { createTranslator } from "next-intl";
import { locales, Locale, defaultLocale } from "@/i18n/config";
import { notFound } from "next/navigation";

export default async function NotFound({
  params,
}: {
  params?: { locale: Locale };
}) {
  const locale =
    params?.locale && locales.includes(params.locale)
      ? params.locale
      : defaultLocale;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages, namespace: "notFound" });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900">{t("title")}</h1>
      <p className="mt-4 text-lg text-gray-600">{t("message")}</p>
    </div>
  );
}

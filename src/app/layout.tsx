import { NextIntlClientProvider } from "next-intl";
import { locales, Locale, defaultLocale } from "@/i18n/config";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { locale: Locale };
}) {
  const locale =
    params?.locale && locales.includes(params.locale)
      ? params.locale
      : defaultLocale;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

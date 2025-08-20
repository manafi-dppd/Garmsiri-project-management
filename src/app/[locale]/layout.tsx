import "@/app/globals.css";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { locales, defaultLocale, Locale } from "@/i18n/config";

export interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}) {
  const validLocale: Locale = locales.includes(params.locale)
    ? params.locale
    : defaultLocale;
  const t = await getTranslations({ locale: validLocale, namespace: "common" });
  return {
    title: `${t("title")} ${t("projectName")}`,
    description: t("title"),
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const validLocale: Locale = locales.includes(params.locale)
    ? params.locale
    : defaultLocale;
  const messages = (await import(`@/messages/${validLocale}.json`)).default;
  const dir = validLocale === "fa" || validLocale === "ar" ? "rtl" : "ltr";

  let menus: any[] = [];
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/menus?locale=${validLocale}`,
      { cache: "force-cache" }
    );
    if (response.status === 401) {
      console.warn("Unauthorized access to menus, handled on client-side");
    } else {
      menus = await response.json();
    }
  } catch (error) {
    console.error("Error fetching menus:", error);
  }

  return (
    <html lang={validLocale} dir={dir}>
      <head>
        <title>{(await generateMetadata({ params })).title}</title>
        <meta
          name="description"
          content={(await generateMetadata({ params })).description}
        />
      </head>
      <body
        className={`relative min-h-screen font-sans text-gray-900 ${
          dir === "rtl" ? "rtl" : "ltr"
        }`}
      >
        <NextIntlClientProvider locale={validLocale} messages={messages}>
          <div className="relative z-10">
            <Header locale={validLocale} menus={menus} />
            <main className="container mx-auto py-2">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

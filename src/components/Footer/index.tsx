"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { locales, Locale } from "@/i18n/config";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale() as Locale;

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>{t("copyright")}</p>
        <div className="mt-4">
          {locales.map((lang: Locale) => (
            <Link
              key={lang}
              href={`/${lang}`}
              className="mx-2 text-gray-300 hover:text-white"
            >
              {lang.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

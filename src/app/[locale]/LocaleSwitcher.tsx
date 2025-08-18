"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { localeNames, locales } from "@/i18n/config";
import type { Route } from "next";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (!locales.includes(newLocale as any)) return;
    const segments = pathname.split("/");
    const newPath =
      segments.length > 2
        ? `/${newLocale}/${segments.slice(2).join("/")}`
        : `/${newLocale}`;
    router.push(newPath as Route);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(localeNames).map(([lang, name]) => (
        <button
          key={lang}
          onClick={() => switchLocale(lang)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            locale === lang
              ? "bg-blue-800 text-white shadow-md border border-blue-900 hover:bg-blue-900"
              : "bg-transparent text-white border border-white hover:bg-gray-700/30"
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
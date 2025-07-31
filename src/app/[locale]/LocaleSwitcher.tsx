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
    <div className="flex gap-2">
      {Object.entries(localeNames).map(([lang, name]) => (
        <button
          key={lang}
          onClick={() => switchLocale(lang)}
          className={`px-3 py-1 rounded text-xs ${
            locale === lang
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

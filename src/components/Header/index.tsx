"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import NavMenu from "../NavMenu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../../app/[locale]/LocaleSwitcher";
import { Menu } from "@/types/menu";
import { locales, Locale, defaultLocale } from "@/i18n/config";

interface HeaderProps {
  locale: Locale;
  menus: Menu[];
}

interface UserInfo {
  firstname: string;
  lastname: string;
  positions: { positionTitle: string; title: string }[];
}

export default function Header({ locale, menus }: HeaderProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const pathname = usePathname();
  const t = useTranslations("common");
  const router = useRouter();

  const excludedPaths = ["/login", "/register", "/update-credentials"];

  const shouldShowNavMenu = pathname
    ? !excludedPaths.some((path) => pathname.includes(path))
    : false;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`/api/get-user-info?locale=${locale}`, {
          credentials: "include",
        });

        if (!res.ok) {
          if (res.status === 401) {
            router.push(`/${locale}/login`);
            return;
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUserInfo(data);
      } catch (error) {
        console.error("[Header] Failed to fetch user info:", error);
      }
    };

    if (shouldShowNavMenu) {
      fetchUserInfo();
    }
  }, [shouldShowNavMenu, locale, router]);

  return (
    <>
      <header className="bg-green-800 p-4 text-center text-white">
        <div className="container mx-auto flex items-center justify-between">
          <Link href={`/${locale}`}>
            <div style={{ fontFamily: "b titr", cursor: "pointer" }}>
              <h1 className="border-b text-lg">{t("title")}</h1>
              <h4 className="text-2xl">{t("projectName")}</h4>
            </div>
          </Link>

          <div className="flex flex-col items-end gap-2">
            {userInfo && (
              <div className="text-right text-sm text-white">
                <p className="font-bold underline">
                  {`${userInfo.firstname} ${userInfo.lastname}`}
                </p>
                {userInfo.positions.map((pos, index) => (
                  <p key={index} className="font-light no-underline">
                    {pos.positionTitle}
                  </p>
                ))}
              </div>
            )}
            <div className="scale-90">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </header>
      {shouldShowNavMenu && <NavMenu menus={menus} />}
    </>
  );
}

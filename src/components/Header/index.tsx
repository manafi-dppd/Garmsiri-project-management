"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import NavMenu from "../NavMenu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import LocaleSwitcher from "../../app/[locale]/LocaleSwitcher";
import { Menu } from "@/types/menu";
import { Locale } from "@/i18n/config";

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
  const currentLocale = useLocale();
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

  // تابع برای شکستن خطوط عنوان بر اساس زبان
  const renderTitle = () => {
    const title = t("title");
    const projectName = t("projectName");

    if (["en", "tr"].includes(currentLocale)) {
      const [firstPart, secondPart] = title.split(/(?<=integrated|entegre)\s/);

      return (
        <>
          <h1 className="border-b text-lg leading-tight">
            {" "}
            {/* اضافه کردن leading-tight */}
            <span className="block">{firstPart}</span>{" "}
            {/* استفاده از block برای کنترل بهتر */}
            <span className="block mt-0">{secondPart}</span>{" "}
            {/* mt-0 برای حذف فاصله بالا */}
          </h1>
          <h4 className="text-2xl">{projectName}</h4>
        </>
      );
    }

    return (
      <>
        <h1 className="border-b text-lg">{title}</h1>
        <h4 className="text-2xl">{projectName}</h4>
      </>
    );
  };

  return (
    <>
      <header className="bg-green-800 p-4 text-center text-white">
        <div className="container mx-auto flex items-center justify-between">
          <Link href={`/${locale}`}>
            <div style={{ fontFamily: "b titr", cursor: "pointer" }}>
              {renderTitle()}
            </div>
          </Link>

          <div className="flex items-center gap-8">
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
            <LocaleSwitcher />
          </div>
        </div>
      </header>
      {shouldShowNavMenu && <NavMenu menus={menus} />}
    </>
  );
}

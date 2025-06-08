"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import NavMenu from "../NavMenu";
import Link from "next/link";
import { usePathname } from "next/navigation"; // اضافه کردن این import

interface menu {
  id: number;
  title: string;
  title_fa: string;
  active: boolean;
  parent_id: number | null;
  slug: string;
  parentSlug: string | null;
}

interface UserInfo {
  firstname: string;
  lastname: string;
  positions: string[];
}

export default function Header() {
  const [menus, setMenus] = useState<menu[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const pathname = usePathname(); // دریافت مسیر فعلی

  // لیست مسیرهایی که نباید NavMenu نمایش داده شود
  const excludedPaths = ["/login", "/register", "/update-credentials"];

  // بررسی آیا مسیر فعلی در لیست مسیرهای مستثنی شده است
  const shouldShowNavMenu = pathname
    ? !excludedPaths.some((path) => pathname.startsWith(path))
    : false;

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("/api/menus", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/login"; // تغییر به window.location برای خارج از کامپوننت
          }
          return;
        }
        const data: menu[] = await response.json();
        setMenus(data);
      } catch {}
    };

    const fetchUserInfo = async () => {
      try {
        const res = await fetch("/api/get-user-info", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch user info");
        const data = await res.json();
        setUserInfo(data);
      } catch {}
    };

    // فقط اگر نیاز به نمایش NavMenu باشد، منوها را فراخوانی کنیم
    if (shouldShowNavMenu) {
      fetchMenus();
    }

    fetchUserInfo();
  }, [shouldShowNavMenu]);

  return (
    <>
      <header className="bg-green-800 p-4 text-center text-white">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" passHref>
            <div style={{ fontFamily: "b titr", cursor: "pointer" }}>
              <h1 className="border-b text-lg">سامانه جامع مدیریت یکپارچه</h1>
              <h4 className="text-2xl">طــرح گرمسـیـری</h4>
            </div>
          </Link>
          <div>
            {userInfo && (
              <div className="text-right text-sm text-white">
                <p className="font-bold underline">
                  {`${userInfo.firstname} ${userInfo.lastname}`}
                </p>
                {userInfo.positions.map((pos, index) => (
                  <p key={index} className="font-light no-underline">
                    {pos}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      {shouldShowNavMenu && <NavMenu menus={menus} />}
    </>
  );
}

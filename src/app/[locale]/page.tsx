"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserInfo {
  firstname: string;
  lastname: string;
  positions: { positionTitle: string; title: string }[];
}

export default function Home() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`/api/get-user-info`, {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });
        if (!res.ok) {
          const errorData = await res.json();
          console.error("[HomePage] Error response:", errorData);
          throw new Error(
            `HTTP error! status: ${res.status}, message: ${
              errorData.error || "Unknown error"
            }`
          );
        }
        const data = await res.json();
        console.log("data: ", data);
        setUserInfo(data);
        setError(null);
      } catch (error) {
        console.error("[HomePage] Failed to fetch user info:", error);
        setError(t("errors.fetchUserInfo"));
        // هدایت به صفحه لاگین در صورت خطای 401
        if (error instanceof Error && error.message.includes("401")) {
          router.push(`/${locale}/login`);
        }
      }
    };

    fetchUserInfo();
  }, [locale, router, t]);

  const isAdminOrCreator = userInfo?.positions.some((pos) =>
    ["Website Admin", "Website Creator"].includes(pos.title)
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-normal bg-gradient-to-b from-blue-50 to-white pt-24 font-[family-name:var(--font-geist-sans)]">
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <h1 className="mb-8 text-center text-4xl font-bold text-blue-900 md:text-5xl">
        {t("common.welcome")}
      </h1>

      <main className="w-full max-w-4xl">
        <section className="flex flex-wrap justify-center gap-8">
          {isAdminOrCreator && (
            <Link href={`/${locale}/current-affairs/browser-management`}>
              <div className="transform rounded-lg bg-white p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:bg-purple-50 hover:shadow-2xl">
                <div className="mb-6 text-6xl text-blue-600">💻</div>
                <h3 className="mb-4 text-2xl font-bold text-blue-800">
                  {t("menu.browserManagement")}
                </h3>
                <p className="text-gray-600">
                  {t("menu.browserManagementDescription")}
                </p>
              </div>
            </Link>
          )}

          <Link
            href={`/${locale}/current-affairs/water-request/request-from-pumping-station`}
          >
            <div className="transform rounded-lg bg-white p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:bg-orange-50 hover:shadow-2xl">
              <div className="mb-6 text-6xl text-blue-600">🚰</div>
              <h3 className="mb-4 text-2xl font-bold text-blue-800">
                {t("menu.requestFromPumpingStation")}
              </h3>
              <p className="text-gray-600">
                {t("menu.waterRequestDescription")}
              </p>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}

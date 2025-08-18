/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Locale, locales } from "@/i18n/config";

interface LoginSuccessResponse {
  success: boolean;
  message: string;
  token: string;
}

interface RegisterRedirectResponse {
  first_name: string;
  last_name: string;
  mobile: string;
  id: string;
  active: boolean;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("login");
  const { locale } = useParams() as { locale: Locale };

  if (!t || !locale || !locales.includes(locale)) {
    console.error("[LoginPage] Translations or locale not loaded:", { locale });
    return <div>Loading translations...</div>;
  }

  const isRtl = locale === "fa" || locale === "ar";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": locale,
        },
        body: JSON.stringify({ username, password, locale }),
        credentials: "include",
      });

      const responseText = await response.text();

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          console.error("[LoginPage] Error response:", errorData);
          throw new Error(errorData.error || t("errors.invalidCredentials"));
        } catch {
          throw new Error(responseText || t("errors.unknown"));
        }
      }

      const data = JSON.parse(responseText);

      if (isRegisterRedirectResponse(data)) {
        const redirectUrl =
          `/${locale}/register?first_name=${encodeURIComponent(
            data.first_name || ""
          )}&last_name=${encodeURIComponent(
            data.last_name || ""
          )}&mobile=${encodeURIComponent(
            data.mobile || ""
          )}&id=${encodeURIComponent(data.id)}&active=${data.active}` as const;
        router.push(redirectUrl as any);
      } else if (isLoginSuccessResponse(data)) {
        const callbackUrl = searchParams.get("callbackUrl");
        const redirectUrl =
          callbackUrl &&
          !callbackUrl.startsWith("/login") &&
          !callbackUrl.startsWith("/api")
            ? callbackUrl.startsWith(`/${locale}`)
              ? callbackUrl
              : `/${locale}${
                  callbackUrl.startsWith("/") ? callbackUrl : "/" + callbackUrl
                }`
            : `/${locale}`;
        window.location.href = redirectUrl;
      } else {
        console.error("[LoginPage] Invalid response format:", data);
        throw new Error(t("errors.invalidResponse"));
      }
    } catch (error: any) {
      console.error("[LoginPage] Login error:", error);
      setError(
        error.message.includes("credentials")
          ? t("errors.invalidCredentials")
          : error.message.includes("expired")
          ? t("errors.accountExpired")
          : t("errors.unknown")
      );
    } finally {
      setIsLoading(false);
    }
  };

  function isLoginSuccessResponse(data: unknown): data is LoginSuccessResponse {
    const isValid =
      typeof data === "object" &&
      data !== null &&
      "success" in data &&
      "message" in data &&
      "token" in data;
    return isValid;
  }

  function isRegisterRedirectResponse(
    data: unknown
  ): data is RegisterRedirectResponse {
    const potentialResponse = data as RegisterRedirectResponse;
    const isValid =
      typeof data === "object" &&
      data !== null &&
      "first_name" in potentialResponse &&
      "last_name" in potentialResponse &&
      "mobile" in potentialResponse &&
      "id" in potentialResponse &&
      "active" in potentialResponse;
    return isValid;
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234f46e5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 21v-2a4 4 0 0 0-8 0v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3Cpath d='M6 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2'%3E%3C/path%3E%3C/svg%3E"
          alt={t("logoAlt")}
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          {t("title")}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              {t("usernameLabel")}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="username"
                id="username"
                placeholder={t("usernamePlaceholder")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                {t("passwordLabel")}
              </label>
            </div>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder={t("passwordPlaceholder")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onKeyDown={(event) => {
                  if (!/^[a-zA-Z0-9]*$/.test(event.key)) {
                    event.preventDefault();
                    setShowTooltip(true);
                    setTimeout(() => setShowTooltip(false), 3000);
                  }
                }}
              />
              {showTooltip && (
                <div className="absolute left-0 top-full mt-1 rounded bg-red-500 px-2 py-1 text-sm text-white shadow">
                  {t("keyboardWarning")}
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 ${
                  isRtl ? "left-0 pl-3" : "right-0 pr-3"
                } flex items-center text-sm leading-5`}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {isLoading ? t("loggingIn") : t("loginButton")}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

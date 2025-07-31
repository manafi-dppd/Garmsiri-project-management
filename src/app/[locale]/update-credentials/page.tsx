"use client";

import React, { Suspense, useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import debounce from "lodash/debounce";

function UpdateCredentialsPageContent() {
  const router = useRouter();
  const rawSearchParams = useSearchParams();
  const searchParams = useMemo(
    () => rawSearchParams ?? new URLSearchParams(),
    [rawSearchParams]
  );
  const [username, setUsername] = useState<string>("");
  const [confirmUsername, setConfirmUsername] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showConfirmTooltip, setShowConfirmTooltip] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const id = searchParams.get("id") ?? "";
  const firstName = searchParams.get("first_name") ?? "";
  const lastName = searchParams.get("last_name") ?? "";
  const locale = useLocale();
  const t = useTranslations("updateCredentials");
  const isRtl = locale === "fa" || locale === "ar";

  useEffect(() => {
    if (!id) {
      setError(t("errors.missingParams"));
      router.push(`/${locale}/login`);
    }
  }, [id, router, locale, t]);

  useEffect(() => {
    const handlePopState = () => {
      router.replace(`/${locale}/login`);
    };
    window.addEventListener("popstate", handlePopState);
    window.history.pushState(null, "", window.location.href);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router, locale]);

  const checkUsernameAvailability = useMemo(
    () =>
      debounce(
        async (username: string, callback: (isAvailable: boolean) => void) => {
          if (!username) {
            callback(true);
            return;
          }
          try {
            setIsCheckingUsername(true);
            const response = await fetch("/api/check-username", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username }),
            });
            const data = await response.json();
            callback(!data.exists);
          } catch (error) {
            console.error(
              "[UpdateCredentials] Error checking username:",
              error
            );
            callback(false);
          } finally {
            setIsCheckingUsername(false);
          }
        },
        500
      ),
    []
  );

  const handleValidation = async () => {
    const validationErrors: Record<string, string> = {};

    if (username) {
      if (!/^[a-zA-Z0-9]{4,20}$/.test(username)) {
        validationErrors.username = t("validation.usernameValidation");
      } else {
        const isAvailable = await new Promise<boolean>((resolve) =>
          checkUsernameAvailability(username, resolve)
        );
        if (!isAvailable) {
          validationErrors.username = t("validation.checkUsernameAvailability");
        }
      }
    }

    if (confirmUsername && username !== confirmUsername) {
      validationErrors.confirmUsername = t(
        "validation.confirmUsernameValidation"
      );
    }

    if (passcode) {
      if (!/^[a-zA-Z0-9]{8,20}$/.test(passcode)) {
        validationErrors.passcode = t("validation.nonPasscodeRegex");
      }
    }

    if (confirmPasscode && passcode !== confirmPasscode) {
      validationErrors.confirmPasscode = t("validation.confirmPasscode");
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (await handleValidation()) {
      setIsFormDisabled(true);

      const payload = {
        id,
        username: username || undefined,
        passcode: passcode || undefined,
      };

      try {
        const response = await fetch("/api/update-invitation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": locale,
          },
          body: JSON.stringify(payload),
        });

        const responseData = await response.json();
        if (!response.ok) {
          setError(
            responseData.error === "Invitation not found"
              ? t("errors.invitationNotFound")
              : responseData.error === "Already registered"
              ? t("errors.alreadyRegistered")
              : responseData.error === "Missing credentials"
              ? t("errors.missingCredentials")
              : t("errors.errorResult")
          );
          setIsFormDisabled(false);
          return;
        }

        setShowAlert(true);
      } catch (error) {
        console.error("[UpdateCredentials] Error:", error);
        setError(t("errors.retry"));
        setIsFormDisabled(false);
      }
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
        router.push(`/${locale}`);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [showAlert, router, locale]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4 flex justify-center">
            <Image
              className="mx-auto h-10 w-auto"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234f46e5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='11' width='18' height='10' rx='2'%3E%3C/rect%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'%3E%3C/path%3E%3Cpath d='M12 15v2'%3E%3C/path%3E%3Ccircle cx='12' cy='18' r='1'%3E%3C/circle%3E%3C/svg%3E"
              alt={t("iconAlt")}
              width={40}
              height={40}
            />
          </div>
          <p className="text-center font-medium text-gray-700">
            {t("changeWordPassword")}
            <span className="font-light"> {t("optional")}</span>
          </p>
        </div>
        <span className="block text-sm font-medium text-red-500">
          {t("important")}
        </span>
        <span className="mb-8 block text-sm font-light">
          {t("importantMessage")}
        </span>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className={`rounded bg-white p-6 shadow-md ${
            isFormDisabled ? "opacity-50" : ""
          }`}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              {t("changeUsername")}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onKeyDown={(event) => {
                if (!/^[a-zA-Z0-9]*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              disabled={isFormDisabled || isCheckingUsername}
              placeholder={t("placeholderUsername")}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username}</p>
            )}
            {isCheckingUsername && (
              <p className="mt-1 text-xs text-blue-500">
                {t("checkingUsername")}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmUsername"
              className="block text-sm font-medium text-gray-700"
            >
              {t("repeatUsernameChange")}
            </label>
            <input
              type="text"
              id="confirmUsername"
              value={confirmUsername}
              onChange={(e) => setConfirmUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onKeyDown={(event) => {
                if (!/^[a-zA-Z0-9]*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              disabled={isFormDisabled || isCheckingUsername}
            />
            {errors.confirmUsername && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmUsername}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="passcode"
              className="block text-sm font-medium text-gray-700"
            >
              {t("changePassword")}
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                id="passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onKeyDown={(event) => {
                  if (!/^[a-zA-Z0-9]*$/.test(event.key)) {
                    event.preventDefault();
                    setShowTooltip(true);
                    setTimeout(() => setShowTooltip(false), 3000);
                  }
                }}
                disabled={isFormDisabled}
                placeholder={t("placeholderPassword")}
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
            {errors.passcode && (
              <p className="mt-1 text-xs text-red-500">{errors.passcode}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPasscode"
              className="block text-sm font-medium text-gray-700"
            >
              {t("repeatPasswordChange")}
            </label>
            <div className="relative mt-2">
              <input
                type={showPasscode ? "text" : "password"}
                id="confirmPasscode"
                value={confirmPasscode}
                onChange={(e) => setConfirmPasscode(e.target.value)}
                className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onKeyDown={(event) => {
                  if (!/^[a-zA-Z0-9]*$/.test(event.key)) {
                    event.preventDefault();
                    setShowConfirmTooltip(true);
                    setTimeout(() => setShowConfirmTooltip(false), 3000);
                  }
                }}
                disabled={isFormDisabled}
              />
              {showConfirmTooltip && (
                <div className="absolute left-0 top-full mt-1 rounded bg-red-500 px-2 py-1 text-sm text-white shadow">
                  {t("keyboardWarning")}
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className={`absolute inset-y-0 ${
                  isRtl ? "left-0 pl-3" : "right-0 pr-3"
                } flex items-center text-sm leading-5`}
              >
                {showPasscode ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.confirmPasscode && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPasscode}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 ${
              isFormDisabled || isCheckingUsername
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            disabled={isFormDisabled || isCheckingUsername}
          >
            {isFormDisabled ? t("registering") : t("continue")}
          </button>
        </form>
      </div>
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative mx-4 flex w-full max-w-md flex-col items-center rounded-xl bg-white px-6 py-6 text-gray-800 shadow-lg">
            <div className="absolute -top-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-3xl text-white shadow-md">
              ✓
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg font-semibold">
                {`${t("sir")} ${firstName} ${lastName}`}
              </p>
              <p className="mt-3 text-xl font-bold text-gray-700">
                {t("successful")}
              </p>
            </div>
            <button
              onClick={() => {
                setShowAlert(false);
                router.push(`/${locale}`);
              }}
              className="mt-6 rounded-lg bg-green-500 px-5 py-2 text-lg font-medium text-white shadow transition-all hover:bg-green-600"
            >
              {t("start")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UpdateCredentialsPage() {
  return (
    <Suspense
      fallback={<div>{useTranslations("updateCredentials")("loading")}</div>}
    >
      <UpdateCredentialsPageContent />
    </Suspense>
  );
}

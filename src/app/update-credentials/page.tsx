"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import React from "react";

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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
  });
  const id = searchParams.get("id") ?? "";

  useEffect(() => {
    const firstName = searchParams.get("firstName") ?? "";
    const lastName = searchParams.get("lastName") ?? "";
    const mobile = searchParams.get("mobile") ?? "";
    const email = searchParams.get("email") ?? "";

    setFormData({ firstName, lastName, mobile, email });
  }, [searchParams]);
  useEffect(() => {
    const handlePopState = () => {
      router.replace("/login");
    };

    window.addEventListener("popstate", handlePopState);
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  const checkUsernameAvailability = async (username: string) => {
    if (!username) return true;

    try {
      setIsCheckingUsername(true);
      const response = await fetch("/api/check-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      return !data.exists;
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleValidation = async () => {
    const validationErrors: Record<string, string> = {};

    // اعتبارسنجی نام کاربری
    if (username) {
      if (!/^[a-zA-Z0-9]{1,20}$/.test(username)) {
        validationErrors.username =
          "نام کاربری باید ترکیبی از حروف انگلیسی و اعداد باشد و حداکثر 20 کاراکتر.";
      } else if (!(await checkUsernameAvailability(username))) {
        validationErrors.username = "این نام کاربری قبلاً انتخاب شده است.";
      }
    }

    if (username !== confirmUsername) {
      validationErrors.confirmUsername =
        "تکرار نام کاربری با مقدار وارد شده مطابقت ندارد.";
    }

    if (passcode) {
      const passcodeRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
      const nonEnglishRegex = /[^\x00-\x7F]/;

      if (nonEnglishRegex.test(passcode)) {
        validationErrors.passcode =
          "در رمز عبور از حروف غیر انگلیسی نمی‌توان استفاده کرد.";
      } else if (!passcodeRegex.test(passcode)) {
        validationErrors.passcode =
          "رمز عبور باید ترکیبی از حروف و اعداد و حداقل 8 و حداکثر 20 کاراکتر باشد.";
      }
    }

    if (passcode !== confirmPasscode) {
      validationErrors.confirmPasscode =
        "تکرار رمز عبور با مقدار وارد شده مطابقت ندارد.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (await handleValidation()) {
      setIsFormDisabled(true);
      setError(null);
      const { firstName, lastName, mobile } = formData;

      const payload = {
        id,
        firstName,
        lastName,
        mobile,
        username: username || undefined,
        passcode: passcode || undefined,
      };

      try {
        const response = await fetch("/api/update-invitation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          setError(errorResult.error || "خطا در ثبت اطلاعات");
          setIsFormDisabled(false);
          return;
        }

        setShowAlert(true);
      } catch (error) {
        console.error("خطا در ارسال اطلاعات:", error);
        setError("مشکلی در ثبت اطلاعات پیش آمده است. لطفاً مجدداً تلاش کنید.");
        setIsFormDisabled(false);
      }
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
        router.push("/");
      }, 12000);
      return () => clearTimeout(timeout);
    }
  }, [showAlert, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4 flex justify-center">
            <Image
              className="mx-auto h-10 w-auto"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234f46e5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='11' width='18' height='10' rx='2'%3E%3C/rect%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'%3E%3C/path%3E%3Cpath d='M12 15v2'%3E%3C/path%3E%3Ccircle cx='12' cy='18' r='1'%3E%3C/circle%3E%3C/svg%3E"
              alt="Password Update Icon"
              width={40}
              height={40}
            />
          </div>
          <p className="text-center font-medium text-gray-700">
            تغییر کلمه و رمز عبور
            <span className="font-light"> (اختیاری)</span>
          </p>
        </div>
        <span className="block text-sm font-medium text-red-500">مهم:</span>
        <span className="mb-8 block text-sm font-light">
          ورود کلمه و رمز عبور پس از چند روز ضروری است آنرا به خاطر بسپارید
        </span>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className={`rounded bg-white p-6 shadow-md ${isFormDisabled ? "opacity-50" : ""}`}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              تغییر کلمه عبور
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
              placeholder="حداقل 4 کاراکتر انگلیسی و عدد"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username}</p>
            )}
            {isCheckingUsername && (
              <p className="mt-1 text-xs text-blue-500">
                در حال بررسی نام کاربری...
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmUsername"
              className="block text-sm font-medium text-gray-700"
            >
              تکرار تغییر کلمه عبور
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
              تغییر رمز عبور
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
                placeholder="حداقل 8 کاراکتر (حروف و اعداد)"
              />
              {showTooltip && (
                <div className="absolute left-0 top-full mt-1 rounded bg-red-500 px-2 py-1 text-sm text-white shadow">
                  صفحه کلید انگلیسی شود و کاراکتر فاصله وارد نکنید
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 flex items-center pr-3 text-sm text-gray-500 hover:text-indigo-600"
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
              تکرار تغییر رمز عبور
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
                  صفحه کلید انگلیسی شود و کاراکتر فاصله وارد نکنید
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute inset-y-0 left-0 flex items-center pr-3 text-sm text-gray-500 hover:text-indigo-600"
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
              isFormDisabled || isCheckingUsername ? "cursor-not-allowed" : ""
            }`}
            disabled={isFormDisabled || isCheckingUsername}
          >
            {isFormDisabled ? "در حال ثبت..." : "ادامه"}
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
                {`جناب ${formData.firstName} ${formData.lastName}`}
              </p>
              <p className="mt-3 text-xl font-bold text-gray-700">
                ثبت نام با موفقیت انجام شد
              </p>
            </div>

            <button
              onClick={() => {
                setShowAlert(false);
                router.push("/");
              }}
              className="mt-6 rounded-lg bg-green-500 px-5 py-2 text-lg font-medium text-white shadow transition-all hover:bg-green-600"
              style={{ fontFamily: "IRANYekanWebBold" }}
            >
              شروع
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UpdateCredentialsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateCredentialsPageContent />
    </Suspense>
  );
}

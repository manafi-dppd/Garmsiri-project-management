"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

function RegisterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [initialFirstName, setInitialFirstName] = useState("");
  const [initialLastName, setInitialLastName] = useState("");
  const [initialMobile, setInitialMobile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const locale = useLocale();
  const t = useTranslations("register");

  useEffect(() => {
    if (!searchParams) return; // بررسی وجود searchParams

    const enable = searchParams.get("active");
    if (!enable || enable !== "true") {
      router.replace("/login");
      return;
    }

    const lastNameParam = searchParams.get("last_name");
    const mobileParam = searchParams.get("mobile");

    if (lastNameParam && mobileParam) {
      setIsDisabled(enable !== "true");
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (typeof window === "undefined") return; // بررسی محیط اجرا

    const params = new URLSearchParams(window.location.search);
    const firstNameParam = params.get("first_name") || "";
    const lastNameParam = params.get("last_name") || "";
    const mobileParam = params.get("mobile") || "";
    const idParam = params.get("id") || "";

    setInitialFirstName(firstNameParam);
    setInitialLastName(lastNameParam);
    setInitialMobile(mobileParam);

    setFirstName(firstNameParam);
    setLastName(lastNameParam);
    setMobile(mobileParam);
    setId(idParam);
  }, []);

  const validateInputs = async () => {
    setError("");

    if (
      firstName === initialFirstName &&
      lastName === initialLastName &&
      mobile === initialMobile &&
      !email
    ) {
      return true;
    }

    if (firstName && !/^[\u0600-\u06FFa-zA-Z0-9\s]{1,20}$/.test(firstName)) {
      setError("نام می‌تواند حداکثر 20 کاراکتر باشد.");
      return false;
    }

    if (!/^[\u0600-\u06FFa-zA-Z0-9\s]{1,20}$/.test(lastName)) {
      setError("نام خانوادگی الزامی است و حداکثر می‌تواند 20 کاراکتر باشد.");
      return false;
    }

    if (!/^09\d{9}$/.test(mobile)) {
      setError("تلفن همراه باید عددی 11 رقمی و با 09 شروع شود.");
      return false;
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setError("فرمت ایمیل وارد شده صحیح نیست.");
      return false;
    }

    if (firstName || email) {
      try {
        const response = await fetch("/api/check-duplicate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile, email }),
        });
        const data = await response.json();

        if (data.duplicatePhone) {
          setError("شماره تلفن وارد شده قبلاً ثبت شده است.");
          return false;
        }

        if (data.duplicateEmail) {
          setError("ایمیل وارد شده قبلاً ثبت شده است.");
          return false;
        }
      } catch {
        setError("خطا در ارتباط با سرور.");
        return false;
      }
    }

    return true;
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateInputs();
    if (!isDisabled && isValid) {
      setIsDisabled(true);
    }

    if (isValid) {
      router.push(
        `/${locale}/update-credentials?firstName=${firstName}&lastName=${lastName}&mobile=${mobile}&email=${email}&id=${id}`
      );
    } else {
      alert(t("problem_registering"));
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234f46e5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 21v-3a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v3'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3Cpath d='M17 11l2 2 4-4'%3E%3C/path%3E%3C/svg%3E"
          alt="Register Icon"
          width={40}
          height={40}
        />

        <h2 className="mt-10 text-center text-xl font-bold text-gray-900">
          {t("title")}
          <span className="font-light"> {t("optional")}</span>
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            validateInputs();
          }}
        >
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-900"
            >
              {t("firstName")}
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isDisabled}
              maxLength={20}
              onKeyDown={(event) => {
                if (!/^[\u0600-\u06FFa-zA-Z0-9\s]*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              required
              className="mt-1 block w-full rounded-md border px-3 py-1.5 text-base text-gray-900 placeholder-gray-400 focus:outline-indigo-600"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-900"
            >
              {t("lastName")}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isDisabled}
              maxLength={20}
              onKeyDown={(event) => {
                if (!/^[\u0600-\u06FFa-zA-Z0-9\s]*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              required
              className="mt-1 block w-full rounded-md border px-3 py-1.5 text-base text-gray-900 placeholder-gray-400 focus:outline-indigo-600"
            />
          </div>

          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-900"
            >
              {t("mobile")}
            </label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              disabled={isDisabled}
              onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                  event.preventDefault();
                }
              }}
              required
              pattern="09[0-9]{9}"
              maxLength={11}
              placeholder="09XXXXXXXXX"
              className="mt-1 block w-full rounded-md border px-3 py-1.5 text-base text-gray-900 placeholder-gray-400 focus:outline-indigo-600"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isDisabled}
              placeholder={t("placeholderEmail")}
              className="mt-1 block w-full rounded-md border px-3 py-1.5 text-base text-gray-900 placeholder-gray-400 focus:outline-indigo-600"
            />
          </div>

          <div>
            <button
              type="submit"
              onClick={handleContinue}
              disabled={isDisabled}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
            >
              {t("continue")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPageContent />
    </Suspense>
  );
}

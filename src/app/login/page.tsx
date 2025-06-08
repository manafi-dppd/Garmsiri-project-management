/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginSuccessResponse {
  message: string;
  token?: string;
}

interface RegisterRedirectResponse {
  first_name: string;
  last_name: string;
  mobile: string;
  id: string;
  enable: boolean;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || errorData.message || "Invalid credentials"
        );
      }

      const data = await response.json();

      if (isRegisterRedirectResponse(data)) {
        router.push(
          `/register?first_name=${encodeURIComponent(data.first_name)}&last_name=${encodeURIComponent(data.last_name)}&mobile=${encodeURIComponent(data.mobile)}&id=${encodeURIComponent(data.id)}&enable=${data.enable}`
        );
      } else if (isLoginSuccessResponse(data)) {
        window.location.href = "/";
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        setError(
          error.message === "Unexpected response format"
            ? "خطایی در پردازش پاسخ سرور رخ داد"
            : error.message === "Invalid credentials"
              ? "نام کاربری یا رمز عبور نادرست است"
              : error.message
        );
      } else {
        setError("خطای ناشناخته ای رخ داده است");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // توابع type guard با انواع مشخص
  function isLoginSuccessResponse(data: unknown): data is LoginSuccessResponse {
    return typeof data === "object" && data !== null && "message" in data;
  }

  function isRegisterRedirectResponse(
    data: unknown
  ): data is RegisterRedirectResponse {
    const potentialResponse = data as RegisterRedirectResponse;
    return (
      typeof data === "object" &&
      data !== null &&
      "first_name" in potentialResponse &&
      "last_name" in potentialResponse &&
      "mobile" in potentialResponse &&
      "id" in potentialResponse &&
      "enable" in potentialResponse
    );
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234f46e5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 21v-2a4 4 0 0 0-8 0v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3Cpath d='M6 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2'%3E%3C/path%3E%3C/svg%3E"
          alt="Login Icon"
        />

        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          وارد حساب کاربری خود شوید
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              نام کاربری
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="نام کاربری خود را وارد کنید"
                value={username}
                onChange={(e) => {
                  setUsername((e.target as HTMLInputElement).value);
                }}
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
                رمز عبور
              </label>
            </div>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  setPassword(target.value);
                }}
                autoComplete="current-password"
                required
                placeholder="رمز عبور خود را وارد کنید"
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
                  صفحه کلید انگلیسی شود و کاراکتر فاصله وارد نکنید
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm leading-5"
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
              {isLoading ? "در حال ورود..." : "ورود"}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">
              {error === "Invalid credentials"
                ? "نام کاربری یا رمز عبور نادرست است"
                : error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

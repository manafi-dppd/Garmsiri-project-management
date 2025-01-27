/* eslint-disable @next/next/no-img-element */
// app/login/page.tsx
'use client';
import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/login?username=${username}&password=${password}`,
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Invalid credentials');
      }

      const data = await response.json();
      console.log('Login Response Data:', data);

      // بررسی موفقیت ورود
      if (data.message === 'Login successful') {
        // هدایت به صفحه اصلی (Home)
        router.push('/');
      } else {
        // هدایت به ثبت‌نام (در صورت نیاز)
        router.push(
          `/register?firstName=${encodeURIComponent(data.firstName)}&lastName=${encodeURIComponent(data.lastName)}&mobile=${encodeURIComponent(data.mobile)}&id=${encodeURIComponent(data.id)}&enable=true`,
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234f46e5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 21v-2a4 4 0 0 0-8 0v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3Cpath d='M6 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2'%3E%3C/path%3E%3C/svg%3E"
          alt="Login Icon"
        />

        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          وارد حساب کاربری خود شوید
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
            >
              کلمه عبور
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="نام کاربری خود را وارد کنید"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                رمز عبور
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder="رمز عبور خود را وارد کنید"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onKeyDown={(event) => {
                  if (!/^[a-zA-Z0-9]*$/.test(event.key)) {
                    event.preventDefault();
                    setShowTooltip(true);
                    setTimeout(() => setShowTooltip(false), 3000); // تولتیپ پس از 2 ثانیه مخفی می‌شود
                  }
                }}
              />
              {showTooltip && (
                <div className="absolute top-full left-0 mt-1 px-2 py-1 bg-red-500 text-white text-sm rounded shadow">
                  صفحه کلید انگلیسی شود و کاراکتر فاصله وارد نکنید
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 pr-3 flex items-center text-sm text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={handleLogin}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              ادامه
            </button>
          </div>
          {error && (
            <p className="mt-4 text-red-500 text-sm">
              اطلاعات وارد شده نامعتبر است
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

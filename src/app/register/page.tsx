/* eslint-disable @next/next/no-img-element */
// app/register/page.tsx
'use client';

import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [initialFirstName, setInitialFirstName] = useState('');
  const [initialLastName, setInitialLastName] = useState('');
  const [initialMobile, setInitialMobile] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
  });

  useEffect(() => {
    // چک کردن وجود پارامتر معتبر (به عنوان مثال، enable)
    const enable = searchParams.get('enable');

    // اگر پارامتر enable موجود نیست یا false است، به صفحه login هدایت شود
    if (!enable || enable !== 'true') {
      router.replace('/login'); // بازگشت به صفحه لاگین
    }
  }, [searchParams, router]);

  useEffect(() => {
    // دریافت مقادیر از query params
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');
    const mobile = searchParams.get('mobile');
    const enable = searchParams.get('enable');

    if (firstName && lastName && mobile) {
      setFormData((prev) => ({
        ...prev,
        firstName: decodeURIComponent(firstName),
        lastName: decodeURIComponent(lastName),
        mobile: decodeURIComponent(mobile),
        email: decodeURIComponent(email),
        id: decodeURIComponent(id),
      }));

      // اگر enable=true است، دکمه را فعال کن
      setIsDisabled(enable !== 'true');
    }
  }, [email, searchParams]);

  useEffect(() => {
    // دریافت مقادیر اولیه از query
    const params = new URLSearchParams(window.location.search);
    const firstNameParam = params.get('firstName') || '';
    const lastNameParam = params.get('lastName') || '';
    const mobileParam = params.get('mobile') || '';
    const idParam = params.get('id') || '';

    setInitialFirstName(firstNameParam);
    setInitialLastName(lastNameParam);
    setInitialMobile(mobileParam);

    setFirstName(firstNameParam);
    setLastName(lastNameParam);
    setMobile(mobileParam);
    setId(idParam);
  }, []);

  const validateInputs = async () => {
    setError('');

    // اگر مقادیر ورودی با مقادیر اولیه یکسان باشد:
    if (
      firstName === initialFirstName &&
      lastName === initialLastName &&
      mobile === initialMobile &&
      !email
    ) {
      return true; // اعتبارسنجی موفق
    }

    // اعتبارسنجی نام
    if (firstName && !/^[\u0600-\u06FFa-zA-Z0-9\s]{1,20}$/.test(firstName)) {
      setError('نام می‌تواند حداکثر 20 کاراکتر باشد.');
      return false; // خطا در اعتبارسنجی
    }

    // اعتبارسنجی نام خانوادگی
    if (!/^[\u0600-\u06FFa-zA-Z0-9\s]{1,20}$/.test(lastName)) {
      setError('نام خانوادگی الزامی است و حداکثر می‌تواند 20 کاراکتر باشد.');
      return false;
    }

    // اعتبارسنجی شماره تلفن
    if (!/^09\d{9}$/.test(mobile)) {
      setError('تلفن همراه باید عددی 11 رقمی و با 09 شروع شود.');
      return false;
    }

    // اعتبارسنجی ایمیل
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setError('فرمت ایمیل وارد شده صحیح نیست.');
      return false;
    }

    if (firstName || email) {
      // بررسی وجود شماره تلفن یا ایمیل تکراری در پایگاه داده
      try {
        const response = await fetch('/api/check-duplicate', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({mobile, email}),
        });
        const data = await response.json();

        if (data.duplicatePhone) {
          setError('شماره تلفن وارد شده قبلاً ثبت شده است.');
          return false;
        }

        if (data.duplicateEmail) {
          setError('ایمیل وارد شده قبلاً ثبت شده است.');
          return false;
        }
      } catch {
        setError('خطا در ارتباط با سرور.');
        return false;
      }
    }

    return true; // اعتبارسنجی موفق
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };
  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateInputs();
    if (!isDisabled && isValid) {
      setIsDisabled(true); // غیرفعال کردن فرم بعد از کلیک روی دکمه ادامه
    }

    if (isValid) {
      router.push(
        `/update-credentials?firstName=${firstName}&lastName=${lastName}&mobile=${mobile}&email=${email}&id=${id}`,
      );
    } else {
      alert('مشکلی در ثبت اطلاعات پیش آمده است.');
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234f46e5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 21v-3a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v3'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3Cpath d='M17 11l2 2 4-4'%3E%3C/path%3E%3C/svg%3E"
          alt="Register Icon"
        />

        <h2 className="mt-10 text-center text-xl font-bold text-gray-900">
          لطفا اطلاعات خود را اصلاح و تکمیل نمایید
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-900"
            >
              نام
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
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
              نام خانوادگی
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
              تلفن همراه
            </label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              disabled={isDisabled}
              onKeyDown={(event) => {
                // فقط اجازه ورود اعداد را بدهید
                if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
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
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isDisabled}
              placeholder="ایمیل خود را وارد کنید"
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
              ادامه
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {ReactNode, useEffect, useRef, useState} from 'react';

interface ValidationErrors {
  confirmUsername: ReactNode;
  username: ReactNode;
  usernameMatch?: string;
  usernameFormat?: string;
  passcodeMatch?: string;
  passcodeFormat?: string;
}

const UpdateCredentialsPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [confirmUsername, setConfirmUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
  });
  useEffect(() => {
    const firstName = searchParams.get('firstName') || '';
    const lastName = searchParams.get('lastName') || '';
    const mobile = searchParams.get('mobile') || '';
    const email = searchParams.get('email') || '';

    setFormData({firstName, lastName, mobile, email});
  }, [searchParams]);
  useEffect(() => {
    const handlePopState = () => {
      router.replace('/login'); // هدایت به صفحه لاگین
    };

    // افزودن listener برای popstate
    window.addEventListener('popstate', handlePopState);

    // اضافه کردن تاریخچه برای جلوگیری از بازگشت
    window.history.pushState(null, '', window.location.href);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);
  const handleValidation = () => {
    const validationErrors: Record<string, string> = {};

    // نام کاربری: بدون علائم و حداکثر 20 کاراکتر
    const usernameRegex = /^[a-zA-Z0-9\u0600-\u06FF\s]*$/;

    if (!usernameRegex.test(username) || username.length > 20) {
      validationErrors.username =
        'نام کاربری باید ترکیبی از حرف و عدد باشد و حداکثر 20 کاراکتر.';
    }

    if (username !== confirmUsername) {
      validationErrors.confirmUsername =
        'تکرار نام کاربری با مقدار وارد شده مطابقت ندارد.';
    }

    if (passcode) {
      // رمز عبور: حداقل 8 و حداکثر 20 کاراکتر، ترکیبی از حرف و عدد
      const passcodeRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
      const nonEnglishRegex = /[^\x00-\x7F]/; // تشخیص حروف غیرانگلیسی

      if (nonEnglishRegex.test(passcode)) {
        validationErrors.passcode = 'صفحه کلید خود را به انگلیسی تغییر دهید.';
      } else if (!passcodeRegex.test(passcode)) {
        validationErrors.passcode =
          'رمز عبور باید ترکیبی از حروف و اعداد و حداقل 8 و حداکثر 20 کاراکتر باشد.';
      }
    }
    if (passcode !== confirmPasscode) {
      validationErrors.confirmPasscode =
        'تکرار رمز عبور با مقدار وارد شده مطابقت ندارد.';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (handleValidation()) {
      const {firstName, lastName, mobile} = formData;

      const payload = {
        firstName,
        lastName,
        mobile,
        username,
        passcode,
      };

      try {
        const response = await fetch('/api/update-invitation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (response.ok) {
          alert('اطلاعات با موفقیت ثبت شد.');
          router.push('/success-page');
        } else {
          alert(`خطا: ${result.error}`);
        }
      } catch (error) {
        console.error('خطا در ارسال اطلاعات:', error);
        alert('مشکلی در ثبت اطلاعات پیش آمده است.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="flex justify-center mb-4">
            <img
              className="mx-auto h-10 w-auto"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234f46e5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='11' width='18' height='10' rx='2'%3E%3C/rect%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'%3E%3C/path%3E%3Cpath d='M12 15v2'%3E%3C/path%3E%3Ccircle cx='12' cy='18' r='1'%3E%3C/circle%3E%3C/svg%3E"
              alt="Password Update Icon"
            />
          </div>

          <p className="text-center text-gray-700 font-medium">
            به منظور حفظ ایمنی اطلاعات توصیه می‌شود کلمه و رمز عبور خود را تغییر
            دهید
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onPaste={(e) => e.preventDefault()} // جلوگیری از Paste
              onCopy={(e) => e.preventDefault()} // جلوگیری از Copy
              onKeyDown={(event) => {
                // فقط اجازه ورود اعداد را بدهید
                if (!/^[\u0600-\u06FFa-zA-Z\s]*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
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
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onPaste={(e) => e.preventDefault()} // جلوگیری از Paste
              onCopy={(e) => e.preventDefault()} // جلوگیری از Copy
              onKeyDown={(event) => {
                // فقط اجازه ورود اعداد را بدهید
                if (!/^[\u0600-\u06FFa-zA-Z\s]*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            {errors.confirmUsername && (
              <p className="text-red-500 text-xs mt-1">
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
            <div className="mt-2 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                onPaste={(e) => e.preventDefault()} // جلوگیری از Paste
                onCopy={(e) => e.preventDefault()} // جلوگیری از Copy
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 pr-3 flex items-center text-sm text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.passcode && (
              <p className="text-red-500 text-xs mt-1">{errors.passcode}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPasscode"
              className="block text-sm font-medium text-gray-700"
            >
              تکرار تغییر رمز عبور
            </label>
            <div className="mt-2 relative">
              <input
                type={showPasscode ? 'text' : 'password'}
                id="confirmPasscode"
                value={confirmPasscode}
                onChange={(e) => setConfirmPasscode(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                onPaste={(e) => e.preventDefault()} // جلوگیری از Paste
                onCopy={(e) => e.preventDefault()} // جلوگیری از Copy
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute inset-y-0 left-0 pr-3 flex items-center text-sm text-gray-500 hover:text-indigo-600"
              >
                {showPasscode ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPasscode && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPasscode}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          >
            ادامه
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCredentialsPage;

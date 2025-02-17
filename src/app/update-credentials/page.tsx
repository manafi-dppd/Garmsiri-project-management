/* eslint-disable @next/next/no-img-element */
'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {ReactNode, useEffect, useRef, useState} from 'react';
import Cookies from 'js-cookie';
// import {FaSmile} from 'react-icons/fa'; // آیکون خوشامدگویی

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
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showConfirmTooltip, setShowConfirmTooltip] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
  });
  const id = searchParams.get('id');
  console.log('id: ', id);
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
    const usernameRegex = /^[\u0600-\u06FFa-zA-Z0-9\s]*$/;

    if (!usernameRegex.test(username) || username.length > 20) {
      validationErrors.username =
        'نام کاربری باید ترکیبی از حرف و عدد باشد و حداکثر 20 کاراکتر.';
    }

    if (username !== confirmUsername) {
      validationErrors.confirmUsername =
        'تکرار نام کاربری با مقدار وارد شده مطابقت ندارد.';
    }
    // console.log('errors?.username: ', username)
    // alert(errors?.username || 'مشکلی در ثبت اطلاعات پیش آمده است3.');

    if (passcode) {
      // رمز عبور: حداقل 8 و حداکثر 20 کاراکتر، ترکیبی از حرف و عدد
      const passcodeRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
      const nonEnglishRegex = /[^\x00-\x7F]/; // تشخیص حروف غیرانگلیسی

      if (nonEnglishRegex.test(passcode)) {
        validationErrors.passcode =
          'در رمز عبور از حروف غیر انگلیسی نمی‌توان استفاده کرد.';
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
      setIsFormDisabled(true);
      const {firstName, lastName, mobile} = formData;

      const payload = {
        id,
        firstName,
        lastName,
        mobile,
        username,
        passcode,
      };

      console.log('Payload for API:', payload);

      try {
        const response = await fetch('/api/update-invitation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          alert(`خطا: ${errorResult.error}`);
          return;
        }

        setShowAlert(true); // نمایش اعلان
      } catch (error) {
        console.error('خطا در ارسال اطلاعات:', error);
        alert('3مشکلی در ثبت اطلاعات پیش آمده است.');
      }
    }
  };

  // مدیریت نمایش و پنهان کردن اعلان و هدایت به صفحه دیگر
  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
        router.push('/'); // هدایت به صفحه جدید
      }, 12000);
      return () => clearTimeout(timeout); // پاکسازی تایمر
    }
  }, [showAlert, router]);

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
            تغییر کلمه و رمز عبور
            <span className="font-light"> (اختیاری)</span>
          </p>
        </div>
        <span className="block text-sm font-medium text-red-500">مهم:</span>
        <span className="block text-sm font-light mb-8">
          ورود کلمه و رمز عبور پس از چند روز ضروری است آنرا به خاطر بسپارید
        </span>

        <form
          onSubmit={handleSubmit}
          className={`bg-white p-6 rounded shadow-md ${isFormDisabled ? 'opacity-50' : ''}`}
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
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onPaste={(e) => e.preventDefault()} // جلوگیری از Paste
              onCopy={(e) => e.preventDefault()} // جلوگیری از Copy
              onKeyDown={(event) => {
                if (!/^[\u0600-\u06FFa-zA-Z0-9\s]*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              disabled={isFormDisabled}
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
                if (!/^[\u0600-\u06FFa-zA-Z0-9\s]*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              disabled={isFormDisabled}
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
                onKeyDown={(event) => {
                  if (!/^[a-zA-Z0-9]*$/.test(event.key)) {
                    event.preventDefault();
                    setShowTooltip(true);
                    setTimeout(() => setShowTooltip(false), 3000); // تولتیپ پس از 2 ثانیه مخفی می‌شود
                  }
                }}
                disabled={isFormDisabled}
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
                onKeyDown={(event) => {
                  if (!/^[a-zA-Z0-9]*$/.test(event.key)) {
                    event.preventDefault();
                    setShowConfirmTooltip(true);
                    setTimeout(() => setShowConfirmTooltip(false), 3000); // تولتیپ پس از 2 ثانیه مخفی می‌شود
                  }
                }}
                disabled={isFormDisabled}
              />
              {showConfirmTooltip && (
                <div className="absolute top-full left-0 mt-1 px-2 py-1 bg-red-500 text-white text-sm rounded shadow">
                  صفحه کلید انگلیسی شود و کاراکتر فاصله وارد نکنید
                </div>
              )}
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
            className={`w-full bg-blue-500 text-white mt-4 py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 ${
              isFormDisabled ? 'cursor-not-allowed' : ''
            }`}
            disabled={isFormDisabled} // غیرفعال کردن دکمه
          >
            ادامه
          </button>
        </form>
      </div>
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-100 text-gray-800 px-12 py-8 rounded-xl shadow-2xl w-[600px] flex flex-col items-center relative">
            {/* علامت تیک */}
            <div className="flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full absolute -top-8 shadow-md text-6xl">
              ✓
            </div>

            {/* متن خوشامدگویی */}
            <div className="text-center mt-8">
              <p
                className="text-xl font-bold"
                // style={{fontFamily: 'IRANYekanWebBold'}}
              >
                {` جناب ${formData.firstName} ${formData.lastName} به `}
              </p>
              <p
                className="text-2xl font-bold text-gray-700 mt-4"
                style={{
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                  // fontFamily: 'IRANYekanWebBold',
                }}
              >
                سامانه جامع مدیریت یکپارچه طرح گرمسیری
              </p>
              <p
                className="text-gray-600 mt-4 text-2xl"
                // style={{fontFamily: 'IRANYekanWebBold'}}
              >
                خوش آمدید
              </p>
            </div>

            {/* دکمه OK */}
            <button
              onClick={() => {
                setShowAlert(false);
                router.push('/'); // انتقال به صفحه اصلی
              }}
              className="mt-8 bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all text-4xl"
              style={{fontFamily: 'IRANYekanWebBold'}}
            >
              شروع
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateCredentialsPage;

/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import {useParams} from 'next/navigation';
import Home from '@/components/Home';
import React, {useEffect, useState} from 'react';

export default function Page() {
  const params = useParams();
  const menuSlug = params?.menuSlug;
  const [menus, setMenus] = useState<any[]>([]);
  const [error, setError] = useState('');

  if (error) {
    return <div className="error">خطا: {error}</div>;
  }
  useEffect(() => {
    //   const fromMiddleware = document.cookie
    //     .split('; ')
    //     .find((row) => row.startsWith('from_middleware='));

    //   if (!fromMiddleware) {
    //     // اگر از middleware نیامده باشد، یک بار رفرش انجام شود
    const timer = setTimeout(() => {
      const hasReloaded = localStorage.getItem('hasReloaded');
      if (!hasReloaded) {
        localStorage.setItem('hasReloaded', 'true');
        window.location.reload(); // عملیات reload صفحه
      } else {
        localStorage.removeItem('hasReloaded');
      }
    }, 10000); // تأخیر 10 ثانیه‌ای

    return () => clearTimeout(timer); // پاکسازی تایمر هنگام خروج از کامپوننت
    //   } else {
    //     // کوکی `from_middleware` را حذف کنید
    //     document.cookie =
    //       'from_middleware=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    //   }
  }, []);

  // بررسی مسیر برای اجرای کامپوننت Home
  const isHomePage = !menuSlug || menuSlug === 'home';

  return (
    <div>
      {isHomePage ? (
        <Home />
      ) : (
        <div>
          <h1>صفحه {menuSlug}</h1>
          <p>محتوای این صفحه بر اساس مسیر {menuSlug} نمایش داده می‌شود.</p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useParams } from 'next/navigation';
import Home from '@/components/Home'; // ایمپورت کامپوننت

export default function Page() {
  const params = useParams();

  // استخراج مسیرهای پویا
  const menuSlug = params?.menuSlug;

  console.log({ menuSlug }); // برای اشکال‌زدایی

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

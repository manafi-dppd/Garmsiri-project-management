'use client';

import {useParams} from 'next/navigation';
import AdminMenuForm from '@/components/AdminMenuForm'; // ایمپورت کامپوننت
import Invitation from '@/components/Invitation';

export default function Page() {
  const params = useParams();

  // استخراج مسیرهای پویا
  const menuSlug = params.menuSlug;
  const submenuSlug = params.submenuSlug;

  console.log({menuSlug, submenuSlug}); // برای اشکال‌زدایی

  // چک کردن مسیر خاص برای صفحه مدیریت مرورگر
  const isBrowserManagementPage =
    menuSlug === 'current-affairs' && submenuSlug === 'browser-management';

  return (
    <div>
      {isBrowserManagementPage ? (
        <div>
          {/* <h1>مدیریت مرورگر</h1> */}
          <AdminMenuForm />
          <Invitation />
        </div>
      ) : (
        <div>
          <h1>صفحه {menuSlug}</h1>
          <p>محتوای این صفحه بر اساس مسیر {submenuSlug} نمایش داده می‌شود.</p>
        </div>
      )}
    </div>
  );
}

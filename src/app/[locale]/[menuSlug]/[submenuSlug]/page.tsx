"use client";

import { useParams } from "next/navigation";
import AdminMenuForm from "../../../../components/AdminMenuForm";
import Invitation from "../../../../components/Invitation";

export default function Page() {
  const params = useParams();

  // استخراج مسیرهای پویا با مقدار پیش‌فرض
  const menuSlug = params?.menuSlug?.toString() || "";
  const submenuSlug = params?.submenuSlug?.toString() || "";

  // چک کردن مسیر خاص برای صفحه مدیریت مرورگر
  const isBrowserManagementPage =
    menuSlug === "current-affairs" && submenuSlug === "browser-management";

  return (
    <div>
      {isBrowserManagementPage ? (
        <div>
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

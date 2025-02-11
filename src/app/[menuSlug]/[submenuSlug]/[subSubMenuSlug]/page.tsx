'use client';

import {useParams} from 'next/navigation';
import RequestPumpingStation from '@/components/RequestPumpingStation/RequestPumpingStation';

export default function Page() {
  const params = useParams();

  // استخراج مسیرهای پویا
  const menuSlug = params.menuSlug;
  const submenuSlug = params.submenuSlug;
  const subSubMenuSlug = params.subSubMenuSlug;

  const isRequestPumpingStation =
    menuSlug === 'current-affairs' &&
    submenuSlug === 'water-request' &&
    subSubMenuSlug === 'request-from-pumping-station';

  return (
    <div>
      {isRequestPumpingStation ? (
        <div>
          {/* <h1>مدیریت مرورگر</h1> */}
          <RequestPumpingStation />
        </div>
      ) : (
        <>
          <h1>صفحه زیر زیرمنو</h1>
          <p>شناسه منو: {params.menuSlug}</p>
          <p>شناسه زیرمنو: {params.submenuSlug}</p>
          <p>شناسه زیر زیرمنو: {params.subSubMenuSlug}</p>
        </>
      )}
    </div>
  );
}

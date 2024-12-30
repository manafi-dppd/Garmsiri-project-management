'use client';

import {useParams} from 'next/navigation';

export default function Page() {
  const params = useParams();

  return (
    <div>
      <h1>صفحه زیر زیرمنو</h1>
      <p>شناسه منو: {params.menuSlug}</p>
      <p>شناسه زیرمنو: {params.submenuSlug}</p>
      <p>شناسه زیر زیرمنو: {params.subSubMenuSlug}</p>
    </div>
  );
}

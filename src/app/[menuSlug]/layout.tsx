'use client';

import {ReactNode} from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
  return (
    <div>
      {/* <h1>منوی اصلی</h1> */}
      {children}
    </div>
  );
}

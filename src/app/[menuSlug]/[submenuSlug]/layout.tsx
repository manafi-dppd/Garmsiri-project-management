'use client';

import {ReactNode} from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
  return (
    <div>
      {/* <h1>زیرمنو</h1> */}
      {children}
    </div>
  );
}

import './globals.css';
import * as React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const metadata = {
  title: 'سامانه جامع مدیریت یکپارچه طرح گرمسیری',
  description: 'طرح گرمسیری'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="rtl relative min-h-screen font-sans text-gray-900">
        {/* محتوای اصلی صفحه */}
        <div className="relative z-10">
          <Header />
          <main className="container mx-auto py-2">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

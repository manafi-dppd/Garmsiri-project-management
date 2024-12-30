import './globals.css';
import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header'; // مسیر کامپوننت

export const metadata = {
  title: 'سامانه جامع مدیریت یکپارچه طرح گرمسیری',
  description: 'طرح گرمسیری',
};

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans rtl bg-gray-100 text-gray-900">
        <Header />
        <main className="container mx-auto py-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

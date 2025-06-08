import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [userPositions, setUserPositions] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserPositions = async () => {
      try {
        // درخواست به API برای واکشی پوزیشن کاربر
        const response = await fetch('/api/user-position');

        if (!response.ok) {
          throw new Error('Failed to fetch user positions');
        }

        const data = await response.json();
        const positions = data.positions;

        if (positions) {
          setUserPositions(positions);
        }
      } catch (error) {
        console.error('Failed to fetch user positions:', error);
      }
    };

    fetchUserPositions();
  }, []);

  // بررسی Position کاربر
  const isAdminOrCreator =
    userPositions.includes('Website Admin') || userPositions.includes('Website Creator');

  return (
    <div className="flex min-h-screen flex-col items-center justify-normal bg-gradient-to-b from-blue-50 to-white pt-24 font-[family-name:var(--font-geist-sans)]">
      {/* عنوان صفحه */}
      <h1 className="mb-8 text-center text-4xl font-bold text-blue-900 md:text-5xl">
        به سامانه جامع مدیریت یکپارچه طرح گرمسیری خوش آمدید
      </h1>

      {/* Main Content */}
      <main className="w-full max-w-4xl">
        <section className="flex flex-wrap justify-center gap-8">
          {/* نمایش کارت مدیریت مرورگر فقط برای Admin یا Creator */}
          {isAdminOrCreator && (
            <Link href="/current-affairs/browser-management">
              <div className="transform rounded-lg bg-white p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:bg-purple-50 hover:shadow-2xl">
                <div className="mb-6 text-6xl text-blue-600">💻</div> {/* لوگوی جدید */}
                <h3 className="mb-4 text-2xl font-bold text-blue-800">مدیریت مرورگر</h3>
                <p className="text-gray-600">مدیریت و پیکربندی تنظیمات وبسایت و کاربران</p>
              </div>
            </Link>
          )}

          {/* نمایش کارت درخواست از ایستگاه پمپاژ برای همه کاربران */}
          <Link href="/current-affairs/water-request/request-from-pumping-station">
            <div className="transform rounded-lg bg-white p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:bg-orange-50 hover:shadow-2xl">
              <div className="mb-6 text-6xl text-blue-600">🚰</div>
              <h3 className="mb-4 text-2xl font-bold text-blue-800">درخواست از ایستگاه پمپاژ</h3>
              <p className="text-gray-600">ثبت و پیگیری درخواست‌های آب از ایستگاه‌های پمپاژ</p>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}

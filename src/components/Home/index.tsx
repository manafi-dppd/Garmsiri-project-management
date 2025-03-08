// import Image from 'next/image';

// export default function Home() {
//   return (
//     <div className="grid grid-rows min-h-screen p-4 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
//       {/* <!-- Main Content --> */}
//       <main className="container mx-auto">
//         {/* <!-- Features Section --> */}
//         <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
//           {/* سکشن مانیتورینگ */}
//           <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:bg-cyan-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
//             <div className="text-blue-600 text-4xl mb-4">📊</div>
//             <h3 className="font-bold text-xl mb-2">مانیتورینگ</h3>
//             <p>نمایش داده‌های منابع و مصرف آب به صورت زنده و دقیق</p>
//           </div>

//           {/* سکشن برنامه‌ریزی */}
//           <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:bg-teal-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
//             <div className="text-blue-600 text-4xl mb-4">📅</div>
//             <h3 className="font-bold text-xl mb-2">برنامه‌ریزی</h3>
//             <p>پیش‌بینی و برنامه‌ریزی منابع آبی بر اساس تحلیل داده‌ها</p>
//           </div>

//           {/* سکشن گزارش‌دهی */}
//           <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:bg-indigo-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
//             <div className="text-blue-600 text-4xl mb-4">📈</div>
//             <h3 className="font-bold text-xl mb-2">گزارش‌دهی</h3>
//             <p>ارائه گزارش‌های دقیق برای بهینه‌سازی مصرف آب</p>
//           </div>
//         </section>

//         <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
//           {/* سکشن حسابداری آب */}
//           <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:bg-blue-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
//             <div className="text-blue-600 text-4xl mb-4">💧</div>
//             <h3 className="font-bold text-xl mb-2">حسابداری آب</h3>
//             <p>بیلان و وضعیت منابع و مصارف آب</p>
//           </div>

//           {/* سکشن تعمیر و نگهداری */}
//           <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:bg-green-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
//             <div className="text-blue-600 text-4xl mb-4">🛠</div>
//             <h3 className="font-bold text-xl mb-2">تعمیر و نگهداری</h3>
//             <p>وضعیت تعمیرات انجام شده و سرویس و نگهداری تجهیزات</p>
//           </div>

//           {/* سکشن سوابق */}
//           <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:bg-yellow-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
//             <div className="text-blue-600 text-4xl mb-4">📚</div>
//             <h3 className="font-bold text-xl mb-2">سوابق</h3>
//             <p>سوابق مطالعات، اجرا و بهره‌برداری طرح گرمسیری</p>
//           </div>
//         </section>

//         {/* بخش جدید برای کارت‌های اضافه شده */}
//         <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
//           {/* کارت مدیریت وبسایت */}
//           <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:bg-purple-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
//             <div className="text-blue-600 text-4xl mb-4">👨‍💻</div>
//             <h3 className="font-bold text-xl mb-2">مدیریت مرورگر</h3>
//             <p>مدیریت و پیکربندی تنظیمات وبسایت و کاربران</p>
//           </div>

//           {/* کارت فرم درخواست آب از ایستگاه پمپاژ */}
//           <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:bg-orange-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
//             <div className="text-blue-600 text-4xl mb-4">🚰</div>
//             <h3 className="font-bold text-xl mb-2">درخواست از ایستگاه پمپاژ</h3>
//             <p>ثبت و پیگیری درخواست‌های آب از ایستگاه‌های پمپاژ</p>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }
import Link from 'next/link';
import {useEffect, useState} from 'react';

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

        // دیباگ: بررسی پاسخ API
        console.log('API Response:', data);

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
    userPositions.includes('Website Admin') ||
    userPositions.includes('Website Creator');

  return (
    <div className="flex flex-col items-center justify-normal min-h-screen pt-24 bg-gradient-to-b from-blue-50 to-white font-[family-name:var(--font-geist-sans)]">
      {/* عنوان صفحه */}
      <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center">
        به سامانه جامع مدیریت یکپارچه طرح گرمسیری خوش آمدید
      </h1>

      {/* Main Content */}
      <main className="w-full max-w-4xl">
        <section className="flex flex-wrap justify-center gap-8">
          {/* نمایش کارت مدیریت مرورگر فقط برای Admin یا Creator */}
          {isAdminOrCreator && (
            <Link href="/current-affairs/browser-management">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:bg-purple-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
                <div className="text-blue-600 text-6xl mb-6">💻</div>{' '}
                {/* لوگوی جدید */}
                <h3 className="font-bold text-2xl mb-4 text-blue-800">
                  مدیریت مرورگر
                </h3>
                <p className="text-gray-600">
                  مدیریت و پیکربندی تنظیمات وبسایت و کاربران
                </p>
              </div>
            </Link>
          )}

          {/* نمایش کارت درخواست از ایستگاه پمپاژ برای همه کاربران */}
          <Link href="/current-affairs/water-request/request-from-pumping-station">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:bg-orange-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
              <div className="text-blue-600 text-6xl mb-6">🚰</div>
              <h3 className="font-bold text-2xl mb-4 text-blue-800">
                درخواست از ایستگاه پمپاژ
              </h3>
              <p className="text-gray-600">
                ثبت و پیگیری درخواست‌های آب از ایستگاه‌های پمپاژ
              </p>
            </div>
          </Link>
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="mt-12 text-center text-gray-600">
        <p>
          © {new Date().getFullYear()} سامانه گرمسیری. تمامی حقوق محفوظ است.
        </p>
      </footer> */}
    </div>
  );
}

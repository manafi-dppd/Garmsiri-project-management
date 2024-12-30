import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-rows min-h-screen p-4 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* <!-- Main Content --> */}
      <main className="container mx-auto">
        {/* <!-- Features Section --> */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* سکشن مانیتورینگ */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:bg-cyan-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
            <div className="text-blue-600 text-4xl mb-4">📊</div>
            <h3 className="font-bold text-xl mb-2">مانیتورینگ</h3>
            <p>نمایش داده‌های منابع و مصرف آب به صورت زنده و دقیق</p>
          </div>

          {/* سکشن برنامه‌ریزی */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:bg-teal-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
            <div className="text-blue-600 text-4xl mb-4">📅</div>
            <h3 className="font-bold text-xl mb-2">برنامه‌ریزی</h3>
            <p>پیش‌بینی و برنامه‌ریزی منابع آبی بر اساس تحلیل داده‌ها</p>
          </div>

          {/* سکشن گزارش‌دهی */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:bg-indigo-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
            <div className="text-blue-600 text-4xl mb-4">📈</div>
            <h3 className="font-bold text-xl mb-2">گزارش‌دهی</h3>
            <p>ارائه گزارش‌های دقیق برای بهینه‌سازی مصرف آب</p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* سکشن حسابداری آب */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:bg-blue-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
            <div className="text-blue-600 text-4xl mb-4">💧</div>
            <h3 className="font-bold text-xl mb-2">حسابداری آب</h3>
            <p>بیلان و وضعیت منابع و مصارف آب</p>
          </div>

          {/* سکشن تعمیر و نگهداری */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:bg-green-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
            <div className="text-blue-600 text-4xl mb-4">🛠</div>
            <h3 className="font-bold text-xl mb-2">تعمیر و نگهداری</h3>
            <p>وضعیت تعمیرات انجام شده و سرویس و نگهداری تجهیزات</p>
          </div>

          {/* سکشن سوابق */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:bg-yellow-50 hover:shadow-2xl hover:scale-105 hover:cursor-pointer">
            <div className="text-blue-600 text-4xl mb-4">📚</div>
            <h3 className="font-bold text-xl mb-2">سوابق</h3>
            <p>سوابق مطالعات، اجرا و بهره‌برداری طرح گرمسیری</p>
          </div>
        </section>
      </main>
    </div>
  );
}

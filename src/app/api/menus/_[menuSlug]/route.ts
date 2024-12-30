import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { menuSlug: string } }) {
  try {
    // ابتدا منتظر مقدار params باشید
    const { menuSlug } = params;

    if (!menuSlug) {
      return NextResponse.json({ error: 'menuSlug is required' }, { status: 400 });
    }

    // فراخوانی داده‌ها از منبع (مثلاً پایگاه داده)
    const menu = await fetchMenuFromDatabase(menuSlug);

    if (!menu) {
      return NextResponse.json({ error: 'Menu not found' }, { status: 404 });
    }

    return NextResponse.json(menu);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}

// تابع شبیه‌سازی شده برای بازیابی منو از پایگاه داده
async function fetchMenuFromDatabase(menuSlug: string) {
  // داده‌های فرضی
  const menus = {
    "main-menu": { id: 1, title: "Main Menu", items: ["Submenu 1", "Submenu 2"] },
  };
  return menus[menuSlug] || null;
}

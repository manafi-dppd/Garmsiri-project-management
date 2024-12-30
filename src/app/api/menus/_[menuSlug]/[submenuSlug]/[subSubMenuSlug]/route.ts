import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { menuSlug: string; submenuSlug: string; subSubMenuSlug: string } }) {
  try {
    // استخراج پارامترها از context.params
    const { menuSlug, submenuSlug, subSubMenuSlug } = params;

    console.log('menuSlug:', menuSlug);
    console.log('submenuSlug:', submenuSlug);
    console.log('subSubMenuSlug:', subSubMenuSlug);

    // جستجو برای منوی والد
    const parentMenu = await prisma.menu.findFirst({
      where: {
        title: {
          equals: menuSlug.replace(/-/g, ' '),  // جایگزینی خط تیره‌ها با فاصله
        },
      },
    });

    // چاپ خروجی منوی والد برای بررسی
    console.log('parentMenu:', parentMenu);

    if (!parentMenu) {
      return NextResponse.json({ error: 'Parent menu not found' }, { status: 404 });
    }

    // جستجو برای منوی فرعی
    const submenu = await prisma.menu.findFirst({
      where: {
        title: {
          equals: submenuSlug.replace(/-/g, ' '),  // جایگزینی خط تیره‌ها با فاصله
        },
        parentId: parentMenu.id,
      },
    });

    if (!submenu) {
      return NextResponse.json({ error: 'Submenu not found' }, { status: 404 });
    }

    // جستجو برای منوی فرعی زیرین
    const subSubMenu = await prisma.menu.findFirst({
      where: {
        title: {
          equals: subSubMenuSlug.replace(/-/g, ' '),  // جایگزینی خط تیره‌ها با فاصله
        },
        parentId: submenu.id,
      },
    });

    if (!subSubMenu) {
      return NextResponse.json({ error: 'Sub-submenu not found' }, { status: 404 });
    }

    // بازگشت اطلاعات منوی فرعی زیرین
    return NextResponse.json(subSubMenu, { status: 200 });
  } catch (error) {
    console.error('Error fetching sub-submenu:', error);
    return NextResponse.json({ error: 'Failed to fetch sub-submenu' }, { status: 500 });
  }
}

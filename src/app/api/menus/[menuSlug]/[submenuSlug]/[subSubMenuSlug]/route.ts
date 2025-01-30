import {NextRequest, NextResponse} from 'next/server';
import {sqliteClient, sqlServerClient} from '@prisma/db';
import jwt from 'jsonwebtoken'; // نصب این کتابخانه: yarn add jsonwebtoken

const prisma = sqliteClient;
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in environment variables.');
}

// کلید محرمانه برای امضای توکن (همان کلیدی که در زمان تولید توکن استفاده شده است)

export async function GET(
  req: NextRequest,
  {
    params,
  }: {params: {menuSlug: string; submenuSlug: string; subSubMenuSlug: string}},
) {
  try {
    const jwt = require('jsonwebtoken');
    // استخراج توکن از کوکی
    const token = req.cookies.get('auth_token')?.value;
    console.log('token4: ', token);
    if (!token) {
      return NextResponse.redirect('/login'); // هدایت به صفحه ورود در صورت نبود توکن
    }
    console.log('token5: ', token);
    // اعتبارسنجی توکن
    try {
      jwt.verify(token, SECRET_KEY); // رمزگشایی و اعتبارسنجی توکن
    } catch (err) {
      console.error('Invalid token:', err);
      return NextResponse.redirect('/login'); // هدایت به صفحه ورود در صورت توکن نامعتبر
    }

    // استخراج پارامترها از context.params
    const {menuSlug, submenuSlug, subSubMenuSlug} = params;

    console.log('menuSlug:', menuSlug);
    console.log('submenuSlug:', submenuSlug);
    console.log('subSubMenuSlug:', subSubMenuSlug);

    // جستجو برای منوی والد
    const parentMenu = await prisma.menu.findFirst({
      where: {
        title: {
          equals: menuSlug.replace(/-/g, ' '), // جایگزینی خط تیره‌ها با فاصله
        },
      },
    });

    console.log('parentMenu:', parentMenu);

    if (!parentMenu) {
      return NextResponse.json({error: 'Parent menu not found'}, {status: 404});
    }

    // جستجو برای منوی فرعی
    const submenu = await prisma.menu.findFirst({
      where: {
        title: {
          equals: submenuSlug.replace(/-/g, ' '), // جایگزینی خط تیره‌ها با فاصله
        },
        parentId: parentMenu.id,
      },
    });

    if (!submenu) {
      return NextResponse.json({error: 'Submenu not found'}, {status: 404});
    }

    // جستجو برای منوی فرعی زیرین
    const subSubMenu = await prisma.menu.findFirst({
      where: {
        title: {
          equals: subSubMenuSlug.replace(/-/g, ' '), // جایگزینی خط تیره‌ها با فاصله
        },
        parentId: submenu.id,
      },
    });

    if (!subSubMenu) {
      return NextResponse.json({error: 'Sub-submenu not found'}, {status: 404});
    }

    // بازگشت اطلاعات منوی فرعی زیرین
    return NextResponse.json(subSubMenu, {status: 200});
  } catch (error) {
    console.error('Error fetching sub-submenu:', error);
    return NextResponse.json(
      {error: 'Failed to fetch sub-submenu'},
      {status: 500},
    );
  }
}

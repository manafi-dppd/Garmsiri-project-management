import {NextRequest, NextResponse} from 'next/server';
import {sqliteClient, sqlServerClient} from '@prisma/db';
import jwt from 'jsonwebtoken';

const prisma = sqliteClient;
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in environment variables.');
}

// کلید محرمانه برای امضای توکن (همان کلیدی که در زمان تولید توکن استفاده شده است)

async function updateMenuInDatabase(slug: string, payload: {active: boolean}) {
  return prisma.menu.update({
    where: {slug},
    data: {active: payload.active},
  });
}

export async function GET(
  request: NextRequest,
  context: {params: {menuSlug: string[]}},
) {
  try {
    const jwt = require('jsonwebtoken');
    // استخراج توکن از کوکی
    const token = request.cookies.get('auth_token')?.value;
    console.log('token1: ', token);
    if (!token) {
      return NextResponse.redirect('/login'); // هدایت به صفحه ورود در صورت نبود توکن
    }

    // اعتبارسنجی توکن
    try {
      jwt.verify(token, SECRET_KEY); // رمزگشایی و اعتبارسنجی توکن
      console.log('token2: ', token);
    } catch (err) {
      console.error('Invalid token:', err);
      return NextResponse.redirect('/login'); // هدایت به صفحه ورود در صورت توکن نامعتبر
    }
    const {menuSlug} = context.params;

    if (!menuSlug || menuSlug.length === 0) {
      return NextResponse.json({error: 'menuSlug is required'}, {status: 400});
    }

    const slugPath = menuSlug.join('/');
    const menu = await prisma.menu.findUnique({
      where: {slug: slugPath},
    });

    if (!menu) {
      return NextResponse.json({error: 'Menu not found'}, {status: 404});
    }

    return NextResponse.json(menu);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({error: 'Failed to fetch menu'}, {status: 500});
  }
}

export async function PUT(
  request: NextRequest,
  context: {params: {menuSlug: string[]}},
) {
  try {
    const {menuSlug} = context.params;

    if (!menuSlug || menuSlug.length === 0) {
      return NextResponse.json({error: 'menuSlug is required'}, {status: 400});
    }

    const payload = await request.json();
    console.log('Received payload:', payload);

    if (typeof payload.active === 'undefined') {
      return NextResponse.json(
        {error: 'Invalid payload or missing active property'},
        {status: 400},
      );
    }

    const slug = menuSlug.join('/');
    const updatedMenu = await updateMenuInDatabase(slug, payload);

    return NextResponse.json(updatedMenu, {status: 200});
  } catch (error) {
    console.error('Error updating menu:', error);
    return NextResponse.json({error: 'Failed to update menu'}, {status: 500});
  }
}

async function fetchMenuFromDatabase(
  slugPath: string,
): Promise<{id: number; title: string; parent: string} | null> {
  const menus: Record<string, {id: number; title: string; parent: string}> = {
    'current-affairs/water-request': {
      id: 1,
      title: 'Water Request',
      parent: 'Current Affairs',
    },
  };
  return menus[slugPath] || null;
}

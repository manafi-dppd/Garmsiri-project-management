import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// **GET: دریافت منوها (ساده یا سلسله‌مراتبی بر اساس پارامتر)**
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const hierarchical = searchParams.get('hierarchical') === 'true';

  try {
    if (hierarchical) {
      // **دریافت منوها با ساختار سلسله‌مراتبی برای مودال سطح دسترسی**
      const menus = await prisma.menu.findMany({
        where: { 
          parentId: null, 
          general: false, // فیلتر منوهای اصلی
        },
        include: {
          children: {
            where: { general: false }, // فیلتر زیرمنوها
            include: {
              children: {
                where: { general: false }, // فیلتر زیر زیرمنوها
              },
            },
          },
        },
      });
      return NextResponse.json(menus, { status: 200 });
    } else {
      // **دریافت منوها به صورت ساده برای عملکرد قبلی**
      const menus = await prisma.menu.findMany({
        where: { general: false }, // فیلتر منوها
        select: {
          id: true,
          title: true,
          title_fa: true,
          active: true,
          parentId: true,
        },
      });

      const menusWithSlug = menus.map((menu) => ({
        ...menu,
        slug: menu.title.toLowerCase().replace(/\s+/g, '-'),
        parentSlug: menu.parentId
          ? menus
              .find((parent) => parent.id === menu.parentId)
              ?.title.toLowerCase()
              .replace(/\s+/g, '-')
          : null,
      }));

      return NextResponse.json(menusWithSlug, { status: 200 });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching menus:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    return NextResponse.json({ error: 'Failed to fetch menus' }, { status: 500 });
  }
}

// سایر متدها (POST، PUT، DELETE) بدون تغییر باقی می‌مانند.

// **POST: اضافه کردن یک منو جدید**
export async function POST(req: NextRequest) {
  try {
    const { title, title_fa, active, parentSlug } = await req.json();

    const parent = parentSlug
      ? await prisma.menu.findUnique({
          where: { slug: parentSlug },
        })
      : null;

    const newMenu = await prisma.menu.create({
      data: {
        title,
        title_fa,
        active,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        parentId: parent?.id || null,
        general: false, // مقداردهی پیش‌فرض به `general`
      },
    });

    return NextResponse.json(newMenu, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating menu:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    return NextResponse.json({ error: 'Failed to create menu' }, { status: 500 });
  }
}

// **PUT: ویرایش یک منوی موجود**
export async function PUT(req: NextRequest) {
  try {
    const { slug, title, title_fa, active, parentSlug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const parent = parentSlug
      ? await prisma.menu.findUnique({
          where: { slug: parentSlug },
        })
      : null;

    const updatedMenu = await prisma.menu.update({
      where: { slug },
      data: {
        title,
        title_fa,
        active,
        parentId: parent?.id || null,
      },
    });

    return NextResponse.json(updatedMenu, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating menu:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    return NextResponse.json({ error: 'Failed to update menu' }, { status: 500 });
  }
}

// **DELETE: حذف یک منو**
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const deletedMenu = await prisma.menu.delete({
      where: { id },
    });

    return NextResponse.json(deletedMenu, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error deleting menu:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    return NextResponse.json({ error: 'Failed to delete menu' }, { status: 500 });
  }
}

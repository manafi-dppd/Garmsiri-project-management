import {NextRequest, NextResponse} from 'next/server';
import {sqliteClient, sqlServerClient} from '@prisma/db';

const prisma = sqliteClient;

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {menuSlug?: string; submenuSlug?: string; subSubmenuSlug?: string};
  },
) {
  const {menuSlug, submenuSlug, subSubmenuSlug} = params;

  try {
    const token = req.cookies.get('auth_token');
    console.log('token3: ', token);
    if (!token) {
      return NextResponse.redirect('/login');
    }
    let menuQuery: any = {active: true};

    if (menuSlug) menuQuery = {...menuQuery, slug: menuSlug};
    if (submenuSlug) menuQuery = {...menuQuery, parent: {slug: submenuSlug}};
    if (subSubmenuSlug)
      menuQuery = {...menuQuery, parent: {slug: subSubmenuSlug}};

    const menus = await prisma.menu.findMany({
      where: menuQuery,
      select: {
        id: true,
        title: true,
        title_fa: true,
        slug: true,
        parent: {select: {slug: true}}, // تغییر برای دسترسی به slug والد
      },
    });

    return NextResponse.json(menus);
  } catch (error) {
    console.error('Error fetching menus:', error);
    return NextResponse.json({error: 'Failed to fetch menus'}, {status: 500});
  }
}

export async function POST(req: NextRequest) {
  try {
    const {title, title_fa, active, parentId, general} = await req.json();

    // ساخت slug بر اساس title
    const slug = title.toLowerCase().replace(/\s+/g, '-');

    const newMenu = await prisma.menu.create({
      data: {
        title,
        title_fa,
        active,
        parentId: parentId || null,
        slug,
        general,
      },
    });

    return NextResponse.json(newMenu, {status: 201});
  } catch (error) {
    console.error('Error creating menu:', error);
    return NextResponse.json({error: 'Failed to create menu'}, {status: 500});
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const {slug} = await req.json();

    const deletedMenu = await prisma.menu.delete({
      where: {slug},
    });

    return NextResponse.json(deletedMenu, {status: 200});
  } catch (error) {
    console.error('Error deleting menu:', error);
    return NextResponse.json({error: 'Failed to delete menu'}, {status: 500});
  }
}

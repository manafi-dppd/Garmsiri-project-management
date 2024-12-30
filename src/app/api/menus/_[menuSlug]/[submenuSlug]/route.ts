import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }) {
  const { menuSlug, submenuSlug, subSubmenuSlug } = params;

  try {
    let menuQuery = { active: true };

    if (menuSlug) menuQuery = { ...menuQuery, slug: menuSlug };
    if (submenuSlug) menuQuery = { ...menuQuery, parentSlug: submenuSlug };
    if (subSubmenuSlug) menuQuery = { ...menuQuery, parentSlug: subSubmenuSlug };

    const menus = await prisma.menu.findMany({
      where: menuQuery,
      select: {
        id: true,
        title: true,
        title_fa: true,
        slug: true,
        parentSlug: true,
      },
    });

    return NextResponse.json(menus);
  } catch (error) {
    console.error("Error fetching menus:", error);
    return NextResponse.json({ error: "Failed to fetch menus" }, { status: 500 });
  }
}

const slug = title.toLowerCase().replace(/\s+/g, "-");

// در عملیات POST یا PUT
const newMenu = await prisma.menu.create({
  data: {
    title,
    title_fa,
    active,
    parentId,
    slug,
  },
});

export async function DELETE(req: NextRequest) {
  try {
    const { slug } = await req.json();

    const deletedMenu = await prisma.menu.delete({
      where: { slug },
    });

    return NextResponse.json(deletedMenu, { status: 200 });
  } catch (error) {
    console.error("Error deleting menu:", error);
    return NextResponse.json({ error: "Failed to delete menu" }, { status: 500 });
  }
}

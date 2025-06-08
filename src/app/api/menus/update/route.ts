import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RequestBody {
  menu: Array<{
    id: number;
    active: boolean;
  }>;
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as RequestBody;
    const { menu } = body;

    if (
      !Array.isArray(menu) ||
      menu.some((m) => typeof m.id !== 'number' || typeof m.active !== 'boolean')
    ) {
      return NextResponse.json({ error: 'Invalid menu format' }, { status: 400 });
    }

    const updatePromises = menu.map((item) =>
      prisma.menu.update({
        where: { id: item.id },
        data: { active: item.active }
      })
    );

    await Promise.all(updatePromises);
    return NextResponse.json({ message: 'Menus updated successfully' });
  } catch (error) {
    console.error('Error updating menus:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

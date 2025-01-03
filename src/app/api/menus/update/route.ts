import {NextRequest, NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received body:', body);

    const {menu} = body;

    if (
      !Array.isArray(menu) ||
      menu.some(
        (m) => typeof m.id !== 'number' || typeof m.active !== 'boolean',
      )
    ) {
      console.error('Invalid menu format:', menu);
      return NextResponse.json({error: 'Invalid menu format'}, {status: 400});
    }

    console.log('Valid menu:', menu);

    // به‌روزرسانی داده‌ها در پایگاه داده
    const updatePromises = menu.map((item) =>
      prisma.menu.update({
        where: {id: item.id},
        data: {active: item.active},
      }),
    );

    const results = await Promise.all(updatePromises);
    console.log('Updated menus:', results);

    return NextResponse.json({message: 'Menus updated successfully'});
  } catch (error) {
    console.error('Error in API:', error);
    return NextResponse.json({error: 'Internal server error'}, {status: 500});
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const positionId = searchParams.get('position_id');

  try {
    let accessLevels;

    if (positionId) {
      accessLevels = await prisma.access_level.findMany({
        where: {
          position_id: parseInt(positionId, 10)
        },
        include: {
          menu: true
        }
      });
    } else {
      accessLevels = await prisma.access_level.findMany({
        include: {
          menu: true
        }
      });
    }

    return NextResponse.json(accessLevels, { status: 200 });
  } catch (error) {
    console.error('Error fetching access levels:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();

  if (!Array.isArray(body.editedAccessLevels)) {
    return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
  }

  try {
    const updatedAccessLevels = await Promise.all(
      body.editedAccessLevels.map(async (accessLevel) => {
        return prisma.access_level.update({
          where: { id: accessLevel.id },
          data: { has_access: accessLevel.hasAccess }
        });
      })
    );

    return NextResponse.json(
      { message: 'Access levels updated successfully.', updatedAccessLevels },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating access levels:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

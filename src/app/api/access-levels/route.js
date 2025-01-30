import {NextResponse} from 'next/server';
import {sqliteClient, sqlServerClient} from '@prisma/db';

const prisma = sqliteClient;

// GET request: Fetch access levels based on positionId
export async function GET(req) {
  const {searchParams} = new URL(req.url);
  const positionId = searchParams.get('positionId');

  try {
    let accessLevels;

    if (positionId) {
      accessLevels = await prisma.accessLevel.findMany({
        where: {
          positionId: parseInt(positionId, 10),
        },
        include: {
          menu: true, // شامل اطلاعات منو
        },
      });
    } else {
      // اگر positionId ارسال نشده بود، تمام داده‌ها را برگردانید یا پاسخ خالی بدهید
      accessLevels = await prisma.accessLevel.findMany({
        include: {
          menu: true,
        },
      });
    }

    return NextResponse.json(accessLevels, {status: 200});
  } catch (error) {
    console.error('Error fetching access levels:', error);
    return NextResponse.json({error: 'Internal server error'}, {status: 500});
  }
}

// POST request: Update access levels
export async function POST(req) {
  const body = await req.json();

  if (!Array.isArray(body.editedAccessLevels)) {
    return NextResponse.json({error: 'Invalid data format'}, {status: 400});
  }

  try {
    const updatedAccessLevels = await Promise.all(
      body.editedAccessLevels.map(async (accessLevel) => {
        return prisma.accessLevel.update({
          where: {id: accessLevel.id},
          data: {hasAccess: accessLevel.hasAccess},
        });
      }),
    );

    return NextResponse.json(
      {message: 'Access levels updated successfully.', updatedAccessLevels},
      {status: 200},
    );
  } catch (error) {
    console.error('Error updating access levels:', error);
    return NextResponse.json({error: 'Internal server error'}, {status: 500});
  }
}

import {NextRequest, NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken'; // نصب این کتابخانه: yarn add jsonwebtoken

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in environment variables.');
}

export async function GET(req: NextRequest) {
  const jwt = require('jsonwebtoken');
  // دریافت توکن از کوکی
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    console.log('No token found');
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  let decodedToken: jwt.JwtPayload;
  try {
    // تایید صحت توکن
    decodedToken = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    // console.log('Decoded token:', decodedToken);
    const userId = decodedToken.userId;

    if (!userId) {
      console.log('UserId not found in token');
      return NextResponse.json({error: 'Invalid token'}, {status: 401});
    }
  } catch (err) {
    console.error('Token verification failed:', err);
    return NextResponse.json({error: 'Invalid token'}, {status: 401});
  }

  // بررسی موجودیت userId در توکن
  const userId = decodedToken.userId;
  if (!userId) {
    return NextResponse.json({error: 'Invalid token'}, {status: 401});
  }

  const {searchParams} = new URL(req.url);
  const hierarchical = searchParams.get('hierarchical') === 'true';
  // console.log('hierarchical:', hierarchical);
  try {
    if (hierarchical) {
      console.log('Fetching hierarchical menus...');
      // دریافت منوها با ساختار سلسله‌مراتبی
      const menus: Awaited<ReturnType<typeof prisma.menu.findMany>> =
        await prisma.menu.findMany({
          where: {
            parentId: null,
            active: true,
            userAccess: {
              some: {
                userId: userId,
                hasAccess: true,
              },
            },
          },

          include: {
            children: {
              where: {
                active: true,
                userAccess: {
                  some: {
                    userId: userId,
                    hasAccess: true,
                  },
                },
              },
              include: {
                children: {
                  where: {
                    active: true,
                    userAccess: {
                      some: {
                        userId: userId,
                        hasAccess: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
      // console.log('Menus with children:', JSON.stringify(menus, null, 2));
      // console.log('Fetched hierarchical menus:', menus);

      if (!menus || menus.length === 0) {
        console.log('No hierarchical menus found for user:', userId);
        return NextResponse.json(
          {error: 'No accessible menus found'},
          {status: 401},
        );
      }

      return NextResponse.json(menus, {status: 200});
    } else {
      // دریافت منوها به صورت ساده
      const menus = await prisma.menu.findMany({
        where: {
          active: true,
          userAccess: {
            some: {
              userId: userId,
              hasAccess: true,
            },
          },
        },
        select: {
          id: true,
          title: true,
          title_fa: true,
          active: true,
          general: true,
          parentId: true,
        },
      });

      // console.log('Fetched flat menus:', menus);

      if (!menus || menus.length === 0) {
        console.log('Fetched flat menus:', menus);
        return NextResponse.json(
          {error: 'No accessible menus found'},
          {status: 401},
        );
      }

      // اضافه کردن slug و parentSlug
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

      return NextResponse.json(menusWithSlug, {status: 200});
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching menus:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    return NextResponse.json({error: 'Failed to fetch menus'}, {status: 500});
  }
}

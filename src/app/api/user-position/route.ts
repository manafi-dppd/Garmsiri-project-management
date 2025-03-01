import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import jwtDecode from 'jwt-decode';
import {sqliteClient} from '@prisma/db';
const prisma = sqliteClient;

interface DecodedToken {
  userId: number;
  username: string;
  exp?: number;
  iss?: string;
}

export async function GET(req: Request) {
  try {
    const token = (await cookies()).get('auth_token')?.value;

    if (!token) {
      console.error('Unauthorized: No token found');
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const decoded = jwtDecode<DecodedToken>(token);

    if (!decoded.userId) {
      console.error('Unauthorized: Invalid token');
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const userId = decoded.userId;

    const user = await prisma.user.findUnique({
      where: {id: userId},
      include: {
        positions: {include: {Position: true}},
      },
    });

    if (!user) {
      return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    const positions = user.positions.map((p) => p.Position.title);
    const username = user.userName;
    const firstname = user.first_name;
    const lastname = user.last_name;

    return NextResponse.json(
      {username, positions, firstname, lastname},
      {status: 200},
    );
  } catch (error) {
    console.error('Error fetching positions:', error);
    return NextResponse.json({error: 'Internal server error'}, {status: 500});
  }
}

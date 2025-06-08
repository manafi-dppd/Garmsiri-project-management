import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const authorizationHeader = req.headers.get('authorization');

    if (!authorizationHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Access denied. No token provided.' }, { status: 401 });
    }

    const token = authorizationHeader.split(' ')[1];
    const secretKey = process.env.SECRET_KEY || 'default-secret-key';

    jwt.verify(token, secretKey); // استفاده از decoded در صورت نیاز
    return NextResponse.json({ message: 'Access granted.' });
  } catch (error) {
    console.error('Token validation failed:', error);
    return NextResponse.json({ error: 'Access denied. Invalid token.' }, { status: 401 });
  }
}
import { config } from 'dotenv';
config();
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const password = searchParams.get('password');
  const ipAddress = request.headers.get('x-forwarded-for') || 'Unknown';
  const userAgent = request.headers.get('user-agent') || 'Unknown';

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { user_name: username }
    });

    if (user) {
      if (user.end_date && new Date(user.end_date) < new Date()) {
        await prisma.user.update({
          where: { id: user.id },
          data: { active: false }
        });

        await prisma.user_login_history.updateMany({
          where: {
            user_id: user.id,
            logout_time: null
          },
          data: {
            logout_time: new Date(),
            status: 'Expired'
          }
        });

        return NextResponse.json(
          { error: 'Your account is expired and deactivated.' },
          { status: 403 }
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const payload = {
        userId: user.id,
        username: user.user_name,
        iss: 'garmsiri'
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY!, {
        expiresIn: '7d'
      });

      await prisma.user_login_history.create({
        data: {
          user_id: user.id,
          ip_address: ipAddress,
          user_agent: userAgent,
          status: 'Success'
        }
      });

      const response = NextResponse.json({ message: 'Login successful' });
      response.cookies.set('auth_token', token, {
        httpOnly: true,
	secure: false,
	sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
      });

      return response;
    }

    const invitation = await prisma.invitation.findUnique({
      where: { username }
    });

    if (!invitation) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, invitation.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({
      first_name: invitation.first_name,
      last_name: invitation.last_name,
      mobile: invitation.mobile,
      id: invitation.id,
      enable: true
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

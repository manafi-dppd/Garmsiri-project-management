// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface DecodedToken {
  userId: number;
  username: string;
  exp?: number;
  iss?: string;
}

// تابع decode بدون نیاز به jwt-decode
function decodeToken(token: string): DecodedToken | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error('Failed to manually decode token:', error);
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  const publicRoutes = ['/login', '/register', '/update-credentials', '/api/login'];

  if (publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (!token) {
    console.warn('❌ [Middleware] No token found');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    console.warn('❌ [Middleware] Failed to decode token');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const currentTime = Math.floor(Date.now() / 1000);
  if (decoded.exp && decoded.exp < currentTime) {
    console.warn('❌ [Middleware] Token expired');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (decoded.iss !== 'garmsiri') {
    console.warn('❌ [Middleware] Invalid issuer');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)']
};

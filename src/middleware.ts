// فایل: src/middleware.ts
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import jwtDecode from 'jwt-decode';

interface DecodedToken {
  userId: number;
  username: string;
  exp?: number; // زمان انقضا (اختیاری)
  iss?: string; // صادرکننده (اختیاری)
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  // مسیرهای مجاز بدون احراز هویت
  const publicRoutes = ['/login', '/register', '/update-credentials'];

  // بررسی اگر مسیر فعلی از مسیرهای مجاز باشد
  if (
    publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  if (!token) {
    console.log('No token found.');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    // بررسی تاریخ انقضا
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      console.log('Token has expired.');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // بررسی صادرکننده
    if (decoded.iss !== 'garmsiri') {
      console.log('Invalid token issuer.');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // اگر همه چیز درست بود، ادامه دهید
    return NextResponse.next();
  } catch (err) {
    console.error('Failed to decode token:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// تعیین مسیرهایی که Middleware باید اجرا شود
export const config = {
  matcher: ['/((?!api|_next).*)'], // مستثنی کردن مسیرهای خاص و اعمال Middleware روی باقی مسیرها
};

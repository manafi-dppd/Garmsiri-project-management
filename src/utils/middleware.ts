import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // اجازه دسترسی به /register فقط در صورت وجود پارامترهای مورد نظر
  if (pathname.startsWith('/register')) {
    const firstName = request.nextUrl.searchParams.get('firstName');
    const lastName = request.nextUrl.searchParams.get('lastName');
    const mobile = request.nextUrl.searchParams.get('mobile');

    if (!firstName || !lastName || !mobile) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

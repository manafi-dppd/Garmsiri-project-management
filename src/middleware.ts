import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

function decodeToken(token: string) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error("[Middleware] Failed to decode token:", error);
    return null;
  }
}

export async function middleware(request: import("next/server").NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = pathname.split("/")[1] || defaultLocale;

  const publicRoutes = [
    "/login",
    "/register",
    "/update-credentials",
    "/api/login",
    "/api/auth",
    "/api/menus",
    "/api/get-user-info",
    "/api/positions",
    "/api/invitation",
    "/api/check-username",
    "/api/update-invitation",
    ...locales.map((loc) => `/${loc}/login`),
    ...locales.map((loc) => `/${loc}/register`),
    ...locales.map((loc) => `/${loc}/update-credentials`),
    ...locales.map((loc) => `/${loc}/api/positions`),
    ...locales.map((loc) => `/${loc}/api/invitation`),
    ...locales.map((loc) => `/${loc}/api/login`),
    ...locales.map((loc) => `/${loc}/api/get-user-info`),
    ...locales.map((loc) => `/${loc}/api/check-username`),
    ...locales.map((loc) => `/${loc}/api/update-invitation`),
  ];

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes("favicon.ico") ||
    pathname.includes("/images/") ||
    pathname.includes("/locales/") ||
    pathname.includes("/_vercel") ||
    /\.(ico|png|jpg|jpeg|svg|css|js)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (
    publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route)
    )
  ) {
    return intlMiddleware(request);
  }

  const token = request.cookies.get("auth_token")?.value;
  if (!token) {
    console.warn("[Middleware] No token found for path:", pathname);
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const decoded = decodeToken(token);
  if (!decoded || decoded.iss !== "garmsiri") {
    console.warn("[Middleware] Invalid token or issuer for path:", pathname);
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const currentTime = Math.floor(Date.now() / 1000);
  if (decoded.exp && decoded.exp < currentTime) {
    console.warn("[Middleware] Token expired for path:", pathname);
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|static|.*\\..*).*)"],
};

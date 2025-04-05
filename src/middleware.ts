import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_KEY } from '@/constant';

// Daftar rute yang memerlukan autentikasi
const protectedRoutes = ['/home', '/profile', '/profile/additional-details', '/profile/personal-details', '/profile/spouse-details', '/profile/personal-preference'];
// Daftar rute yang hanya bisa diakses jika tidak terautentikasi
const publicOnlyRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_KEY.CONVERTIM_TOKEN)?.value;
  const { pathname } = request.nextUrl;

  // Jika mengakses rute yang memerlukan autentikasi tetapi tidak memiliki token
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika mengakses rute publik tetapi sudah memiliki token (sudah login)
  if (publicOnlyRoutes.some(route => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Jika mengakses halaman utama (/) dan sudah memiliki token
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

// Konfigurasi middleware untuk dijalankan pada rute tertentu
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)'],
};

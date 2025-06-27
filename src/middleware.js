import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const method = request.method;

  // Allow public access to auth routes
  if (
    path.startsWith('/api/auth/login') ||
    path.startsWith('/api/auth/register') ||
    path.startsWith('/api/auth/logout')
  ) {
    return NextResponse.next();
  }

  // Allow public access to GET /api/books
  if (path.startsWith('/api/books') && method === 'GET') {
    return NextResponse.next();
  }

  // Check session
  const sessionCookie = request.cookies.get('session');
  if (!sessionCookie) {
    return NextResponse.json(
      { status: 401, message: 'Unauthorized: Please login' },
      { status: 401 }
    );
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString('utf-8')
    );

    const role = decoded.role;

    // ❌ USER tidak boleh akses /api/users
    if (path.startsWith('/api/users') && role === 'USER') {
      return NextResponse.json(
        { status: 403, message: 'Forbidden: Insufficient privileges' },
        { status: 403 }
      );
    }

    // ❌ USER tidak boleh edit/hapus buku
    if (
      path.startsWith('/api/books') &&
      method !== 'GET' &&
      role === 'USER'
    ) {
      return NextResponse.json(
        { status: 403, message: 'Forbidden: Book modification not allowed' },
        { status: 403 }
      );
    }

    // ❌ USER tidak boleh edit/hapus/approve borrows
    if (
      path.startsWith('/api/borrows') &&
      method !== 'GET' &&
      method !== 'POST' &&
      role === 'USER'
    ) {
      return NextResponse.json(
        { status: 403, message: 'Forbidden: Borrow management not allowed' },
        { status: 403 }
      );
    }

    // ✅ Semua role boleh lanjut
    return NextResponse.next();
  } catch (err) {
    return NextResponse.json(
      { status: 400, message: 'Invalid session token' },
      { status: 400 }
    );
  }
}

export const config = {
  matcher: ['/api/:path*'],
};

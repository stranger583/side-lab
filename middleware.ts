import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './utils/jwt';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth-token')?.value;

    if (!token || !verifyToken(token)) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/protected/:path*'] // 受保護的路由
};

// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {

    const token = request.cookies.get('access_token');

    // Define public paths that can be accessed without authentication
    const publicPaths = ['/auth/signin','/auth/signup', '/auth/forget-password'];

    // Check if the user is accessing a protected route without a token
    if (!token) {
        // If the user tries to access /auth/profile without a token, return a 404 response
        if (request.nextUrl.pathname ==='/auth/profile' || request.nextUrl.pathname === '/auth/update-profile' ) {
            return NextResponse.rewrite(new URL('/404', request.url)); // Rewrite to a custom 404 page
        }

        // Redirect to sign-in page for other protected routes
        if (!publicPaths.includes(request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        }
    }

    // Check if the user is already signed in and trying to access the sign-in page
    if (token
        && request.nextUrl.pathname === '/auth/signin'
    ) {
        return NextResponse.redirect(new URL('/auth/profile', request.url));
    }
    if (token
        && request.nextUrl.pathname === '/auth/signup'
    ) {
        return NextResponse.redirect(new URL('/auth/profile', request.url));
    }

    return NextResponse.next(); // Allow the request to continue
}

export const config = {
    matcher: ['/auth/:path*'], // Protect all routes under /auth
};




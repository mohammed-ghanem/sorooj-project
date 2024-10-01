// import { NextResponse, type NextRequest } from "next/server";
// import { defaultLocale } from "@/constants/locales";
// import { i18n } from "@/i18n-config";

// export function middleware(request: NextRequest) {
//   const { pathname, searchParams } = request.nextUrl;
//   const token = request.cookies.get('access_token');

//   // 1. Language handling middleware logic

//   // Check if the pathname starts with any of the locales in the config
//   const localeInPath = i18n.locales.find((locale) =>
//     pathname.startsWith(`/${locale}`)
//   );

//   // If no locale is in the path and it's not an API or static file, apply the default locale
//   if (!localeInPath && !pathname.startsWith("/_next") && !pathname.startsWith("/api")) {
//     // Rewrite to include the default locale, but without showing it in the URL
//     return NextResponse.rewrite(
//       new URL(
//         `/${defaultLocale}${pathname}${searchParams ? `?${searchParams}` : ""}`,
//         request.url
//       )
//     );
//   }

//   // If the request contains the default locale (e.g., /ar), remove it from the URL
//   if (localeInPath === defaultLocale) {
//     return NextResponse.redirect(
//       new URL(
//         pathname.replace(`/${defaultLocale}`, "") || "/",
//         request.url
//       )
//     );
//   }

//   // 2. Authentication handling middleware logic

//   // Define public paths that can be accessed without authentication
//   const publicPaths = ['/auth/signin', '/auth/signup', '/auth/forget-password',
//     '/en', '/en/auth/signin', '/en/auth/signup', '/en/auth/forget-password'];

//   // Check if the user is accessing a protected route without a token
//   if (!token) {
//     // If the user tries to access /auth/profile or /auth/update-profile without a token, return a 404 response
//     if (pathname === '/auth/profile' || pathname === '/auth/update-profile') {
//       return NextResponse.rewrite(new URL('/404', request.url)); // Rewrite to a custom 404 page
//     }

//     // Redirect to sign-in page for other protected routes
//     if (!publicPaths.includes(pathname)) {
//       return NextResponse.redirect(new URL('/auth/signin', request.url));
//     }
//   }

//   // Check if the user is already signed in and trying to access the sign-in or sign-up page
//   if (token && (pathname === '/auth/signin' || pathname === '/auth/signup')) {
//     return NextResponse.redirect(new URL('/auth/profile', request.url));
//   }

//   return NextResponse.next(); // Allow the request to continue
// }

// export const config = {
//   matcher: [
//     // Apply middleware to all paths except API and static assets
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//     // Protect all routes under /auth
//     "/auth/:path*"
//   ],
// };



// import { NextResponse, type NextRequest } from "next/server";
// import { defaultLocale } from "@/constants/locales";
// import { i18n } from "@/i18n-config";

// export function middleware(request: NextRequest) {
//   const { pathname, searchParams } = request.nextUrl;
//   const token = request.cookies.get('access_token');

//   // 1. Language handling middleware logic

//   // Check if the pathname starts with any of the locales in the config
//   const localeInPath = i18n.locales.find((locale) =>
//     pathname.startsWith(`/${locale}`)
//   );

//   console.log(localeInPath)
//   // If no locale is in the path and it's not an API or static file, apply the default locale
//   if (!localeInPath && !pathname.startsWith("/_next") && !pathname.startsWith("/api")) {
//     // Rewrite to include the default locale, but without showing it in the URL
//     return NextResponse.rewrite(
//       new URL(
//         `/${defaultLocale}${pathname}${searchParams ? `?${searchParams}` : ""}`,
//         request.url
//       )
//     );
//   }

//   // If the request contains the default locale (e.g., /ar), remove it from the URL
//   if (localeInPath === defaultLocale) {
//     return NextResponse.redirect(
//       new URL(
//         pathname.replace(`/${defaultLocale}`, "") || "/",
//         request.url
//       )
//     );
//   }

//   // 2. Authentication handling middleware logic

//   // Define public paths that can be accessed without authentication
//   const publicPaths = ['/auth/signin', '/auth/signup', '/auth/forget-password',
//     '/en', '/en/auth/signin', '/en/auth/signup', '/en/auth/forget-password'];

//   // Check if the user is accessing a protected route without a token
//   if (!token) {
//     // If the user tries to access /auth/profile or /auth/update-profile without a token, return a 404 response
//     if (pathname === '/auth/profile' || pathname === '/auth/update-profile') {
//       return NextResponse.rewrite(new URL('/404', request.url)); // Rewrite to a custom 404 page
//     }

//     // Redirect to sign-in page for other protected routes
//     if (!publicPaths.includes(pathname)) {
//       return NextResponse.redirect(new URL('/auth/signin', request.url));
//     }
//   }

//   // Check if the user is already signed in and trying to access the sign-in page
//     if (token
//         && request.nextUrl.pathname === '/auth/signin'
//     ) {
//         return NextResponse.redirect(new URL('/auth/profile', request.url));
//     }
//     if (token
//         && request.nextUrl.pathname === '/auth/signup'
//     ) {
//         return NextResponse.redirect(new URL('/auth/profile', request.url));
//     }

//   return NextResponse.next(); // Allow the request to continue
// }

// export const config = {
//   matcher: [
//     // Apply middleware to all paths except API and static assets
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//     // Protect all routes under /auth
//     "/auth/:path*",
//   ],
// };































































import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale } from "@/constants/locales";
import { i18n } from "@/i18n-config";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Check if the pathname starts with any of the locales in the config
  const localeInPath = i18n.locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  // If no locale is in the path and it's not an API or static file, apply the default locale
  if (!localeInPath && !pathname.startsWith("/_next") && !pathname.startsWith("/api")) {
    // Rewrite to include the default locale, but without showing it in the URL
    return NextResponse.rewrite(
      new URL(
        `/${defaultLocale}${pathname}${searchParams ? `?${searchParams}` : ""}`,
        request.url
      )
    );
  }

  // If the request contains the default locale (e.g., /ar), remove it from the URL
  if (localeInPath === defaultLocale) {
    return NextResponse.redirect(
      new URL(
        pathname.replace(`/${defaultLocale}`, "") || "/",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all paths except API and static assets
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};



































// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';


// export function middleware(request: NextRequest) {

//     const token = request.cookies.get('access_token');

//     // Define public paths that can be accessed without authentication
//     const publicPaths = ['/auth/signin','/auth/signup', '/auth/forget-password'];

//     // Check if the user is accessing a protected route without a token
//     if (!token) {
//         // If the user tries to access /auth/profile without a token, return a 404 response
//         if (request.nextUrl.pathname ==='/auth/profile' || request.nextUrl.pathname === '/auth/update-profile' ) {
//             return NextResponse.rewrite(new URL('/404', request.url)); // Rewrite to a custom 404 page
//         }

//         // Redirect to sign-in page for other protected routes
//         if (!publicPaths.includes(request.nextUrl.pathname)) {
//             return NextResponse.redirect(new URL('/auth/signin', request.url));
//         }
//     }

//     // Check if the user is already signed in and trying to access the sign-in page
//     if (token
//         && request.nextUrl.pathname === '/auth/signin'
//     ) {
//         return NextResponse.redirect(new URL('/auth/profile', request.url));
//     }
//     if (token
//         && request.nextUrl.pathname === '/auth/signup'
//     ) {
//         return NextResponse.redirect(new URL('/auth/profile', request.url));
//     }

//     return NextResponse.next(); // Allow the request to continue
// }

// export const config = {
//     matcher: ['/auth/:path*'], // Protect all routes under /auth
// };




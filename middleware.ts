import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale } from "./constants/locales";
import { i18n } from "./i18n-config";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = request.cookies.get('access_token');

  // Language handling middleware logic
  let localeInPath = i18n.locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  console.log("Locale in Path:", localeInPath); // For debugging
  console.log("Token found:", token ? "Yes" : "No"); // Debugging token status

  // Handle case when no locale is in the URL
  if (!localeInPath && !pathname.startsWith("/_next") && !pathname.startsWith("/api")) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}${searchParams ? `?${searchParams}` : ""}`, request.url)
    );
  }

  // Remove default locale from the URL if present
  if (localeInPath === defaultLocale) {
    return NextResponse.redirect(
      new URL(pathname.replace(`/${defaultLocale}`, "") || "/", request.url)
    );
  }

  // Define public paths for authentication
  const publicPaths = [
    `/${localeInPath || defaultLocale}/auth/signin`,
    `/${localeInPath || defaultLocale}/auth/signup`,
    `/${localeInPath || defaultLocale}/auth/forget-password`,
    `/en`,
  ];

  // Authentication handling middleware logic
  if (!token) {
    if (pathname.endsWith(`/${localeInPath || defaultLocale}/auth/profile`)) {
      return NextResponse.rewrite(new URL(`/${localeInPath || defaultLocale}/404`, request.url)); // Rewrite to a custom 404 page
    }

    if (!publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL(`/${localeInPath || defaultLocale}/auth/signin`, request.url));
    }
  }

  // Redirect authenticated users from auth pages
  if (token && (pathname.endsWith('/auth/signin') || request.nextUrl.pathname === '/auth/signin')) {
    return NextResponse.redirect(new URL(`/${localeInPath || defaultLocale}/auth/profile`, request.url));
  }

  return NextResponse.next(); // Allow the request to continue
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/[lang]/auth/:path*"
  ],
};




// import { NextResponse, type NextRequest } from "next/server";
// import { defaultLocale } from "./constants/locales";
// import { i18n } from "./i18n-config";

// export function middleware(request: NextRequest) {
//   const { pathname, searchParams } = request.nextUrl;
//   const token = request.cookies.get('access_token');

//   // 1. Language handling middleware logic

//   // Check if the pathname starts with any of the locales in the config
//   let localeInPath = i18n.locales.find((locale) =>
//     pathname.startsWith(`/${locale}`)
//   );

//   console.log("Locale in Path:", localeInPath); // For debugging

//   // Handle case when no locale is in the URL (i.e., undefined localeInPath)
//   if (!localeInPath && !pathname.startsWith("/_next") && !pathname.startsWith("/api")) {
//     // Rewrite the URL to the default locale (e.g., /ar) if no locale is present
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
//   const publicPaths = [
//     `/${localeInPath || defaultLocale}/auth/signin`,
//     `/${localeInPath || defaultLocale}/auth/signup`,
//     `/${localeInPath || defaultLocale}/auth/forget-password`,
//     `/en`,
//   ];


//   // Check if the user is accessing a protected route without a token
//   if (!token) {
//     // If the user tries to access /auth/profile or /auth/update-profile without a token, return a 404 response
//     if (pathname.endsWith('/auth/profile') || pathname.endsWith('/auth/update-profile')) {
//       return NextResponse.rewrite(new URL('/404', request.url)); // Rewrite to a custom 404 page
//     }

//     // Redirect to sign-in page for other protected routes
//     if (!publicPaths.includes(pathname)) {
//       return NextResponse.redirect(new URL(`/${localeInPath || defaultLocale}/auth/signin`, request.url));
//     }
//   }

//   // Check if the user is already signed in and trying to access the sign-in or sign-up page
//   if (token && (pathname.endsWith('/auth/signin')
//     ||
//     request.nextUrl.pathname === '/auth/signin')) {
//     return NextResponse.redirect(new URL(`/${localeInPath || defaultLocale}/auth/profile`
//       , request.url));
//   }
//   // if (token
//   //           && request.nextUrl.pathname === '/auth/signin'
//   //       ) {
//   //           return NextResponse.redirect(new URL('/auth/profile', request.url));
//   //       }


//   return NextResponse.next(); // Allow the request to continue
// }

// export const config = {
//   matcher: [
//     // Apply middleware to all paths except API and static assets
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//     // Protect all routes under /auth for each locale
//     "/[lang]/auth/:path*"
//   ],
// };



































































// import { NextResponse, type NextRequest } from "next/server";
// import { defaultLocale } from "./constants/locales";
// import { i18n } from "@/i18n-config";

// export function middleware(request: NextRequest) {
//   const { pathname, searchParams } = request.nextUrl;

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

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     // Apply middleware to all paths except API and static assets
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//   ],
// };



































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




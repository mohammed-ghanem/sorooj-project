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



// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// import { i18n } from "./i18n-config";

// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";

// function getLocale(request: NextRequest): string | undefined {
//   // Negotiator expects plain object so we need to transform headers
//   const negotiatorHeaders: Record<string, string> = {};
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

//   // @ts-ignore locales are readonly
//   const locales: string[] = i18n.locales;

//   // Use negotiator and intl-localematcher to get best locale
//   let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
//     locales,
//   );

//   const locale = matchLocale(languages, locales, i18n.defaultLocale);

//   return locale;
// }

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
//   // // If you have one
//   // if (
//   //   [
//   //     '/manifest.json',
//   //     '/favicon.ico',
//   //     // Your other files in `public`
//   //   ].includes(pathname)
//   // )
//   //   return

//   // Check if there is any supported locale in the pathname
//   const pathnameIsMissingLocale = i18n.locales.every(
//     (locale) =>
//       !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
//   );

//   // Redirect if there is no locale
//   if (pathnameIsMissingLocale) {
//     const locale = getLocale(request);

//     return NextResponse.redirect(
//       new URL(
//         `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
//         request.url,
//       ),
//     );
//   }
// }

// export const config = {
//   // Matcher ignoring `/_next/` and `/api/`
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };








// import { match } from '@formatjs/intl-localematcher';
// import Negotiator from 'negotiator';
// import { NextResponse, type NextRequest } from 'next/server';
// import { defaultLocale } from '@/constants/locales';
// import { i18n } from './i18n-config';

// let headers = { 'accept-language': 'ar,en;q=0.5' };
// let languages = new Negotiator({ headers }).languages();


// export function middleware(request: NextRequest) {
//   // Check if there is any supported locale in the pathname
//   const { pathname } = request.nextUrl;
//   const pathnameHasLocale = i18n.locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );

//   if (pathnameHasLocale) return;

//   // Determine the locale to use (default to 'en' if no matching language is found)
//   const locale = match(languages, i18n.locales, defaultLocale); // -> 'ar' or your default locale
//   const newPathname = locale === 'ar' ? pathname : `/${locale}${pathname}`;

//   request.nextUrl.pathname = newPathname;
//   // Redirect to the new URL
//   return NextResponse.redirect(request.nextUrl);
// }

// export const config = {
//   matcher: [
//     // Skip all internal paths (_next)
//     '/((?!_next).*)',
//     // Optional: only run on root (/) URL
//     // '/'
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




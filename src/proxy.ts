// // src/proxy.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function proxy(request: NextRequest) {
//   // Express backend theke set kora token cookie check kora
//   const token = request.cookies.get("token")?.value;
//   const { pathname } = request.nextUrl;

//   // Jodi token na thake, login page-e redirect korbe
//   if (!token) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("callbackUrl", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// // Je je route gulo private ba protected rakhte chao
// export const config = {
//   matcher: [
//     "/add-studio",
//     "/my-listings",
//     "/studios/edit/:path*",
//     "/my-bookings",
//   ],
// };


// 

// // src/proxy.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function proxy(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;
//   const { pathname } = request.nextUrl;

//   // টোকেন না থাকলে লগইন পেজে রিডাইরেক্ট করবে এবং কোন পেজে যেতে চেয়েছিল তা callbackUrl এ রাখবে
//   if (!token) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("callbackUrl", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// // এখানে নেগেটিভ প্যাটার্ন দিয়ে হোম (/), /about, /login, /register এবং স্টুডিওর পাবলিক পেজ বাদ দিয়ে বাকি সব প্রাইভেট করে দেওয়া হলো
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico, sitemap.xml, robots.txt (metadata files)
//      * - /, /about, /login, /register, /studios (public pages)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico|about|login|register$|studios$).*)",
//   ],
// };


// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Express backend থেকে আসা token কুকি চেক করা
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // টোকেন না থাকলে লগইন পেজে রিডাইরেক্ট করবে এবং কোন পেজে যেতে চেয়েছিল তা callbackUrl এ রাখবে
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// এখানে শুধুমাত্র যে রুটগুলো প্রাইভেট বা প্রটেক্ট করতে চাও, সেগুলোর তালিকা থাকবে
export const config = {
  matcher: [
    "/add-studio",
    "/my-listings",
    "/studios/edit/:path*",
    "/my-bookings",
    "/studios",       // Explore studios পেজ এখন প্রাইভেট
    "/how-it-works",  // How it works পেজ এখন প্রাইভেট
  ],
};
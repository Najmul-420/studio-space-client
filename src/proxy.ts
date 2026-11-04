
// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // ব্রাউজার থেকে আসা কুকি বা টোকেন চেক করা
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // যদি ইউজার লগইন করা না থাকে (টোকেন না থাকে), তবে তাকে লগইন পেজে পাঠাবে 
  // এবং কোন পেজে যেতে চেয়েছিল তা callbackUrl এ সেভ করে রাখবে
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ইউজার লগইন করা থাকলে (টোকেন থাকলে) স্বাভাবিকভাবেই পেজে প্রবেশ করতে দেবে
  return NextResponse.next();
}

// যে রুটগুলোতে লগইন করা বাধ্যতামূলক (লগইন না থাকলে সাইন-ইন পেজে পাঠাবে)
export const config = {
  matcher: [
    "/add-studio",
    "/my-listings",
    "/studios/edit/:path*",
    "/my-bookings",
    "/studios",        // ইউজার লগইন করা না থাকলে সাইন-ইন পেজে পাঠাবে
    "/how-it-works",   // ইউজার লগইন করা না থাকলে সাইন-ইন পেজে পাঠাবে
  ],
};



// // src/proxy.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function proxy(request: NextRequest) {
//   // Express backend থেকে আসা token কুকি চেক করা
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

// // এখানে শুধুমাত্র যে রুটগুলো প্রাইভেট বা প্রটেক্ট করতে চাও, সেগুলোর তালিকা থাকবে
// export const config = {
//   matcher: [
//     "/add-studio",
//     "/my-listings",
//     "/studios/edit/:path*",
//     "/my-bookings",
//     "/studios",       // Explore studios পেজ এখন প্রাইভেট
//     "/how-it-works",  // How it works পেজ এখন প্রাইভেট
//   ],
// };
// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // auth_session কুকি চেক করা (login() সেট করে, httpOnly নয় তাই নির্ভরযোগ্য)
  // server-side httpOnly 'token' কুকিও fallback হিসেবে চেক করা হচ্ছে
  const authSession = request.cookies.get("auth_session")?.value;
  const serverToken = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (!authSession && !serverToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ইউজার লগইন করা থাকলে স্বাভাবিকভাবেই পেজে প্রবেশ করতে দেবে
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-studio",
    "/my-listings",
    "/studios/edit/:path*",
    "/my-bookings",
  ],
};


// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // ব্রাউজার থেকে আসা কুকি বা টোকেন চেক করা
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ইউজার লগইন করা থাকলে (টোকেন থাকলে) স্বাভাবিকভাবেই পেজে প্রবেশ করতে দেবে
  return NextResponse.next();
}


export const config = {
  matcher: [
    "/add-studio",
    "/my-listings",
    "/studios/edit/:path*",
    "/my-bookings",
    "/studios",        
    "/how-it-works",   
  ],
};




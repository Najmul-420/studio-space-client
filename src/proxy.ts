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
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/") {
    return NextResponse.redirect(new URL("/user-requirement", request.url));
  }

  if (path === "/account/login") {
    console.log("Login page - allowing access");
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });


  if (!token) {
    console.log("No token - redirecting to login");
    const url = new URL("/account/login", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/prompt/:path*",
    "/api/codegen/:path*",
    "/api/deploy/:path*",
    "/api/scan/:path*",
    "/api/coach/:path*",
    "/user-requirement/:path*",
    "/user-review/:path*",
  ],
};

import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/profile", "/ask-ai"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected) {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/ask-ai/:path*"],
};

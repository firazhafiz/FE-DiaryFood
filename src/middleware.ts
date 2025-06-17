import { NextRequest, NextResponse } from "next/server";
import { config } from "./config";

const protectedPaths = ["/dashboard", "/profile", "/ask-ai"];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Cek apakah rute dilindungi
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      // Simpan URL asal (termasuk query params) untuk redirect setelah login
      const returnUrl = encodeURIComponent(`${pathname}${search}`);
      const loginUrl = new URL(`/login?returnUrl=${returnUrl}`, request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Validasi token dengan memanggil API
    try {
      const response = await fetch(`${config.apiUrl}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Token tidak valid, hapus cookie dan redirect ke login
        const returnUrl = encodeURIComponent(`${pathname}${search}`);
        const loginUrl = new URL(`/login?returnUrl=${returnUrl}`, request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete("token");
        return response;
      }

      // Token valid, lanjutkan
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware token validation error:", error);
      // Jika error jaringan atau lainnya, redirect ke login
      const returnUrl = encodeURIComponent(`${pathname}${search}`);
      const loginUrl = new URL(`/login?returnUrl=${returnUrl}`, request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/ask-ai/:path*"],
};

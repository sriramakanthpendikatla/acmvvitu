import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TODO: replace with NextAuth session check when auth is configured
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    // Demo mode: admin is open until NextAuth is wired
    // const token = request.cookies.get("session");
    // if (!token) return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

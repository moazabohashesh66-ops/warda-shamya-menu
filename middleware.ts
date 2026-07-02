import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // السماح لصفحة الدخول و API
  if (pathname === "/admin/login" || pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  // حماية باقي صفحة الأدمن
  if (pathname.startsWith("/admin")) {
    const cookie = request.cookies.get("admin")?.value;

    if (cookie !== "ok") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/index.html", request.url));
  }
  if (pathname === "/index.html") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = { matcher: ["/", "/index.html"] };

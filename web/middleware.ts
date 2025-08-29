import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  const cookieHeader = req.headers.get("cookie") ?? "";
  if (!cookieHeader) return NextResponse.redirect(new URL("/login", req.url));

  // Build absolute URL using forwarded headers from Nginx
  const xfProto = req.headers.get("x-forwarded-proto") || "http";
  const xfHost = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const origin = `${xfProto}://${xfHost}`;
  const url = new URL("/api/valSession", origin);

  const sessionRes = await fetch(url, {
    method: "GET",
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  if (!sessionRes.ok) {
    return NextResponse.redirect(new URL("/auth?mode=login", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };


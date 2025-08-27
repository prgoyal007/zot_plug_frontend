import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // only guard dashboard
  //if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  const sessionCookie = req.headers.get("cookie")?.match(/session=([^;]*)/)?.[1];

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const url = new URL("/api/valSession", origin);
  console.log("Making a val req")

  const sessionRes = await fetch(url, {
    method: "GET",
    headers: { Cookie: `session=${sessionCookie}` },
    cache: "no-store"
  });

  if (!sessionRes.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};


import { NextRequest, NextResponse } from "next/server";
import createApiClient from "api/req";
/*
const baseURL = process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : "https://zotplug.com/";
*/
const api = createApiClient({ device: "web" })

export async function middleware(req: NextRequest) {
  const sessionCookie = req.headers.get("cookie")?.match(/session=([^;]*)/)?.[1];

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  /*
  const sessionRes = await fetch(`${baseURL}/api/session`, {
    headers: { Cookie: `session=${sessionCookie}` },
  });

  if (!sessionRes.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};


import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import createApiClient from "api/req";

type Creds = { email: string, username: string, password: string, }
interface CheckUserCredsRes { valid: boolean, userId: string }
interface SessionRes { sessionId: string, minutesAlive: number }
const isProd = process.env.NODE_ENV === "production"
const cookieName = isProd ? "__Host-session" : "session"
const api = createApiClient({ device: "web" })

export async function POST(req: NextRequest) {
	const body: Creds = await req.json()
	const { email, password } = body

	try {
		const { valid, userId } = await api.fetchJSON<CheckUserCredsRes>({ endpoint: "/api/users/checkUserCreds", method: "POST", body: { email, password } })
		if (valid) {
			const sessionRes = await api.fetchJSON<SessionRes>({ endpoint: "/api/users/createSession", method: "POST", body: { userId, ip: "0.0.0.0", userAgent: "N/A" } })

			const response = NextResponse.json({ ok: true, userId: userId, message: "Login successful" });
			response.headers.set(
				"Set-Cookie",
				serialize(cookieName, sessionRes.sessionId, {
					httpOnly: true,
					secure: isProd,              //	must be true for "none"
					sameSite: "lax",          //	enables cross-origin cookie sharing
					path: "/",
					maxAge: sessionRes.minutesAlive * 60,
				})
			);
			return response
		} else {
			return NextResponse.json({ ok: false, message: "Login failed" })
		}
	} catch (err) {
		return NextResponse.json({ ok: false, message: err })
	}
}

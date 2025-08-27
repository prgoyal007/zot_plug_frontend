import { NextRequest, NextResponse } from "next/server";
import { createApiClient } from "api/req";
import { serialize } from "cookie";

type Creds = {
	email: string,
	username: string,
	password: string,
}

interface CheckUserCredsRes { valid: boolean, userId: string }
interface SessionRes { sessionId: string, minutesAlive: number }

export async function POST(req: NextRequest) {
	const body: Creds = await req.json()
	const { email, password } = body

	try {
		const api = createApiClient({ device: "web" })
		const checkUserCredRes = await api.fetchJSON<CheckUserCredsRes>({ endpoint: "/api/users/checkUserCreds", method: "POST", body: { email, password } })
		console.log(checkUserCredRes)


		if (checkUserCredRes.valid) {
			const sessionRes = await api.fetchJSON<SessionRes>({ endpoint: "/api/users/createSession", method: "POST", body: { userId: checkUserCredRes.userId, ip: "0.0.0.0", userAgent: "N/A" } })
			console.log(sessionRes)
			const response = NextResponse.json({ ok: true, userId: checkUserCredRes.userId, message: "Login successful" });
			response.headers.set(
				"Set-Cookie",
				serialize("session", sessionRes.sessionId, {
					httpOnly: true,
					secure: true,              //	must be true for "none"
					sameSite: "none",          //	enables cross-origin cookie sharing
					path: "/",
					maxAge: sessionRes.minutesAlive * 60,
				})
			);
			return response
		} else {
			return NextResponse.json({ ok: false, message: "Login failed" })
		}
	} catch (err) {
		console.log(err)
		return NextResponse.json({ ok: false, message: err })
	}
}

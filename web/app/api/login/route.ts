import { NextRequest, NextResponse } from "next/server";
import { toErrorMessage } from "@/app/api_utils/helper";
import { serialize } from "cookie";
import { basicCreds } from "@/app/api_utils/types";
import createApiClient from "api/req";

interface CheckUserbasicCredsRes { valid: boolean, userId: string }
interface SessionRes { sessionId: string, minutesAlive: number }
const isProd = process.env.NODE_ENV === "production"
const cookieName = isProd ? "__Host-session" : "session"
const api = createApiClient({ device: "web" })

function basisFieldCheck(email: string, password: string): string | null {
	if (email === "") return "Email field is empty."
	if (password === "") return "Password field is empty."
	return null
}

export async function POST(req: NextRequest) {
	const body: basicCreds = await req.json()
	const { email, password } = body

	try {
		const basicCheckRes = basisFieldCheck(email, password)
		if (basicCheckRes) throw new Error(basicCheckRes)

		const { valid, userId } = await api.fetchJSON<CheckUserbasicCredsRes>({ endpoint: "/api/users/checkUserCreds", method: "POST", body: { email, password } })
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
			return NextResponse.json({ ok: false, message: "Invalid Credentials" })
		}
	} catch (err) {
		return NextResponse.json({ ok: false, message: toErrorMessage(err) })
	}
}

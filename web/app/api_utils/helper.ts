import { serialize } from "cookie";
import { SessionRes } from "./types";
import { cookieName, isProd } from "@/lib/constants";
import createApiClient from "api/req";
import { NextResponse } from "next/server";



export function toErrorMessage(err: unknown): string {
	if (err instanceof Error) return err.message;
	if (typeof err === "string") return err;
	try { return JSON.stringify(err); } catch { return "Unknown error"; }
}

export async function buildCookie(params: { userId: string, message: string }) {
	const api = createApiClient({ device: "web" })

	const sessionRes = await api.fetchJSON<SessionRes>({ endpoint: "/api/users/createSession", method: "POST", body: { userId: params.userId, ip: "0.0.0.0", userAgent: "N/A" } })

	const res = NextResponse.json({ ok: true, userId: params.userId, message: params.message })
	res.headers.set(
		"Set-Cookie",
		serialize(cookieName, sessionRes.sessionId, {
			httpOnly: true,
			secure: isProd,              //	must be true for "none"
			sameSite: "lax",          //	enables cross-origin cookie sharing
			path: "/",
			maxAge: sessionRes.minutesAlive * 60,
		})
	);
	return res
}

import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import createApiClient from "api/req";

const api = createApiClient({ device: "web" })

function getCorsHeaders(origin: string | null) {
	const allowedOrigins = [
		"http://localhost:3000",
		"https://zotplug.com",
	]

	const isAllowed = origin && allowedOrigins.includes(origin)

	return {
		"Access-Control-Allow-Origin": isAllowed ? origin : "https://zotplug.com",
		"Access-Control-Allow-Credentials": "true",
		"Vary": "Origin",
	}
}

export async function POST(req: NextRequest) {
	const origin = req.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);
	const body = await req.json()
	const { id } = body
	const cookies = parse(req.headers.get("cookie") || "");
	const browserSessionId = cookies["__Host-session"] ?? cookies["session"]

	if (!browserSessionId) {
		return NextResponse.json({ isAuthenticated: false }, {
			status: 401,
			headers: corsHeaders
		});
	}

	const { sessionId, userId } = await api.fetchJSON<{ sessionId: string, userId: string }>({ method: "POST", endpoint: "/api/users/getSession", body: { sessionId: browserSessionId ?? "" } })

	const session = browserSessionId ? sessionId : null;

	if (!session || (id && Number(id) !== Number(userId))) {
		return NextResponse.json({ isAuthenticated: false }, {
			status: 401,
			headers: corsHeaders
		});
	}

	return NextResponse.json({ isAuthenticated: true, userId }, {
		status: 200,
		headers: corsHeaders
	});
}

export async function OPTIONS(req: NextRequest) {
	const origin = req.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);

	return new Response(null, {
		status: 204,
		headers: corsHeaders,
	});
}

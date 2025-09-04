import { NextRequest, NextResponse } from "next/server";
import { buildCookie, toErrorMessage } from "@/app/api_utils/helper";
import { basicCreds, CheckUserbasicCredsRes } from "@/app/api_utils/types";
import createApiClient from "api/req";
const api = createApiClient({ device: "web" })

export async function POST(req: NextRequest) {
	const body: basicCreds = await req.json()
	const { email, password } = body

	try {
		const { valid, userId } = await api.fetchJSON<CheckUserbasicCredsRes>({ endpoint: "/api/users/checkUserCreds", method: "POST", body: { email, password } })
		if (valid) {
			return await buildCookie({ userId, message: "Login successful" })
		} else {
			return NextResponse.json({ ok: false, message: "Invalid Credentials" })
		}
	} catch (err) {
		return NextResponse.json({ ok: false, message: toErrorMessage(err) })
	}
}

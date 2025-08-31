import { NextRequest, NextResponse } from "next/server"
import { fullCreds } from "@/app/api_utils/types";
import { toErrorMessage } from "@/app/api_utils/helper";
import { buildCookie } from "@/app/api_utils/helper";
import createApiClient from "api/req"

const api = createApiClient({ device: "web" })

export async function POST(req: NextRequest) {
	const body: fullCreds = await req.json()
	const { firstname, lastname, username, email, password } = body
	try {
		const res = await api.fetchJSON<{ userId: string }>({ method: "POST", endpoint: "/api/users/addUser", body: { firstname, lastname, username, email, password } })

		if (res.userId) {
			return await buildCookie({ userId: res.userId, message: "Account Creation Successful" })
		}
		else {
			return NextResponse.json({ ok: false, message: "Account Creation Failed" })
		}
	} catch (err) {
		return NextResponse.json({ ok: false, message: toErrorMessage(err) })
	}
}

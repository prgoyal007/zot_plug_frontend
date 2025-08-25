import { NextRequest, NextResponse } from "next/server";
//import { checkUserCreds } from '../../../lib/db_actions/users'
//import { createSession } from '../../../lib/db_actions/sessions'
import { serialize } from "cookie";
import crypto from "crypto";


type Creds = {
	email: string,
	username: string,
	password_hash: string,
}

export async function POST(req: NextRequest) {
	const body: Creds = await req.json()
	const { email, password_hash } = body
	const sessionId = crypto.randomBytes(32).toString("hex");
	//const valid = await checkUserCreds(email, password_hash)

	if (true) {
		//createSession(valid.id, sessionId);
		//const response = NextResponse.json({ userID: valid.id, valid: true, message: "Login successful" });
		const response = NextResponse.json({ userID: "test_test_id", valid: true, message: "Login successful" });

		response.headers.set(
			"Set-Cookie",
			serialize("session", sessionId, {
				httpOnly: true,
				secure: true,              //	must be true for "none"
				sameSite: "none",          //	enables cross-origin cookie sharing
				path: "/",
				maxAge: 3600,
			})
		);
		return response
	} else {
		return NextResponse.json({ "valid": false, message: "Login failed" })
	}
}

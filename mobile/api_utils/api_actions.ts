import { basicCreds, CheckUserbasicCredsRes, Result, signUpInfo } from "./types"
import { toErrorMessage } from "./helper"
import createApiClient from "api/req"
import Constants from "expo-constants"
const api = createApiClient({ device: "mobile", baseUrlOverride: Constants.expoConfig?.extra?.API_URL })

export async function login_user(params: basicCreds): Promise<Result<{ userId: string }>> {
	try {
		const { valid, userId } = await api.fetchJSON<CheckUserbasicCredsRes>({ endpoint: "/api/users/checkUserCreds", method: "POST", body: { email: params.email, password: params.password } })

		if (!valid) throw new Error("Invalid Credentials")
		return { ok: true, value: { userId } }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}

export async function signup_user(params: signUpInfo): Promise<Result<{ userId: string }>> {
	try {
		const { userId } = await api.fetchJSON<{ userId: string }>({ method: "POST", endpoint: "/api/users/addUser", body: { firstname: params.firstname, lastname: params.lastname, username: params.username, email: params.email, password: params.password } })

		if (userId) { return { ok: true, value: { userId } } }
		else { throw new Error("Account Creation Failed") }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}

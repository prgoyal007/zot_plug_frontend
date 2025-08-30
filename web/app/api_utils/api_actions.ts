import { toErrorMessage } from "./helper";
type Result<T> = { ok: true; value: T } | { ok: false, error: string }

export async function fetch_test() {
	try {
		const res = await fetch("/api/test", {
			method: "GET",
		});
		const data = await res.text()

		if (data) {
			return JSON.parse(data)
		} else {
			throw new Error("rest_api from zot_plug_infra did not respond ")
		}
	} catch (err) {
		console.error("Error fetching data:", err)
		return { err }
	}
}

export async function login_user(email: string, password: string): Promise<Result<{ userId: string }>> {
	try {
		const login_res = await fetch('/api/login', {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		}).then(e => e.json())
		if (!login_res.ok) throw new Error(login_res.message)
		return { ok: true, value: { userId: login_res.userId } }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}

export async function signup_user(firstname: string, lastname: string, username: string, email: string, pass: string): Promise<Result<{ userId: string }>> {
	try {
		const signup_res = await fetch('/api/signup', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				firstname,
				lastname,
				username,
				email,
				password: pass,
			})
		}).then(e => e.json())

		if (!signup_res.ok) throw new Error(signup_res.message)
		return { ok: true, value: { userId: signup_res.userId } }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}





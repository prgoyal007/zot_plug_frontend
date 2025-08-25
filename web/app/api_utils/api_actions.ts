type Result<T> = { ok: true; value: T } | { ok: false, error: string | unknown }

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

export async function login_user(email: string, password: string): Promise<Result<{ userID: string }>> {
	try {
		const login_res = await fetch('/api/login', {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password_hash: password
			})
		}).then(e => e.json())
		if (!login_res.valid) throw new Error(login_res.message)
		return { ok: true, value: login_res.userID }
	} catch (err) {
		console.error("Error logging in user: ", err)
		return { ok: false, error: err }
	}
}



export async function test(baseUrl: string) {
	console.log("Request URL, from shared api/frontend: ", baseUrl)
	try {
		const res = await fetch(baseUrl, {
			method: "GET",
		})

		if (!res.ok) {
			console.error(`Server responded with status ${res.status}`)
			return null
		}

		const data = await res.text()
		return data ?? null
	} catch (err: any) {
		console.error(" Fetch failed from shared API:", err.message || err)
		return null
	}
}


/* The "test_url" is http://your_local_ip:rest_api_port. 
 * For this test, direct to zot_plug_platform/infra/rest_api.
 * Run npx tsx server.ts
 */

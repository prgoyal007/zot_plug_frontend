export async function test() {
	const test_url = "http://192.168.1.146:4000";

	try {
		const res = await fetch(test_url, {
			method: "GET",
		});

		if (!res.ok) {
			console.error(`Server responded with status ${res.status}`);
			return null;
		}

		const data = await res.text();
		return data ?? null;
	} catch (err: any) {
		console.error(" Fetch failed from shared API:", err.message || err);
		return null;
	}
}


/* The "test_url" is http://your_local_ip:rest_api_port. 
 * For this test, direct to zot_plug_platform/infra/rest_api.
 * Run npx tsx server.ts
 */

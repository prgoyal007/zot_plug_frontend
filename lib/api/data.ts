const test_url = "http://192.168.1.146:3000"

export async function test() {
	const res = await fetch(test_url, {
		method: "GET",
	});
	const data = await res.text()
	return data ?? null
}

/* The "test_url" is http://your_local_ip:rest_api_port. 
 * For this test, direct to zot_plug_platform/infra/rest_api.
 * Run npx tsx server.ts
 */

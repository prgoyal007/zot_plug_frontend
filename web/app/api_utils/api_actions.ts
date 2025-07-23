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
	} catch (error) {
		console.error("Error fetching data:", error)
		return { error }
	}
}

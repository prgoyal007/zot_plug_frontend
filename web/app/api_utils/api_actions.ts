export async function fetch_test() {
	try {
		const data = await fetch("/api/test", {
			method: "GET",
		});
		return await data.json()
	} catch (error) {
		console.error("Error fetching data:", error)
	}
}

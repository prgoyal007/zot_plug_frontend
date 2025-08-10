type Device = "web" | "mobile";
type RestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type ReqHeaders = Record<string, string>;
type ReqBody = Record<string, unknown>;

/* Url constraint-formatting */
function joinUrl(base: string, endpoint: string) {
	if (!base.endsWith("/") && !endpoint.startsWith("/")) return `${base}/${endpoint}`;
	if (base.endsWith("/") && endpoint.startsWith("/")) return `${base}${endpoint.slice(1)}`;
	return `${base}${endpoint}`;
}

export function createApiClient(device: Device, baseUrlOverride?: string) {
	const baseUrl =
		baseUrlOverride ??
		(device === "web"
			? "http://localhost:4000"
			: "https://zotplug.com/mobile_api");

	async function fetchJSON<T>(
		endpoint: string,
		method: RestMethod,
		headers?: ReqHeaders,
		body?: ReqBody
	): Promise<T> {
		/* Ensuring reqs that are non GET, and contain a body. Must be sent of content-Type "application/json" */
		const hasBody = body && method !== "GET";
		const finalHeaders: ReqHeaders = { ...(headers ?? {}) };
		if (hasBody && !finalHeaders["Content-Type"]) {
			finalHeaders["Content-Type"] = "application/json";
		}

		const res = await fetch(joinUrl(baseUrl, endpoint), {
			method,
			headers: Object.keys(finalHeaders).length ? finalHeaders : undefined,
			body: hasBody ? JSON.stringify(body) : undefined,
		});

		if (!res.ok) {
			let detail: unknown;
			try { detail = await res.json(); } catch { /* ignore */ }
			throw new Error(`HTTP ${res.status} ${res.statusText}${detail ? ` — ${JSON.stringify(detail)}` : ""}`);
		}

		if (res.status === 204) return undefined as unknown as T;
		return res.json() as Promise<T>;
	}

	return {
		device,
		baseUrl,
		fetchJSON
	};
}


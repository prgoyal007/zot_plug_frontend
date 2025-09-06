export type Device = "web" | "mobile";
export type RestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type ReqHeaders = Record<string, string>;
export type ReqBody = Record<string, unknown>;

/* Url constraint-formatting */
function joinUrl(base: string, endpoint: string) {
	if (!base.endsWith("/") && !endpoint.startsWith("/")) return `${base}/${endpoint}`;
	if (base.endsWith("/") && endpoint.startsWith("/")) return `${base}${endpoint.slice(1)}`;
	return `${base}${endpoint}`;
}

export default function createApiClient(params: { device: Device, baseUrlOverride?: string }) {
	const baseUrl = process.env.BASE_URL ??
		(params.baseUrlOverride ??
			(params.device === "web"
				? "http://localhost:4000"
				: "https://zotplug.com/mobile_api"))

	async function fetchJSON<T>(params: {
		endpoint: string,
		method: RestMethod,
		headers?: ReqHeaders,
		body?: ReqBody
	}
	): Promise<T> {
		/* Ensuring reqs that are non GET, and contain a body. Must be sent of content-Type "application/json" */
		const hasBody = params.body && params.method !== "GET";
		const finalHeaders: ReqHeaders = { ...(params.headers ?? {}) };
		let mobileJwt = undefined
		if (hasBody && !finalHeaders["Content-Type"]) {
			finalHeaders["Content-Type"] = "application/json";
		}
		const res = await fetch(joinUrl(baseUrl, params.endpoint), {
			method: params.method,
			headers: Object.keys(finalHeaders).length ? finalHeaders : undefined,
			body: hasBody ? JSON.stringify(params.body) : undefined,
		});

		if (res.headers["map"]["authorization"]) mobileJwt = res.headers["map"]["authorization"].split(" ")[1]

		if (!res.ok) {
			let detail: { error: string } | any
			try { detail = await res.json(); } catch { /* ignore */ }
			if (res.status === 500) {
				console.error(`HTTP ${res.status} ${res.statusText}${detail ? ` — ${JSON.stringify(detail)}` : ""}`)
				throw new Error('Internal Error - Try Again Later')
			}
			throw new Error(detail.error ?? "Unkown Error")
		}

		if (res.status === 204) return undefined as unknown as T;
		const data = (await res.json()) as T;

		if (mobileJwt) return { ...data, mobileJwt } as T & { mobileJwt: string }
		else return data;
	}

	return {
		device: params.device,
		baseUrl,
		fetchJSON
	};
}


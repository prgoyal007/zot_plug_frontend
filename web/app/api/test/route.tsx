import { NextResponse } from 'next/server';
import { createApiClient } from 'api/req'

export async function GET() {
	interface test_res { message: string }
	try {
		const api = createApiClient({ device: "web" })
		const res = await api.fetchJSON<test_res>({ endpoint: "/", method: "GET" })
		console.log(res)
		return NextResponse.json(res)
	} catch (err) {
		console.log(err)
		return NextResponse.json(null)
	}
}


/* Test API file, that uses the share lib/api */

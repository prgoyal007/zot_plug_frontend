import { NextResponse } from 'next/server';
import { test } from "api/data"

export async function GET() {
	const baseUrl = process.env.BASE_URL || 'http://localhost:4000';
	try {
		const data = await test(baseUrl)
		if (data) {
			console.log("Logging from the back")
			console.log(data)
			return NextResponse.json(data)
		}
		throw new Error("Failed req, from web/app/api_utils")
	} catch (err) {
		console.log(err)
		return NextResponse.json(null)
	}
}


/* Test API file, that uses the share lib/areact-querypi */

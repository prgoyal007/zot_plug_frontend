import { NextRequest, NextResponse } from 'next/server';
import { test } from "api/data"

export async function GET() {
	const data = await test()
	console.log("Logging from the back")
	console.log(data)
	return NextResponse.json(data)
}


/* Test API file, that uses the share lib/areact-querypi */

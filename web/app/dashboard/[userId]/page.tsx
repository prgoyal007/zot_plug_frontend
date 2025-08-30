'use client'
import { useParams } from "next/navigation"

export default function Dashboard() {
	const { userId } = useParams<{ userId: string }>();

	return (
		<div>
			<h1>Unique dashboard of user: {userId}</h1>
		</div>
	)
}


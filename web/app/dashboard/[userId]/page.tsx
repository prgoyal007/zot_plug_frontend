'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from "next/navigation";
import { valUserID } from '@/app/api_utils/api_actions';

export default function Dashboard() {
	const { userId } = useParams<{ userId: string }>();
	const [validated, setValidate] = useState(false)
	const router = useRouter()

	useEffect(() => {
		(async () => {
			if (!await valUserID(userId)) router.push("/login")
			else setValidate(true)
		})()
	}, [router, userId])

	return (
		<div>
			{!validated ?
				<h1>Validating...</h1>
				:
				<h1>Unique dashboard of user: {userId}</h1>
			}
		</div>
	)
}


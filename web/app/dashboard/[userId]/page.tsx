'use client'
import React from "react"
import { useParams } from "next/navigation"
import Category from "ui/components/Category"

export default function Dashboard() {
	const { userId } = useParams<{ userId: string }>();

	return (
		<div style={{ padding: 24}}> 
			<h1 style={{ marginBottom: 16 }}>Unique dashboard of user: {userId}</h1>

			<div style={{
				display: 'flex',
				gap: 16,
				flexWrap: 'wrap',
				alignItems: 'flex-start',
			}}>
				<Category
					displayText="Lightning"
					imageFilePath="/images/lightning.png"
					size="big"
					onPress={() => console.log('Lightning pressed')}
				/>

				<Category
					displayText="Fans"
					imageFilePath="/images/fan.png"
					size="small"
					onPress={() => console.log('Fans pressed')}
				/>

				<Category
					displayText="Heating"
					imageFilePath="/images/heater.png"
					size="small"
					onPress={() => console.log('Heating pressed')}
				/>
			</div>
		</div>
	)
}

// export default function Dashboard() {
// 	const { userId } = useParams<{ userId: string }>();

// 	return (
// 		<div>
// 			<h1>Unique dashboard of user: {userId}</h1>
// 		</div>
// 	)
// }

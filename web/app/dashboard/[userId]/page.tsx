/* note: Need to setup the middle ware, to ensure user is pre-authed before getting to this page. Curr, anyone can input  /dashboard/random_number  */

export default function Dashboard({ params }: { params: { userId: string } }) {
	const { userId } = params;
	return (
		<h1>Unique dashboard of user: {userId}</h1>
	)
}


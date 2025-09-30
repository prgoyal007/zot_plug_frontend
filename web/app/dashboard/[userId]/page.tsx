'use client'
import { useParams } from "next/navigation"
import DeviceControl from "ui/deviceControl/comp"
import { deviceControl } from "@/app/api_utils/api_actions";
import { DeviceControlReqs } from "ui/types";

export default function Dashboard() {
	const { userId } = useParams<{ userId: string }>();

	async function sendCommand(params: DeviceControlReqs) {
		const res = await deviceControl({ topic: params.topic, payload: params.payload, qos: params.qos, retain: params.retain })
		if (!res.ok) console.log(res.value)
	}

	return (
		<div>
			<h1>Unique dashboard of user: {userId}</h1>
			<DeviceControl deviceEndpointFn={sendCommand} />
		</div>
	)
}


import { View, StyleSheet } from "react-native";

type progressBarProps = {
	currProgress: number,
	maxProgress: number,
	height: number,
}

export default function ProgressBar({ height, currProgress, maxProgress }: progressBarProps) {
	let percent = (currProgress / maxProgress) * 100
	return (
		<View style={[styles.background, { height }]}>
			<View style={[styles.progress, { width: `${percent}%` }]} />
		</View>
	)
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: 'gray',
		borderRadius: 20,
		overflow: 'hidden',
		alignSelf: 'stretch',
		width: '100%'
	},
	progress: {
		height: '100%',
		backgroundColor: 'green',
	}
})

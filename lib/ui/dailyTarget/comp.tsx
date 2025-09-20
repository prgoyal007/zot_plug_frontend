import { Text, View, StyleSheet } from "react-native"
import ProgressBar from "../components/progress_bar"
import Icon from "../icons/Icon"

export default function DailyTarget() {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<View>
					<Text> Daily Target </Text>
					<Text> xyz of abc </Text>
				</View>
				<Icon name="leaf" size={28} color="#22c55e" />
			</View>
			<ProgressBar height={25} currProgress={25} maxProgress={100} />
		</View >
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		maxWidth: 450,
		backgroundColor: 'lightgreen'
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
})

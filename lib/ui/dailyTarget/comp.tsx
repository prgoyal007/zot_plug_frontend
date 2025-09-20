import { Text, View, StyleSheet } from "react-native"
import ProgressBar from "../components/progress_bar"
import Icon from "../icons/Icon"
import { progressBarProps } from "../types"

export default function DailyTarget({ height, currProgress, maxProgress }: progressBarProps) {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<View>
					<Text style={styles.header}> Daily Target </Text>
					<Text style={styles.display_text}>{`${currProgress}W of ${maxProgress}W`}</Text>
				</View>
				<View style={styles.icon_wrapper}>
					<Icon name="leaf" size={28} color="darkgreen" />
				</View>

			</View>
			<ProgressBar height={25} currProgress={currProgress} maxProgress={maxProgress} />
		</View >
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		maxWidth: 450,
		backgroundColor: 'lightgreen',
		borderColor: 'darkgreen',
		borderWidth: 3
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 2
	},
	header: {
		fontWeight: 'bold',
		textAlign: 'left',
		marginBottom: 4,
	},
	display_text: {
		fontWeight: 'bold',
		color: 'gray'
	},
	icon_wrapper: {
		width: 40,
		height: 40,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: "darkgreen",
		backgroundColor: "lightgray",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 4,
		marginBottom: 4
	}
})

import { View, Text, StyleSheet } from 'react-native';

export function Hello() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Hello from shared UI</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: '#f0f0f0',
		borderRadius: 8,
		width: '100%',
		maxWidth: 400,
		alignSelf: 'center',
	},
	text: {
		fontSize: 18,
		lineHeight: 24,
		color: '#333',

	},
});



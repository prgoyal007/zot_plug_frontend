import { View, Button, StyleSheet } from 'react-native';

type TestButtonProps = {
	onPress: () => unknown | Promise<unknown>
}

export function TestButton({ onPress }: TestButtonProps) {
	return (
		<View style={styles.container}>
			<Button
				title="Shared-UI Button"
				onPress={onPress}
			/>
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

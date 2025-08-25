import { View, Button, StyleSheet } from 'react-native';

type BasicButton = {
	text: string,
	onPress?: () => unknown | Promise<unknown>,
	style?: StyleSheet
}

export default function BasicButton({ onPress, text, style }: BasicButton) {
	return (
		<View style={style ?? styles.container}>
			<Button
				title={text}
				onPress={onPress}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: null,
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

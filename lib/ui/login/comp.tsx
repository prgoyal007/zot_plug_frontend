import { useState } from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import BasicButton from '../basic_button'

type LoginComp = {
	onSubmit: (email: string, pass: string) => any
}

export default function LoginComp({ onSubmit }: LoginComp) {
	const [user, set_user] = useState("")
	const [pass, set_pass] = useState("")
	return (
		<View style={styles.container}>
			<TextInput
				value={user}
				onChangeText={set_user}
				placeholder="Email"
				editable={true}
				style={styles.textInput}
			/>
			<TextInput
				value={pass}
				onChangeText={set_pass}
				placeholder="Password"
				editable={true}
				style={styles.textInput}
			/>
			<BasicButton text="login" onPress={() => onSubmit(user, pass)} style={styles.button} />
		</View>
	)
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
	textInput: {
		padding: 16,
		backgroundColor: 'white',
		color: 'black',
		borderRadius: 8,
		width: '100%',
		height: 20,
		margin: 8,
	},
	button: {
		paddingHorizontal: 16,
		borderRadius: 8,
		width: '100%',
		height: 20,
		margin: 8,
	},
});

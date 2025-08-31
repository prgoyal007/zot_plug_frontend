export type signUpInfo = {
	firstname: string,
	lastname: string,
	username: string,
	email: string,
	password: string,
}

export type LoginComp = {
	onSubmit: (email: string, pass: string) => void
	errorText: string | null
	setErrorText: React.Dispatch<React.SetStateAction<string | null>>
}

export type SignUpComp = {
	onSubmit: (params: signUpInfo) => Promise<void>
	errorText: string | null
	setErrorText: React.Dispatch<React.SetStateAction<string | null>>
}

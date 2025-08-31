export type basicCreds = { email: string, password: string }
export type fullCreds = basicCreds & { firstname: string, lastname: string, username: string }
export interface SessionRes { sessionId: string, minutesAlive: number }

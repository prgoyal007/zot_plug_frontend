export type { signUpInfo } from "ui/types"
export type Result<T> = { ok: true; value: T } | { ok: false, error: string }
export type basicCreds = { email: string, password: string }
export interface CheckUserbasicCredsRes { valid: boolean, userId: string }




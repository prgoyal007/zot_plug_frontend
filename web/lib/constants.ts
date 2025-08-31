export const loginRedirectUrl = "/auth?mode=login"
export const isProd = process.env.NODE_ENV === "production"
export const cookieName = isProd ? "__Host-session" : "session"

'use client'
import { login_user } from '../api_utils/api_actions'
import { useRouter } from 'next/navigation'
import LoginComp from 'ui/login/comp'

export default function Login() {
  const router = useRouter()
  async function try_login(email: string, pass: string): Promise<void> {
    // Note: login_user(), func. Have it return the error. So that it can be passed into the
    // the LoginComp bellow
    const res = await login_user(email, pass)
    if (res.ok) {
      const { userId } = res.value
      router.push(`/dashboard/${userId}`)
    } else {
      console.log("Login Failed")
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <LoginComp onSubmit={try_login} />
    </div>
  )
} 

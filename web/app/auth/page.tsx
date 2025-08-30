'use client'
import { login_user, signup_user } from '../api_utils/api_actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation';
import LoginComp from 'ui/login/comp'
import SignUpComp from 'ui/signup/comp'

export default function Login() {
  const mode = useSearchParams().get('mode') === 'signup' ? 'signup' : 'login';
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  async function try_login(email: string, pass: string) {
    const res = await login_user(email, pass)
    if (res.ok) {
      const { userId } = res.value
      router.push(`/dashboard/${userId}`)
    } else {
      setError(res.error)
    }
  }

  async function try_signup(firstname: string, lastname: string, username: string, email: string, pass: string) {
    const res = await signup_user(firstname, lastname, username, email, pass)
    console.log(`\n Client side: ${res}`)
    if (res.ok) {
      const { userId } = res.value
      router.push(`/dashboard/${userId}`)
    } else {
      console.log(res.error)
      setError(res.error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {mode === 'login' ?
        <LoginComp onSubmit={try_login} error_text={error} /> :
        <SignUpComp onSubmit={try_signup} error_text={error} />
      }
    </div>
  )
} 

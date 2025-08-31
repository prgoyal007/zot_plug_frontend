'use client'
import { login_user, signup_user } from '../api_utils/api_actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { signUpInfo } from 'ui/types';
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

  async function try_signup(params: signUpInfo) {
    const res = await signup_user({ firstname: params.firstname, lastname: params.lastname, username: params.username, email: params.email, password: params.password })
    if (res.ok) {
      const { userId } = res.value
      router.push(`/dashboard/${userId}`)
    } else {
      setError(res.error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {mode === 'login' ?
        (
          <>
            <LoginComp onSubmit={try_login} errorText={error} setErrorText={setError} />
            <a href={"/auth?mode=signup"}><h5 className='text-blue-500'>sign up</h5></a>
          </>
        )
        : (
          <>
            <SignUpComp onSubmit={try_signup} errorText={error} setErrorText={setError} />
            <a href={"/auth?mode=login"}><h5 className='text-blue-500'>back</h5></a>
          </>
        )
      }
    </div>
  )
} 

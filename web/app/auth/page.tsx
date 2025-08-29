'use client'
import { login_user } from '../api_utils/api_actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useParams } from 'next/navigation';
import LoginComp from 'ui/login/comp'

export default function Login() {
  const { mode } = useParams<{ mode?: string }>()
  const set_mode = mode === 'signup' ? 'signup' : 'login';
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

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {set_mode ?
        <LoginComp onSubmit={try_login} error_text={error} /> :
        null
      }
    </div>
  )
} 

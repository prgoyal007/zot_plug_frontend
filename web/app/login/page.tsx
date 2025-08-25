'use client'
import LoginComp from 'ui/login/comp'
import { login_user } from '../api_utils/api_actions'

export default function Login() {

  async function try_login(email: string, pass: string): Promise<void> {
    const res = await login_user(email, pass)
    console.log(res)

  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <LoginComp onSubmit={try_login} />
    </div>
  )
} 

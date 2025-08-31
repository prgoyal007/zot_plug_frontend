'use client'
import { Suspense } from 'react'
import AuthContent from './authCont'

export default function LoginPage() {
  return (
    <Suspense fallback={undefined}>
      <AuthContent />
    </Suspense>
  )
}



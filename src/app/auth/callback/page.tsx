'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    // Handle auth callback logic here
    router.push('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-white text-2xl">✨</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">Completing Authentication...</h2>
        <p className="text-gray-600">Redirecting you to your dashboard</p>
      </div>
    </div>
  )
}
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/auth' // Adjust path if needed

interface AuthContextType {
  user: any | null
  signIn: (email: string, password: string) => Promise<{ user: any, error: string | null }>
  signUp: (email: string, password: string, username: string, fullName: string) => Promise<{ user: any, error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => ({ user: null, error: null }),
  signUp: async () => ({ user: null, error: null }),
  signOut: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check auth state
    // Implement Supabase auth listener
  }, [])

  const handleSignIn = async (email: string, password: string) => {
    const { user, error } = await signIn(email, password)
    if (!error) {
      setUser(user)
      router.push('/dashboard')
    }
    return { user, error: error || null }
  }

  const handleSignUp = async (email: string, password: string, username: string, fullName: string) => {
    const { user, error } = await signUp(email, password, username, fullName)
    if (!error) {
      setUser(user)
      router.push('/dashboard')
    }
    return { user, error: error || null }
  }

  const handleSignOut = async () => {
    // Implement sign out
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, signIn: handleSignIn, signUp: handleSignUp, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

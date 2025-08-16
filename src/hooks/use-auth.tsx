import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/auth' // Adjust path if needed

const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {}
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Check auth state
    // Implement Supabase auth listener
  }, [])

  const handleSignIn = async (email, password) => {
    const { user, error } = await signIn(email, password)
    if (!error) {
      setUser(user)
      router.push('/dashboard')
    }
    return { user, error }
  }

  const handleSignUp = async (email, password, username, fullName) => {
    const { user, error } = await signUp(email, password, username, fullName)
    if (!error) {
      setUser(user)
      router.push('/dashboard')
    }
    return { user, error }
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

import { supabase } from './supabase'

export interface User {
  id: string
  email: string
  username?: string
  avatar_url?: string
  points?: number
  level?: number
  subscription_tier?: 'free' | 'premium' | 'pro'
}

export const auth = {
  async signUp(email: string, password: string, username: string) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    })

    if (authError) return { error: authError }

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          username,
          points: 100, // Welcome bonus
          level: 1,
          subscription_tier: 'free'
        })

      if (profileError) return { error: profileError }
    }

    return { data: authData }
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (!error && data.user) {
      await this.updateLastActive(data.user.id)
    }

    return { data, error }
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  },

  async signInWithKakao() {
    // Korean users love Kakao login
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    return profile
  },

  async updateLastActive(userId: string) {
    const { data: user } = await supabase
      .from('users')
      .select('last_active, streak_days, points')
      .eq('id', userId)
      .single()

    if (user) {
      const lastActive = new Date(user.last_active)
      const today = new Date()
      const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))
      
      const newStreak = daysDiff === 1 ? user.streak_days + 1 : (daysDiff === 0 ? user.streak_days : 1)
      
      await supabase
        .from('users')
        .update({ 
          last_active: today.toISOString(),
          streak_days: newStreak,
          points: user.streak_days < newStreak ? (user.points || 0) + 10 : (user.points || 0) // Streak bonus
        })
        .eq('id', userId)
    }
  },

  onAuthStateChange(callback: (session: any) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session)
    })
  }
}
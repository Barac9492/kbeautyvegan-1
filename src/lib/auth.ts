import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { user: data.user, session: data.session, error: error?.message }
}

export async function signUp(email: string, password: string, username: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, full_name: fullName }
    }
  })
  return { user: data.user, session: data.session, error: error?.message }
}

// ... add more auth functions as needed
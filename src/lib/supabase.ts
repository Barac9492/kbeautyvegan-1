import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Helper functions for common operations
export const subscribeToTrends = (callback: (payload: any) => void) => {
  return supabase
    .channel('trends-channel')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'trends' },
      callback
    )
    .subscribe()
}

export const subscribeToProducts = (callback: (payload: any) => void) => {
  return supabase
    .channel('products-channel')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'products' },
      callback
    )
    .subscribe()
}

export const getUserPredictions = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_predictions')
    .select(`
      *,
      trend:trends(*),
      product:products(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const createPrediction = async (prediction: any) => {
  const { data, error } = await supabase
    .from('user_predictions')
    .insert(prediction)
    .select()
    .single()
  
  return { data, error }
}
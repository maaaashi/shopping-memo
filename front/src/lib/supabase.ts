import { createClient } from '@supabase/auth-helpers-sveltekit'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const realtime_opt = {
  realtime: {
    params: {
      eventsPerSecond: 10,
    }
  }
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, realtime_opt)

export default supabase
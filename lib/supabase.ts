import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bdbmlqecqso.supabase.co'
const supabaseAnonKey = 'sb_publishable_Ra2fHtKw-QLjFGA7FPU_Yw_9GadlJW_'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
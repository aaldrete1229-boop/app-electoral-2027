import { createClient } from '@supabase/supabase-js'

interface SupabaseEnvironment {
  VITE_SUPABASE_URL?: string
  VITE_SUPABASE_PUBLISHABLE_KEY?: string
}

const environment = import.meta.env as SupabaseEnvironment
const supabaseUrl = environment.VITE_SUPABASE_URL
const supabasePublishableKey = environment.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Faltan las variables VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY. ' +
      'Crea y completa el archivo .env.local con los datos de tu proyecto.',
  )
}

/** Cliente único para consultas, autenticación y suscripciones desde el navegador. */
export const supabase = createClient(supabaseUrl, supabasePublishableKey)

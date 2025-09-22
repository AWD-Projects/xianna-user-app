import { createClient } from '@/lib/supabase/server'

export async function getUserDetails(email: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('user_details')
    .select('*')
    .eq('correo', email)
    .single()

  if (error) {
    console.error('Error fetching user details:', error)
    return null
  }

  return data
}
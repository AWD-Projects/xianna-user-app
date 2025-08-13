import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MainGridLogged } from '@/components/home/MainGridLogged'
import { PendingQuestionnaireHandler } from '@/components/dashboard/PendingQuestionnaireHandler'

async function getUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('user_details')
    .select('*')
    .eq('correo', user.email)
    .single()

  return { user, profile }
}

export default async function InicioPage() {
  const userData = await getUser()

  return (
    <main className="min-h-screen bg-gray-50">
      <PendingQuestionnaireHandler />
      <MainGridLogged 
        userName={userData.profile?.nombre || userData.user.email || ''} 
        userStyleId={userData.profile?.tipo_estilo || 0} 
      />
    </main>
  )
}

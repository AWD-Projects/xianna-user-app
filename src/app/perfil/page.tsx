import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileContent } from '@/components/profile/ProfileContent'
import { PendingQuestionnaireHandler } from '@/components/dashboard/PendingQuestionnaireHandler'

export const metadata: Metadata = {
  title: 'Mi Perfil',
  description: 'Gestiona tu perfil y descubre tu estilo personal en Xianna',
}

async function getUserData() {
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

  // Get user style if exists
  let styleData = null
  if (profile?.tipo_estilo) {
    const { data: style } = await supabase
      .from('estilos')
      .select('*')
      .eq('id', profile.tipo_estilo)
      .single()
    styleData = style
  }

  return { user, profile, style: styleData }
}

export default async function ProfilePage() {
  const { user, profile, style } = await getUserData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <PendingQuestionnaireHandler />
      <div className="container mx-auto px-4 py-8">
        <ProfileHeader user={user} profile={profile} />
        <ProfileContent user={user} profile={profile} style={style} />
      </div>
    </div>
  )
}

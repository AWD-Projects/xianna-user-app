import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { HowItWorksSection } from '@/components/home/HowItWorksSection'
import { QuickAccessSection } from '@/components/home/QuickAccessSection'
import { AuthSection } from '@/components/home/AuthSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { CTASection } from '@/components/home/CTASection'
import { Footer } from '@/components/home/Footer'

async function getUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  // Get user profile
  const { data: profile } = await supabase
    .from('user_details')
    .select('*')
    .eq('correo', user.email)
    .single()

  return { user, profile }
}

export default async function HomePage() {
  const userData = await getUser()

  // Si el usuario está logueado, redirigir al inicio personalizado
  if (userData) {
    redirect('/inicio')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}

import { HeroSection } from '@/components/home/HeroSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { HowItWorksSection } from '@/components/home/HowItWorksSection'
import { QuickAccessSection } from '@/components/home/QuickAccessSection'
import { AuthSection } from '@/components/home/AuthSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { CTASection } from '@/components/home/CTASection'
import { Footer } from '@/components/home/Footer'

export default function HomePage() {
  // Middleware now handles authentication redirects

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

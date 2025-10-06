import { HeroSection } from '@/components/home/HeroSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { HowItWorksSection } from '@/components/home/HowItWorksSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { BlogSection } from '@/components/home/BlogSection'
import { Footer } from '@/components/home/Footer'
import { FloatingAuthButton } from '@/components/home/FloatingAuthButton'

export default function HomePage() {
  // Middleware now handles authentication redirects

  return (
    <main className="min-h-screen bg-gray-50">
      <FloatingAuthButton />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <BlogSection />
      <Footer />
    </main>
  )
}

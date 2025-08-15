import { HeroSection } from '@/components/home/HeroSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { HowItWorksSection } from '@/components/home/HowItWorksSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { BlogSection } from '@/components/home/BlogSection'
import { Footer } from '@/components/home/Footer'

export default function HomePage() {
  // Middleware now handles authentication redirects

  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <BlogSection />
      <Footer />
    </main>
  )
}

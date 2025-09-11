'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  const router = useRouter()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-30 animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-200 rounded-full opacity-40 animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-200 rounded-full opacity-25 animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-40 w-12 h-12 bg-purple-200 rounded-full opacity-35 animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Brand */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Image
              src="/images/xianna.png"
              alt="Xianna"
              width={200}
              height={60}
              className="object-contain"
              priority
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Descubre tu
            <span className="block bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              estilo único
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Tu guía personal en moda y estilo. Encuentra outfits perfectos basados en tus gustos, 
            características físicas y estilo de vida. Aprende, inspírate y expresa tu singularidad.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
            { icon: Star, text: "Estilo Personalizado" },
            { icon: Sparkles, text: "Expertos en Moda" },
            { icon: Star, text: "100% Mexicano" }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200"
              >
                <benefit.icon className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              onClick={() => router.push('/formulario')}
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-0 rounded-2xl px-8 py-6 text-lg font-semibold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Descubre tu estilo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              variant="outline"
              onClick={() => router.push('/catalogo')}
              className="border-2 border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-600 rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Encuentra tu outfit ideal
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

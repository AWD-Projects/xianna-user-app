'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Bookmark,
  Star
} from 'lucide-react'

const benefits = [
  "Test de estilo personalizado completamente gratis",
  "Acceso inmediato a tu perfil de estilo único",
  "Outfits curados especialmente para ti",
  "Tips y consejos de expertos en moda mexicana",
  "Contenido exclusivo y actualizaciones semanales"
]

export function CTASection() {
  const router = useRouter()

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-100 rounded-full opacity-50 animate-pulse delay-1000" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-100 rounded-full opacity-40 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-50 to-purple-50 rounded-full opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="bg-gradient-to-br from-pink-500 via-pink-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-8 right-8">
                <Bookmark className="w-16 h-16" />
              </div>
              <div className="absolute bottom-8 left-8">
                <Sparkles className="w-20 h-20" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Star className="w-24 h-24" />
              </div>
            </div>

            <div className="relative z-10 text-center">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4 leading-tight">
                  Tu estilo único te está
                  <span className="block text-yellow-300">esperando</span>
                </h2>
                <p className="text-pink-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                  Únete a miles de mujeres mexicanas que ya descubrieron su estilo ideal. 
                  ¡Es completamente gratis y solo toma unos minutos!
                </p>
              </div>

              {/* Benefits List */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8">
                <h3 className="text-xl font-bold mb-6 text-center">
                  ¿Qué obtienes al registrarte?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-pink-50 text-sm leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Button
                  onClick={() => router.push('/perfil')}
                  className="bg-white text-pink-600 hover:bg-gray-50 border-0 rounded-2xl px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Descubrir mi estilo gratis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => router.push('/catalogo')}
                  className="border-2 border-white/30 text-white hover:bg-white/10 rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-300"
                >
                  Ver catálogo
                </Button>
              </div>

              {/* Auth Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
                <Button
                  onClick={() => router.push('/auth/register')}
                  className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 border-0 rounded-xl px-6 py-3 font-semibold transition-all duration-300"
                >
                  Crear cuenta gratis
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => router.push('/auth/login')}
                  className="border-2 border-white/30 text-white hover:bg-white/10 rounded-xl px-6 py-3 font-semibold transition-all duration-300"
                >
                  Iniciar sesión
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-pink-200 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>100% Gratuito</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Sin spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Resultados inmediatos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              ¿Prefieres explorar primero? También puedes:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push('/blog')}
                className="rounded-xl border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-600"
              >
                Leer nuestro blog
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/contacto')}
                className="rounded-xl border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-600"
              >
                Contactar soporte
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

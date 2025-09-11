'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  UserPlus, 
  LogIn, 
  ArrowRight,
  Shield,
  Bookmark,
  Star,
  CheckCircle
} from 'lucide-react'

const authBenefits = [
  {
    icon: Star,
    title: "Perfil Personalizado",
    description: "Guarda tu estilo descubierto y accede a recomendaciones únicas."
  },
  {
    icon: Bookmark,
    title: "Favoritos Guardados",
    description: "Marca y guarda tus outfits favoritos para acceso rápido."
  },
  {
    icon: Shield,
    title: "Contenido Exclusivo",
    description: "Accede a artículos, tips y consejos solo para miembros."
  }
]

const features = [
  "Test de estilo personalizado",
  "Recomendaciones únicas para ti",
  "Acceso a todo el catálogo",
  "Guardar outfits favoritos",
  "Tips y consejos exclusivos",
  "Actualizaciones de tendencias"
]

export function AuthSection() {
  const router = useRouter()

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <UserPlus className="w-6 h-6 text-pink-500" />
              <span className="text-pink-600 font-semibold uppercase tracking-wide text-sm">
                Únete a Xianna
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Crea tu cuenta y descubre 
              <span className="text-pink-600"> tu estilo único</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Únete a miles de mujeres mexicanas que ya encontraron su estilo ideal. 
              Es completamente gratis y solo toma unos segundos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                ¿Por qué crear una cuenta en Xianna?
              </h3>
              
              {/* Benefits Cards */}
              <div className="space-y-4 mb-8">
                {authBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-pink-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features List */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-4">Lo que incluye tu cuenta gratuita:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Auth Cards */}
            <div className="space-y-6">
              
              {/* Register Card */}
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">¿Nuevo en Xianna?</h3>
                      <p className="text-pink-100">Crea tu cuenta gratuita</p>
                    </div>
                  </div>
                  
                  <p className="text-pink-100 mb-6 leading-relaxed">
                    Regístrate y comienza tu viaje hacia el descubrimiento de tu estilo personal. 
                    ¡Es gratis y solo toma 30 segundos!
                  </p>
                  
                  <Button
                    onClick={() => router.push('/auth/register')}
                    className="w-full bg-white text-pink-600 hover:bg-gray-50 border-0 rounded-xl py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Crear cuenta gratis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <span className="text-pink-200 text-sm">
                      Sin tarjeta de crédito • Sin spam • 100% gratuito
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Login Card */}
              <Card className="hover:shadow-lg transition-all duration-300 border-gray-200">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <LogIn className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">¿Ya tienes cuenta?</h3>
                      <p className="text-gray-600">Inicia sesión para continuar</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Accede a tu perfil personalizado, outfits favoritos y recomendaciones únicas.
                  </p>
                  
                  <Button
                    onClick={() => router.push('/auth/login')}
                    variant="outline"
                    className="w-full border-2 border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-600 rounded-xl py-4 text-lg font-semibold transition-all duration-300"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Iniciar sesión
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

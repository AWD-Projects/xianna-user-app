'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  Sparkles, 
  Heart, 
  User, 
  Star,
  Palette,
  Book,
  ShoppingBag,
  Crown,
  TrendingUp,
  Clock
} from 'lucide-react'

interface MainGridLoggedProps {
  userName: string
  userStyleId: number
}

// Función para obtener el nombre del estilo basado en el ID
const getStyleName = (styleId: number) => {
  const styles = {
    1: 'Clásico',
    2: 'Bohemio', 
    3: 'Minimalista',
    4: 'Romántico',
    5: 'Urbano',
    6: 'Vintage',
    7: 'Elegante',
    8: 'Casual',
    9: 'Sofisticado',
    10: 'Trendy'
  }
  return styles[styleId as keyof typeof styles] || 'Por descubrir'
}

export function MainGridLogged({ userName, userStyleId }: MainGridLoggedProps) {
  const styleName = getStyleName(userStyleId)
  const hasCompletedQuestionnaire = userStyleId > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50">
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-8 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              ¡Hola, <span className="text-pink-600">{userName}</span>!
            </h1>
            <p className="text-gray-600 text-lg">
              Bienvenida a tu espacio personal de estilo
            </p>
          </div>
          
          {hasCompletedQuestionnaire && (
            <Badge className="bg-pink-500 text-white border-0 px-4 py-2 text-sm font-medium">
              <Crown className="w-4 h-4 mr-2" />
              Estilo {styleName}
            </Badge>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Hero Card - Perfil */}
          <Card className="lg:col-span-2 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-pink-500 via-pink-600 to-purple-600 text-white p-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Mi Perfil</h2>
                      <p className="text-pink-100 text-sm">Información personal y estilo</p>
                    </div>
                  </div>

                  {hasCompletedQuestionnaire ? (
                    <div className="space-y-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Palette className="w-5 h-5 text-yellow-300" />
                          <span className="font-semibold">Tu estilo: {styleName}</span>
                        </div>
                        <p className="text-pink-100 text-sm">
                          Perfil completo • Outfits personalizados disponibles
                        </p>
                      </div>
                      
                      <div className="flex gap-3 pt-2">
                        <Button asChild className="bg-white text-pink-600 hover:bg-pink-50 rounded-xl border-0">
                          <Link href="/perfil">
                            Ver detalles
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-yellow-400/20 backdrop-blur-sm rounded-2xl p-4 border border-yellow-300/30">
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="w-5 h-5 text-yellow-300" />
                          <span className="font-semibold">Perfil incompleto</span>
                        </div>
                        <p className="text-pink-100 text-sm">
                          Completa el cuestionario para descubrir tu estilo único
                        </p>
                      </div>
                      
                      <Button asChild className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 rounded-xl border-0 font-semibold">
                        <Link href="/formulario">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Completar cuestionario
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Tu Progreso</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Perfil:</span>
                    <span className={hasCompletedQuestionnaire ? 'text-green-600 font-medium' : 'text-orange-500'}>
                      {hasCompletedQuestionnaire ? 'Completo' : 'Pendiente'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outfits guardados:</span>
                    <span className="font-medium">0</span>
                  </div>
                </div>
               
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Mis Outfits Favoritos */}
          <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <Link href="/mis-outfits">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 text-pink-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  Mis Favoritos
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Outfits que has guardado
                </p>
                <div className="flex items-center justify-center text-pink-500 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Ver colección
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Link>
          </Card>

          {/* Catálogo */}
          <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <Link href="/catalogo">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  Catálogo
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explora nuevos outfits
                </p>
                <div className="flex items-center justify-center text-purple-500 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Explorar
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Link>
          </Card>

          {/* Blog */}
          <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <Link href="/blog">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Book className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Blog
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Consejos y tendencias
                </p>
                <div className="flex items-center justify-center text-blue-500 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Leer artículos
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Link>
          </Card>

          {/* Cuestionario/Estilo */}
          <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <Link href="/formulario">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-7 h-7 text-yellow-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                  {hasCompletedQuestionnaire ? 'Actualizar' : 'Descubrir'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {hasCompletedQuestionnaire ? 'Refina tu estilo' : 'Tu estilo único'}
                </p>
                <div className="flex items-center justify-center text-yellow-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  {hasCompletedQuestionnaire ? 'Actualizar' : 'Comenzar'}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
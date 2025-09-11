'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Bookmark, 
  User, 
  Star,
  Palette,
  Book,
  ShoppingBag,
  Crown,
  TrendingUp,
  Zap,
  ChevronRight,
  Award,
  Target
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
  const router = useRouter()
  const styleName = getStyleName(userStyleId)
  const hasCompletedQuestionnaire = userStyleId > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      {/* Enhanced Header with Animation */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#E61F93]/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -top-4 -right-8 w-16 h-16 bg-[#00D1ED]/20 rounded-full blur-xl animate-pulse delay-1000" />
          
          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#E61F93] rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Panel Personal</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  ¡Hola, <span className="text-[#E61F93]">{userName}</span>!
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Tu espacio personal para descubrir y crear looks únicos que reflejen tu personalidad
                </p>
              </div>
              
              {hasCompletedQuestionnaire && (
                <div className="flex items-center gap-4">
                  <Badge className="bg-[#E61F93] text-white border-0 px-6 py-3 text-base font-semibold rounded-2xl">
                    <Crown className="w-5 h-5 mr-2" />
                    Estilo {styleName}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="container mx-auto px-4 pb-12">
        {/* Hero Section with Better Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Profile Card - Non-clickable, using brand colors */}
          <Card className="lg:col-span-2">
            <CardContent className="p-8">
              {/* Header Section */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#E61F93]/10 rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-[#E61F93]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Mi Perfil
                  </h2>
                  <p className="text-gray-600">Tu identidad de estilo personal</p>
                </div>
              </div>

              {hasCompletedQuestionnaire ? (
                <div className="space-y-6">
                  {/* Style Status */}
                  <div className="bg-[#00D1ED]/5 border border-[#00D1ED]/20 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#00D1ED]/10 rounded-xl flex items-center justify-center">
                        <Palette className="w-5 h-5 text-[#00D1ED]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">Estilo {styleName}</h3>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#00D1ED]" />
                          <span className="text-[#00D1ED] text-sm font-medium">Perfil verificado</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Tu perfil está completo y personalizado. Explora outfits diseñados especialmente para tu estilo.
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button 
                      className="bg-[#E61F93] hover:bg-[#E61F93]/90 text-white rounded-xl font-medium"
                      onClick={() => router.push('/perfil')}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Ver perfil completo
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Incomplete Status */}
                  <div className="bg-[#FDE12D]/5 border border-[#FDE12D]/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#FDE12D]/20 rounded-xl flex items-center justify-center">
                        <Target className="w-5 h-5 text-[#FDE12D]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">¡Descubre tu estilo!</h3>
                        <p className="text-[#FDE12D]/80 text-sm">Solo unos minutos para personalizar tu experiencia</p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Completa nuestro cuestionario personalizado y descubre outfits únicos creados especialmente para ti.
                    </p>
                  </div>
                  
                  {/* Call to Action */}
                  <Button 
                    className="bg-[#FDE12D] hover:bg-[#FDE12D]/90 text-gray-900 rounded-xl font-bold px-6 py-3 w-full text-base"
                    onClick={() => router.push('/formulario')}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Comenzar cuestionario
                    <Zap className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Card - Non-clickable */}
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <div className="relative w-20 h-20 bg-[#00D1ED]/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-[#00D1ED]" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#E61F93] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Tu Progreso</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Perfil:</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${hasCompletedQuestionnaire ? 'bg-[#00D1ED]' : 'bg-[#FDE12D]'}`} />
                        <span className={`font-bold ${hasCompletedQuestionnaire ? 'text-[#00D1ED]' : 'text-[#FDE12D]'}`}>
                          {hasCompletedQuestionnaire ? 'Completo' : 'Pendiente'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  
                  <div className="bg-[#FDE12D]/10 rounded-2xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Actividad:</span>
                      <span className="font-bold text-[#FDE12D]">Nueva</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Action Cards with Better Grid */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-[#E61F93] rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900">Explora Xianna</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Favorites Card */}
            <Card className="group overflow-hidden hover:border-gray-200 transition-all duration-300 hover:scale-105 cursor-pointer">
              <Link href="/mis-outfits">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#E61F93]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Bookmark className="w-8 h-8 text-[#E61F93]" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#E61F93] transition-colors">
                    Mis Favoritos
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Tu colección personal de outfits guardados
                  </p>
                  <div className="flex items-center justify-center text-[#E61F93] font-semibold">
                    Explorar colección
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* Catalog Card */}
            <Card className="group overflow-hidden hover:border-gray-200 transition-all duration-300 hover:scale-105 cursor-pointer">
              <Link href="/catalogo">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#00D1ED]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ShoppingBag className="w-8 h-8 text-[#00D1ED]" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#00D1ED] transition-colors">
                    Catálogo
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Miles de outfits únicos esperándote
                  </p>
                  <div className="flex items-center justify-center text-[#00D1ED] font-semibold">
                    Descubrir looks
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* Blog Card */}
            <Card className="group overflow-hidden hover:border-gray-200 transition-all duration-300 hover:scale-105 cursor-pointer">
              <Link href="/blog">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#FDE12D]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Book className="w-8 h-8 text-[#FDE12D]" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#FDE12D] transition-colors">
                    Blog & Tips
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Consejos, tendencias y guías de estilo
                  </p>
                  <div className="flex items-center justify-center text-[#FDE12D] font-semibold">
                    Leer artículos
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* Style Discovery Card */}
            <Card className="group overflow-hidden hover:border-gray-200 transition-all duration-300 hover:scale-105 cursor-pointer">
              <Link href="/formulario">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#E61F93]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-8 h-8 text-[#E61F93]" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#E61F93] transition-colors">
                    {hasCompletedQuestionnaire ? 'Actualizar Estilo' : 'Descubrir Estilo'}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {hasCompletedQuestionnaire ? 'Refina y actualiza tus preferencias' : 'Encuentra tu identidad de estilo única'}
                  </p>
                  <div className="flex items-center justify-center text-[#E61F93] font-semibold">
                    {hasCompletedQuestionnaire ? 'Actualizar' : 'Comenzar'}
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
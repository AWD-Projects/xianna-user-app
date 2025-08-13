import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, Edit3, Palette, Heart, Sparkles, ArrowRight } from 'lucide-react'
import type { User as AuthUser } from '@supabase/supabase-js'
import type { UserProfile, Style } from '@/types'

interface ProfileContentProps {
  user: AuthUser
  profile: UserProfile | null
  style: Style | null
}

export function ProfileContent({ user, profile, style }: ProfileContentProps) {
  const hasCompletedProfile = profile && profile.tipo_estilo

  if (!hasCompletedProfile) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center p-12 border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Palette className="w-8 h-8 text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Completa tu perfil de estilo!
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Responde nuestro cuestionario para descubrir tu estilo único y recibir 
            recomendaciones personalizadas.
          </p>
          <Button asChild className="bg-pink-500 hover:bg-pink-600 rounded-xl px-8">
            <Link href="/formulario">
              Comenzar cuestionario
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <CardTitle className="text-2xl">{profile?.nombre || user.email}</CardTitle>
            <p className="text-gray-600">{user.email}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile?.edad && (
              <div className="flex justify-between">
                <span className="text-gray-600">Edad</span>
                <span className="font-medium">{profile.edad} años</span>
              </div>
            )}
            {profile?.ciudad && (
              <div className="flex justify-between">
                <span className="text-gray-600">Ciudad</span>
                <span className="font-medium">{profile.ciudad}</span>
              </div>
            )}
            {profile?.profesion && (
              <div className="flex justify-between">
                <span className="text-gray-600">Profesión</span>
                <span className="font-medium">{profile.profesion}</span>
              </div>
            )}
            <Button variant="outline" className="w-full rounded-xl">
              <Edit3 className="w-4 h-4 mr-2" />
              Editar perfil
            </Button>
          </CardContent>
        </Card>

        {/* Style Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-yellow-800" />
              </div>
              <div>
                <CardTitle className="text-2xl">Tu Estilo Personal</CardTitle>
                <p className="text-gray-600">Descubrimos que tu estilo es...</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {style ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-pink-600 mb-3">
                    {style.tipo}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {style.descripcion}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Badge className="bg-pink-100 text-pink-800 border-pink-200">
                    Tu estilo principal
                  </Badge>
                </div>

                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/formulario">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Actualizar estilo
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  No hemos podido cargar la información de tu estilo
                </p>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/formulario">
                    Realizar cuestionario nuevamente
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 hover:scale-105 transition-all duration-300 group">
          <Link href="/mis-outfits" className="block">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Mis Outfits</h3>
              <p className="text-gray-600 text-sm mb-4">
                Outfits que has guardado como favoritos
              </p>
              <ArrowRight className="w-5 h-5 mx-auto text-purple-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </Card>

        <Card className="p-6 hover:scale-105 transition-all duration-300 group">
          <Link href="/catalogo" className="block">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Explorar Catálogo</h3>
              <p className="text-gray-600 text-sm mb-4">
                Descubre nuevos outfits para tu estilo
              </p>
              <ArrowRight className="w-5 h-5 mx-auto text-yellow-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </Card>

        <Card className="p-6 hover:scale-105 transition-all duration-300 group">
          <Link href="/blog" className="block">
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Blog de Moda</h3>
              <p className="text-gray-600 text-sm mb-4">
                Tips y tendencias para tu estilo
              </p>
              <ArrowRight className="w-5 h-5 mx-auto text-pink-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </Card>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Heart, Book, ShoppingBag } from 'lucide-react'
import type { User as AuthUser } from '@supabase/supabase-js'
import type { UserProfile, Style } from '@/types'

interface ProfileContentProps {
  user: AuthUser
  profile: UserProfile | null
  style: Style | null
}

export function ProfileContent({ user, profile, style }: ProfileContentProps) {
  const router = useRouter()
  const hasCompletedProfile = profile && profile.tipo_estilo

  if (!hasCompletedProfile) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center p-12 border-2 border-dashed border-[#FDE12D]/30 bg-gradient-to-br from-[#FDE12D]/5 to-white">
          <div className="w-20 h-20 bg-[#FDE12D]/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-[#FDE12D]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Descubre tu estilo personal!
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            Completa nuestro cuestionario personalizado y descubre outfits únicos creados especialmente para ti.
          </p>
          <Button 
            className="bg-[#FDE12D] hover:bg-[#FDE12D]/90 text-gray-900 rounded-xl font-bold px-8 py-3 text-base"
            onClick={() => router.push('/formulario')}
          >
            Comenzar cuestionario
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Main Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <Card className="lg:col-span-2">
          <CardContent className="p-8">
            {/* Header Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Información Personal
              </h2>
              <p className="text-gray-600">Tus datos y preferencias</p>
            </div>

            {/* User Info */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Nombre</label>
                    <p className="text-lg font-semibold text-gray-900 mt-1">{profile?.nombre || 'No especificado'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email</label>
                    <p className="text-lg font-semibold text-gray-900 mt-1">{user.email}</p>
                  </div>
                  {profile?.edad && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Edad</label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">{profile.edad} años</p>
                    </div>
                  )}
                  {profile?.ciudad && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Ciudad</label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">{profile.ciudad}</p>
                    </div>
                  )}
                  {profile?.profesion && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Profesión</label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">{profile.profesion}</p>
                    </div>
                  )}
                </div>
              </div>
              
            </div>
          </CardContent>
        </Card>

        {/* Style Section */}
        {style ? (
          <Card>
            <CardContent className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Tu Estilo Personal
                </h2>
                <p className="text-gray-600">Tu identidad de estilo única</p>
              </div>

              <div className="bg-[#E61F93]/5 border border-[#E61F93]/20 rounded-xl p-6">
                <div className="mb-4">
                  <h3 className="text-3xl font-bold text-[#E61F93] mb-1">{style.tipo}</h3>
                  <span className="text-[#E61F93] text-sm font-medium">Tu estilo principal</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {style.descripcion}
                </p>
                
                <div className="flex gap-3">
                  <Button 
                    className="bg-[#E61F93] hover:bg-[#E61F93]/90 text-white rounded-xl font-medium"
                    onClick={() => router.push('/formulario')}
                  >
                    Actualizar estilo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FDE12D]/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-[#FDE12D]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  ¡Descubre tu estilo!
                </h2>
                <p className="text-gray-600 mb-6">
                  Completa nuestro cuestionario para descubrir tu estilo único
                </p>
                <Button 
                  className="bg-[#FDE12D] hover:bg-[#FDE12D]/90 text-gray-900 rounded-xl font-medium"
                  onClick={() => router.push('/formulario')}
                >
                  Comenzar cuestionario
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>


      {/* Quick Actions Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Acciones Rápidas</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Favorites Card */}
          <Card className="group overflow-hidden hover:border-gray-200 transition-all duration-300 hover:scale-105 cursor-pointer">
            <Link href="/mis-outfits">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#E61F93]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-[#E61F93]" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#E61F93] transition-colors">
                  Mis Favoritos
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Tu colección personal de outfits guardados
                </p>
                <div className="text-center text-[#E61F93] font-semibold">
                  Explorar colección
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
                <div className="text-center text-[#00D1ED] font-semibold">
                  Descubrir looks
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
                <div className="text-center text-[#FDE12D] font-semibold">
                  Leer artículos
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}

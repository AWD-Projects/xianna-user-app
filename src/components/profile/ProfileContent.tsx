'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { StyleSummaryGenerator } from '@/components/ui/style-summary-generator'
import { Sparkles, Bookmark, Book, ShoppingBag, Edit2, Save, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { User as AuthUser } from '@supabase/supabase-js'
import type { UserProfile, Style } from '@/types'

interface ProfileContentProps {
  user: AuthUser
  profile: UserProfile | null
  style: Style | null
}

export function ProfileContent({ user, profile, style }: ProfileContentProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editingProfile, setEditingProfile] = useState<UserProfile | null>(profile)
  const [isLoading, setIsLoading] = useState(false)
  const hasCompletedProfile = profile && profile.tipo_estilo

  const handleSave = async () => {
    if (!editingProfile) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/user-details', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: user.email,
          nombre: editingProfile.nombre,
          estado: editingProfile.estado,
          genero: editingProfile.genero,
          edad: editingProfile.edad,
          ocupacion: editingProfile.ocupacion,
          talla: editingProfile.talla
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error updating profile')
      }
      
      setIsEditing(false)
      router.refresh()
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditingProfile(profile)
    setIsEditing(false)
  }

  // Render questionnaire banner for users who haven't completed it
  const renderQuestionnaireBanner = () => (
    <div className="max-w-4xl mx-auto mb-12">
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

  return (
    <div className="space-y-12">
      {/* Show questionnaire banner if profile not completed */}
      {!hasCompletedProfile && renderQuestionnaireBanner()}
      
      {/* Main Profile Section - only show if profile completed */}
      {hasCompletedProfile && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <Card className="lg:col-span-2">
          <CardContent className="p-8">
            {/* Header Section */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Información Personal
                  </h2>
                  <p className="text-gray-600">Tus datos y preferencias</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                      >
                        <Save className="w-4 h-4" />
                        {isLoading ? 'Guardando...' : 'Guardar'}
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="flex items-center justify-center gap-2 w-full sm:w-auto"
                      >
                        <X className="w-4 h-4" />
                        Cancelar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Nombre</label>
                    {isEditing ? (
                      <Input
                        value={editingProfile?.nombre || ''}
                        onChange={(e) => setEditingProfile(prev => prev ? {...prev, nombre: e.target.value} : null)}
                        className="mt-2"
                        placeholder="Ingresa tu nombre"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-gray-900 mt-1">{profile?.nombre || 'No especificado'}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email</label>
                    <p className="text-lg font-semibold text-gray-900 mt-1">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Edad</label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editingProfile?.edad || ''}
                        onChange={(e) => setEditingProfile(prev => prev ? {...prev, edad: Number(e.target.value)} : null)}
                        className="mt-2"
                        placeholder="Ingresa tu edad"
                        min="18"
                        max="100"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-gray-900 mt-1">{profile?.edad ? `${profile.edad} años` : 'No especificado'}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Estado</label>
                    {isEditing ? (
                      <select
                        value={editingProfile?.estado || ''}
                        onChange={(e) => setEditingProfile(prev => prev ? {...prev, estado: e.target.value} : null)}
                        className="mt-2 w-full h-12 border border-gray-300 rounded-lg pl-4 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-[#E61F93]"
                      >
                        <option value="">Selecciona tu estado</option>
                        <option value="aguascalientes">Aguascalientes</option>
                        <option value="baja-california">Baja California</option>
                        <option value="baja-california-sur">Baja California Sur</option>
                        <option value="campeche">Campeche</option>
                        <option value="chiapas">Chiapas</option>
                        <option value="chihuahua">Chihuahua</option>
                        <option value="coahuila">Coahuila</option>
                        <option value="colima">Colima</option>
                        <option value="durango">Durango</option>
                        <option value="guanajuato">Guanajuato</option>
                        <option value="guerrero">Guerrero</option>
                        <option value="hidalgo">Hidalgo</option>
                        <option value="jalisco">Jalisco</option>
                        <option value="mexico">Estado de México</option>
                        <option value="michoacan">Michoacán</option>
                        <option value="morelos">Morelos</option>
                        <option value="nayarit">Nayarit</option>
                        <option value="nuevo-leon">Nuevo León</option>
                        <option value="oaxaca">Oaxaca</option>
                        <option value="puebla">Puebla</option>
                        <option value="queretaro">Querétaro</option>
                        <option value="quintana-roo">Quintana Roo</option>
                        <option value="san-luis-potosi">San Luis Potosí</option>
                        <option value="sinaloa">Sinaloa</option>
                        <option value="sonora">Sonora</option>
                        <option value="tabasco">Tabasco</option>
                        <option value="tamaulipas">Tamaulipas</option>
                        <option value="tlaxcala">Tlaxcala</option>
                        <option value="veracruz">Veracruz</option>
                        <option value="yucatan">Yucatán</option>
                        <option value="zacatecas">Zacatecas</option>
                        <option value="cdmx">Ciudad de México</option>
                      </select>
                    ) : (
                      <p className="text-lg font-semibold text-gray-900 mt-1">{profile?.estado || 'No especificado'}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Género</label>
                    {isEditing ? (
                      <select
                        value={editingProfile?.genero || ''}
                        onChange={(e) => setEditingProfile(prev => prev ? {...prev, genero: e.target.value} : null)}
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Selecciona tu género</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                      </select>
                    ) : (
                      <p className="text-lg font-semibold text-gray-900 mt-1">{profile?.genero || 'No especificado'}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Talla</label>
                    {isEditing ? (
                      <select
                        value={editingProfile?.talla || ''}
                        onChange={(e) => setEditingProfile(prev => prev ? {...prev, talla: e.target.value} : null)}
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Selecciona tu talla</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>
                    ) : (
                      <p className="text-lg font-semibold text-gray-900 mt-1">{profile?.talla || 'No especificado'}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Ocupación</label>
                    {isEditing ? (
                      <select
                        value={editingProfile?.ocupacion || ''}
                        onChange={(e) => setEditingProfile(prev => prev ? {...prev, ocupacion: e.target.value} : null)}
                        className="mt-2 w-full h-12 border border-gray-300 rounded-lg pl-4 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-[#E61F93]"
                      >
                        <option value="">Selecciona tu ocupación</option>
                        <option value="estudiante">Estudiante</option>
                        <option value="profesionista-oficina">Profesionista en oficina (contadora, abogada, ejecutiva)</option>
                        <option value="profesionista-creativa">Profesionista creativa (diseñadora, fotógrafa, artista)</option>
                        <option value="profesionista-salud">Profesionista en sector salud</option>
                        <option value="profesionista-educativo">Profesionista en sector educativo</option>
                        <option value="emprendedora">Dueña de negocio / Emprendedora</option>
                        <option value="ama-casa">Ama de casa / Cuidadora</option>
                      </select>
                    ) : (
                      <p className="text-lg font-semibold text-gray-900 mt-1">{profile?.ocupacion || 'No especificado'}</p>
                    )}
                  </div>
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
                
                <Button 
                  className="bg-[#E61F93] hover:bg-[#E61F93]/90 text-white rounded-xl font-medium w-full"
                  onClick={() => router.push('/formulario')}
                >
                  Actualizar estilo
                </Button>
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
      )}

      {/* Quick Actions Section - Always shown */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Acciones Rápidas</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Visual Summary Generator Card - Always shown */}
          <Card className={`group overflow-hidden transition-all duration-300 ${
            profile && style 
              ? 'hover:border-gray-200 hover:scale-105 cursor-pointer' 
              : 'border-gray-100 bg-gray-50/50 cursor-not-allowed opacity-60'
          }`}>
            <CardContent className="p-8 text-center">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 ${
                profile && style 
                  ? 'bg-gradient-to-br from-[#E61F93]/10 to-[#00D1ED]/10 group-hover:scale-110' 
                  : 'bg-gray-200'
              }`}>
                <Sparkles className={`w-8 h-8 ${
                  profile && style ? 'text-[#E61F93]' : 'text-gray-400'
                }`} />
              </div>
              <h3 className={`font-bold text-xl mb-3 transition-colors ${
                profile && style 
                  ? 'text-gray-900 group-hover:text-[#E61F93]' 
                  : 'text-gray-500'
              }`}>
                Compartir Estilo
              </h3>
              <p className={`mb-6 leading-relaxed ${
                profile && style ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {profile && style 
                  ? 'Genera imagen de tu estilo para redes sociales'
                  : 'Completa el cuestionario para generar tu imagen de estilo'
                }
              </p>
              {profile && style ? (
                <StyleSummaryGenerator 
                  profile={profile} 
                  style={style} 
                  className="text-center"
                />
              ) : (
                <Button 
                  disabled
                  className="bg-gray-300 text-gray-500 cursor-not-allowed rounded-xl px-8 py-3 min-w-[200px]"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generar resumen visual
                </Button>
              )}
            </CardContent>
          </Card>
          
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

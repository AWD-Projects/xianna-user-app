'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Eye, Star } from 'lucide-react'
import { toggleFavorite } from '@/store/slices/outfitSlice'
import type { Outfit } from '@/types'
import type { AppDispatch, RootState } from '@/store'

interface OutfitCardProps {
  outfit: Outfit
}

export function OutfitCard({ outfit }: OutfitCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { favorites } = useSelector((state: RootState) => state.outfit)
  const [isToggling, setIsToggling] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  // Debug: Log outfit data
  console.log('Outfit data:', { id: outfit.id, estilo: outfit.estilo, nombre: outfit.nombre })
  
  const isFavorited = favorites.includes(outfit.id)

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user?.email || isToggling) return
    
    setIsToggling(true)
    try {
      await dispatch(toggleFavorite({ 
        userEmail: user.email, 
        outfitId: outfit.id 
      })).unwrap()
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setIsToggling(false)
    }
  }

  return (
    <Card className="group overflow-hidden hover:border-gray-200 transition-all duration-300 hover:shadow-lg relative">
      {/* Heart Button Over Image */}
      {user && (
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full transition-all duration-200 shadow-md ${
            isFavorited 
              ? 'bg-[#E61F93] text-white hover:bg-[#E61F93]/90' 
              : 'bg-white/90 text-gray-600 hover:bg-white backdrop-blur-sm'
          }`}
          onClick={handleToggleFavorite}
          disabled={isToggling}
        >
          {isToggling ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Heart 
              className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} 
            />
          )}
        </Button>
      )}
      
      {/* Clickable Image Section */}
      <Link href={`/catalogo/${outfit.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Outfit Image */}
          {!imageError && outfit.imagen && outfit.imagen !== '/placeholder-outfit.jpg' && outfit.imagen.trim() !== '' ? (
            <Image
              src={outfit.imagen}
              alt={outfit.nombre}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="w-16 h-16 bg-[#E61F93]/10 rounded-full flex items-center justify-center mb-3">
                <Star className="w-8 h-8 text-[#E61F93]" />
              </div>
              <span className="text-sm font-medium text-gray-600">{outfit.nombre}</span>
              <span className="text-xs text-gray-400 mt-1">
                {imageError ? 'Error al cargar imagen' : 'Imagen no disponible'}
              </span>
            </div>
          )}

          {/* Style badge */}
          <Badge className="absolute top-3 left-3 bg-[#E61F93] text-white border-0 shadow-md">
            {outfit.estilo || 'Sin estilo'}
          </Badge>

          {/* Hover overlay with view indicator */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                <Eye className="w-6 h-6 text-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Content Section - Non-clickable */}
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title and Description */}
          <div>
            <h3 className="font-bold text-lg mb-1 line-clamp-1 text-gray-900">
              {outfit.nombre}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {outfit.descripcion}
            </p>
          </div>
          
          {/* Occasions */}
          <div className="flex flex-wrap gap-1">
            {outfit.ocasiones.slice(0, 2).map((ocasion, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs border-gray-200 text-gray-600"
              >
                {ocasion}
              </Badge>
            ))}
            {outfit.ocasiones.length > 2 && (
              <Badge variant="outline" className="text-xs border-gray-200 text-gray-600">
                +{outfit.ocasiones.length - 2}
              </Badge>
            )}
          </div>
          
          {/* Bottom row with favorites count and action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Heart className="w-4 h-4" />
              <span>{outfit.favoritos}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

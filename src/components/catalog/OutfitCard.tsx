'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, ExternalLink, Star } from 'lucide-react'
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
    <Card className="group overflow-hidden hover:border-gray-200 transition-all duration-300 hover:scale-105">
      <Link href={`/catalogo/${outfit.id}`}>
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
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-pink-50 to-purple-50">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                <Star className="w-8 h-8 text-pink-400" />
              </div>
              <span className="text-sm font-medium text-gray-600">{outfit.nombre}</span>
              <span className="text-xs text-gray-400 mt-1">
                {imageError ? 'Error al cargar imagen' : 'Imagen no disponible'}
              </span>
            </div>
          )}
          
          {/* Favorite button - only show if user is logged in */}
          {user && (
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 rounded-full transition-all duration-200 ${
                isFavorited 
                  ? 'bg-pink-500 text-white hover:bg-pink-600' 
                  : 'bg-white/80 text-gray-600 hover:bg-white'
              }`}
              onClick={handleToggleFavorite}
              disabled={isToggling}
            >
              <Heart 
                className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} 
              />
            </Button>
          )}

          {/* Style badge */}
          <Badge className="absolute top-3 left-3 bg-pink-500 text-white border-0">
            {outfit.estilo || 'Sin estilo'}
          </Badge>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
          
          {/* View button */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="icon" className="bg-white text-gray-900 hover:bg-gray-100 rounded-full">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-2 group-hover:text-pink-600 transition-colors line-clamp-1">
            {outfit.nombre}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {outfit.descripcion}
          </p>
          
          {/* Occasions */}
          <div className="flex flex-wrap gap-1 mb-4">
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
          
          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-500">
              <Heart className="w-4 h-4" />
              <span>{outfit.favoritos}</span>
            </div>
            
            <span className="text-pink-500 font-medium group-hover:text-pink-600">
              Ver detalles →
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

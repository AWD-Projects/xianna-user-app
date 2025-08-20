'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Eye, Sparkles, Star } from 'lucide-react'
import { toggleFavorite, fetchUserFavorites } from '@/store/slices/outfitSlice'
import type { AppDispatch, RootState } from '@/store'

interface FavoriteOutfit {
  outfit: number
  outfits: {
    id: number
    nombre: string
    descripcion: string
    estilo: string
    estilos: { tipo: string } | null
    outfit_ocasion: Array<{
      ocasion: { ocasion: string }
    }>
    imagen: string
  } | null
}

interface MyOutfitsGridProps {
  favorites: FavoriteOutfit[]
}

export function MyOutfitsGrid({ favorites }: MyOutfitsGridProps) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { favorites: currentFavorites, favoritesLoaded } = useSelector((state: RootState) => state.outfit)
  const [filteredFavorites, setFilteredFavorites] = useState(favorites)
  
  // Favorites are now automatically loaded in AuthProvider when user signs in
  
  // Update filtered favorites when props change or favorites are removed
  useEffect(() => {
    console.log('Debug - favorites from props:', favorites.length)
    console.log('Debug - currentFavorites from Redux:', currentFavorites)
    console.log('Debug - favoritesLoaded:', favoritesLoaded)
    
    // If favorites haven't been loaded into Redux yet, show server-side favorites from props
    if (!favoritesLoaded) {
      console.log('Debug - Using favorites from props (Redux not loaded yet)')
      setFilteredFavorites(favorites)
    } else {
      // Redux favorites are loaded, filter based on current Redux state
      const updatedFavorites = favorites.filter(favorite => 
        favorite.outfits && currentFavorites.includes(favorite.outfits.id)
      )
      console.log('Debug - Filtered favorites based on Redux state:', updatedFavorites.length)
      setFilteredFavorites(updatedFavorites)
    }
  }, [favorites, currentFavorites, favoritesLoaded])
  
  if (filteredFavorites.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-[#E61F93]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-[#E61F93]" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Aún no tienes outfits favoritos
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Explora nuestro catálogo y guarda los outfits que más te gusten 
          para encontrarlos fácilmente aquí.
        </p>
        <Button 
          className="bg-[#E61F93] hover:bg-[#E61F93]/90 rounded-xl px-8"
          onClick={() => router.push('/catalogo')}
        >
          Explorar catálogo
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {filteredFavorites
        .filter((favorite) => favorite.outfits !== null)
        .map((favorite) => {
          const outfit = favorite.outfits!
          
          return <OutfitCard key={outfit.id} outfit={outfit} user={user} dispatch={dispatch} />
        })}
    </div>
  )
}

// Separate component to avoid hooks inside map
function OutfitCard({ outfit, user, dispatch }: { 
  outfit: any, 
  user: any, 
  dispatch: AppDispatch 
}) {
  const { favorites: currentFavorites, favoritesLoaded } = useSelector((state: RootState) => state.outfit)
  const [isToggling, setIsToggling] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const ocasiones = outfit.outfit_ocasion?.map((o: any) => o.ocasion.ocasion) || []
  const isFavorited = favoritesLoaded ? currentFavorites.includes(outfit.id) : true // Default to true if not loaded yet
  
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
      {/* Heart Button Over Image - For Removing from Favorites */}
      {user && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full transition-all duration-200 shadow-md bg-[#E61F93] text-white hover:bg-red-500"
          onClick={handleToggleFavorite}
          disabled={isToggling}
          title="Remover de favoritos"
        >
          {isToggling ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Heart className="w-4 h-4 fill-current" />
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
            {ocasiones.slice(0, 2).map((ocasion: string, index: number) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs border-gray-200 text-gray-600"
              >
                {ocasion}
              </Badge>
            ))}
            {ocasiones.length > 2 && (
              <Badge variant="outline" className="text-xs border-gray-200 text-gray-600">
                +{ocasiones.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, ExternalLink, Sparkles } from 'lucide-react'

interface FavoriteOutfit {
  outfit: number
  outfits: {
    id: number
    nombre: string
    descripcion: string
    estilos: { tipo: string } | null
    outfit_ocasion: Array<{
      ocasion: { ocasion: string }
    }>
  } | null
}

interface MyOutfitsGridProps {
  favorites: FavoriteOutfit[]
}

export function MyOutfitsGrid({ favorites }: MyOutfitsGridProps) {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-purple-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Aún no tienes outfits favoritos
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Explora nuestro catálogo y guarda los outfits que más te gusten 
          para encontrarlos fácilmente aquí.
        </p>
        <Button asChild className="bg-purple-500 hover:bg-purple-600 rounded-xl px-8">
          <Link href="/catalogo">
            Explorar catálogo
            <Sparkles className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {favorites
        .filter((favorite) => favorite.outfits !== null)
        .map((favorite) => {
          const outfit = favorite.outfits!
          
          const ocasiones = outfit.outfit_ocasion?.map(o => o.ocasion.ocasion) || []
          const estiloTipo = outfit.estilos?.tipo || 'Sin estilo'
          
          return (
            <Card key={outfit.id} className="group overflow-hidden hover:border-gray-200 transition-all duration-300 hover:scale-105">
              <Link href={`/catalogo/${outfit.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                  {/* Placeholder for outfit image */}
                  <div className="w-full h-full flex items-center justify-center text-purple-600">
                    <span className="text-sm font-medium">Outfit {outfit.nombre}</span>
                  </div>
                  
                  {/* Favorite badge */}
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>

                  {/* Style badge */}
                  <Badge className="absolute top-3 left-3 bg-purple-500 text-white border-0">
                    {estiloTipo}
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
                  <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors line-clamp-1">
                    {outfit.nombre}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {outfit.descripcion}
                  </p>
                  
                  {/* Occasions */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {ocasiones.slice(0, 2).map((ocasion, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs border-purple-200 text-purple-600"
                      >
                        {ocasion}
                      </Badge>
                    ))}
                    {ocasiones.length > 2 && (
                      <Badge variant="outline" className="text-xs border-purple-200 text-purple-600">
                        +{ocasiones.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-500 font-medium">Guardado</span>
                    <span className="text-purple-500 font-medium group-hover:text-purple-600">
                      Ver detalles →
                    </span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          )
      })}
    </div>
  )
}

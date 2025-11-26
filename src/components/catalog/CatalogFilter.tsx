'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Loader2 } from 'lucide-react'
import { trackCatalogFilterClick } from '@/lib/gtm'
import type { Style, Occasion } from '@/types'
import type { RootState } from '@/store'

interface CatalogFilterProps {
  styles: Style[]
  occasions: Occasion[]
  selectedStyles: string[]
  selectedOccasions: string[]
}

export function CatalogFilter({ 
  styles, 
  occasions, 
  selectedStyles, 
  selectedOccasions 
}: CatalogFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { loading } = useSelector((state: RootState) => state.outfit)

  const updateFilters = (newStyles: string[], newOccasions: string[]) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (newStyles.length > 0) {
      params.set('styles', newStyles.join(','))
    } else {
      params.delete('styles')
    }
    
    if (newOccasions.length > 0) {
      params.set('occasions', newOccasions.join(','))
    } else {
      params.delete('occasions')
    }
    
    params.delete('page') // Reset page when changing filters
    router.push(`/catalogo?${params.toString()}`)
  }

  const toggleStyle = (style: string) => {
    trackCatalogFilterClick('estilo', style)
    const newStyles = selectedStyles.includes(style)
      ? selectedStyles.filter(s => s !== style)
      : [...selectedStyles, style]
    updateFilters(newStyles, selectedOccasions)
  }

  const toggleOccasion = (occasion: string) => {
    trackCatalogFilterClick('ocasion', occasion)
    const newOccasions = selectedOccasions.includes(occasion)
      ? selectedOccasions.filter(o => o !== occasion)
      : [...selectedOccasions, occasion]
    updateFilters(selectedStyles, newOccasions)
  }

  const clearAllFilters = () => {
    updateFilters([], [])
  }

  const hasActiveFilters = selectedStyles.length > 0 || selectedOccasions.length > 0

  return (
    <div className="space-y-4">
      {/* Header compacto */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
          {loading && (
            <Loader2 className="w-3 h-3 animate-spin text-pink-500" />
          )}
          {hasActiveFilters && (
            <Badge variant="secondary" className="text-xs">
              {selectedStyles.length + selectedOccasions.length}
            </Badge>
          )}
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-xs text-gray-500 hover:text-gray-700 h-6 px-2"
          >
            <X className="w-3 h-3 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Filtros en línea horizontal */}
      <div className="space-y-3">
        {/* Estilos - TODAS las opciones */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-gray-600 min-w-fit">Estilos:</span>
          {styles.map((style) => (
            <Button
              key={style.id}
              variant={selectedStyles.includes(style.tipo) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleStyle(style.tipo)}
              disabled={loading}
              className="h-7 px-3 text-xs rounded-full border-gray-200 hover:border-gray-300 disabled:opacity-50"
            >
              {style.tipo}
            </Button>
          ))}
        </div>

        {/* Ocasiones - TODAS las opciones */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-gray-600 min-w-fit">Ocasiones:</span>
          {occasions.map((occasion) => (
            <Button
              key={occasion.id}
              variant={selectedOccasions.includes(occasion.ocasion) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleOccasion(occasion.ocasion)}
              disabled={loading}
              className="h-7 px-3 text-xs rounded-full border-gray-200 hover:border-gray-300 disabled:opacity-50"
            >
              {occasion.ocasion}
            </Button>
          ))}
        </div>
      </div>

      {/* Separador sutil */}
      <div className="border-t border-gray-100 pt-4" />
    </div>
  )
}

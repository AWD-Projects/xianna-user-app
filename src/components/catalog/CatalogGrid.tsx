'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OutfitCard } from './OutfitCard'
import { CatalogFilter } from './CatalogFilter'
import { CatalogSkeleton } from './CatalogSkeleton'
import { CatalogPagination } from './CatalogPagination'
import { fetchOutfits, fetchStyles, fetchOccasions } from '@/store/slices/outfitSlice'
import type { AppDispatch, RootState } from '@/store'

interface CatalogGridProps {
  styles: string[]
  occasions: string[]
  page: number
}

export function CatalogGrid({ styles, occasions, page }: CatalogGridProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { 
    outfits, 
    styles: allStyles, 
    occasions: allOccasions, 
    loading,
    pagination 
  } = useSelector((state: RootState) => state.outfit)

  useEffect(() => {
    dispatch(fetchStyles())
    dispatch(fetchOccasions())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchOutfits({ styles, occasions, page }))
  }, [dispatch, styles, occasions, page])

  // Mostrar skeleton durante carga inicial o cuando hay cambios de filtros/paginación
  if (loading) {
    return (
      <div className="space-y-8">
        <CatalogFilter 
          styles={allStyles} 
          occasions={allOccasions}
          selectedStyles={styles}
          selectedOccasions={occasions}
        />
        <CatalogSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <CatalogFilter 
        styles={allStyles} 
        occasions={allOccasions}
        selectedStyles={styles}
        selectedOccasions={occasions}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {outfits.map((outfit) => (
          <OutfitCard key={outfit.id} outfit={outfit} />
        ))}
      </div>

      {outfits.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👗</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron outfits</h3>
          <p className="text-gray-500">Intenta ajustar los filtros para ver más resultados.</p>
        </div>
      )}

      {/* Pagination */}
      {outfits.length > 0 && (
        <CatalogPagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalOutfits={pagination.totalOutfits}
        />
      )}
    </div>
  )
}

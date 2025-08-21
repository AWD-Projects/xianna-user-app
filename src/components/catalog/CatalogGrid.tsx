'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import Cookies from 'js-cookie'
import { OutfitCard } from './OutfitCard'
import { CatalogFilter } from './CatalogFilter'
import { CatalogSkeleton } from './CatalogSkeleton'
import { CatalogPagination } from './CatalogPagination'
import { fetchOutfits, fetchStyles, fetchOccasions } from '@/store/slices/outfitSlice'
import { Check } from 'lucide-react'
import type { AppDispatch, RootState } from '@/store'

interface CatalogGridProps {
  styles: string[]
  occasions: string[]
  page: number
}

export function CatalogGrid({ styles, occasions, page }: CatalogGridProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { 
    outfits, 
    styles: allStyles, 
    occasions: allOccasions, 
    loading,
    pagination 
  } = useSelector((state: RootState) => state.outfit)

  // Show first-time favorites tip
  useEffect(() => {
    if (user?.email) {
      const hasSeenFavoritesTip = Cookies.get('xianna-favorites-tip')
      
      if (!hasSeenFavoritesTip) {
        const timer = setTimeout(() => {
          toast('Haz clic en el corazón para guardar tus outfits favoritos', {
            duration: 8000,
            action: {
              label: <Check className="w-4 h-4" />,
              onClick: () => {
                Cookies.set('xianna-favorites-tip', 'seen', { expires: 365 }) // 1 year
                toast.dismiss()
              }
            },
            style: {
              background: 'white',
              border: '1px solid #e5e7eb',
              color: '#374151'
            },
            actionButtonStyle: {
              backgroundColor: '#E61F93',
              color: 'white',
              fontWeight: '500',
              padding: '6px',
              minWidth: '32px',
              height: '32px',
              borderRadius: '6px'
            }
          })
        }, 2000) // Show after 2 seconds
        
        return () => clearTimeout(timer)
      }
    }
  }, [user?.email])

  useEffect(() => {
    dispatch(fetchStyles())
    dispatch(fetchOccasions())
  }, [dispatch])

  // Load outfits when filters or page change
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

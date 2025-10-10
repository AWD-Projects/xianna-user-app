'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import Cookies from 'js-cookie'
import { OutfitCard } from './OutfitCard'
import { CatalogFilter } from './CatalogFilter'
import { CatalogSkeleton } from './CatalogSkeleton'
import { CatalogPagination } from './CatalogPagination'
import { fetchOutfits, fetchStyles, fetchOccasions } from '@/store/slices/outfitSlice'
import { Check, X } from 'lucide-react'
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

  // 👇 Mostrar el CTA siempre al cargar; si el usuario lo cierra, se oculta sólo en esta sesión/página
  const [showStyleCTA, setShowStyleCTA] = useState(true)

  useEffect(() => {
    if (user?.email) {
      const hasSeenFavoritesTip = Cookies.get('xianna-favorites-tip')
      if (!hasSeenFavoritesTip) {
        const timer = setTimeout(() => {
          toast('Haz clic en el ícono de guardar para añadir tus outfits favoritos.', {
            duration: 8000,
            action: {
              label: <Check className="w-4 h-4" />,
              onClick: () => {
                Cookies.set('xianna-favorites-tip', 'seen', { expires: 365 })
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
        }, 2000)
        return () => clearTimeout(timer)
      }
    }
  }, [user?.email])

  useEffect(() => {
    dispatch(fetchStyles())
    dispatch(fetchOccasions())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchOutfits({ styles, occasions, page }))
  }, [dispatch, styles, occasions, page])

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
    
      {/* CTA: aparece siempre al cargar; se puede cerrar (no persiste) */}
      {showStyleCTA && (
        <div className="relative rounded-full bg-pink-50/70 border border-pink-200/60 px-4 py-2 flex items-center justify-between shadow-sm hover:shadow transition-shadow">

          <div className="flex items-center gap-2">
            <span className="text-pink-600 text-lg">
              <Check className="w-5 h-5" />
            </span>
            <span className="text-sm text-pink-900/80">
              Descubre tu estilo personal ¡en 5 minutos!
            </span>
          </div>

          <a
            href="/formulario"
            className="ml-3 inline-flex items-center rounded-full bg-pink-600 hover:bg-pink-700 text-white text-xs font-medium px-3 py-1 transition-colors"
            aria-label="Iniciar formulario para descubrir tu estilo"
          >
            Iniciar
          </a>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
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

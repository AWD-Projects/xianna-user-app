'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal, Loader2 } from 'lucide-react'
import type { RootState } from '@/store'

interface CatalogPaginationProps {
  currentPage: number
  totalPages: number
  totalOutfits: number
}

export function CatalogPagination({ currentPage, totalPages, totalOutfits }: CatalogPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { loading } = useSelector((state: RootState) => state.outfit)

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    router.push(`/catalogo?${params.toString()}`)
  }

  const generatePageNumbers = () => {
    const pages = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show first page
      pages.push(1)

      if (currentPage > 4) {
        pages.push('ellipsis-start')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 3) {
        pages.push('ellipsis-end')
      }

      // Show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (totalPages <= 1) return null

  const startItem = (currentPage - 1) * 16 + 1
  const endItem = Math.min(currentPage * 16, totalOutfits)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
      {/* Results info */}
      <div className="text-sm text-gray-600">
        Mostrando <span className="font-medium">{startItem}</span> a{' '}
        <span className="font-medium">{endItem}</span> de{' '}
        <span className="font-medium">{totalOutfits}</span> outfits
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="rounded-xl"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="sr-only sm:not-sr-only ml-2">Anterior</span>
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {generatePageNumbers().map((page, index) => {
            if (page === 'ellipsis-start' || page === 'ellipsis-end') {
              return (
                <div key={`ellipsis-${index}`} className="px-2">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              )
            }

            const pageNum = page as number
            const isActive = pageNum === currentPage

            return (
              <Button
                key={pageNum}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => navigateToPage(pageNum)}
                disabled={loading}
                className={`min-w-[2.5rem] rounded-xl ${
                  isActive 
                    ? 'bg-pink-500 text-white hover:bg-pink-600' 
                    : 'hover:bg-gray-50'
                } disabled:opacity-50`}
              >
                {pageNum}
              </Button>
            )
          })}
        </div>

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="rounded-xl"
        >
          <span className="sr-only sm:not-sr-only mr-2">Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

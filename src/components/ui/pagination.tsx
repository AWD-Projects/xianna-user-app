'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage?: number
  basePath: string
  itemName?: string
  loading?: boolean
  preserveParams?: boolean
  onPageChange?: (currentPage: number, nextPage: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 16,
  basePath,
  itemName = 'elementos',
  loading = false,
  preserveParams = true,
  onPageChange
}: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const navigateToPage = (page: number) => {
    if (typeof onPageChange === 'function') {
      onPageChange(currentPage, page)
    }
    const params = preserveParams ? new URLSearchParams(searchParams.toString()) : new URLSearchParams()
    
    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    
    const queryString = params.toString()
    router.push(`${basePath}${queryString ? `?${queryString}` : ''}`)
  }

  const generatePageNumbers = () => {
    const pages: (number | string)[] = []
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

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
      {/* Results info */}
      <div className="text-sm text-gray-600">
        Mostrando <span className="font-medium">{startItem}</span> a{' '}
        <span className="font-medium">{endItem}</span> de{' '}
        <span className="font-medium">{totalItems}</span> {itemName}
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
                    ? 'bg-[#E61F93] text-white hover:bg-[#E61F93]/90' 
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

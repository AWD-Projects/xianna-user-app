'use client'

import { useSelector } from 'react-redux'
import { Pagination } from '@/components/ui/pagination'
import type { RootState } from '@/store'

interface CatalogPaginationProps {
  currentPage: number
  totalPages: number
  totalOutfits: number
}

export function CatalogPagination({ currentPage, totalPages, totalOutfits }: CatalogPaginationProps) {
  const { loading } = useSelector((state: RootState) => state.outfit)

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalOutfits}
      itemsPerPage={16}
      basePath="/catalogo"
      itemName="outfits"
      loading={loading}
    />
  )
}

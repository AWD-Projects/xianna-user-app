'use client'

import { useSelector } from 'react-redux'
import { Pagination } from '@/components/ui/pagination'
import type { RootState } from '@/store'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  totalBlogs: number
}

export function BlogPagination({ currentPage, totalPages, totalBlogs }: BlogPaginationProps) {
  const { loading } = useSelector((state: RootState) => state.blog)

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalBlogs}
      itemsPerPage={8}
      basePath="/blog"
      itemName="artículos"
      loading={loading}
    />
  )
}

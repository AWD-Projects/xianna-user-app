'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BlogCard } from './BlogCard'
import { BlogFilter } from './BlogFilter'
import { BlogPagination } from './BlogPagination'
import { BlogSkeleton } from './BlogSkeleton'
import { fetchBlogs, fetchBlogCategories } from '@/store/slices/blogSlice'
import type { AppDispatch, RootState } from '@/store'

interface BlogGridProps {
  category: string
  page: number
}

export function BlogGrid({ category, page }: BlogGridProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { blogs, categories, loading, pagination } = useSelector((state: RootState) => state.blog)

  useEffect(() => {
    dispatch(fetchBlogCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchBlogs({ category: category === 'Todo' ? undefined : category, page }))
  }, [dispatch, category, page])

  if (loading) {
    return (
      <div className="space-y-8">
        <BlogFilter categories={categories} selectedCategory={category} />
        <BlogSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <BlogFilter categories={categories} selectedCategory={category} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron blogs en esta categoría.</p>
        </div>
      )}

      {pagination.totalPages > 1 && (
        <BlogPagination 
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalBlogs={pagination.totalBlogs}
        />
      )}
    </div>
  )
}

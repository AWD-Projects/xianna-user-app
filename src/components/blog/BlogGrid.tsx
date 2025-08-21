'use client'

import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import Cookies from 'js-cookie'
import { BlogCard } from './BlogCard'
import { BlogFilter } from './BlogFilter'
import { BlogPagination } from './BlogPagination'
import { BlogSkeleton } from './BlogSkeleton'
import { fetchBlogs, fetchBlogCategories } from '@/store/slices/blogSlice'
import { Check } from 'lucide-react'
import type { AppDispatch, RootState } from '@/store'

interface BlogGridProps {
  category: string
  page: number
}

export function BlogGrid({ category, page }: BlogGridProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { blogs, categories, loading, pagination, cache } = useSelector((state: RootState) => state.blog)
  const { user } = useSelector((state: RootState) => state.auth)

  // Memoized function to show blog tip
  const showBlogTip = useCallback(() => {
    if (!user?.email) return

    const hasSeenBlogTip = Cookies.get('xianna-blog-tip')
    
    if (!hasSeenBlogTip) {
      const timer = setTimeout(() => {
        toast('Entra a tu blog favorito y califícalo', {
          duration: 8000,
          action: {
            label: <Check className="w-4 h-4" />,
            onClick: () => {
              Cookies.set('xianna-blog-tip', 'seen', { expires: 365 }) // 1 year
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
  }, [user?.email])

  // Load categories only if not cached
  useEffect(() => {
    if (!cache.categoriesLoaded) {
      dispatch(fetchBlogCategories())
    }
  }, [dispatch, cache.categoriesLoaded])

  // Load blogs when category or page changes
  useEffect(() => {
    dispatch(fetchBlogs({ category: category === 'Todo' ? undefined : category, page }))
  }, [dispatch, category, page])

  // Show first-time blog tip
  useEffect(() => {
    return showBlogTip()
  }, [showBlogTip])

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

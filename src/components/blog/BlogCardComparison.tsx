'use client'

import { BlogCard } from './BlogCard'
import { BlogCardNew } from './BlogCardNew'
import { BlogCardModern } from './BlogCardModern'
import type { Blog } from '@/types'

interface BlogCardComparisonProps {
  blog: Blog
}

export function BlogCardComparison({ blog }: BlogCardComparisonProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Original BlogCard</h3>
        <div className="max-w-sm">
          <BlogCard blog={blog} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">New BlogCard (Enhanced)</h3>
        <div className="max-w-sm">
          <BlogCardNew blog={blog} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Modern BlogCard (Outfit-style)</h3>
        <div className="max-w-sm">
          <BlogCardModern blog={blog} />
        </div>
      </div>
    </div>
  )
}
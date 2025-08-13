'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import type { BlogCategory } from '@/types'

interface BlogFilterProps {
  categories: BlogCategory[]
  selectedCategory: string
}

export function BlogFilter({ categories, selectedCategory }: BlogFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category === 'Todo') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    params.delete('page') // Reset page when changing category
    
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <Button
        variant={selectedCategory === 'Todo' ? 'default' : 'outline'}
        onClick={() => handleCategoryChange('Todo')}
        className="rounded-full"
      >
        Todo
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.categoria ? 'default' : 'outline'}
          onClick={() => handleCategoryChange(category.categoria)}
          className="rounded-full"
        >
          {category.categoria}
        </Button>
      ))}
    </div>
  )
}

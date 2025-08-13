import type { Metadata } from 'next'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { BlogHeader } from '@/components/blog/BlogHeader'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Mantente al día con nuestras publicaciones sobre moda, tecnología, estilo de vida y más.',
  keywords: ['blog', 'moda', 'estilo', 'tendencias', 'belleza', 'lifestyle']
}

interface BlogPageProps {
  searchParams: { 
    category?: string
    page?: string 
  }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const category = searchParams.category || 'Todo'
  const page = parseInt(searchParams.page || '1')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <BlogHeader />
        <BlogGrid category={category} page={page} />
      </div>
    </div>
  )
}

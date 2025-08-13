import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Users } from 'lucide-react'
import { truncateText } from '@/lib/utils'
import type { Blog } from '@/types'

interface BlogCardProps {
  blog: Blog
}

const categoryColors = [
  'bg-pink-500',
  'bg-blue-500', 
  'bg-yellow-400',
  'bg-purple-500',
  'bg-green-500',
  'bg-indigo-500'
]

export function BlogCard({ blog }: BlogCardProps) {
  const categoryColor = categoryColors[blog.id_categoria % categoryColors.length]

  return (
    <Card className="group overflow-hidden hover:border-gray-200 transition-all duration-200">
      <Link href={`/blog/${blog.id}`}>
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Placeholder for image */}
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">Imagen del blog</span>
          </div>
          
          <Badge 
            className={`absolute top-3 left-3 text-white border-0 ${categoryColor}`}
          >
            {blog.categoria}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
            {blog.titulo}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {truncateText(blog.descripcion, 120)}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{blog.rating.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center gap-1 text-gray-500">
                <Users className="w-4 h-4" />
                <span>{blog.persons}</span>
              </div>
            </div>
            
            <span className="text-pink-500 font-medium">
              Leer más →
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Users } from 'lucide-react'
import { truncateText } from '@/lib/utils'
import { trackBlogArticleClick } from '@/lib/gtm'
import type { Blog } from '@/types'

interface BlogCardProps {
  blog: Blog
  position: number
}

const categoryColors = [
  'bg-[#E61F93]',
  'bg-[#00D1ED]', 
  'bg-[#FDE12D]',
  'bg-[#E61F93]',
  'bg-[#00D1ED]',
  'bg-[#FDE12D]'
]

export function BlogCard({ blog, position }: BlogCardProps) {
  const categoryColor = categoryColors[blog.id_categoria % categoryColors.length]

  return (
    <Card className="group overflow-hidden hover:border-gray-200 transition-all duration-200">
      <Link 
        href={`/blog/${blog.id}`}
        onClick={() => trackBlogArticleClick(blog.id, blog.titulo, blog.categoria, position)}
      >
        <div className="relative aspect-[3/2] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src={blog.image}
            alt={blog.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            style={{ objectPosition: 'center' }}
          />
          
          <Badge 
            className={`absolute top-3 left-3 text-white border-0 ${categoryColor} z-10`}
          >
            {blog.categoria}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#E61F93] transition-colors">
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
            
            <span className="text-[#E61F93] font-medium">
              Leer más →
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

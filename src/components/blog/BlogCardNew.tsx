'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Users, Clock, BookOpen, Eye } from 'lucide-react'
import { truncateText } from '@/lib/utils'
import type { Blog } from '@/types'

interface BlogCardProps {
  blog: Blog
}

const categoryColors = [
  'bg-[#E61F93]',
  'bg-[#00D1ED]', 
  'bg-[#FDE12D]',
  'bg-purple-500',
  'bg-green-500',
  'bg-orange-500'
]

export function BlogCardNew({ blog }: BlogCardProps) {
  const [imageError, setImageError] = useState(false)
  const categoryColor = categoryColors[blog.id_categoria % categoryColors.length]
  const readingTime = Math.ceil(blog.contenido.length / 200)

  return (
    <Card className="group overflow-hidden hover:border-gray-200 transition-all duration-300 hover:shadow-xl relative bg-white">
      {/* Clickable Image Section */}
      <Link href={`/blog/${blog.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Blog Image */}
          {!imageError && blog.image ? (
            <Image
              src={blog.image}
              alt={blog.titulo}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="w-16 h-16 bg-[#00D1ED]/10 rounded-full flex items-center justify-center mb-3">
                <BookOpen className="w-8 h-8 text-[#00D1ED]" />
              </div>
              <span className="text-sm font-medium text-gray-600">{blog.titulo}</span>
              <span className="text-xs text-gray-400 mt-1">
                {imageError ? 'Error al cargar imagen' : 'Imagen no disponible'}
              </span>
            </div>
          )}

          {/* Category badge */}
          <Badge className={`absolute top-4 left-4 text-white border-0 shadow-lg ${categoryColor}`}>
            {blog.categoria}
          </Badge>

          {/* Reading time badge */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readingTime} min
          </div>

          {/* Hover overlay with view indicator */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-xl">
                <Eye className="w-6 h-6 text-gray-800" />
              </div>
            </div>
          </div>

          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      </Link>
      
      {/* Content Section */}
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title and Description */}
          <div>
            <h3 className="font-bold text-xl mb-2 line-clamp-2 text-gray-900 group-hover:text-[#E61F93] transition-colors duration-300">
              {blog.titulo}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {truncateText(blog.descripcion, 140)}
            </p>
          </div>
          
          {/* Stats Row */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                </div>
                <span className="font-medium text-gray-700">{blog.rating.toFixed(1)}</span>
              </div>
              
              {/* Readers count */}
              <div className="flex items-center gap-1 text-gray-500">
                <Users className="w-4 h-4" />
                <span>{blog.persons}</span>
              </div>
            </div>
            
            {/* Read More CTA */}
            <div className="flex items-center gap-1 text-[#00D1ED] font-semibold group-hover:text-[#E61F93] transition-colors duration-300">
              <span className="text-sm">Leer más</span>
              <div className="w-2 h-2 bg-current rounded-full transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>

          {/* Publication Date */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              {new Date(blog.created_at).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
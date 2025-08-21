'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/ui/star-rating'
import { Users, Clock, BookOpen, Eye, Calendar } from 'lucide-react'
import { truncateText } from '@/lib/utils'
import type { Blog } from '@/types'

interface BlogCardProps {
  blog: Blog
}

const categoryGradients = [
  'from-[#E61F93] to-[#E61F93]/80',
  'from-[#00D1ED] to-[#00D1ED]/80', 
  'from-[#FDE12D] to-[#FDE12D]/80',
  'from-purple-500 to-purple-400',
  'from-green-500 to-green-400',
  'from-orange-500 to-orange-400'
]

export function BlogCardModern({ blog }: BlogCardProps) {
  const [imageError, setImageError] = useState(false)
  const categoryGradient = categoryGradients[blog.id_categoria % categoryGradients.length]
  const readingTime = Math.ceil(blog.contenido.length / 200)

  return (
    <Card className="group overflow-hidden hover:border-gray-200 transition-all duration-300 hover:shadow-2xl relative bg-white">
      {/* Clickable Image Section */}
      <Link href={`/blog/${blog.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Blog Image */}
          {!imageError && blog.image ? (
            <Image
              src={blog.image}
              alt={blog.titulo}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
              <div className={`w-20 h-20 bg-gradient-to-r ${categoryGradient} rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-600 text-center px-4">{truncateText(blog.titulo, 50)}</span>
              <span className="text-xs text-gray-400 mt-2">
                {imageError ? 'Error al cargar imagen' : 'Imagen no disponible'}
              </span>
            </div>
          )}

          {/* Category badge with gradient */}
          <div className={`absolute top-3 left-3 bg-gradient-to-r ${categoryGradient} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
            {blog.categoria}
          </div>

          {/* Reading stats overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1 shadow-sm">
              <Clock className="w-3 h-3 text-[#E61F93]" />
              <span className="text-gray-700">{readingTime}m</span>
            </div>
          </div>

          {/* Hover overlay with enhanced view indicator */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20">
                <Eye className="w-8 h-8 text-gray-800" />
              </div>
            </div>
          </div>

          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      
      {/* Content Section */}
      <CardContent className="p-5">
        <div className="space-y-4">
          {/* Title */}
          <div>
            <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 leading-tight">
              {blog.titulo}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {truncateText(blog.descripcion, 100)}
            </p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center justify-between">
            <StarRating 
              rating={blog.rating} 
              readonly 
              size="sm" 
            />
            <span className="text-xs text-gray-500">
              {blog.rating.toFixed(1)}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-gray-500">
                <Users className="w-4 h-4" />
                <span>{blog.persons}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{blog.created_at ? new Date(blog.created_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) : new Date().toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
              </div>
            </div>

            {/* Read indicator */}
            <div className="text-[#00D1ED] font-semibold text-xs">
              Leer →
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
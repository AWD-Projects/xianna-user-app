'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { Star, Users, Share2, BookOpen, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/ui/star-rating'
import { rateBlog, rateBlogAsGuest, fetchUserBlogRating } from '@/store/slices/blogSlice'
import type { RootState, AppDispatch } from '@/store'
import type { Blog } from '@/types'

interface BlogDetailContentProps {
  blog: Blog
}

const categoryColors = [
  'bg-[#E61F93]',
  'bg-[#00D1ED]', 
  'bg-[#FDE12D]',
  'bg-[#E61F93]',
  'bg-[#00D1ED]',
  'bg-[#FDE12D]'
]

export function BlogDetailContent({ blog }: BlogDetailContentProps) {
  const [imageError, setImageError] = useState(false)
  const [isRating, setIsRating] = useState(false)
  const [ratingError, setRatingError] = useState('')
  const [guestRating, setGuestRating] = useState(0)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { userRatings } = useSelector((state: RootState) => state.blog)
  
  const userRating = user ? (userRatings[blog.id] || 0) : guestRating
  const hasRated = userRating > 0
  
  const categoryColor = categoryColors[blog.id_categoria % categoryColors.length]
  const readingTime = Math.ceil(blog.contenido.length / 200) // Estimate reading time

  // Fetch user's existing rating when component mounts
  useEffect(() => {
    if (user && !userRatings[blog.id]) {
      dispatch(fetchUserBlogRating({ 
        blogId: blog.id, 
        userId: user.email || user.id 
      }))
    } else if (!user) {
      // Check guest ratings from localStorage
      const guestRatings = JSON.parse(localStorage.getItem('guestBlogRatings') || '{}')
      if (guestRatings[blog.id]) {
        setGuestRating(guestRatings[blog.id])
      }
    }
  }, [user, blog.id, userRatings, dispatch])

  const handleRating = async (rating: number) => {
    // Check for existing rating (both authenticated and guest)
    if (hasRated) {
      setRatingError('Ya has calificado este artículo')
      return
    }

    // Check guest ratings from localStorage
    if (!user) {
      const guestRatings = JSON.parse(localStorage.getItem('guestBlogRatings') || '{}')
      if (guestRatings[blog.id]) {
        setRatingError('Ya has calificado este artículo')
        return
      }
    }

    setIsRating(true)
    setRatingError('')
    try {
      if (user) {
        // Authenticated user rating
        await dispatch(rateBlog({ 
          blogId: blog.id, 
          rating, 
          userId: user.email || user.id 
        })).unwrap()
      } else {
        // Guest rating
        await dispatch(rateBlogAsGuest({ 
          blogId: blog.id, 
          rating
        })).unwrap()
        setGuestRating(rating)
      }
    } catch (error: any) {
      console.error('Error rating blog:', error)
      setRatingError(error.message || 'Error al calificar el artículo')
    } finally {
      setIsRating(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.titulo,
          text: blog.descripcion,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        // You could show a toast notification here
      } catch (error) {
        console.error('Error copying to clipboard:', error)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
      {/* Image Section */}
      <div className="space-y-4">
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <div className="aspect-[4/5] relative">
            {!imageError ? (
              <Image
                src={blog.image}
                alt={blog.titulo}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Imagen no disponible</p>
                </div>
              </div>
            )}
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <Badge 
                className={`text-white border-0 ${categoryColor} shadow-lg`}
              >
                {blog.categoria}
              </Badge>
            </div>
            
            {/* Share Button */}
            <div className="absolute top-4 right-4">
              <Button
                size="sm"
                variant="outline"
                onClick={handleShare}
                className="w-12 h-12 rounded-full border-2 border-white bg-white/90 text-gray-600 hover:bg-white hover:text-[#00D1ED] shadow-lg backdrop-blur-sm transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Blog Stats */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{blog.rating.toFixed(1)} ({blog.persons} valoraciones)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E61F93]" />
              <span>{readingTime} min de lectura</span>
            </div>
          </div>
          
          {/* Rating Section - For both authenticated and guest users */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-600 mb-2 text-center">
              {hasRated ? 'Tu valoración:' : '¿Qué te pareció este artículo?'}
            </p>
            <StarRating
              rating={userRating}
              onRatingChange={hasRated ? undefined : handleRating}
              readonly={isRating || hasRated}
              size="lg"
              className="justify-center"
            />
            {hasRated && (
              <p className="text-xs text-[#E61F93] mt-2 text-center font-medium">
                ¡Gracias por tu valoración!
              </p>
            )}
            {!hasRated && ratingError && (
              <p className="text-xs text-red-500 mt-2 text-center">
                {ratingError}
              </p>
            )}
            {!user && !hasRated && (
              <p className="text-xs text-gray-400 mt-2 text-center">
                Califica como invitado - no necesitas cuenta
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {blog.titulo}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            {blog.descripcion}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: blog.contenido.replace(/\n/g, '<br/>') 
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          {!user && (
            <div className="bg-[#FDE12D]/10 border border-[#FDE12D]/30 rounded-2xl p-6 text-center">
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">¡Únete a nuestra comunidad!</span> Crea tu cuenta para acceder a contenido exclusivo y personalizar tu experiencia.
              </p>
              <Button
                onClick={() => router.push('/auth/register')}
                className="bg-[#FDE12D] hover:bg-[#FDE12D]/90 text-gray-900 font-semibold rounded-xl"
              >
                Crear cuenta
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
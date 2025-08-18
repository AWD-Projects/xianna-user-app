'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { toast } from 'sonner'
import { Star, Share2, BookOpen, Clock, Calendar, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/ui/star-rating'
import { ImageModal } from '@/components/ui/image-modal'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
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
  const [modalImage, setModalImage] = useState<{src: string, alt: string} | null>(null)
  const [showShareMenu, setShowShareMenu] = useState(false)
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
    setIsRating(true)
    setRatingError('')
    try {
      if (user) {
        // Authenticated user rating (allow multiple ratings)
        await dispatch(rateBlog({ 
          blogId: blog.id, 
          rating, 
          userId: user.email || user.id 
        })).unwrap()
      } else {
        // Guest rating (allow multiple ratings)
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

  const handleShare = () => {
    setShowShareMenu(!showShareMenu)
  }

  const shareToSocial = (platform: string) => {
    const link = window.location.href
    
    switch (platform) {
      case 'whatsapp':
        // Copy text to clipboard for WhatsApp
        const whatsappText = `${blog.titulo} - ${blog.descripcion} ${link} #moda #blog #xianna`
        navigator.clipboard.writeText(whatsappText)
        toast.success('¡Texto copiado!', {
          description: 'Pégalo en WhatsApp para compartir este artículo.',
          duration: 4000
        })
        setShowShareMenu(false)
        return
      case 'facebook':
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
        window.open(facebookUrl, '_blank')
        setShowShareMenu(false)
        return
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so we'll copy to clipboard
        const instagramText = `${blog.titulo} - ${blog.descripcion} ${link} #moda #blog #xianna #fashion`
        navigator.clipboard.writeText(instagramText)
        toast.success('¡Texto copiado!', {
          description: 'Pégalo en tu historia de Instagram para compartir este artículo.',
          duration: 4000
        })
        setShowShareMenu(false)
        return
      default:
        return
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
    <article className="max-w-4xl mx-auto">
      {/* Header Section */}
      <header className="text-center mb-12">
        <div className="mb-6">
          <Badge className={`text-white border-0 ${categoryColor} mb-4 text-sm px-4 py-2`}>
            {blog.categoria}
          </Badge>
        </div>
        
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          {blog.titulo}
        </h1>
        
        <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
          {blog.descripcion}
        </p>
        
        <div className="flex items-center justify-center gap-4 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium">Por Betsabe Calatayud</span>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.created_at)}</span>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600">{blog.rating.toFixed(1)} ({blog.persons})</span>
          </div>
          <div className="relative">
            <Button
              size="sm"
              variant="outline"
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-600 hover:text-[#E61F93] border-gray-300"
            >
              {showShareMenu ? <X className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              Compartir
            </Button>
            
            {/* Share Menu */}
            {showShareMenu && (
              <div className="absolute left-0 top-12 bg-white rounded-xl shadow-xl border border-gray-200 p-1 z-50 min-w-[160px]">
                <div className="space-y-0.5">
                  <button
                    onClick={() => shareToSocial('whatsapp')}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <WhatsAppIcon sx={{ color: '#25D366', fontSize: 20 }} />
                    <span className="text-sm text-gray-700">WhatsApp</span>
                  </button>
                  
                  <button
                    onClick={() => shareToSocial('facebook')}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <FacebookIcon sx={{ color: '#1877F2', fontSize: 20 }} />
                    <span className="text-sm text-gray-700">Facebook</span>
                  </button>
                  
                  <button
                    onClick={() => shareToSocial('instagram')}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <InstagramIcon sx={{ color: '#E1306C', fontSize: 20 }} />
                    <span className="text-sm text-gray-700">Instagram</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Image */}
      <div className="relative mb-12">
        <div 
          className="relative rounded-2xl overflow-hidden bg-gray-100 max-h-[70vh] cursor-pointer hover:opacity-95 transition-opacity"
          onClick={() => !imageError && setModalImage({src: blog.image, alt: blog.titulo})}
        >
          <Image
            src={blog.image}
            alt={blog.titulo}
            width={1024}
            height={0}
            className="w-full h-auto object-contain"
            onError={() => setImageError(true)}
            priority
            sizes="(max-width: 768px) 100vw, 1024px"
            style={{ height: 'auto' }}
          />
          {imageError && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center min-h-[400px]">
              <div className="text-center text-gray-500">
                <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Imagen no disponible</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-xl max-w-none mb-12">
        <div 
          className="text-gray-700 leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ 
            __html: blog.contenido.replace(/\n/g, '<br/>') 
          }}
        />
      </div>

      {/* Additional Images - Integrated in content */}
      {blog.additionalImages && blog.additionalImages.length > 0 && (
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {blog.additionalImages.slice(0, 2).map((image, index) => (
              <div 
                key={index} 
                className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => setModalImage({src: image, alt: `${blog.titulo} - Imagen ${index + 1}`})}
              >
                <Image
                  src={image}
                  alt={`${blog.titulo} - Imagen ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
          
          {blog.additionalImages.length > 2 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {blog.additionalImages.slice(2).map((image, index) => (
                <div 
                  key={index + 2} 
                  className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
                  onClick={() => setModalImage({src: image, alt: `${blog.titulo} - Imagen ${index + 3}`})}
                >
                  <Image
                    src={image}
                    alt={`${blog.titulo} - Imagen ${index + 3}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Rating Section */}
      <div className="border-t border-gray-200 pt-12 mb-12">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Te gustó este artículo?</h3>
          <p className="text-gray-600 mb-6">
            {hasRated ? 'Puedes calificar nuevamente si cambias de opinión' : 'Ayúdanos calificando este contenido'}
          </p>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <StarRating
              rating={userRating}
              onRatingChange={handleRating}
              readonly={isRating}
              size="lg"
              className="justify-center mb-4"
            />
            {hasRated && (
              <p className="text-sm text-[#E61F93] font-medium">
                Tu última calificación: {userRating} estrella{userRating !== 1 ? 's' : ''}
              </p>
            )}
            {ratingError && (
              <p className="text-sm text-red-500">
                {ratingError}
              </p>
            )}
            {!user && (
              <p className="text-xs text-gray-400">
                No necesitas cuenta para calificar
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="bg-gradient-to-r from-[#E61F93]/5 to-[#FDE12D]/5 border border-[#E61F93]/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¡Únete a Xianna!</h3>
          <p className="text-gray-700 mb-6 max-w-md mx-auto">
            Crea tu cuenta gratis para acceder a contenido exclusivo de moda y descubrir tu estilo personal.
          </p>
          <Button
            onClick={() => router.push('/auth/register')}
            className="bg-[#E61F93] hover:bg-[#E61F93]/90 text-white font-semibold rounded-xl px-8 py-3"
          >
            Crear cuenta gratis
          </Button>
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        src={modalImage?.src || ''}
        alt={modalImage?.alt || ''}
        isOpen={!!modalImage}
        onClose={() => setModalImage(null)}
      />
    </article>
  )
}
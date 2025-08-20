'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { toast } from 'sonner'
import { Heart, Share2, ShoppingBag, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toggleFavorite } from '@/store/slices/outfitSlice'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import type { AppDispatch, RootState } from '@/store'

import type { Outfit, Prenda } from '@/types'

interface OutfitDetailContentProps {
  outfit: Outfit
}

export function OutfitDetailContent({ outfit }: OutfitDetailContentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { favorites } = useSelector((state: RootState) => state.outfit)
  
  const isFavorite = favorites.includes(outfit.id)

  const handleFavoriteToggle = async () => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    setIsLoading(true)
    try {
      await dispatch(toggleFavorite({ 
        userEmail: user.email || '', 
        outfitId: outfit.id 
      })).unwrap()
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setIsLoading(false)
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
        const whatsappText = `¡Mira este increíble outfit "${outfit.nombre}" en Xianna! ${outfit.descripcion} ${link} #moda #estilo #xianna #outfit`
        navigator.clipboard.writeText(whatsappText)
        toast.success('¡Texto copiado!', {
          description: 'Pégalo en WhatsApp para compartir este outfit.',
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
        const instagramText = `${outfit.nombre} - ${outfit.descripcion} ${link} #moda #estilo #xianna #outfit`
        navigator.clipboard.writeText(instagramText)
        toast.success('¡Texto copiado!', {
          description: 'Pégalo en tu historia de Instagram para compartir este outfit.',
          duration: 4000
        })
        setShowShareMenu(false)
        return
      default:
        return
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
      {/* Image Section */}
      <div className="space-y-4">
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <div className="aspect-[4/5] relative">
            {!imageError ? (
              <Image
                src={outfit.imagen}
                alt={outfit.nombre}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Imagen no disponible</p>
                </div>
              </div>
            )}
            
            {/* Floating Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              
              <div className="relative">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleShare}
                  className="w-12 h-12 rounded-full border-2 border-white bg-white/90 text-gray-600 hover:bg-white hover:text-[#00D1ED] shadow-lg backdrop-blur-sm transition-all duration-300"
                >
                  {showShareMenu ? <X className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                </Button>
                
                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute right-0 top-14 bg-white rounded-xl shadow-xl border border-gray-200 p-1 z-50 min-w-[160px]">
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
          </div>
        </div>

        {/* Image Stats */}
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#E61F93]" />
            <span>{outfit.favoritos} me gusta</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant="secondary" 
              className="bg-[#E61F93]/10 text-[#E61F93] border-[#E61F93]/20 font-medium"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {outfit.estilo}
            </Badge>
            {outfit.ocasiones?.map((ocasion, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="border-[#FDE12D] bg-[#FDE12D]/10 text-gray-700"
              >
                {ocasion}
              </Badge>
            )) || (
              <Badge 
                variant="outline" 
                className="border-[#FDE12D] bg-[#FDE12D]/10 text-gray-700"
              >
                Casual
              </Badge>
            )}
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {outfit.nombre}
          </h1>

          {outfit.precio && (
            <div className="text-2xl font-bold text-[#E61F93]">
              ${outfit.precio.toLocaleString('es-MX')} MXN
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Descripción</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {outfit.descripcion}
          </p>
        </div>

        {/* Style Details */}
        {outfit.estilos?.descripcion && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Sobre este estilo</h3>
            <div className="bg-gradient-to-r from-[#E61F93]/5 to-[#FDE12D]/5 rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-700 leading-relaxed">
                {outfit.estilos.descripcion}
              </p>
            </div>
          </div>
        )}

        {/* Prendas Section */}
        {outfit.prendas && outfit.prendas.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Prendas del outfit</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {outfit.prendas.map((prenda, index) => (
                <div
                  key={prenda.id || index}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {prenda.nombre}
                      </h4>
                      {prenda.link && prenda.link.trim() !== '' && (
                        <a
                          href={prenda.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-[#E61F93] hover:text-[#E61F93]/80 transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4 mr-1" />
                          Ver producto
                        </a>
                      )}
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                      <ShoppingBag className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleFavoriteToggle}
              disabled={isLoading}
              className={`flex-1 h-12 text-base font-semibold rounded-xl transition-all duration-300 ${
                isFavorite
                  ? 'bg-[#E61F93] hover:bg-[#E61F93]/90 text-white'
                  : 'bg-gray-100 hover:bg-[#E61F93] hover:text-white text-gray-700'
              }`}
            >
              <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Guardado en favoritos' : 'Agregar a favoritos'}
            </Button>
            
          </div>

          {/* Style Questionnaire CTA */}
          <div className="bg-gradient-to-r from-[#E61F93]/5 to-[#FDE12D]/5 border border-[#E61F93]/20 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-[#E61F93] mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">¿Te gustó este estilo?</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Descubre outfits personalizados para ti. Realiza nuestro cuestionario y encuentra tu estilo único.
            </p>
            <Button
              onClick={() => router.push('/formulario')}
              className="bg-[#E61F93] hover:bg-[#E61F93]/90 text-white font-semibold rounded-xl px-6"
            >
              Descubrir mi estilo
            </Button>
          </div>

          {!user && (
            <div className="bg-[#FDE12D]/10 border border-[#FDE12D]/30 rounded-2xl p-6 text-center">
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">¡Crea tu cuenta gratis!</span> para guardar tus outfits favoritos y descubrir tu estilo personal.
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
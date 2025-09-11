'use client'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { StyleSummaryGenerator } from '@/components/ui/style-summary-generator'
import { ArrowRight } from 'lucide-react'
import type { Style, UserProfile } from '@/types'
import type { RootState } from '@/store'

interface ResultsStepProps {
  result: UserProfile
  styles: Style[]
}

export function ResultsStep({ result, styles }: ResultsStepProps) {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)
  const userStyle = styles.find(style => style.id === result.tipo_estilo)

  const handleGoToProfile = () => {
    if (user) {
      router.push('/perfil')
    } else {
      router.push('/auth/register')
    }
  }

  const handleExploreCatalog = () => {
    router.push('/catalogo')
  }

  // For non-authenticated users, show ONLY the disclaimer and signup button
  if (!user) {
    return (
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        <h4 className="text-2xl font-bold text-gray-900 mb-4">
          🎉 ¡Tu estilo único te está esperando!
        </h4>
        <p className="text-gray-600 leading-relaxed mb-6">
          <span className="font-semibold">Únete a Xianna gratis</span> y descubre tu perfil de estilo personalizado, outfits curados especialmente para ti, y consejos exclusivos de nuestros expertos.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          ✨ Ya guardamos tus respuestas - solo te tomará 30 segundos crear tu cuenta y ver tus resultados.
        </p>
        
        <Button 
          onClick={handleGoToProfile}
          className="w-full bg-[#E61F93] hover:bg-[#E61F93]/90 text-white py-4 text-lg font-semibold"
        >
          Crear cuenta en Xianna
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    )
  }

  // For authenticated users, show full results
  return (
    <div className="text-center space-y-12">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Tu estilo es <span className="text-[#E61F93]">{userStyle?.tipo || 'Único'}</span>
        </h2>
        
        <div className="bg-[#E61F93] text-white rounded-lg p-8 mb-8">
          <p className="text-xl leading-relaxed">
            {userStyle?.descripcion || 'Tu estilo es completamente único y especial.'}
          </p>
        </div>

        {/* Visual Summary Generator */}
        {userStyle && (
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              ¡Comparte tu resultado!
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Genera una imagen personalizada de tu estilo para compartir en redes sociales
            </p>
            <StyleSummaryGenerator 
              profile={result} 
              style={userStyle} 
              className="text-center"
            />
          </div>
        )}
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        <Button 
          onClick={handleGoToProfile}
          className="w-full bg-[#E61F93] hover:bg-[#E61F93]/90 text-white py-4 text-lg font-semibold"
        >
          Ir a mi perfil
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <Button 
          onClick={handleExploreCatalog}
          variant="outline"
          className="w-full border-2 border-[#00D1ED] text-[#00D1ED] hover:bg-[#00D1ED] hover:text-white py-4 text-lg font-semibold"
        >
          Encuentra tu outfit ideal
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="text-lg font-bold text-green-800 mb-2">
          ¡Perfil actualizado exitosamente!
        </h4>
        <p className="text-green-700">
          Tu información personal y estilo han sido guardados.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <h4 className="text-2xl font-bold text-gray-900 mb-4">
          ¡Tu perfil está completo!
        </h4>
        <p className="text-gray-600 leading-relaxed">
          Ahora puedes explorar outfits personalizados, guardar tus favoritos 
          y recibir recomendaciones basadas en tu estilo único.
        </p>
      </div>
    </div>
  )
}

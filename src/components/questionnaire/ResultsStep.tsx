'use client'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
      router.push('/auth/login')
    }
  }

  const handleExploreCatalog = () => {
    router.push('/catalogo')
  }

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
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        <Button 
          onClick={handleGoToProfile}
          className="w-full bg-[#E61F93] hover:bg-[#E61F93]/90 text-white py-4 text-lg font-semibold"
        >
          {user ? 'Ir a mi perfil' : 'Iniciar sesión'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <Button 
          onClick={handleExploreCatalog}
          variant="outline"
          className="w-full border-2 border-[#00D1ED] text-[#00D1ED] hover:bg-[#00D1ED] hover:text-white py-4 text-lg font-semibold"
        >
          Explorar catálogo
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {user ? (
        <>
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
        </>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Tu estilo te espera!
          </h4>
          <p className="text-gray-600 leading-relaxed mb-4">
            Hemos descubierto tu estilo personal. Para guardar tus resultados 
            y acceder a recomendaciones personalizadas, inicia sesión o crea una cuenta.
          </p>
          <p className="text-sm text-gray-500">
            Tus respuestas se guardarán temporalmente para completar tu perfil.
          </p>
        </div>
      )}
    </div>
  )
}

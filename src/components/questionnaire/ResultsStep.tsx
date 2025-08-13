'use client'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sparkles, ArrowRight, User, Heart, CheckCircle } from 'lucide-react'
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
    router.push('/perfil')
  }

  const handleExploreCatalog = () => {
    router.push('/catalogo')
  }

  return (
    <div className="text-center space-y-8">
      <div className="mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Increíble! Tu estilo es...
        </h2>
        
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl p-8 mb-6">
          <h3 className="text-4xl font-bold mb-4">
            {userStyle?.tipo || 'Único'}
          </h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {userStyle?.descripcion || 'Tu estilo es completamente único y especial.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card className="p-6 hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6 text-pink-600" />
          </div>
          <h4 className="font-bold text-lg mb-2">Ver mi perfil</h4>
          <p className="text-gray-600 text-sm mb-4">
            Explora tu perfil completo y descubre más sobre tu estilo
          </p>
          <Button 
            onClick={handleGoToProfile}
            variant="outline" 
            className="w-full rounded-xl"
          >
            Ir a mi perfil
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>

        <Card className="p-6 hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="font-bold text-lg mb-2">Explorar outfits</h4>
          <p className="text-gray-600 text-sm mb-4">
            Descubre outfits perfectos para tu estilo personal
          </p>
          <Button 
            onClick={handleExploreCatalog}
            className="w-full bg-purple-500 hover:bg-purple-600 rounded-xl"
          >
            Ver catálogo
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      </div>

      {/* Success message for authenticated users */}
      {user && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h4 className="text-lg font-bold text-green-800">
              ¡Perfil actualizado exitosamente!
            </h4>
          </div>
          <p className="text-green-700 mb-4">
            Tu información personal y estilo han sido guardados. En unos segundos serás redirigido a tu perfil.
          </p>
          <p className="text-green-600 text-sm">
            Si no eres redirigido automáticamente, usa los botones de arriba.
          </p>
        </div>
      )}

      <div className="bg-gray-100 rounded-2xl p-8">
        <h4 className="text-xl font-bold text-gray-900 mb-4">
          ¡Felicidades! Tu perfil está completo
        </h4>
        <p className="text-gray-600 mb-6">
          Ahora puedes explorar outfits personalizados, guardar tus favoritos 
          y recibir recomendaciones basadas en tu estilo único.
        </p>
        <Button 
          onClick={() => router.push('/perfil')}
          className="bg-pink-500 hover:bg-pink-600 rounded-xl px-8"
        >
          Ir a mi perfil
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

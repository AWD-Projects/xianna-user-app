'use client'

import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { User, LogIn, UserPlus } from 'lucide-react'
import type { RootState } from '@/store'
import { useState } from 'react'

export function FloatingAuthButton() {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)
  const [showAuthMenu, setShowAuthMenu] = useState(false)

  if (user) {
    // Logged in: Show profile button
    return (
      <Button
        onClick={() => router.push('/perfil')}
        className="fixed top-6 right-6 z-50 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-0 rounded-full px-6 py-6 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
      >
        <User className="w-5 h-5 mr-2" />
        Mi Perfil
      </Button>
    )
  }

  // Not logged in: Show auth menu
  return (
    <div className="fixed top-6 right-6 z-50">
      {showAuthMenu ? (
        <div className="flex flex-col gap-2 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 min-w-[160px]">
          <Button
            onClick={() => router.push('/auth/login')}
            className="bg-white hover:bg-pink-50 text-pink-600 border border-pink-200 hover:border-pink-300 rounded-xl px-4 py-3 transition-all duration-200 justify-start"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Iniciar Sesión
          </Button>
          <Button
            onClick={() => router.push('/auth/register')}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-0 rounded-xl px-4 py-3 transition-all duration-200"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Registrarse
          </Button>
          <button
            onClick={() => setShowAuthMenu(false)}
            className="text-xs text-gray-500 hover:text-gray-700 py-2 transition-colors"
          >
            Cerrar
          </button>
        </div>
      ) : (
        <Button
          onClick={() => setShowAuthMenu(true)}
          className="bg-white hover:bg-pink-50 text-pink-600 border-2 border-pink-200 hover:border-pink-300 rounded-full px-6 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <LogIn className="w-5 h-5 mr-2" />
          Ingresar
        </Button>
      )}
    </div>
  )
}

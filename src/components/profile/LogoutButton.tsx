'use client'

import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { logoutUser } from '@/store/slices/authSlice'
import type { AppDispatch } from '@/store'

export function LogoutButton() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      // Force a hard redirect to ensure server-side auth state is cleared
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
      // If logout fails, still redirect to home
      window.location.href = '/'
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Cerrar Sesión
    </Button>
  )
}

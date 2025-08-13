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
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
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

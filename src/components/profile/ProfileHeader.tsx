'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CloseButton } from '@/components/ui/close-button'
import { User, Edit3, LogOut } from 'lucide-react'
import { LogoutButton } from './LogoutButton'
import { useRouter } from 'next/navigation'
import type { User as AuthUser } from '@supabase/supabase-js'
import type { UserProfile } from '@/types'

interface ProfileHeaderProps {
  user: AuthUser
  profile: UserProfile | null
}

export function ProfileHeader({ user, profile }: ProfileHeaderProps) {
  const router = useRouter()
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
          <p className="text-gray-600 text-lg">
            Gestiona tu información personal y preferencias de estilo
          </p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <LogoutButton />
        <CloseButton 
          onClick={() => router.push('/')}
          size="lg"
        />
      </div>
    </div>
  )
}

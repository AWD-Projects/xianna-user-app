'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CloseButton } from '@/components/ui/close-button'
import { LogoutButton } from './LogoutButton'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { User as AuthUser } from '@supabase/supabase-js'
import type { UserProfile } from '@/types'

interface ProfileHeaderProps {
  user: AuthUser
  profile: UserProfile | null
}

export function ProfileHeader({ user, profile }: ProfileHeaderProps) {
  const router = useRouter()
  return (
    <div className="relative mb-12">
      {/* Decorative elements */}
      <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#E61F93]/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -top-4 -right-8 w-16 h-16 bg-[#00D1ED]/20 rounded-full blur-xl animate-pulse delay-1000" />
      
      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/images/xianna.png"
                alt="Xianna"
                width={120}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#E61F93] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Perfil Personal</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              ¡Hola, <span className="text-[#E61F93]">{profile?.nombre || user.email?.split('@')[0]}</span>!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Tu espacio personal donde puedes gestionar tu información y preferencias de estilo
            </p>
          </div>
          
          <div className="flex gap-3">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}

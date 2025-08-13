'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CloseButton } from '@/components/ui/close-button'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function MyOutfitsHeader() {
  const router = useRouter()
  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mis Outfits Favoritos</h1>
          <p className="text-gray-600 text-lg">
            Todos los outfits que has guardado como favoritos
          </p>
        </div>
      </div>
      
      <CloseButton 
        onClick={() => router.push('/')}
        size="lg"
      />
    </div>
  )
}

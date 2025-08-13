'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CloseButton } from '@/components/ui/close-button'
import { Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function ContactHeader() {
  const router = useRouter()
  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Contáctanos</h1>
          <p className="text-gray-600 text-lg">
            Estamos aquí para ayudarte con cualquier pregunta
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

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CloseButton } from '@/components/ui/close-button'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export function OutfitDetailHeader() {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)
  const homeRoute = user ? '/perfil' : '/'

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-6">
        <Link href={homeRoute}>
          <Image
            src="/images/x.png"
            alt="Xianna"
            width={40}
            height={40}
            className="object-contain cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 px-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al catálogo
          </Button>
        </div>
      </div>
    </div>
  )
}
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CloseButton } from '@/components/ui/close-button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export function BlogDetailHeader() {
  const router = useRouter()
  
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-6">
        <Link href="/blog">
          <Image
            src="/images/x.png"
            alt="Xianna"
            width={40}
            height={40}
            className="object-contain cursor-pointer"
          />
        </Link>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 px-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al blog
          </Button>
        </div>
      </div>
    </div>
  )
}

'use client';
import { Button } from '@/components/ui/button'
import { CloseButton } from '@/components/ui/close-button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export function BlogHeader() {
  const router = useRouter()
  return (
    <div className="flex items-start justify-between mb-8 md:mb-12">
      <div className="flex items-start gap-3 md:gap-6 flex-1 min-w-0">
        <Link href="/perfil" className="flex-shrink-0">
          <Image
            src="/images/x.png"
            alt="Xianna"
            width={40}
            height={40}
            className="object-contain cursor-pointer"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2 leading-tight">
            Blog Xianna
          </h1>
          <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
            Descubre las últimas tendencias en moda y estilo de vida
          </p>
        </div>
      </div>
      
      <div className="flex-shrink-0 ml-4">
        <CloseButton 
          onClick={() => router.push('/perfil')}
          size="lg"
        />
      </div>
    </div>)
}

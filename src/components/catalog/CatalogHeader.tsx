'use client';
import { Button } from '@/components/ui/button'
import { CloseButton } from '@/components/ui/close-button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export function CatalogHeader() {
  const router = useRouter()
  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-6">
        <Link href="/perfil">
          <Image
            src="/images/x.png"
            alt="Xianna"
            width={40}
            height={40}
            className="object-contain cursor-pointer"
          />
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Catálogo de Outfits</h1>
          <p className="text-gray-600 text-lg">
            Descubre outfits únicos para cada ocasión y estilo
          </p>
        </div>
      </div>

      <CloseButton
        onClick={() => router.push('/perfil')}
        size="lg"
      />
    </div>
  )
}

import type { Metadata } from 'next'
import { CatalogGrid } from '@/components/catalog/CatalogGrid'
import { CatalogHeader } from '@/components/catalog/CatalogHeader'

export const metadata: Metadata = {
  title: 'Catálogo',
  description: 'Explora nuestro catálogo de outfits con una variedad de estilos y ocasiones.',
  keywords: ['catálogo', 'outfits', 'moda', 'estilo', 'ocasiones', 'tendencias']
}

interface CatalogPageProps {
  searchParams: { 
    styles?: string
    occasions?: string
    page?: string 
  }
}

export default function CatalogPage({ searchParams }: CatalogPageProps) {
  const styles = searchParams.styles?.split(',') || []
  const occasions = searchParams.occasions?.split(',') || []
  const page = parseInt(searchParams.page || '1')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <CatalogHeader />
        <CatalogGrid styles={styles} occasions={occasions} page={page} />
      </div>
    </div>
  )
}

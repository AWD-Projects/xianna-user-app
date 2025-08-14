import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { OutfitDetailHeader } from '@/components/outfit-detail/OutfitDetailHeader'
import { OutfitDetailContent } from '@/components/outfit-detail/OutfitDetailContent'

export const metadata: Metadata = {
  title: 'Detalle del Outfit',
  description: 'Descubre todos los detalles de este outfit único',
}

interface OutfitDetailPageProps {
  params: { id: string }
}

async function getOutfitData(id: string) {
  const supabase = createClient()
  
  // Get outfit details with related data
  const { data: outfit, error } = await supabase
    .from('outfits')
    .select(`
      *,
      estilos (
        id,
        tipo,
        descripcion
      ),
      outfit_ocasion (
        ocasion (
          id,
          ocasion
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error || !outfit) {
    redirect('/catalogo')
  }

  // Get outfit image URL
  let imageUrl = '/images/placeholder-outfit.jpg'
  if (outfit.imagen) {
    const { data: imageData } = supabase.storage
      .from('outfits')
      .getPublicUrl(outfit.imagen)
    if (imageData?.publicUrl) {
      imageUrl = imageData.publicUrl
    }
  } else {
    // Try to get image from Outfits bucket as fallback
    try {
      const { data: files } = await supabase.storage
        .from('Outfits')
        .list(`uploads/${outfit.id}/imagen_principal`, { limit: 1 })

      if (files && files.length > 0) {
        const { data: imageData } = supabase.storage
          .from('Outfits')
          .getPublicUrl(`uploads/${outfit.id}/imagen_principal/${files[0].name}`)
        if (imageData?.publicUrl) {
          imageUrl = imageData.publicUrl
        }
      }
    } catch (error) {
      console.warn(`Error loading image for outfit ${outfit.id}:`, error)
    }
  }

  // Get favorites count
  const { count: favoritesCount } = await supabase
    .from('favoritos')
    .select('*', { count: 'exact', head: true })
    .eq('id_outfit', id)

  // Process occasions data
  const ocasiones = outfit.outfit_ocasion?.map((o: any) => o.ocasion.ocasion) || []
  
  return {
    outfit: {
      ...outfit,
      imagen: imageUrl,
      favoritos: favoritesCount || 0,
      estilo: outfit.estilos?.tipo || 'Sin estilo',
      ocasion: ocasiones[0] || 'Casual',
      ocasiones
    }
  }
}

export default async function OutfitDetailPage({ params }: OutfitDetailPageProps) {
  const { outfit } = await getOutfitData(params.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <div className="container mx-auto px-4 py-8">
        <OutfitDetailHeader />
        <OutfitDetailContent outfit={outfit} />
      </div>
    </div>
  )
}
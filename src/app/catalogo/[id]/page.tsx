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
  const supabase = await createClient()

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

  // Get outfit image URL - get last uploaded image from imagen_principal
  let imageUrl = '/images/placeholder-outfit.jpg'

  try {
    const { data: files } = await supabase.storage
      .from('Outfits')
      .list(`uploads/${outfit.id}/imagen_principal`, {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (files && files.length > 0) {
      // Get the last uploaded file (first in desc order)
      const lastFile = files[0]
      const { data: imageData } = supabase.storage
        .from('Outfits')
        .getPublicUrl(`uploads/${outfit.id}/imagen_principal/${lastFile.name}`)
      if (imageData?.publicUrl) {
        imageUrl = imageData.publicUrl
      }
    }
  } catch (error) {
    console.warn(`Error loading image for outfit ${outfit.id}:`, error)
  }

  // Get favorites count
  const { count: favoritesCount } = await supabase
    .from('favoritos')
    .select('*', { count: 'exact', head: true })
    .eq('outfit', id)

  // Get prendas for this outfit
  const { data: prendasData } = await supabase
    .from('prendas')
    .select('*')
    .eq('id_outfit', id)
    .order('id')

  // Attach prenda images from storage (uploads/{id_outfit}/prendas/{id_prenda})
  let prendasWithImages = prendasData || []
  try {
    const enrichedPrendas = []
    for (const prenda of prendasWithImages) {
      let imagen = ''
      try {
        const { data: prendaFiles } = await supabase.storage
          .from('Outfits')
          .list(`uploads/${outfit.id}/prendas/${prenda.id}`, {
            limit: 50,
            sortBy: { column: 'created_at', order: 'desc' }
          })
        if (prendaFiles && prendaFiles.length > 0) {
          const lastFile = prendaFiles[0]
          const { data: imageData } = supabase.storage
            .from('Outfits')
            .getPublicUrl(`uploads/${outfit.id}/prendas/${prenda.id}/${lastFile.name}`)
          if (imageData?.publicUrl) {
            imagen = imageData.publicUrl
          }
        }
      } catch (error) {
        console.warn(`Error loading image for prenda ${prenda.id}:`, error)
      }
      enrichedPrendas.push({
        ...prenda,
        imagen
      })
    }
    prendasWithImages = enrichedPrendas
  } catch (error) {
    console.warn(`Error loading prenda images for outfit ${outfit.id}:`, error)
  }

  // Process occasions data
  const ocasiones = outfit.outfit_ocasion?.map((o: any) => o.ocasion.ocasion) || []
  
  return {
    outfit: {
      ...outfit,
      imagen: imageUrl,
      favoritos: favoritesCount || 0,
      estilo: outfit.estilos?.tipo || 'Sin estilo',
      ocasion: ocasiones[0] || 'Casual',
      ocasiones,
      prendas: prendasWithImages
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

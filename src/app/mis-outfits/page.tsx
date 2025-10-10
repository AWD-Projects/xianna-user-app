import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { MyOutfitsHeader } from '@/components/my-outfits/MyOutfitsHeader'
import { MyOutfitsGrid } from '@/components/my-outfits/MyOutfitsGrid'

export const metadata: Metadata = {
  title: 'Mis Outfits',
  description: 'Explora tus outfits favoritos guardados en Xianna',
}

async function getUserFavorites() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get user's favorite outfits
  const { data: rawFavorites } = await supabase
    .from('favoritos')
    .select(`
      outfit,
      outfits!inner (
        id,
        nombre,
        descripcion,
        estilos (tipo),
        outfit_ocasion (
          ocasion (ocasion)
        )
      )
    `)
    .eq('usuario', user.email)

  // Transform the data and fetch images
  const favorites = []

  for (const favorite of rawFavorites || []) {
    if (!favorite.outfits) continue

    // Type assertion for the outfit data
    const outfit = favorite.outfits as any

    // Get outfit image from storage - get last uploaded image
    let imageUrl = '/placeholder-outfit.jpg'

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
        imageUrl = supabase.storage
          .from('Outfits')
          .getPublicUrl(`uploads/${outfit.id}/imagen_principal/${lastFile.name}`)
          .data.publicUrl
      }
    } catch (error) {
      console.warn(`Error loading image for outfit ${outfit.id}:`, error)
    }
    
    // Debug log to see the data structure
    console.log('Favorite outfit estilos data:', outfit.estilos)
    
    favorites.push({
      outfit: favorite.outfit,
      outfits: {
        id: outfit.id,
        nombre: outfit.nombre,
        descripcion: outfit.descripcion,
        estilo: outfit.estilos?.tipo || 'Sin estilo', // estilos is an object, not array
        estilos: outfit.estilos || null,
        outfit_ocasion: outfit.outfit_ocasion || [],
        imagen: imageUrl
      }
    })
  }

  return { favorites }
}

export default async function MyOutfitsPage() {
  const { favorites } = await getUserFavorites()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <MyOutfitsHeader />
        <MyOutfitsGrid favorites={favorites} />
      </div>
    </div>
  )
}

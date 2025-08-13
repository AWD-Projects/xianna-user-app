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
  const supabase = createClient()
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

  // Transform the data to match the expected interface
  const favorites = rawFavorites?.map((favorite: any) => ({
    outfit: favorite.outfit,
    outfits: favorite.outfits ? {
      id: favorite.outfits.id,
      nombre: favorite.outfits.nombre,
      descripcion: favorite.outfits.descripcion,
      estilos: favorite.outfits.estilos?.[0] || null,
      outfit_ocasion: favorite.outfits.outfit_ocasion || []
    } : null
  })) || []

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

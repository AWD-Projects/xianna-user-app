import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { BlogDetailHeader } from '@/components/blog-detail/BlogDetailHeader'
import { BlogDetailContent } from '@/components/blog-detail/BlogDetailContent'

export const metadata: Metadata = {
  title: 'Detalle del Blog',
  description: 'Descubre todo el contenido de este artículo',
}

interface BlogDetailPageProps {
  params: { id: string }
}

async function getBlogData(id: string) {
  const supabase = createClient()
  
  // Get blog details with category
  const { data: blog, error } = await supabase
    .from('blogs')
    .select(`
      *,
      categoria_blog (
        id,
        categoria
      )
    `)
    .eq('id', id)
    .single()

  if (error || !blog) {
    redirect('/blog')
  }

  // Get blog images URLs
  let imageUrl = null // Start with null instead of placeholder
  let additionalImages: string[] = []



  // Get all additional images from Blogs bucket
  try {
    const { data: files } = await supabase.storage
      .from('Blogs')
      .list(`uploads/${blog.id}`, { limit: 100 })

    
    if (files && files.length > 0) {
      
      // Use the first file as main image
      if (files.length > 0) {
        const { data: mainImageData } = supabase.storage
          .from('Blogs')
          .getPublicUrl(`uploads/${blog.id}/${files[0].name}`)
        if (mainImageData?.publicUrl) {
          imageUrl = mainImageData.publicUrl
        }
        
        // Use remaining files as additional images
        files.slice(1).forEach(file => {
          const { data: additionalImageData } = supabase.storage
            .from('Blogs')
            .getPublicUrl(`uploads/${blog.id}/${file.name}`)
          if (additionalImageData?.publicUrl) {
            additionalImages.push(additionalImageData.publicUrl)
          }
        })
      }
    }
  } catch (error) {
    console.warn(`Error loading images for blog ${blog.id}:`, error)
  }

  // Get blog ratings
  const { data: ratings, count: ratingsCount } = await supabase
    .from('blogs_calificados')
    .select('calificacion', { count: 'exact' })
    .eq('blog', id)

  const averageRating = ratings?.length 
    ? ratings.reduce((sum, r) => sum + r.calificacion, 0) / ratings.length 
    : 0

  
  return {
    blog: {
      ...blog,
      image: imageUrl || '/images/logo.png', // Use logo as fallback instead of missing placeholder
      additionalImages,
      rating: averageRating,
      persons: ratingsCount || 0,
      categoria: blog.categoria_blog?.categoria || 'General'
    }
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { blog } = await getBlogData(params.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <div className="container mx-auto px-4 py-8">
        <BlogDetailHeader />
        <BlogDetailContent blog={blog} />
      </div>
    </div>
  )
}
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

  // Get blog image URL
  let imageUrl = '/images/placeholder-blog.jpg'
  if (blog.image) {
    const { data: imageData } = supabase.storage
      .from('blogs')
      .getPublicUrl(blog.image)
    if (imageData?.publicUrl) {
      imageUrl = imageData.publicUrl
    }
  } else {
    // Try to get image from Blogs bucket as fallback
    try {
      const { data: files } = await supabase.storage
        .from('Blogs')
        .list(`uploads/${blog.id}`, { limit: 1 })

      if (files && files.length > 0) {
        const { data: imageData } = supabase.storage
          .from('Blogs')
          .getPublicUrl(`uploads/${blog.id}/${files[0].name}`)
        if (imageData?.publicUrl) {
          imageUrl = imageData.publicUrl
        }
      }
    } catch (error) {
      console.warn(`Error loading image for blog ${blog.id}:`, error)
    }
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
      image: imageUrl,
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
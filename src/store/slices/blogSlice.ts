import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createClient } from '@/lib/supabase/client'
import type { Blog, BlogCategory } from '@/types'

interface BlogState {
  blogs: Blog[]
  categories: BlogCategory[]
  currentBlog: Blog | null
  userRatings: Record<number, number> // blogId -> rating
  loading: boolean
  error: string | null
  pagination: {
    page: number
    totalPages: number
    totalBlogs: number
  }
}

const initialState: BlogState = {
  blogs: [],
  categories: [],
  currentBlog: null,
  userRatings: {},
  loading: false,
  error: null,
  pagination: {
    page: 1,
    totalPages: 1,
    totalBlogs: 0
  }
}

// Async thunks
export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async ({ category, page = 1, limit = 8 }: { category?: string; page?: number; limit?: number }) => {
    const supabase = createClient()
    
    let query = supabase
      .from('blogs')
      .select(`
        id,
        titulo,
        descripcion,
        contenido,
        id_categoria,
        categoria_blog!inner(categoria)
      `, { count: 'exact' })
      .order('id', { ascending: false })

    if (category && category !== 'Todo') {
      query = query.eq('categoria_blog.categoria', category)
    }

    const { data, error, count } = await query
      .range((page - 1) * limit, page * limit - 1)

    if (error) throw error

    // Get images and ratings for each blog
    const blogsWithDetails = await Promise.all(
      (data || []).map(async (blog: any) => {
        // Get blog image from storage uploads folder
        let imageUrl = '/images/logo.png' // Use existing logo as fallback
        
        const { data: files, error: filesError } = await supabase.storage
          .from('Blogs')
          .list(`uploads/${blog.id}`, { limit: 1 })
          
        if (files && files.length > 0 && !filesError) {
          const { data: urlData } = supabase.storage
            .from('Blogs')
            .getPublicUrl(`uploads/${blog.id}/${files[0].name}`)
          imageUrl = urlData.publicUrl || imageUrl
        }

        // Get ratings
        const { data: ratingsData } = await supabase
          .from('blogs_calificados')
          .select('calificacion')
          .eq('blog', blog.id)

        const ratings = ratingsData?.map(r => r.calificacion) || []
        const averageRating = ratings.length > 0 
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
          : 0

        return {
          ...blog,
          categoria: blog.categoria_blog.categoria,
          image: imageUrl,
          rating: Math.round(averageRating * 10) / 10,
          persons: ratings.length
        }
      })
    )

    return {
      blogs: blogsWithDetails,
      totalBlogs: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
      currentPage: page
    }
  }
)

export const fetchBlogById = createAsyncThunk(
  'blog/fetchBlogById',
  async (id: number) => {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        categoria_blog(categoria)
      `)
      .eq('id', id)
      .single()

    if (error) throw error

    // Get blog image from storage
    const { data: files, error: filesError } = await supabase.storage
      .from('Blogs')
      .list(`uploads/${data.id}`, { limit: 1 })

    let imageUrl = '/images/logo.png' // Use existing logo as fallback
    
    if (files && files.length > 0 && !filesError) {
      const { data: urlData } = supabase.storage
        .from('Blogs')
        .getPublicUrl(`uploads/${data.id}/${files[0].name}`)
      imageUrl = urlData.publicUrl || '/images/logo.png'
    }

    // Get ratings
    const { data: ratingsData } = await supabase
      .from('blogs_calificados')
      .select('calificacion, usuario')
      .eq('blog', data.id)

    const ratings = ratingsData?.map(r => r.calificacion) || []
    const averageRating = ratings.length > 0 
      ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
      : 0

    return {
      ...data,
      categoria: data.categoria_blog.categoria,
      image: imageUrl,
      rating: Math.round(averageRating * 10) / 10,
      persons: ratings.length
    }
  }
)

export const fetchBlogCategories = createAsyncThunk(
  'blog/fetchBlogCategories',
  async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('categoria_blog')
      .select('*')
      .order('categoria')

    if (error) throw error
    return data
  }
)

export const fetchUserBlogRating = createAsyncThunk(
  'blog/fetchUserBlogRating',
  async ({ blogId, userId }: { blogId: number; userId: string }) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('blogs_calificados')
      .select('calificacion')
      .eq('blog', blogId)
      .eq('usuario', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 is "not found"
    return { blogId, rating: data?.calificacion || 0 }
  }
)

export const rateBlog = createAsyncThunk(
  'blog/rateBlog',
  async ({ blogId, rating, userId }: { blogId: number; rating: number; userId: string }) => {
    const supabase = createClient()
    
    // Always allow rating (no duplicate check)
    const { error } = await supabase
      .from('blogs_calificados')
      .insert({ 
        blog: blogId, 
        calificacion: rating, 
        usuario: userId 
      })

    if (error) throw error
    return { blogId, rating }
  }
)

export const rateBlogAsGuest = createAsyncThunk(
  'blog/rateBlogAsGuest',
  async ({ blogId, rating }: { blogId: number; rating: number }) => {
    const supabase = createClient()
    
    // Generate a unique guest identifier for each rating
    const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const { error } = await supabase
      .from('blogs_calificados')
      .insert({ 
        blog: blogId, 
        calificacion: rating, 
        usuario: guestId 
      })

    if (error) throw error
    
    // Update localStorage with latest rating (allow multiple ratings)
    const guestRatings = JSON.parse(localStorage.getItem('guestBlogRatings') || '{}')
    guestRatings[blogId] = rating
    localStorage.setItem('guestBlogRatings', JSON.stringify(guestRatings))
    
    return { blogId, rating }
  }
)

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false
        state.blogs = action.payload.blogs
        state.pagination = {
          page: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalBlogs: action.payload.totalBlogs
        }
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al cargar blogs'
      })
      // Fetch blog by ID
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false
        state.currentBlog = action.payload
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al cargar blog'
      })
      // Fetch categories
      .addCase(fetchBlogCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      // Fetch user blog rating
      .addCase(fetchUserBlogRating.fulfilled, (state, action) => {
        state.userRatings[action.payload.blogId] = action.payload.rating
      })
      // Rate blog
      .addCase(rateBlog.fulfilled, (state, action) => {
        state.userRatings[action.payload.blogId] = action.payload.rating
        if (state.currentBlog && state.currentBlog.id === action.payload.blogId) {
          // Update current blog rating (simplified)
          state.currentBlog.rating = action.payload.rating
        }
      })
      // Rate blog as guest
      .addCase(rateBlogAsGuest.fulfilled, (state, action) => {
        state.userRatings[action.payload.blogId] = action.payload.rating
        if (state.currentBlog && state.currentBlog.id === action.payload.blogId) {
          // Update current blog rating (simplified)
          state.currentBlog.rating = action.payload.rating
        }
      })
  },
})

export const { clearError, clearCurrentBlog } = blogSlice.actions
export default blogSlice.reducer

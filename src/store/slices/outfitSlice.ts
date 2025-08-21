import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createClient } from '@/lib/supabase/client'
import type { Outfit, Style, Occasion } from '@/types'

interface OutfitState {
  outfits: Outfit[]
  styles: Style[]
  occasions: Occasion[]
  currentOutfit: Outfit | null
  favorites: number[]
  favoritesLoaded: boolean
  loading: boolean
  error: string | null
  filters: {
    selectedStyles: string[]
    selectedOccasions: string[]
  }
  pagination: {
    page: number
    totalPages: number
    totalOutfits: number
  }
  cache: {
    stylesLoaded: boolean
    occasionsLoaded: boolean
    stylesLastFetch: number | null
    occasionsLastFetch: number | null
  }
  pendingRequests: {
    styles: boolean
    occasions: boolean
    outfits: boolean
  }
}

const initialState: OutfitState = {
  outfits: [],
  styles: [],
  occasions: [],
  currentOutfit: null,
  favorites: [],
  favoritesLoaded: false,
  loading: false,
  error: null,
  filters: {
    selectedStyles: [],
    selectedOccasions: [],
  },
  pagination: {
    page: 1,
    totalPages: 1,
    totalOutfits: 0
  },
  cache: {
    stylesLoaded: false,
    occasionsLoaded: false,
    stylesLastFetch: null,
    occasionsLastFetch: null
  },
  pendingRequests: {
    styles: false,
    occasions: false,
    outfits: false
  }
}

// Async thunks
export const fetchOutfits = createAsyncThunk(
  'outfit/fetchOutfits',
  async ({ 
    styles, 
    occasions, 
    page = 1, 
    limit = 16 
  }: { 
    styles?: string[]; 
    occasions?: string[]; 
    page?: number; 
    limit?: number;
  }) => {
    const supabase = createClient()
    
    let query = supabase
      .from('outfits')
      .select(`
        id,
        nombre,
        descripcion,
        id_estilo,
        estilos(tipo),
        outfit_ocasion(
          ocasion(ocasion)
        )
      `, { count: 'exact' })

    // Apply style filters
    if (styles && styles.length > 0) {
      query = query.in('id_estilo', styles.map(style => {
        // Map style names to IDs - this is a simplified mapping
        const styleMap: Record<string, number> = {
          'Bohemio': 1,
          'Casual': 2,
          'Cómodo': 3,
          'Formal': 4,
          'Futurista': 5,
          'Llamativo': 6,
          'Rebelde': 7,
          'Retro': 8,
          'Romántico': 9,
          'Urbano': 10,
          'Versátil': 11
        }
        return styleMap[style] || 1
      }))
    }

    const { data, error, count } = await query
      .range((page - 1) * limit, page * limit - 1)

    if (error) throw error

    // Process data
    const outfitsWithDetails: Outfit[] = []
    
    for (const outfit of data || []) {
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

      // Get favorites count
      const { count: favoritesCount } = await supabase
        .from('favoritos')
        .select('*', { count: 'exact' })
        .eq('outfit', outfit.id)

      const ocasiones = outfit.outfit_ocasion?.map((o: any) => o.ocasion.ocasion) || []

      // Filter by occasions if specified
      if (occasions && occasions.length > 0) {
        const hasMatchingOccasion = ocasiones.some((ocasion: string) => 
          occasions.includes(ocasion)
        )
        if (!hasMatchingOccasion) continue // Skip this outfit instead of returning null
      }

      // Debug log to see the data structure
      console.log('Catalog outfit estilos data:', outfit.estilos)
      
      outfitsWithDetails.push({
        id: outfit.id,
        nombre: outfit.nombre,
        descripcion: outfit.descripcion,
        id_estilo: outfit.id_estilo,
        estilo: (outfit.estilos as any)?.tipo || 'Sin estilo', // estilos can be object or array
        imagen: imageUrl,
        ocasiones,
        favoritos: favoritesCount || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    }

    return {
      outfits: outfitsWithDetails,
      totalOutfits: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
      currentPage: page
    }
  }
)

export const fetchOutfitById = createAsyncThunk(
  'outfit/fetchOutfitById',
  async (id: number) => {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('outfits')
      .select(`
        *,
        estilos(tipo),
        outfit_ocasion(
          ocasion(ocasion)
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error

    // Get outfit image from storage - get last uploaded image
    let imageUrl = '/placeholder-outfit.jpg'
    
    try {
      const { data: files } = await supabase.storage
        .from('Outfits')
        .list(`uploads/${data.id}/imagen_principal`, { 
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' }
        })

      if (files && files.length > 0) {
        // Get the last uploaded file (first in desc order)
        const lastFile = files[0]
        imageUrl = supabase.storage
          .from('Outfits')
          .getPublicUrl(`uploads/${data.id}/imagen_principal/${lastFile.name}`)
          .data.publicUrl
      }
    } catch (error) {
      console.warn(`Error loading image for outfit ${data.id}:`, error)
    }

    // Get prendas
    const { data: prendasData } = await supabase
      .from('prendas')
      .select('*')
      .eq('id_outfit', data.id)

    const ocasiones = data.outfit_ocasion?.map((o: any) => o.ocasion.ocasion) || []

    return {
      ...data,
      estilo: data.estilos?.[0]?.tipo || 'Sin estilo',
      imagen: imageUrl,
      ocasiones,
      prendas: prendasData || []
    }
  }
)

export const fetchStyles = createAsyncThunk(
  'outfit/fetchStyles',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { outfit: OutfitState }
    const { cache, pendingRequests } = state.outfit
    
    // Check if request is already pending
    if (pendingRequests.styles) {
      return rejectWithValue('Styles request already pending')
    }
    
    // Check if styles are already loaded and fresh (within 5 minutes)
    const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
    const now = Date.now()
    
    if (cache.stylesLoaded && 
        cache.stylesLastFetch && 
        (now - cache.stylesLastFetch) < CACHE_DURATION) {
      return rejectWithValue('Styles already loaded and fresh')
    }

    const supabase = createClient()
    const { data, error } = await supabase
      .from('estilos')
      .select('*')
      .order('tipo')

    if (error) throw error
    return data
  }
)

export const fetchOccasions = createAsyncThunk(
  'outfit/fetchOccasions',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { outfit: OutfitState }
    const { cache, pendingRequests } = state.outfit
    
    // Check if request is already pending
    if (pendingRequests.occasions) {
      return rejectWithValue('Occasions request already pending')
    }
    
    // Check if occasions are already loaded and fresh (within 5 minutes)
    const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
    const now = Date.now()
    
    if (cache.occasionsLoaded && 
        cache.occasionsLastFetch && 
        (now - cache.occasionsLastFetch) < CACHE_DURATION) {
      return rejectWithValue('Occasions already loaded and fresh')
    }

    const supabase = createClient()
    const { data, error } = await supabase
      .from('ocasion')
      .select('*')
      .order('ocasion')

    if (error) throw error
    return data
  }
)

export const fetchUserFavorites = createAsyncThunk(
  'outfit/fetchUserFavorites',
  async (userEmail: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('favoritos')
      .select('outfit')
      .eq('usuario', userEmail)

    if (error) throw error
    return data?.map(f => f.outfit) || []
  }
)

export const toggleFavorite = createAsyncThunk(
  'outfit/toggleFavorite',
  async ({ userEmail, outfitId }: { userEmail: string; outfitId: number }) => {
    const supabase = createClient()
    
    // Check if already favorited
    const { data: existing } = await supabase
      .from('favoritos')
      .select('id')
      .eq('usuario', userEmail)
      .eq('outfit', outfitId)
      .single()

    if (existing) {
      // Remove favorite
      const { error } = await supabase
        .from('favoritos')
        .delete()
        .eq('usuario', userEmail)
        .eq('outfit', outfitId)
      
      if (error) throw error
      return { outfitId, action: 'removed' as const }
    } else {
      // Add favorite
      const { error } = await supabase
        .from('favoritos')
        .insert([{ usuario: userEmail, outfit: outfitId }])
      
      if (error) throw error
      return { outfitId, action: 'added' as const }
    }
  }
)

const outfitSlice = createSlice({
  name: 'outfit',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentOutfit: (state) => {
      state.currentOutfit = null
    },
    setFilters: (state, action) => {
      state.filters = action.payload
    },
    clearFilters: (state) => {
      state.filters = {
        selectedStyles: [],
        selectedOccasions: [],
      }
    },
    clearFavorites: (state) => {
      state.favorites = []
      state.favoritesLoaded = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch outfits
      .addCase(fetchOutfits.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOutfits.fulfilled, (state, action) => {
        state.loading = false
        state.outfits = action.payload.outfits
        state.pagination = {
          page: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalOutfits: action.payload.totalOutfits
        }
      })
      .addCase(fetchOutfits.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al cargar outfits'
      })
      // Fetch outfit by ID
      .addCase(fetchOutfitById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOutfitById.fulfilled, (state, action) => {
        state.loading = false
        state.currentOutfit = action.payload
      })
      .addCase(fetchOutfitById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al cargar outfit'
      })
      // Fetch styles
      .addCase(fetchStyles.pending, (state) => {
        state.pendingRequests.styles = true
      })
      .addCase(fetchStyles.fulfilled, (state, action) => {
        state.styles = action.payload
        state.cache.stylesLoaded = true
        state.cache.stylesLastFetch = Date.now()
        state.pendingRequests.styles = false
      })
      .addCase(fetchStyles.rejected, (state, action) => {
        state.pendingRequests.styles = false
        // Don't update loading state for cache rejections
        if (action.payload !== 'Styles already loaded and fresh' && 
            action.payload !== 'Styles request already pending') {
          state.error = action.error.message || 'Error al cargar estilos'
        }
      })
      // Fetch occasions
      .addCase(fetchOccasions.pending, (state) => {
        state.pendingRequests.occasions = true
      })
      .addCase(fetchOccasions.fulfilled, (state, action) => {
        state.occasions = action.payload
        state.cache.occasionsLoaded = true
        state.cache.occasionsLastFetch = Date.now()
        state.pendingRequests.occasions = false
      })
      .addCase(fetchOccasions.rejected, (state, action) => {
        state.pendingRequests.occasions = false
        // Don't update loading state for cache rejections
        if (action.payload !== 'Occasions already loaded and fresh' &&
            action.payload !== 'Occasions request already pending') {
          state.error = action.error.message || 'Error al cargar ocasiones'
        }
      })
      // Fetch user favorites
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload
        state.favoritesLoaded = true
      })
      // Toggle favorite
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { outfitId, action: favoriteAction } = action.payload
        if (favoriteAction === 'added') {
          state.favorites.push(outfitId)
        } else {
          state.favorites = state.favorites.filter(id => id !== outfitId)
        }
      })
  },
})

export const { clearError, clearCurrentOutfit, setFilters, clearFilters, clearFavorites } = outfitSlice.actions
export default outfitSlice.reducer

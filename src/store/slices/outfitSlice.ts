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

    // Build select query based on whether occasions filter is applied
    const selectQuery = occasions && occasions.length > 0
      ? `
        id,
        nombre,
        descripcion,
        id_estilo,
        advisor_id,
        estilos!inner(tipo, status),
        advisors(nombre),
        outfit_ocasion!inner(
          ocasion!inner(ocasion)
        )
      `
      : `
        id,
        nombre,
        descripcion,
        id_estilo,
        advisor_id,
        estilos!inner(tipo, status),
        advisors(nombre),
        outfit_ocasion(
          ocasion(ocasion)
        )
      `

    let query = supabase
      .from('outfits')
      .select(selectQuery, { count: 'exact' })
      .eq('estilos.status', 'activo')

    // Apply style filters
    if (styles && styles.length > 0) {
      query = query.in('estilos.tipo', styles)
    }

    // Apply occasion filters
    if (occasions && occasions.length > 0) {
      query = query.in('outfit_ocasion.ocasion.ocasion', occasions)
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
        advisor_id: (outfit as any).advisor_id,
        advisor_nombre: (outfit as any).advisors?.nombre,
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
        estilos!inner(tipo, status),
        advisors(nombre),
        outfit_ocasion(
          ocasion(ocasion)
        )
      `)
      .eq('id', id)
      .eq('estilos.status', 'activo')
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
      prendas: prendasData || [],
      advisor_nombre: (data as any).advisors?.nombre
    }
  }
)

export const fetchStyles = createAsyncThunk(
  'outfit/fetchStyles',
  async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('estilos')
      .select('*')
      .eq('status', 'activo')
      .order('tipo')

    if (error) throw error
    return data
  }
)

export const fetchOccasions = createAsyncThunk(
  'outfit/fetchOccasions',
  async () => {
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
      .addCase(fetchStyles.fulfilled, (state, action) => {
        state.styles = action.payload
      })
      // Fetch occasions
      .addCase(fetchOccasions.fulfilled, (state, action) => {
        state.occasions = action.payload
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

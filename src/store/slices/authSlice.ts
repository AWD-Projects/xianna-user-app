import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createClient } from '@/lib/supabase/client'
import { translateAuthError } from '@/lib/error-translation'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    return data.user
  }
)

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const supabase = createClient()
    
    // Get the base URL for email redirect
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: `${baseUrl}/auth/callback`,
      },
    })
    
    if (error) throw error
    
    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('user_details')
        .insert([{ correo: email, nombre: name }])
      
      if (profileError) throw profileError
    }
    
    return data.user
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async () => {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = translateAuthError(action.error)
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.error = translateAuthError(action.error)
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.loading = false
        state.error = null
      })
      // Get current user
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
  },
})

export const { clearError, setUser } = authSlice.actions
export default authSlice.reducer

'use client'

import { createContext, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createClient } from '@/lib/supabase/client'
import { setUser, getCurrentUser } from '@/store/slices/authSlice'
import { fetchUserProfile } from '@/store/slices/userSlice'
import { fetchUserFavorites, clearFavorites } from '@/store/slices/outfitSlice'
import type { AppDispatch } from '@/store'

const AuthContext = createContext<{}>({})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        dispatch(setUser(session.user))
        dispatch(fetchUserProfile(session.user.email!))
        dispatch(fetchUserFavorites(session.user.email!))
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          dispatch(setUser(session.user))
          dispatch(fetchUserProfile(session.user.email!))
          dispatch(fetchUserFavorites(session.user.email!))
        } else if (event === 'SIGNED_OUT') {
          dispatch(setUser(null))
          dispatch(clearFavorites())
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [dispatch, supabase])

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

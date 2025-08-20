'use client'

import { createContext, useContext, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { setUser, getCurrentUser } from '@/store/slices/authSlice'
import { fetchUserProfile } from '@/store/slices/userSlice'
import { fetchUserFavorites, clearFavorites } from '@/store/slices/outfitSlice'
import { SessionMonitor } from '@/lib/session-monitor'
import { CheckCircle, LogOut, UserCheck, Clock } from 'lucide-react'
import type { AppDispatch } from '@/store'

const AuthContext = createContext<{}>({})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const supabase = createClient()
  const initialLoadRef = useRef(true)
  const lastEventRef = useRef<string>('')
  const sessionMonitor = SessionMonitor.getInstance()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        dispatch(setUser(session.user))
        dispatch(fetchUserProfile(session.user.email!))
        dispatch(fetchUserFavorites(session.user.email!))
        
        // Start session monitoring for existing sessions
        sessionMonitor.startMonitoring()
        
        // Don't show notification on initial page load
        initialLoadRef.current = false
      } else {
        initialLoadRef.current = false
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Prevent duplicate notifications for the same event
        const eventKey = `${event}-${session?.user?.id || 'none'}`
        if (lastEventRef.current === eventKey) return
        lastEventRef.current = eventKey

        if (event === 'SIGNED_IN' && session?.user) {
          dispatch(setUser(session.user))
          dispatch(fetchUserProfile(session.user.email!))
          dispatch(fetchUserFavorites(session.user.email!))
          
          // Show login success notification (but not on initial load)
          if (!initialLoadRef.current) {
            toast.success('¡Bienvenid@ de vuelta!', {
              description: 'Has iniciado sesión exitosamente',
              duration: 4000,
              icon: <CheckCircle className="w-5 h-5 text-green-600" />,
              style: {
                background: '#4ade80',
                color: 'white',
                border: 'none'
              }
            })
          }
          
          // Start session monitoring
          sessionMonitor.startMonitoring()
        } else if (event === 'SIGNED_OUT') {
          dispatch(setUser(null))
          dispatch(clearFavorites())
          
          // Stop session monitoring
          sessionMonitor.stopMonitoring()
          
          // Show logout notification (but not on initial load)
          if (!initialLoadRef.current) {
            toast.info('Sesión cerrada', {
              description: 'Has cerrado sesión correctamente',
              duration: 3000,
              icon: <LogOut className="w-5 h-5 text-blue-600" />,
              style: {
                background: '#3b82f6',
                color: 'white',
                border: 'none'
              }
            })
          }
        } else if (event === 'TOKEN_REFRESHED') {
          // Session refreshed successfully
          console.log('Token refreshed successfully')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
      sessionMonitor.stopMonitoring()
    }
  }, [dispatch, supabase, sessionMonitor])

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

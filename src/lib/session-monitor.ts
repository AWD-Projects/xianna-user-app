import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export class SessionMonitor {
  private static instance: SessionMonitor
  private supabase = createClient()
  private warningShown = false
  private expirationShown = false
  private checkInterval: NodeJS.Timeout | null = null
  private warningTimeout: NodeJS.Timeout | null = null

  private constructor() {}

  static getInstance(): SessionMonitor {
    if (!SessionMonitor.instance) {
      SessionMonitor.instance = new SessionMonitor()
    }
    return SessionMonitor.instance
  }

  startMonitoring() {
    // Clear any existing intervals
    this.stopMonitoring()
    
    // Check session every 30 seconds
    this.checkInterval = setInterval(() => {
      this.checkSession()
    }, 30000)

    // Initial check
    this.checkSession()
  }

  stopMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval)
      this.checkInterval = null
    }
    if (this.warningTimeout) {
      clearTimeout(this.warningTimeout)
      this.warningTimeout = null
    }
    this.resetFlags()
  }

  private resetFlags() {
    this.warningShown = false
    this.expirationShown = false
  }

  private async checkSession() {
    try {
      const { data: { session }, error } = await this.supabase.auth.getSession()
      
      if (error) {
        console.error('Session check error:', error)
        return
      }

      if (!session) {
        // No session - user is logged out
        this.resetFlags()
        return
      }

      const now = Date.now() / 1000 // Current time in seconds
      const expiresAt = session.expires_at || 0

      // Time until expiration in seconds
      const timeUntilExpiry = expiresAt - now

      // Show warning if session expires in less than 5 minutes (300 seconds)
      if (timeUntilExpiry <= 300 && timeUntilExpiry > 0 && !this.warningShown) {
        this.showWarning(Math.ceil(timeUntilExpiry / 60))
        this.warningShown = true
      }

      // Session has expired
      if (timeUntilExpiry <= 0 && !this.expirationShown) {
        this.showExpiration()
        this.expirationShown = true
        this.stopMonitoring()
      }

    } catch (error) {
      console.error('Session monitoring error:', error)
    }
  }

  private showWarning(minutesLeft: number) {
    toast.warning('Sesión próxima a expirar', {
      description: `Tu sesión expirará en ${minutesLeft} minuto${minutesLeft !== 1 ? 's' : ''}. Cualquier actividad la renovará automáticamente.`,
      duration: 10000,
      style: {
        background: '#f59e0b',
        color: 'white',
        border: 'none'
      },
      action: {
        label: 'Renovar ahora',
        onClick: () => this.refreshSession()
      }
    })
  }

  private showExpiration() {
    toast.error('Sesión expirada', {
      description: 'Tu sesión ha expirado por seguridad. Por favor inicia sesión nuevamente.',
      duration: 8000,
      style: {
        background: '#dc2626',
        color: 'white',
        border: 'none'
      },
      action: {
        label: 'Iniciar sesión',
        onClick: () => {
          window.location.href = '/auth/login'
        }
      }
    })
  }

  private async refreshSession() {
    try {
      const { error } = await this.supabase.auth.refreshSession()
      if (!error) {
        this.resetFlags()
        toast.success('Sesión renovada', {
          description: 'Tu sesión se ha renovado exitosamente',
          duration: 3000,
          style: {
            background: '#4ade80',
            color: 'white',
            border: 'none'
          }
        })
      }
    } catch (error) {
      console.error('Session refresh error:', error)
    }
  }
}
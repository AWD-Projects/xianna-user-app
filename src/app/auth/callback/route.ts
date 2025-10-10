// app/auth/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const token_hash = url.searchParams.get('token_hash')
  const type = (url.searchParams.get('type') || 'signup') as 'signup' | 'invite' | 'email_change'

  if (!token_hash) {
    return NextResponse.redirect(`${url.origin}/auth/login?error=missing_token`)
  }

  const cookieStore = {
    cookies: {} as Record<string, string>
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            cookieStore.cookies[name] = value
          })
        },
      },
    }
  )

  const { error } = await supabase.auth.verifyOtp({ type, token_hash })

  if (error) {
    console.error('Error verificando token:', error.message)
    return NextResponse.redirect(`${url.origin}/auth/login?error=${error.message}`)
  }

  // Ahora sí, crear el response con las cookies acumuladas
  const response = NextResponse.redirect(`${url.origin}/correo-confirmado`)
  
  Object.entries(cookieStore.cookies).forEach(([name, value]) => {
    response.cookies.set(name, value, {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })
  })

  return response
}
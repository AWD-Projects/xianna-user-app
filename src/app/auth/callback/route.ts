// app/auth/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const token_hash = url.searchParams.get('token_hash')
  const type = (url.searchParams.get('type') || 'signup') as 'signup' | 'invite' | 'email_change'

  if (!token_hash) {
    return NextResponse.redirect(new URL('/auth/login?error=auth_callback_error', url))
  }

  // 1) Crea un response "portador" para que Supabase pueda setear cookies ahí
  const cookieCarrier = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieCarrier.cookies.set({ name, value, ...options })
          })
        },
      },
    }
  )

  // 2) Verifica el token y deja que supabase setee la sesión en cookieCarrier
  const { error } = await supabase.auth.verifyOtp({ type, token_hash })

  if (error) {
    // Propaga también los headers por si estabas a mitad de setear algo
    const redirect = NextResponse.redirect(new URL('/auth/login?error=auth_callback_error', url))
    redirect.headers.set('Set-Cookie', cookieCarrier.headers.get('Set-Cookie') ?? '')
    return redirect
  }

  // 3) Redirige a /correo-confirmado **propagando Set-Cookie**
  const successRedirect = NextResponse.redirect(new URL('/correo-confirmado', url))
  const setCookie = cookieCarrier.headers.get('Set-Cookie')
  if (setCookie) successRedirect.headers.set('Set-Cookie', setCookie)

  return successRedirect
}
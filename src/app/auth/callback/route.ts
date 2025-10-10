// app/auth/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const token_hash = url.searchParams.get('TokenHash')
  const type = (url.searchParams.get('type') || 'signup') as 'signup' | 'invite' | 'email_change'

  if (!token_hash) {
    return NextResponse.redirect(`${url.origin}/auth/login?error=auth_callback_error`)
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value)
          })
        },
      },
    }
  )

  const { data, error } = await supabase.auth.verifyOtp({ type, token_hash })

  if (error) {
    return NextResponse.redirect(`${url.origin}/auth/login?error=auth_callback_error`)
  }

  return NextResponse.redirect(`${url.origin}/correo-confirmado`)
}
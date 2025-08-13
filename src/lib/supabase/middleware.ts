import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const url = request.nextUrl.clone()

  // Define public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/blog',
    '/catalogo', 
    '/contacto',
    '/formulario'
  ]

  // Define auth routes
  const authRoutes = ['/auth/login', '/auth/register']

  // Define protected routes that require authentication
  const protectedRoutes = ['/perfil', '/mis-outfits']

  // Skip API routes and static files
  if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return supabaseResponse
  }

  if (user) {
    // User is authenticated
    
    // If user tries to access root (/), redirect to perfil
    if (pathname === '/') {
      url.pathname = '/perfil'
      return NextResponse.redirect(url)
    }
    
    // If user tries to access auth pages while logged in, redirect to perfil
    if (authRoutes.includes(pathname)) {
      url.pathname = '/perfil'
      return NextResponse.redirect(url)
    }
    
    // Allow access to all other routes when authenticated
    return supabaseResponse
    
  } else {
    // User is not authenticated
    
    // Allow access to public routes and auth routes
    if (publicRoutes.includes(pathname) || authRoutes.includes(pathname)) {
      return supabaseResponse
    }
    
    // Redirect to login for protected routes
    if (protectedRoutes.includes(pathname)) {
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }
    
    // For any other route, allow access (fallback)
    return supabaseResponse
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!
}

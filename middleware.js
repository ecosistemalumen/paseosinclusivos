import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return request.cookies.get(name)?.value
                },
                set(name, value, options) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name, options) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    const url = new URL(request.url)
    const isPublicRoute =
        url.pathname === '/' ||
        url.pathname === '/login' ||
        url.pathname.startsWith('/auth') ||
        url.pathname.startsWith('/api') ||
        url.pathname === '/prensa' ||
        url.pathname === '/privacidad' ||
        url.pathname === '/accesibilidad' ||
        url.pathname === '/registro' ||
        url.pathname === '/recuperar' ||
        url.pathname === '/actualizar-password'

    // Admin Protection
    if (url.pathname.startsWith('/admin')) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // Fetch profile to check role
        // We use the email as a reliable key since IDs might vary if synced from different sources
        const { data: profile } = await supabase
            .from('Profile')
            .select('role')
            .eq('email', user.email)
            .single()

        if (profile?.role !== 'admin') {
            return NextResponse.redirect(new URL('/inicio', request.url))
        }
    }

    // If not authenticated and trying to access a protected route
    if (!user && !isPublicRoute) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If authenticated and hitting the splash page, go to the real app home
    if (user && url.pathname === '/') {
        return NextResponse.redirect(new URL('/inicio', request.url))
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}

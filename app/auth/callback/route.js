import { getSupabaseServer } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/inicio'

    if (code) {
        const supabase = getSupabaseServer()
        const { error, data } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data?.user) {
            // Sync user to our database (Profile)
            try {
                // Ensure role is a string if it's missing
                const userRole = data.user.user_metadata?.role || 'user';

                await prisma.profile.upsert({
                    where: { email: data.user.email },
                    update: {
                        avatar_url: data.user.user_metadata?.avatar_url,
                        full_name: data.user.user_metadata?.full_name,
                        // Don't overwrite role on update unless necessary logic exists
                    },
                    create: {
                        id: data.user.id,
                        email: data.user.email,
                        full_name: data.user.user_metadata?.full_name,
                        avatar_url: data.user.user_metadata?.avatar_url,
                        role: userRole
                    }
                });
            } catch (dbError) {
                console.error('Error syncing profile:', dbError);
                // Continue login even if sync fails
            }

            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

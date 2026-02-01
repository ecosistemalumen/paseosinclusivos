import { getSupabaseServer } from '@/lib/supabase/server'
import prisma from '@/lib/db'

export async function verifyAdmin() {
    const supabase = getSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { user: null, profile: null, error: 'No autorizado', status: 401 }

    // Use email as key for reliability
    const profile = await prisma.profile.findUnique({
        where: { email: user.email }
    })

    if (!profile || profile.role !== 'admin') {
        return { user, profile, error: 'Acceso prohibido', status: 403 }
    }

    return { user, profile, error: null }
}


import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { getSupabaseServer } from '@/lib/supabase/server'

export async function GET(request) {
    const supabase = getSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const history = await prisma.userActivity.findMany({
            where: { userId: user.id, type: 'VISITED' },
            include: {
                lugar: {
                    select: {
                        id: true,
                        nombre: true,
                        slug: true,
                        ubicacion: true
                    }
                }
            },
            orderBy: { timestamp: 'desc' }
        })
        return NextResponse.json(history)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}


import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { getSupabaseServer } from '@/lib/supabase/server'

export async function GET(request) {
    const supabase = getSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const favorites = await prisma.userActivity.findMany({
            where: { userId: user.id, type: 'FAVORITE' },
            include: {
                lugar: {
                    select: {
                        id: true,
                        nombre: true,
                        slug: true,
                        ubicacion: true,
                        costo: true,
                        nivel_esfuerzo: true
                    }
                }
            },
            orderBy: { timestamp: 'desc' }
        })
        return NextResponse.json(favorites)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(request) {
    const supabase = getSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { lugarId } = await request.json()
        if (!lugarId) return NextResponse.json({ error: 'Missing lugarId' }, { status: 400 })

        // Check availability
        const existing = await prisma.userActivity.findFirst({
            where: { userId: user.id, lugarId, type: 'FAVORITE' }
        })

        if (existing) {
            // Remove (Toggle off)
            await prisma.userActivity.delete({ where: { id: existing.id } })
            return NextResponse.json({ status: 'removed' })
        } else {
            // Add (Toggle on)
            await prisma.userActivity.create({
                data: {
                    userId: user.id,
                    lugarId,
                    type: 'FAVORITE'
                }
            })
            return NextResponse.json({ status: 'added' })
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}


import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const wishlist = await prisma.userActivity.findMany({
            where: { userId: user.id, type: 'WISHLIST' },
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
        return NextResponse.json(wishlist)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(request) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { lugarId } = await request.json()
        if (!lugarId) return NextResponse.json({ error: 'Missing lugarId' }, { status: 400 })

        // Check availability
        const existing = await prisma.userActivity.findFirst({
            where: { userId: user.id, lugarId, type: 'WISHLIST' }
        })

        if (existing) {
            // Remove
            await prisma.userActivity.delete({ where: { id: existing.id } })
            return NextResponse.json({ status: 'removed' })
        } else {
            // Add
            await prisma.userActivity.create({
                data: {
                    userId: user.id,
                    lugarId,
                    type: 'WISHLIST'
                }
            })
            return NextResponse.json({ status: 'added' })
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

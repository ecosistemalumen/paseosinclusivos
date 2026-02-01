
import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { getSupabaseServer } from '@/lib/supabase/server'

export async function GET(request) {
    const supabase = getSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const profile = await prisma.profile.findUnique({
            where: { id: user.id },
            select: { full_name: true, email: true }
        })

        const [visitedCount, favoriteCount, wishlistCount, recentActivity] = await prisma.$transaction([
            prisma.userActivity.count({
                where: { userId: user.id, type: 'VISITED' }
            }),
            prisma.userActivity.count({
                where: { userId: user.id, type: 'FAVORITE' }
            }),
            prisma.userActivity.count({
                where: { userId: user.id, type: 'WISHLIST' }
            }),
            prisma.userActivity.findMany({
                where: { userId: user.id, type: 'VISITED' },
                orderBy: { timestamp: 'desc' },
                take: 3,
                include: {
                    lugar: {
                        select: { nombre: true, slug: true, ubicacion: true }
                    }
                }
            })
        ])

        return NextResponse.json({
            user: profile,
            stats: {
                visited: visitedCount,
                favorites: favoriteCount,
                wishlist: wishlistCount
            },
            recentActivity
        })
    } catch (error) {
        console.error('Error fetching user dashboard:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

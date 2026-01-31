import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export async function GET(request) {
    const { error, status } = await verifyAdmin()
    if (error) return NextResponse.json({ error }, { status })

    try {
        const [userCount, placeCount, pendingCount, reviewCount] = await prisma.$transaction([
            prisma.profile.count(),
            prisma.lugar.count(),
            prisma.declaracion.count({
                where: { estado: 'pendiente' }
            }),
            prisma.review.count()
        ])

        return NextResponse.json({
            users: userCount,
            places: placeCount,
            pendingDeclarations: pendingCount,
            reviews: reviewCount
        })
    } catch (error) {
        console.error('Error fetching admin stats:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

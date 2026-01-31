
import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'


export async function GET(request) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profile = await prisma.profile.findUnique({
        where: { id: user.id },
    })

    if (!profile || profile.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    try {
        const reviews = await prisma.review.findMany({
            orderBy: { createdAt: 'desc' },
            take: 50, // Limit to last 50 for now
            include: {
                user: { select: { full_name: true, email: true } },
                lugar: { select: { nombre: true, slug: true } }
            }
        })
        return NextResponse.json(reviews)
    } catch (error) {
        console.error('Error fetching reviews:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(request) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profile = await prisma.profile.findUnique({
        where: { id: user.id },
    })

    if (!profile || profile.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
        }

        await prisma.review.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting review:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

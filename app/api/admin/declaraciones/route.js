import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// Helper for slugify
const createSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
}

export async function GET(request) {
    const { error, status: authStatus } = await verifyAdmin()
    if (error) return NextResponse.json({ error }, { status: authStatus })

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const id = searchParams.get('id')

    try {
        if (id) {
            const declaracion = await prisma.declaracion.findUnique({
                where: { id: parseInt(id) },
                include: { user: { select: { email: true, full_name: true } } }
            })
            if (!declaracion) return NextResponse.json({ error: 'Not found' }, { status: 404 })
            return NextResponse.json(declaracion)
        }

        const where = status ? { estado: status } : {}
        const declaraciones = await prisma.declaracion.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { email: true, full_name: true } } }
        })
        return NextResponse.json(declaraciones)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PUT(request) {
    const { error, status } = await verifyAdmin()
    if (error) return NextResponse.json({ error }, { status })

    try {
        const body = await request.json()
        const { id, ...data } = body

        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })

        const updated = await prisma.declaracion.update({
            where: { id: parseInt(id) },
            data: data
        })

        return NextResponse.json(updated)
    } catch (error) {
        console.error('Error updating declaration:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PATCH(request) {
    const { error, status } = await verifyAdmin()
    if (error) return NextResponse.json({ error }, { status })

    try {
        const body = await request.json()
        const { id, action } = body

        if (!id || !action) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

        const declaracion = await prisma.declaracion.findUnique({ where: { id: parseInt(id) } })
        if (!declaracion) return NextResponse.json({ error: 'Declaracion not found' }, { status: 404 })

        if (action === 'reject') {
            const updated = await prisma.declaracion.update({
                where: { id: parseInt(id) },
                data: { estado: 'rechazado' }
            })
            return NextResponse.json(updated)
        }

        if (action === 'approve') {
            const uniqueSlug = createSlug(declaracion.nombre_lugar) + '-' + Date.now().toString().slice(-4)

            const result = await prisma.$transaction(async (tx) => {
                const newLugar = await tx.lugar.create({
                    data: {
                        nombre: declaracion.nombre_lugar,
                        slug: uniqueSlug,
                        ubicacion: declaracion.ubicacion,
                        costo: declaracion.costo,
                        nivel_esfuerzo: declaracion.nivel_esfuerzo,
                        movilidad: declaracion.movilidad,
                        tiene_rampa: declaracion.tiene_rampa,
                        tiene_banio: declaracion.tiene_banio,
                        es_plano: declaracion.es_plano,
                        distancia_aprox: declaracion.distancia_aprox,
                        ruido: declaracion.ruido,
                        tiene_sombra: declaracion.tiene_sombra,
                        pet_friendly: declaracion.pet_friendly,
                        mejor_estacion: declaracion.mejor_estacion,
                        notas_honestas: declaracion.notas_adicionales || "Información basada en declaración de usuario.",
                        fuente: 'Declarado',
                        verificado: true,
                        estacion_actual: 'N/A',
                        imagenes: declaracion.imagenes || [],
                        categoria: declaracion.categoria
                    }
                })
                const updatedDeclaracion = await tx.declaracion.update({
                    where: { id: parseInt(id) },
                    data: { estado: 'aprobado' }
                })
                return { newLugar, updatedDeclaracion }
            })
            return NextResponse.json(result)
        }
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    } catch (error) {
        console.error('Error processing declaration:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

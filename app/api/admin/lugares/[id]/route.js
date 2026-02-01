import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
    const { id } = params;
    const { error, status } = await verifyAdmin();
    if (error) return NextResponse.json({ error }, { status });

    const body = await request.json();

    try {
        const updatedLugar = await prisma.lugar.update({
            where: { id: parseInt(id) },
            data: {
                nombre: body.nombre,
                ubicacion: body.ubicacion,
                categoria: body.categoria,
                costo: body.costo,
                nivel_esfuerzo: body.nivel_esfuerzo,
                ruido: body.ruido,
                tiene_rampa: body.tiene_rampa,
                tiene_banio: body.tiene_banio,
                tiene_sombra: body.tiene_sombra,
                pet_friendly: body.pet_friendly,
                es_plano: body.es_plano,
                notas_honestas: body.notas_honestas,
                lat: body.lat ? parseFloat(body.lat) : null,
                lng: body.lng ? parseFloat(body.lng) : null,
                imagenes: body.imagenes, // Assuming it's already an array
                movilidad: body.movilidad,
                mejor_estacion: body.mejor_estacion,
            },
        });

        return NextResponse.json(updatedLugar);
    } catch (error) {
        console.error('Error updating place:', error);
        return NextResponse.json({ error: 'Error al actualizar el lugar' }, { status: 500 });
    }
}

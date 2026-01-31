import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Construir filtros dinámicos
        const where = {};

        // Categoria
        const categoria = searchParams.get('categoria');
        if (categoria) {
            where.categoria = categoria;
        }

        // Costo
        const costo = searchParams.get('costo');
        if (costo) {
            where.costo = { in: costo.split(',') };
        }

        // Esfuerzo
        const esfuerzo = searchParams.get('esfuerzo');
        if (esfuerzo) {
            where.nivel_esfuerzo = { in: esfuerzo.split(',') };
        }

        // Movilidad (array contains)
        const movilidad = searchParams.get('movilidad');
        if (movilidad) {
            where.movilidad = { hasSome: movilidad.split(',') };
        }

        // Ruido
        const ruido = searchParams.get('ruido');
        if (ruido) {
            where.ruido = ruido;
        }

        // Sombra
        const sombra = searchParams.get('sombra');
        if (sombra === 'true') {
            where.tiene_sombra = true;
        }

        // Estación
        const estacion = searchParams.get('estacion');
        if (estacion) {
            where.mejor_estacion = { hasSome: estacion.split(',') };
        }

        // Pet Friendly
        const petFriendly = searchParams.get('pet_friendly');
        if (petFriendly === 'true') {
            where.pet_friendly = true;
        }

        // Query a la base de datos
        const lugares = await prisma.lugar.findMany({
            where,
            orderBy: {
                nombre: 'asc'
            }
        });

        return NextResponse.json({
            total: lugares.length,
            lugares
        });

    } catch (error) {
        console.error('Error fetching lugares:', error);
        return NextResponse.json(
            { error: 'Error al buscar lugares' },
            { status: 500 }
        );
    }
}

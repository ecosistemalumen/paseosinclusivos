import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request, { params }) {
    try {
        const { slug } = params;

        const lugar = await prisma.lugar.findUnique({
            where: { slug }
        });

        if (!lugar) {
            return NextResponse.json(
                { error: 'Lugar no encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(lugar);

    } catch (error) {
        console.error('Error fetching lugar:', error);
        return NextResponse.json(
            { error: 'Error al obtener el lugar' },
            { status: 500 }
        );
    }
}

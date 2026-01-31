import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request) {
    try {
        const data = await request.json();

        // Validaciones básicas
        if (!data.nombre_lugar || !data.ubicacion || !data.email_contacto) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email_contacto)) {
            return NextResponse.json(
                { error: 'Email inválido' },
                { status: 400 }
            );
        }

        // Guardar declaración
        const declaracion = await prisma.declaracion.create({
            data: {
                nombre_lugar: data.nombre_lugar,
                email_contacto: data.email_contacto,
                telefono: data.telefono || null,
                ubicacion: data.ubicacion,
                costo: data.costo,
                nivel_esfuerzo: data.nivel_esfuerzo,
                movilidad: data.movilidad,
                tiene_rampa: data.tiene_rampa,
                tiene_banio: data.tiene_banio,
                es_plano: data.es_plano,
                distancia_aprox: data.distancia_aprox || null,
                ruido: data.ruido,
                tiene_sombra: data.tiene_sombra,
                pet_friendly: data.pet_friendly,
                mejor_estacion: data.mejor_estacion,
                notas_adicionales: data.notas_adicionales || null,
                imagenes: data.imagenes || [],
                estado: 'pendiente'
            }
        });

        // TODO: Enviar email de confirmación (opcional)

        return NextResponse.json({
            success: true,
            message: 'Declaración recibida',
            id: declaracion.id
        });

    } catch (error) {
        console.error('Error creating declaracion:', error);
        return NextResponse.json(
            { error: 'Error al guardar la declaración' },
            { status: 500 }
        );
    }
}

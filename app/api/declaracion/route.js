import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
    nombre_lugar: z.string().min(1),
    email_contacto: z.string().email(),
    telefono: z.string().optional(),
    ubicacion: z.string().min(1),
    costo: z.string(),
    nivel_esfuerzo: z.string(),
    // Arrays/Booleans validation...
});

export async function POST(request) {
    try {
        const body = await request.json();

        // Basic validation (can expand with zod)
        if (!body.nombre_lugar || !body.email_contacto) {
            return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
        }

        const declaracion = await prisma.declaracion.create({
            data: {
                nombre_lugar: body.nombre_lugar,
                email_contacto: body.email_contacto,
                telefono: body.telefono,
                ubicacion: body.ubicacion,
                costo: body.costo,
                nivel_esfuerzo: body.nivel_esfuerzo,
                movilidad: body.movilidad || [],
                tiene_rampa: body.tiene_rampa || false,
                tiene_banio: body.tiene_banio || false,
                es_plano: body.es_plano || false,
                distancia_aprox: body.distancia_aprox,
                ruido: body.ruido,
                tiene_sombra: body.tiene_sombra || false,
                mejor_estacion: body.mejor_estacion || [],
                notas_adicionales: body.notas_adicionales,
                estado: 'pendiente'
            }
        });

        return NextResponse.json({ success: true, id: declaracion.id });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Error al procesar declaración" }, { status: 500 });
    }
}

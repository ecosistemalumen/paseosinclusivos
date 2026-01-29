import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Parse filters
        const costo = searchParams.get("costo");
        const esfuerzos = searchParams.getAll("esfuerzo"); // Support multiple
        const ruido = searchParams.get("ruido");
        const sombra = searchParams.get("sombra") === "true";
        const movilidades = searchParams.getAll("movilidad");
        const estaciones = searchParams.getAll("estacion");

        // Build query
        const where = {};

        if (costo) where.costo = costo;

        if (esfuerzos.length > 0) {
            where.nivel_esfuerzo = { in: esfuerzos };
        }

        if (ruido) where.ruido = ruido;
        if (sombra) where.tiene_sombra = true;

        if (movilidades.length > 0) {
            where.movilidad = { hasSome: movilidades };
        }

        if (estaciones.length > 0) {
            where.mejor_estacion = { hasSome: estaciones };
        }

        const lugares = await prisma.lugar.findMany({
            where,
            orderBy: { nombre: 'asc' }
        });

        return NextResponse.json({ total: lugares.length, lugares });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

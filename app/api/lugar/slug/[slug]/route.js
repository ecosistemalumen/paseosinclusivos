import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { slug } = params;

        if (!slug) {
            return NextResponse.json({ error: "Slug requerido" }, { status: 400 });
        }

        const lugar = await prisma.lugar.findUnique({
            where: { slug },
        });

        if (!lugar) {
            return NextResponse.json({ error: "Lugar no encontrado" }, { status: 404 });
        }

        // Parse CSV to Arrays for frontend consistency
        const lugarProcessed = lugar;

        return NextResponse.json(lugarProcessed);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

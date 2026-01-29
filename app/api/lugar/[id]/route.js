import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const slug = params.slug; // Note: file structure is [slug]/route.js for generic param
        // Wait, the specification asked for /api/lugar/[id]. 
        // But the frontend uses slug (/lugar/parque-centenario).
        // I should implement [slug] to match frontend or [id] as spec?
        // Spec: GET /api/lugar/[id]. Frontend: /lugar/[slug].
        // Let's support querying by slug or implement logic to find by slug if passed as ID is tricky.
        // I will stick to slug because it's better for SEO and friendly URLs as per spec "slug" field.

        // Correction: The file structure in spec was app/api/lugar/[id]/route.js. 
        // I will implement looking up by ID for strict spec compliance, but I might need slug lookup too.
        // Let's implement slug lookup if the parameter is not a number.

        const idOrSlug = params.id; // from folder [id]

        let where = {};
        if (!isNaN(idOrSlug)) {
            where.id = parseInt(idOrSlug);
        } else {
            where.slug = idOrSlug;
        }

        const lugar = await prisma.lugar.findFirst({
            where
        });

        if (!lugar) {
            return NextResponse.json({ error: "Lugar no encontrado" }, { status: 404 });
        }

        return NextResponse.json(lugar);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

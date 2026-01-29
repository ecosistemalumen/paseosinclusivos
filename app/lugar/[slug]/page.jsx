import Link from "next/link";
import Badge from "@/components/Ficha/Badge";
import InfoGeneral from "@/components/Ficha/InfoGeneral";
import AccesibilidadReal from "@/components/Ficha/AccesibilidadReal";
import NotasHonestas from "@/components/Ficha/NotasHonestas";
import MapaDynamic from "@/components/Ficha/MapaDynamic";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export default async function LugarPage({ params }) {
    let lugar = await prisma.lugar.findUnique({
        where: { slug: params.slug }
    });

    if (lugar) {
        // Adapt SQLite CSV to Arrays for components
        lugar = {
            ...lugar,
            movilidad: lugar.movilidad ? lugar.movilidad.split(',') : [],
            mejor_estacion: lugar.mejor_estacion ? lugar.mejor_estacion.split(',') : []
        };
    }

    if (!lugar) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Lugar no encontrado</h1>
                <Link href="/buscar" className="text-primary hover:underline">
                    Volver al buscador
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/buscar" className="text-gray-500 hover:text-primary mb-6 inline-block">
                ← Volver a resultados
            </Link>

            <div>
                <Badge tipo={lugar.fuente} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <InfoGeneral lugar={lugar} />
                        {lugar.lat && (
                            <div className="mt-8">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                    Ubicación
                                </h3>
                                <MapaDynamic lat={lugar.lat} lng={lugar.lng} popupText={lugar.nombre} />
                                <p className="text-sm text-gray-500 mt-2">© OpenStreetMap contributors (Sin cookies de seguimiento)</p>
                            </div>
                        )}
                    </div>
                    <div className="space-y-6">
                        <AccesibilidadReal lugar={lugar} />
                        <NotasHonestas lugar={lugar} />
                    </div>
                </div>
            </div>
        </div>
    );
}

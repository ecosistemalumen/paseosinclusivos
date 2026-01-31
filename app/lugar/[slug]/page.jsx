
import { notFound } from 'next/navigation';
// Retain 'dynamic' export configuration
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Badge from '@/components/Ficha/Badge';
import NotasHonestas from '@/components/Ficha/NotasHonestas';
import InteractionButtons from '@/components/Ficha/InteractionButtons';
import nextDynamic from 'next/dynamic';
import { calculateSemaphore } from '@/lib/decision';
import { createClient } from '@/lib/supabase/server';
import prisma from '@/lib/db';
import {
    MapPin,
    ChevronLeft,
    Accessibility,
    CircleDollarSign,
    Mountain,
    Ear,
    Trees,
    Dog,
    CheckCircle2,
    XCircle,
    Info,
    Calendar,
    AlertTriangle,
    ThumbsUp,
    ThumbsDown
} from 'lucide-react';

const MapaInteractivo = nextDynamic(() => import('@/components/Mapa/MapaInteractivo'), {
    loading: () => <div className="h-64 w-full bg-gray-100 rounded-xl animate-pulse flex items-center justify-center text-gray-400">Cargando mapa...</div>,
    ssr: false
});

// Fetch del lugar específico
async function getLugar(slug) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lugar/${slug}`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching lugar:', error);
        return null;
    }
}

async function getUserProfile() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    return await prisma.profile.findUnique({ where: { email: user.email } });
}

export default async function LugarPage({ params }) {
    const lugar = await getLugar(params.slug);
    const userProfile = await getUserProfile();

    if (!lugar) {
        notFound();
    }

    const semaforo = calculateSemaphore(lugar, userProfile);

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Header Sticky Navigation (Desktop) */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 hidden md:block">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <span className="font-bold text-gray-900 truncate pr-4">{lugar.nombre}</span>
                    <Link href="/buscar" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                        Volver a resultados
                    </Link>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10">
                {/* Mobile Back Button */}
                <div className="md:hidden mb-4">
                    <Link href="/buscar" className="flex items-center text-gray-600 hover:text-gray-900">
                        <ChevronLeft className="w-5 h-5" /> Volver
                    </Link>
                </div>

                {/* 
                  1) HEADER DE DECISIÓN
                  Visible sin scroll. Responde: ¿Qué es? ¿Dónde queda? ¿Qué tiene?
                */}
                <header className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div>
                            <Badge fuente={lugar.fuente} />
                            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-2 leading-tight text-balance">
                                {lugar.nombre}
                            </h1>
                            <div className="flex items-center text-gray-600 font-medium text-lg">
                                <MapPin className="w-5 h-5 mr-1 text-gray-400" />
                                {lugar.ubicacion}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="w-full md:w-auto mt-4 md:mt-0 flex-shrink-0">
                            <InteractionButtons lugarId={lugar.id} />
                        </div>
                    </div>

                    {/* Summary Pills - Quick Scan */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                            <CircleDollarSign className="w-3.5 h-3.5 mr-1.5 text-gray-500" /> {lugar.costo}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${lugar.nivel_esfuerzo === 'Bajo' ? 'bg-green-50 text-green-700 border-green-200' :
                            lugar.nivel_esfuerzo === 'Medio' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'
                            }`}>
                            <Mountain className="w-3.5 h-3.5 mr-1.5" /> Esfuerzo {lugar.nivel_esfuerzo}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                            <Ear className="w-3.5 h-3.5 mr-1.5 text-gray-500" /> Ruido {lugar.ruido}
                        </span>
                        {lugar.tiene_sombra && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                <Trees className="w-3.5 h-3.5 mr-1.5 text-gray-500" /> Tiene sombra
                            </span>
                        )}
                        {lugar.pet_friendly && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                                <Dog className="w-3.5 h-3.5 mr-1.5" /> Pet Friendly
                            </span>
                        )}
                    </div>
                </header>



                {/* GALERÍA DE IMÁGENES */}
                {lugar.imagenes && lugar.imagenes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 rounded-2xl overflow-hidden h-[300px] md:h-[400px]">
                        <div className="h-full relative group">
                            <img
                                src={lugar.imagenes[0]}
                                alt={`Vista principal de ${lugar.nombre}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="hidden md:grid grid-rows-2 gap-4 h-full">
                            {/* Si hay más de 1 foto, mostramos la segunda */}
                            {lugar.imagenes[1] ? (
                                <div className="relative group overflow-hidden">
                                    <img
                                        src={lugar.imagenes[1]}
                                        alt={`${lugar.nombre} - 2`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            ) : (
                                <div className="bg-gray-100 flex items-center justify-center text-gray-400 font-medium">
                                    Más fotos pronto
                                </div>
                            )}

                            {/* Si hay más de 2 fotos, mostramos la tercera */}
                            {lugar.imagenes[2] ? (
                                <div className="relative group overflow-hidden">
                                    <img
                                        src={lugar.imagenes[2]}
                                        alt={`${lugar.nombre} - 3`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            ) : (
                                <div className="bg-gray-100 flex items-center justify-center text-gray-400 font-medium">
                                    Más fotos pronto
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Main Column (Left) */}
                    <div className="lg:col-span-2 space-y-8">

                        <div className={`p-6 rounded-2xl border ${semaforo.style} flex gap-5 items-start`}>
                            <div className="hidden sm:flex flex-shrink-0 p-3 bg-white/50 rounded-xl">
                                <semaforo.icon className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                                    <semaforo.icon className="w-6 h-6 sm:hidden" />
                                    {semaforo.title}
                                </h2>
                                <p className="text-base font-medium opacity-90 leading-relaxed mb-3">
                                    {semaforo.desc}
                                </p>
                                {/* Microcopy de cuidado */}
                                <p className="text-xs opacity-75 italic border-t border-black/10 pt-2">
                                    Cada experiencia es distinta. Esta info busca ayudarte a decidir con menos incertidumbre.
                                </p>
                            </div>
                        </div>

                        {/* 5) NOTAS HONESTAS (Adelantadas por importancia) */}
                        {lugar.notas_honestas && (
                            <NotasHonestas notas={lugar.notas_honestas} />
                        )}

                        {/* 3) INFORMACIÓN ESENCIAL (Grid) */}
                        <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <h2 className="text-lg font-bold text-gray-900 bg-gray-50/50 px-6 py-4 border-b border-gray-100">
                                Detalles clave
                            </h2>
                            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-b border-gray-100">
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-2 text-gray-500 text-sm font-medium uppercase tracking-wider">
                                        <CircleDollarSign className="w-4 h-4" /> Costo
                                    </div>
                                    <p className="text-lg font-semibold text-gray-900">{lugar.costo}</p>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-2 text-gray-500 text-sm font-medium uppercase tracking-wider">
                                        <Mountain className="w-4 h-4" /> Nivel de Esfuerzo
                                    </div>
                                    <p className="text-lg font-semibold text-gray-900">{lugar.nivel_esfuerzo}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {lugar.nivel_esfuerzo === 'Bajo' ? 'Terreno mayormente plano y fácil.' :
                                            lugar.nivel_esfuerzo === 'Medio' ? 'Puede tener pendientes o tramos largos.' : 'Requiere asistencia o buen estado físico.'}
                                    </p>
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-2 text-gray-500 text-sm font-medium uppercase tracking-wider">
                                        <Accessibility className="w-4 h-4" /> Movilidad recomendada
                                    </div>
                                    <ul className="space-y-2">
                                        {lugar.movilidad.map(m => (
                                            <li key={m} className="flex items-center gap-2 text-gray-800 font-medium">
                                                <CheckCircle2 className="w-4 h-4 text-green-500" /> {m}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-2 text-gray-500 text-sm font-medium uppercase tracking-wider">
                                        <Info className="w-4 h-4" /> Ambiente
                                    </div>
                                    <div className="space-y-2 text-gray-800">
                                        <p className="flex items-center gap-2">
                                            <Ear className="w-4 h-4 text-gray-400" /> Ruido: <span className="font-semibold">{lugar.ruido}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Trees className="w-4 h-4 text-gray-400" /> Sombra: <span className="font-semibold">{lugar.tiene_sombra ? 'Sí' : 'Poca/Nula'}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Dog className="w-4 h-4 text-gray-400" /> Mascotas: <span className="font-semibold">{lugar.pet_friendly ? 'Bienvenidas' : 'No admiten'}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 4) ACCESIBILIDAD REAL (Checklist) */}
                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Checklist de accesibilidad</h3>
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 grid sm:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className={`flex items-start gap-3 ${lugar.es_plano ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {lugar.es_plano ? <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" /> : <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />}
                                        <div>
                                            <span className="font-bold block">Superficie Plana</span>
                                            <span className="text-sm text-gray-500">Sin desniveles graves o escalones sorpresa.</span>
                                        </div>
                                    </div>
                                    <div className={`flex items-start gap-3 ${lugar.tiene_rampa ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {lugar.tiene_rampa ? <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" /> : <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />}
                                        <div>
                                            <span className="font-bold block">Rampas Accesibles</span>
                                            <span className="text-sm text-gray-500">Rampas reglamentarias o usables en ingresos.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className={`flex items-start gap-3 ${lugar.tiene_banio ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {lugar.tiene_banio ? <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" /> : <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />}
                                        <div>
                                            <span className="font-bold block">Baño Adaptado</span>
                                            <span className="text-sm text-gray-500">Baño con espacio para maniobra y barrales.</span>
                                        </div>
                                    </div>
                                    {lugar.distancia_aprox && (
                                        <div className="flex items-start gap-3 text-gray-900">
                                            <Info className="w-6 h-6 text-indigo-500 flex-shrink-0" />
                                            <div>
                                                <span className="font-bold block">Distancia aprox.</span>
                                                <span className="text-sm text-gray-500">{lugar.distancia_aprox}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Sidebar (Right) */}
                    <aside className="space-y-6">
                        {/* 6) MAPA (Secundario) */}
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="font-bold text-gray-900">Ubicación</h3>
                            </div>
                            <div className="h-64 relative z-0">
                                <MapaInteractivo lugares={[lugar]} zoom={15} />
                            </div>
                            <div className="p-4 text-sm text-gray-500">
                                <MapPin className="w-4 h-4 inline mr-1" /> {lugar.ubicacion}
                            </div>
                        </div>

                        {/* 7) METADATA */}
                        <div className="bg-gray-100 rounded-xl p-5 text-sm text-gray-500 space-y-2">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Actualizado: <strong>{new Date(lugar.ultima_actualizacion).toLocaleDateString('es-AR')}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                <span>Temporada: <strong>{lugar.estacion_actual}</strong></span>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </main >
    );
}

// Generar metadata dinámica
export async function generateMetadata({ params }) {
    const lugar = await getLugar(params.slug);

    if (!lugar) {
        return {
            title: 'Lugar no encontrado',
        };
    }

    return {
        title: `${lugar.nombre} | Paseos Inclusivos`,
        description: `${lugar.nombre} - ${lugar.ubicacion}. Costo: ${lugar.costo}. Nivel de esfuerzo: ${lugar.nivel_esfuerzo}. Información real de accesibilidad.`,
    };
}

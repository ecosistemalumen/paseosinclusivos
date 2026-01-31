'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Filtros from '@/components/Buscador/Filtros';
import TarjetaLugar from '@/components/Buscador/TarjetaLugar';

function BuscarContent() {
    const [lugares, setLugares] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtros, setFiltros] = useState({
        costo: [],
        esfuerzo: [],
        movilidad: [],
        ruido: null,
        sombra: false,
        pet_friendly: false,
        estacion: [],
    });

    // URL Params Sync
    const searchParams = useSearchParams();

    // Initial load from URL params
    useEffect(() => {
        const newFiltros = { ...filtros };
        let hasChanges = false;

        // Map URL params to filters
        const q = searchParams.get('q');
        const costo = searchParams.get('costo');
        const movilidad = searchParams.get('movilidad');
        const ruido = searchParams.get('ruido');
        const sombra = searchParams.get('sombra');
        const pet_friendly = searchParams.get('pet_friendly');

        // We can add a simple name search later, for now we map common filters
        if (costo) { newFiltros.costo = costo.split(','); hasChanges = true; }
        if (movilidad) { newFiltros.movilidad = movilidad.split(','); hasChanges = true; }
        if (ruido) { newFiltros.ruido = ruido; hasChanges = true; }
        if (sombra === 'true') { newFiltros.sombra = true; hasChanges = true; }
        if (pet_friendly === 'true') { newFiltros.pet_friendly = true; hasChanges = true; }

        if (hasChanges) {
            setFiltros(newFiltros);
        } else {
            // If no params, just fetch default
            fetchLugares();
        }
    }, [searchParams]);

    // Fetch on filter change
    useEffect(() => {
        // Prevent double fetch on mount if params exist (handled above)
        // Check if logic requires debouncing or stricter control
        fetchLugares();
    }, [filtros]);

    const fetchLugares = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            // Construir query params
            if (filtros.costo.length > 0) params.append('costo', filtros.costo.join(','));
            if (filtros.esfuerzo.length > 0) params.append('esfuerzo', filtros.esfuerzo.join(','));
            if (filtros.movilidad.length > 0) params.append('movilidad', filtros.movilidad.join(','));
            if (filtros.ruido) params.append('ruido', filtros.ruido);
            if (filtros.sombra) params.append('sombra', 'true');
            if (filtros.pet_friendly) params.append('pet_friendly', 'true');
            if (filtros.estacion.length > 0) params.append('estacion', filtros.estacion.join(','));

            const response = await fetch(`/api/lugares?${params.toString()}`);
            const data = await response.json();

            setLugares(data.lugares || []);
        } catch (error) {
            console.error('Error fetching lugares:', error);
            setLugares([]);
        } finally {
            setLoading(false);
        }
    };

    const limpiarFiltros = () => {
        setFiltros({
            costo: [],
            esfuerzo: [],
            movilidad: [],
            ruido: null,
            sombra: false,
            pet_friendly: false,
            estacion: [],
        });
    };

    return (
        <main className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Buscar experiencias
                    </h1>
                    <p className="text-xl text-gray-600">
                        Encontrá lo que mejor se adapta a vos
                    </p>
                </div>

                {/* Layout: Filtros + Resultados */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar: Filtros */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Preferencias
                                </h2>
                                <button
                                    onClick={limpiarFiltros}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Limpiar
                                </button>
                            </div>

                            <Filtros filtros={filtros} setFiltros={setFiltros} />
                        </div>
                    </aside>

                    {/* Main: Resultados */}
                    <div className="lg:col-span-3">

                        {/* Cantidad de resultados */}
                        <div className="mb-6">
                            <p className="text-lg text-gray-700">
                                {loading ? (
                                    'Buscando...'
                                ) : (
                                    <>
                                        <span className="font-semibold">{lugares.length}</span>
                                        {' '}
                                        {lugares.length === 1 ? 'experiencia encontrada' : 'experiencias encontradas'}
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Grid de resultados */}
                        {loading ? (
                            <div className="text-center py-12">
                                <p className="text-xl text-gray-600">Cargando...</p>
                            </div>
                        ) : lugares.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                                <p className="text-xl text-gray-600 mb-4">
                                    No encontramos experiencias con esas preferencias
                                </p>
                                <p className="text-lg text-gray-500">
                                    Probá cambiando alguno o{' '}
                                    <button
                                        onClick={limpiarFiltros}
                                        className="text-blue-600 hover:text-blue-700 font-medium underline"
                                    >
                                        limpiar todos
                                    </button>
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {lugares.map((lugar) => (
                                    <TarjetaLugar key={lugar.id} lugar={lugar} />
                                ))}
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </main>
    );
}

export default function BuscarPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Cargando buscador...</div>}>
            <BuscarContent />
        </Suspense>
    );
}

"use client";

import { useState, useEffect } from "react";
import Filtros from "@/components/Buscador/Filtros";
import TarjetaLugar from "@/components/Buscador/TarjetaLugar";
// import { LUGARES } from "@/lib/data"; // Removed mock

export default function BuscadorPage() {
    const [filtros, setFiltros] = useState({});
    const [lugares, setLugares] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLugares = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();

                if (filtros.costo) params.append("costo", filtros.costo);

                if (filtros.esfuerzo && filtros.esfuerzo.length > 0) {
                    filtros.esfuerzo.forEach(e => params.append("esfuerzo", e));
                }

                if (filtros.movilidad && filtros.movilidad.length > 0) {
                    filtros.movilidad.forEach(m => params.append("movilidad", m));
                }

                if (filtros.ruido) params.append("ruido", filtros.ruido);
                if (filtros.sombra) params.append("sombra", "true");

                if (filtros.estacion && filtros.estacion.length > 0) {
                    filtros.estacion.forEach(e => params.append("estacion", e));
                }

                const res = await fetch(`/api/lugares?${params.toString()}`);
                if (!res.ok) throw new Error("Error al cargar lugares");

                const data = await res.json();
                setLugares(data.lugares || []);
            } catch (err) {
                console.error(err);
                setError("No pudimos cargar los lugares. Por favor intentá más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchLugares();
    }, [filtros]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">Buscar paseos accesibles</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <Filtros filtros={filtros} onChange={setFiltros} />

                <div className="flex-grow">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 p-4 rounded text-red-700">
                            {error}
                        </div>
                    ) : (
                        <>
                            <p className="mb-4 text-gray-600">
                                {lugares.length} lugares encontrados
                            </p>

                            {lugares.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                    {lugares.map((lugar) => (
                                        <TarjetaLugar key={lugar.id} lugar={lugar} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-lg p-12 text-center border-2 border-dashed border-gray-200">
                                    <p className="text-xl text-gray-500 mb-2">No encontramos lugares con esos filtros.</p>
                                    <button
                                        onClick={() => setFiltros({})}
                                        className="text-primary hover:underline font-medium"
                                    >
                                        Limpiar filtros y ver todo
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

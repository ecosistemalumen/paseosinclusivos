'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MiRutaPage() {
    const [step, setStep] = useState(1);
    const [preferences, setPreferences] = useState({
        destino: '',
        dias: 3,
        movilidad: [],
        intereses: [] // 'Naturaleza', 'Cultura', 'Gastronomía'
    });
    const [itinerario, setItinerario] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPreferences(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = (category, value) => {
        setPreferences(prev => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter(item => item !== value)
                : [...prev[category], value]
        }));
    };

    const generarItinerario = async () => {
        setLoading(true);
        // Simulación de algoritmo inteligente
        setTimeout(() => {
            // Mock de resultados
            setItinerario([
                { dia: 1, actividad: 'Mañana tranquila en Parque Centenario', slug: 'parque-centenario' },
                { dia: 1, actividad: 'Tarde cultural en Museo Moderno', slug: 'museo-moderno' },
                { dia: 2, actividad: 'Día completo en Reserva Ecológica', slug: 'reserva-ecologica' },
            ]);
            setStep(2);
            setLoading(false);
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Planificá tu Escapada 🗺️
                    </h1>
                    <p className="text-xl text-gray-600">
                        Decinos a dónde vas y te armamos un plan accesible a tu medida.
                    </p>
                </div>

                {/* Paso 1: Formulario */}
                {step === 1 && (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-8 animate-fade-in-up">

                        <div>
                            <label className="block text-lg font-semibold text-gray-900 mb-2">¿A dónde te vas?</label>
                            <input
                                type="text"
                                name="destino"
                                value={preferences.destino}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                                placeholder="Ej: Córdoba Capital, CABA, Bariloche..."
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold text-gray-900 mb-2">¿Cuántos días?</label>
                            <select
                                name="dias"
                                value={preferences.dias}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                {[1, 2, 3, 4, 5, 7, 10].map(d => <option key={d} value={d}>{d} días</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold text-gray-900 mb-3">Necesidades de Movilidad</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {['Silla de ruedas', 'Andador', 'Bastón'].map(tipo => (
                                    <label key={tipo} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-indigo-300 transition-all">
                                        <input
                                            type="checkbox"
                                            checked={preferences.movilidad.includes(tipo)}
                                            onChange={() => handleCheckbox('movilidad', tipo)}
                                            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                        />
                                        <span className="font-medium text-gray-700">{tipo}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={generarItinerario}
                            disabled={loading || !preferences.destino}
                            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all ${loading || !preferences.destino
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl hover:scale-[1.02]'
                                }`}
                        >
                            {loading ? 'Analizando rutas...' : '✨ Armar mi Itinerario'}
                        </button>

                    </div>
                )}

                {/* Paso 2: Resultados */}
                {step === 2 && itinerario && (
                    <div className="space-y-6 animate-fade-in-up">

                        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl flex items-center gap-4">
                            <span className="text-4xl">🎉</span>
                            <div>
                                <h2 className="text-xl font-bold text-indigo-900">¡Listo! Acá tenés tu plan para {preferences.destino}</h2>
                                <p className="text-indigo-700">Basado en accesibilidad para: {preferences.movilidad.join(', ') || 'Todo tipo'}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {itinerario.map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center font-bold text-gray-500 text-xl border-2 border-white shadow-sm">
                                        Día {item.dia}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-gray-900">{item.actividad}</h3>
                                        <Link href={`/lugar/${item.slug}`} className="text-indigo-600 font-medium hover:underline flex items-center gap-1 mt-1">
                                            Ver detalles <span>→</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setStep(1)}
                            className="w-full py-4 text-gray-500 font-semibold hover:text-gray-900 transition-colors"
                        >
                            ← Volver a planificar
                        </button>
                    </div>
                )}

            </div>
        </main>
    );
}

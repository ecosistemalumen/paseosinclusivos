'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service if needed
        console.error('Captured by Error Boundary:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-amber-500" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Algo no salió como esperábamos</h1>
                <p className="text-gray-500 mb-8">
                    Hubo un problema técnico al cargar esta parte del sitio. No te preocupes, tus datos están a salvo.
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => reset()}
                        className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCcw className="w-5 h-5" /> Reintentar cargar
                    </button>

                    <Link
                        href="/inicio"
                        className="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" /> Volver al Inicio
                    </Link>
                </div>

                <p className="mt-8 text-xs text-gray-400">
                    ID del error: {error?.digest || 'N/A'}
                </p>
            </div>
        </div>
    );
}

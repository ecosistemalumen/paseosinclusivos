'use client';

import { useState } from 'react';
import Link from 'next/link';
import FormDeclaracion from '@/components/Formulario/FormDeclaracion';

export default function DeclararPage() {
    const [enviado, setEnviado] = useState(false);

    if (enviado) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
                <div className="max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <div className="text-6xl mb-6">✓</div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        ¡Gracias por sumar!
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Tu experiencia ya es parte de la comunidad.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/buscar"
                            className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Ver espacios
                        </Link>
                        <Link
                            href="/"
                            className="px-6 py-3 text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Sumá tu experiencia
                    </h1>
                    <p className="text-xl text-gray-700 font-medium mb-6">
                        Contale a otros cómo fue para ayudarlos a decidir mejor.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <p className="text-lg text-gray-800 mb-3">
                            No prometemos perfección, compartimos experiencias reales.
                        </p>
                        <p className="text-base text-gray-700">
                            La información puede actualizarse cuando algo cambia.
                        </p>
                    </div>
                </div>

                {/* Formulario */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <FormDeclaracion setEnviado={setEnviado} />
                </div>

            </div>
        </main>
    );
}

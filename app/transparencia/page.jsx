export default function TransparenciaPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Sobre Paseos Inclusivos
                    </h1>
                    <p className="text-2xl text-gray-600">
                        Una comunidad que comparte experiencias reales para que todos podamos decidir salir con certeza.
                    </p>
                </header>

                {/* Contenido */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">

                    {/* Propósito */}
                    <section className="p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            ¿Por qué existe?
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            <ul className="space-y-3 text-lg text-gray-700">
                                <li>Para responder: <strong>"¿Qué me voy a encontrar?"</strong></li>
                                <li>Para ganar autonomía y salir sin depender de la suerte</li>
                                <li>Para tener información honesta, no promesas de marketing</li>
                            </ul>
                        </div>
                    </section>

                    {/* Qué NO es */}
                    <section className="p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            ¿Qué NO es?
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            <ul className="space-y-3 text-lg text-gray-700">
                                <li>No es un certificado de accesibilidad</li>
                                <li>No es un premio ni una crítica gastronómica</li>
                                <li>No buscamos la perfección, buscamos la honestidad</li>
                            </ul>
                        </div>
                    </section>

                    {/* Filosofía */}
                    <section className="p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Nuestra mirada
                        </h2>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <ul className="space-y-3 text-lg text-gray-800">
                                <li>✓ Hablamos como personas, no como expedientes</li>
                                <li>✓ Contamos lo que hay (y lo que falta)</li>
                                <li>✓ La experiencia real vale más que la norma técnica</li>
                                <li>✓ La accesibilidad se construye, no es una foto fija</li>
                            </ul>
                        </div>
                    </section>

                    {/* Cómo se mantiene */}
                    <section className="p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            ¿Cómo se mantiene al día?
                        </h2>
                        <p className="text-lg text-gray-700 mb-4">
                            La información la construimos entre todos. Las experiencias se actualizan cuando alguien visita el espacio y cuenta algo nuevo.
                        </p>
                        <p className="text-lg text-gray-700">
                            Fomentamos la revisión constante porque la ciudad cambia todo el tiempo.
                        </p>
                    </section>

                    {/* Quién está detrás */}
                    <section className="p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            ¿Quién lo hace?
                        </h2>
                        <p className="text-lg text-gray-700 mb-4">
                            Es un proyecto comunitario, independiente y sin fines de lucro.
                        </p>
                        <p className="text-lg text-gray-700">
                            Nació para que la incertidumbre deje de ser la barrera que nos impide disfrutar de un paseo.
                        </p>
                    </section>

                    {/* Datos verificables */}
                    <section className="p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            ¿En qué confiamos?
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">✓</span>
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">
                                        Experiencias compartidas
                                    </p>
                                    <p className="text-base text-gray-700">
                                        Personas como vos cuentan cómo vivieron el espacio
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-2xl">✓</span>
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">
                                        Mirada honesta
                                    </p>
                                    <p className="text-base text-gray-700">
                                        Valoramos más el dato útil ("el baño es chico") que la etiqueta técnica
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-2xl">✓</span>
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">
                                        Actualización viva
                                    </p>
                                    <p className="text-base text-gray-700">
                                        Si algo cambió, la comunidad lo avisa y se corrige
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="p-8 bg-gray-50">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                ¿Conocés un espacio accesible?
                            </h2>
                            <a
                                href="/declarar"
                                className="inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-lg hover:shadow-xl"
                            >
                                Sumar experiencia
                            </a>
                        </div>
                    </section>

                </div>

            </article>
        </main>
    );
}

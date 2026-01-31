import { Accessibility, Languages, Eye, Type, MousePointer2 } from 'lucide-react';

export default function AccesibilidadPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-indigo-900 py-24 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Compromiso de Accesibilidad
                    </h1>
                    <p className="text-xl text-indigo-100 leading-relaxed max-w-2xl mx-auto">
                        Paseos Inclusivos no solo habla de accesibilidad; intentamos ser el ejemplo de cómo se navega una plataforma sin barreras.
                    </p>
                </div>
            </section>

            {/* Contenido */}
            <section className="py-24">
                <div className="max-w-3xl mx-auto px-4">

                    <div className="space-y-20">
                        {/* Lenguaje Claro */}
                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            <div className="bg-indigo-50 p-4 rounded-2xl shrink-0">
                                <Languages className="w-8 h-8 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Lenguaje Claro</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Evitamos terminología legal compleja o tecnicismos innecesarios. Usamos un español humano, directo y empático para que cualquier persona pueda entender qué está leyendo.
                                </p>
                            </div>
                        </div>

                        {/* Contrastes */}
                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            <div className="bg-indigo-50 p-4 rounded-2xl shrink-0">
                                <Eye className="w-8 h-8 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Color y Contraste</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Nuestra paleta de colores ha sido testeada para cumplir con estándares de alta visibilidad. No dependemos solo del color para transmitir información crítica.
                                </p>
                            </div>
                        </div>

                        {/* Tipografía */}
                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            <div className="bg-indigo-50 p-4 rounded-2xl shrink-0">
                                <Type className="w-8 h-8 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Lectura Simple</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Elegimos tipografías con alta legibilidad y mantenemos tamaños de fuente generosos por defecto. Cada elemento interactivo tiene un área de toque amplia.
                                </p>
                            </div>
                        </div>

                        {/* Navegación */}
                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            <div className="bg-indigo-50 p-4 rounded-2xl shrink-0">
                                <MousePointer2 className="w-8 h-8 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sin Laberintos</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    La estructura del sitio es lineal y predecible. Si estás en una pantalla, siempre sabés cómo volver atrás o dónde está el menú principal.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-32 p-12 bg-gray-50 rounded-3xl text-center">
                        <Accessibility className="w-12 h-12 text-indigo-600 mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-gray-900 mb-4">¿Encontraste una barrera?</h3>
                        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                            Si algo en este sitio te resulta difícil de usar o leer, por favor decinos. Tu feedback es el motor que mejora esta herramienta.
                        </p>
                        <a
                            href="mailto:accesibilidad@paseosinclusivos.org"
                            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
                        >
                            Reportar barrera digital
                        </a>
                    </div>

                </div>
            </section>
        </main>
    );
}

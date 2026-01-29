
export const metadata = {
    title: "Compromiso de Accesibilidad | PaseosInclusivos.org",
    description: "Nuestro compromiso ético y técnico con la accesibilidad web (WCAG 2.2 AA).",
};

export default function AccesibilidadPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-gray-900">Estándares Máximos de Accesibilidad Web</h1>

            <div className="prose prose-lg max-w-none text-gray-700">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Para qué sirve</h2>
                    <p>
                        Garantizar que <strong>la página sea usable, comprensible y digna</strong> para personas ciegas, sordas, mudas, con baja visión, neurodivergencias o limitaciones motrices, <strong>sin excepciones</strong>.
                    </p>
                    <p>Esto no es un “extra”: es coherencia ética del proyecto.</p>
                </section>

                <section className="mb-12 bg-blue-50 p-8 rounded-xl border-l-4 border-blue-600">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-0">Principio rector</h2>
                    <blockquote className="text-xl font-medium italic text-gray-800 border-none pl-0">
                        “No hablamos de accesibilidad: la practicamos desde el código.”
                    </blockquote>
                    <p className="mt-4 mb-0">Si la plataforma que habla de inclusión no es accesible, el proyecto fracasa.</p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Estándar base obligatorio</h2>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">WCAG 2.2 — Nivel AA (mínimo)</h3>
                    <p>PaseosInclusivos.org adopta como <strong>piso</strong>, no como techo:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>WCAG 2.2 AA</strong> (W3C)</li>
                    </ul>
                    <p className="mt-4">Y como objetivo estructural:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>WCAG 2.2 AAA</strong> donde sea técnicamente viable.</li>
                    </ul>
                </section>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <section>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">1. Personas ciegas o con baja visión</h3>
                        <ul className="list-disc pl-5 space-y-1 text-base">
                            <li>HTML semántico real (nav, main).</li>
                            <li>ARIA roles solo cuando corresponde.</li>
                            <li>Navegación completa sin mouse.</li>
                            <li>Textos alternativos descriptivos.</li>
                            <li>Zoom hasta 400% sin romper layout.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">2. Accesibilidad cognitiva</h3>
                        <ul className="list-disc pl-5 space-y-1 text-base">
                            <li>Lenguaje simple, no infantil.</li>
                            <li>No sobrecarga visual.</li>
                            <li>No timers agresivos.</li>
                            <li>Explicaciones paso a paso.</li>
                        </ul>
                    </section>
                </div>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Lo que NO se acepta</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-red-50 p-4 rounded-lg text-red-800 font-medium text-center">Accesibilidad “después”</div>
                        <div className="bg-red-50 p-4 rounded-lg text-red-800 font-medium text-center">Popups inaccesibles</div>
                        <div className="bg-red-50 p-4 rounded-lg text-red-800 font-medium text-center">Iconos sin texto</div>
                        <div className="bg-red-50 p-4 rounded-lg text-red-800 font-medium text-center">Formularios sin labels</div>
                        <div className="bg-red-50 p-4 rounded-lg text-red-800 font-medium text-center">Color como única señal</div>
                    </div>
                </section>

                <section className="border-t border-gray-200 pt-8">
                    <p className="text-lg font-medium text-center text-gray-600">
                        “Si alguien no puede usar la página, el error es del sistema, no de la persona.”
                    </p>
                    <p className="text-sm text-center text-gray-400 mt-4">
                        Última actualización: 28/01/2026
                    </p>
                </section>
            </div>
        </div>
    );
}

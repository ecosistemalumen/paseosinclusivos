export default function TransparenciaPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center">¿Qué es Paseos Inclusivos?</h1>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-lg mx-auto">
                <p className="lead text-xl text-gray-600 mb-8">
                    Una plataforma simple que centraliza lugares accesibles para personas con discapacidad y movilidad reducida.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Para qué sirve?</h2>
                <ul className="space-y-2 mb-8 list-disc pl-6">
                    <li>Responder: <strong>"¿Este lugar da o no da?"</strong></li>
                    <li>Brindar autonomía para salir sin depender de terceros.</li>
                    <li>Información real, no marketing.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué NO es?</h2>
                <ul className="space-y-2 mb-8 list-disc pl-6 text-red-700">
                    <li>No es turismo aspiracional.</li>
                    <li>No es caridad estética.</li>
                    <li>No prometemos perfección, prometemos transparencia.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Filosofía</h2>
                <ul className="space-y-2 mb-8 list-disc pl-6">
                    <li>Lenguaje claro, humano.</li>
                    <li>Decir lo que SÍ y lo que NO.</li>
                    <li>Accesibilidad &gt; estética.</li>
                    <li>La accesibilidad es proceso, no foto.</li>
                </ul>

                <div className="bg-blue-50 p-6 rounded-lg mt-8">
                    <h3 className="font-bold text-blue-900 mb-2">¿Cómo se mantiene actualizado?</h3>
                    <p className="text-blue-800">
                        Los lugares declaran su info y se actualiza cada estación del año (4 veces al año).
                    </p>
                </div>
            </div>
        </div>
    );
}

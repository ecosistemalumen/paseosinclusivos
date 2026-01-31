export default function InfoGeneral({ lugar }) {
    return (
        <section className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Información general
            </h2>

            <dl className="space-y-4">

                {/* Costo */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <dt className="text-base font-semibold text-gray-900 sm:w-40">
                        Costo:
                    </dt>
                    <dd className="text-lg text-gray-700">
                        {lugar.costo}
                    </dd>
                </div>

                {/* Nivel de esfuerzo */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <dt className="text-base font-semibold text-gray-900 sm:w-40">
                        Nivel de esfuerzo:
                    </dt>
                    <dd className="text-lg text-gray-700">
                        {lugar.nivel_esfuerzo}
                        {lugar.nivel_esfuerzo === 'Bajo' && ' - Ideal para paseo tranquilo'}
                        {lugar.nivel_esfuerzo === 'Medio' && ' - Requiere algo de resistencia'}
                        {lugar.nivel_esfuerzo === 'Alto' && ' - Requiere buena condición física'}
                    </dd>
                </div>

                {/* Movilidad compatible */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <dt className="text-base font-semibold text-gray-900 sm:w-40">
                        Movilidad compatible:
                    </dt>
                    <dd className="text-lg text-gray-700">
                        <ul className="space-y-1">
                            {lugar.movilidad.map((tipo) => (
                                <li key={tipo} className="flex items-center gap-2">
                                    <span className="text-green-600">✓</span>
                                    {tipo}
                                </li>
                            ))}
                        </ul>
                    </dd>
                </div>

                {/* Ambiente */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <dt className="text-base font-semibold text-gray-900 sm:w-40">
                        Ambiente:
                    </dt>
                    <dd className="text-lg text-gray-700">
                        <ul className="space-y-1">
                            <li>Nivel de ruido: {lugar.ruido}</li>
                            {lugar.tiene_sombra && (
                                <li className="flex items-center gap-2">
                                    <span className="text-green-600">✓</span>
                                    Tiene sombra
                                </li>
                            )}
                        </ul>
                    </dd>
                </div>

                {/* Pet Friendly */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <dt className="text-base font-semibold text-gray-900 sm:w-40">
                        Mascotas:
                    </dt>
                    <dd className="text-lg text-gray-700">
                        {lugar.pet_friendly ? (
                            <span className="flex items-center gap-2 text-green-700 font-medium">
                                <span className="text-xl">🐶</span> ¡Sí, es Pet Friendly!
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 text-gray-600">
                                <span className="text-xl">🚫</span> No se admiten mascotas
                            </span>
                        )}
                    </dd>
                </div>

                {/* Mejor época */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <dt className="text-base font-semibold text-gray-900 sm:w-40">
                        Mejor época:
                    </dt>
                    <dd className="text-lg text-gray-700">
                        {lugar.mejor_estacion.join(', ')}
                    </dd>
                </div>

            </dl >
        </section >
    );
}

export default function AccesibilidadReal({ lugar }) {
    const items = [
        {
            condicion: lugar.es_plano,
            texto: 'Plano (sin escalones)',
            icono: '✓',
            iconoNegativo: '✗'
        },
        {
            condicion: lugar.tiene_rampa,
            texto: 'Tiene rampas',
            icono: '✓',
            iconoNegativo: '✗'
        },
        {
            condicion: lugar.tiene_banio,
            texto: 'Baños accesibles',
            icono: '✓',
            iconoNegativo: '✗'
        },
    ];

    return (
        <section className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Accesibilidad real
            </h2>

            <div className="space-y-4">

                {/* Lista de features */}
                <ul className="space-y-3">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <span className={`
                text-xl font-bold
                ${item.condicion ? 'text-green-600' : 'text-red-600'}
              `}>
                                {item.condicion ? item.icono : item.iconoNegativo}
                            </span>
                            <span className={`
                text-lg
                ${item.condicion ? 'text-gray-900' : 'text-gray-500 line-through'}
              `}>
                                {item.texto}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Distancia aproximada */}
                {lugar.distancia_aprox && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-base text-gray-900">
                            <span className="font-semibold">Distancia desde estacionamiento:</span>
                            {' '}
                            {lugar.distancia_aprox}
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
}

export default function InfoGeneral({ lugar }) {
    return (
        <section className="bg-white rounded-xl p-8 mb-6 shadow-sm border border-gray-100">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{lugar.nombre}</h1>
            <p className="text-xl text-gray-600 mb-8 flex items-center gap-2">
                📍 {lugar.ubicacion}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Costo</h3>
                    <p className="text-lg font-medium text-gray-900">{lugar.costo}</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Nivel de esfuerzo</h3>
                    <p className="text-lg font-medium text-gray-900 capitalize">{lugar.nivel_esfuerzo}</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Movilidad</h3>
                    <div className="flex flex-wrap gap-2">
                        {lugar.movilidad.map(m => (
                            <span key={m} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                {m}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function NotasHonestas({ lugar }) {
    return (
        <section className="bg-yellow-50 rounded-xl p-8 shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-bold mb-4 text-yellow-900">Notas Honestas</h2>
            <div className="prose prose-yellow max-w-none text-lg text-gray-800">
                <p>{lugar.notas_honestas || "Sin notas adicionales."}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-yellow-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                    <span className="font-semibold block mb-1">Ambiente:</span>
                    Ruido {lugar.ruido} • {lugar.tiene_sombra ? "Tiene sombra" : "Poca sombra"}
                </div>
                <div className="text-right sm:text-right">
                    <span className="block mb-1">Actualizado: {lugar.estacion_actual}</span>
                    <time dateTime={lugar.ultima_actualizacion}>{new Date(lugar.ultima_actualizacion).toLocaleDateString()}</time>
                </div>
            </div>
        </section>
    );
}

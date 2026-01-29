export default function AccesibilidadReal({ lugar }) {
    return (
        <section className="bg-white rounded-xl p-8 mb-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Accesibilidad Real
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${lugar.es_plano ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                            {lugar.es_plano ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                </svg>
                            )}
                        </div>
                        <span className="text-lg">
                            {lugar.es_plano ? "Superficie Plana" : "Desniveles / Escalones"}
                        </span>
                    </li>
                    <li className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${lugar.tiene_rampa ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                <path d="M19 3L5 17H2v2h5l14-14h1V3h-3z" />
                                <circle cx="16" cy="19" r="2" />
                            </svg>
                        </div>
                        <span className="text-lg">
                            {lugar.tiene_rampa ? "Rampas Disponibles" : "No tiene rampas"}
                        </span>
                    </li>
                    <li className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${lugar.tiene_banio ? "bg-purple-100 text-purple-700" : "bg-red-100 text-red-700"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <span className="text-lg">
                            {lugar.tiene_banio ? "Baño Accesible" : "Sin baño adaptado"}
                        </span>
                    </li>
                </ul>

                <div className="bg-gray-50 rounded-lg p-6 flex flex-col justify-center">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Distancias clave
                    </h3>
                    <p className="text-gray-700 italic">"{lugar.distancia_aprox || "No especificada"}"</p>
                </div>
            </div>
        </section>
    );
}

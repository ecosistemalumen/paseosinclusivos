import Link from 'next/link';

export default function TarjetaLugar({ lugar }) {
    const isDeclarado = lugar.fuente === "Declarado";

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 flex flex-col h-full group">
            <div className="mb-4">
                <div className="flex justify-between items-start mb-3">
                    <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase ${isDeclarado
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                            }`}
                    >
                        {isDeclarado ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        )}
                        {isDeclarado ? "Verificado" : "Comunidad"}
                    </span>
                    {lugar.costo.includes("Gratis") && (
                        <span className="text-green-600 font-bold text-xs flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 01.414.414 1 1 0 110-1.414A5.002 5.002 0 0014 12V6a2 2 0 00-2-2H8a2 2 0 00-2 2v6c0 .536-.214 1.05-.536 1.465z" />
                                {/* Simplified Ticket Icon for small size */}
                                <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                            </svg>
                            GRATIS CUD
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight group-hover:text-primary transition-colors">
                    <Link href={`/lugar/${lugar.slug}`}>
                        {lugar.nombre}
                    </Link>
                </h3>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {lugar.ubicacion}
                </p>
            </div>

            <div className="space-y-3 mb-6 flex-grow border-t border-gray-100 pt-4">
                <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 flex justify-center text-gray-400" title="Nivel de Esfuerzo Físico">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-gray-500 text-xs uppercase font-bold tracking-wider">Esfuerzo</span>
                        <span className="font-medium text-gray-900">{lugar.nivel_esfuerzo}</span>
                    </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                    <div className="w-8 flex justify-center text-gray-400 mt-0.5" title="Accesibilidad / Movilidad">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20M2 12h20" />
                            {/* Abstract Universal Access Symbol like */}
                            <path d="M12 7a2 2 0 100-4 2 2 0 000 4zM12 7v7m0 0l-3 3m3-3l3 3" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Movilidad</span>
                        <div className="flex flex-wrap gap-1">
                            {lugar.movilidad.map((mov) => (
                                <span key={mov} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs border border-gray-200">
                                    {mov}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Link
                href={`/lugar/${lugar.slug}`}
                className="block w-full text-center py-2.5 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-bold transition-colors text-sm"
            >
                Ver Ficha Completa
            </Link>
        </div>
    );
}

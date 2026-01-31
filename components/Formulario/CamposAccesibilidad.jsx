export default function CamposAccesibilidad({ formData, handleChange }) {
    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Accesibilidad
            </h2>

            <div className="space-y-6">

                {/* Checkboxes de accesibilidad */}
                <div className="space-y-4">

                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            name="tiene_rampa"
                            checked={formData.tiene_rampa}
                            onChange={handleChange}
                            className="w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-300"
                        />
                        <div>
                            <span className="text-lg text-gray-900 font-medium group-hover:text-blue-600 block">
                                ¿Tiene rampas?
                            </span>
                            <span className="text-sm text-gray-600">
                                Para sillas de ruedas o personas con movilidad reducida
                            </span>
                        </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            name="tiene_banio"
                            checked={formData.tiene_banio}
                            onChange={handleChange}
                            className="w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-300"
                        />
                        <div>
                            <span className="text-lg text-gray-900 font-medium group-hover:text-blue-600 block">
                                ¿Tiene baños accesibles?
                            </span>
                            <span className="text-sm text-gray-600">
                                Con espacio suficiente y barras de apoyo
                            </span>
                        </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            name="es_plano"
                            checked={formData.es_plano}
                            onChange={handleChange}
                            className="w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-300"
                        />
                        <div>
                            <span className="text-lg text-gray-900 font-medium group-hover:text-blue-600 block">
                                ¿Es plano? (sin escalones)
                            </span>
                            <span className="text-sm text-gray-600">
                                Todo el recorrido es accesible sin subir/bajar escaleras
                            </span>
                        </div>
                    </label>

                </div>

                {/* Distancia aproximada */}
                <div>
                    <label htmlFor="distancia_aprox" className="block text-base font-semibold text-gray-900 mb-2">
                        Distancia aproximada desde estacionamiento <span className="text-gray-500">(opcional)</span>
                    </label>
                    <input
                        type="text"
                        id="distancia_aprox"
                        name="distancia_aprox"
                        value={formData.distancia_aprox}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-colors"
                        placeholder="Ej: 150m, 500m, etc."
                    />
                </div>

            </div>
        </section>
    );
}

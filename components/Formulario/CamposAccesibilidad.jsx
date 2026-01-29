export default function CamposAccesibilidad({ values, onChange }) {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        onChange(name, type === 'checkbox' ? checked : value);
    };

    const handleArrayChange = (name, value) => {
        const current = values[name] || [];
        const newValues = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value];
        onChange(name, newValues);
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Costos y Esfuerzo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Costo</label>
                        <select
                            name="costo"
                            value={values.costo}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-lg shadow-sm p-3 border"
                        >
                            <option value="">Seleccionar...</option>
                            <option value="Gratis">Gratis</option>
                            <option value="Gratis con CUD">Gratis con CUD</option>
                            <option value="Pago">Pago</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de esfuerzo</label>
                        <select
                            name="nivel_esfuerzo"
                            value={values.nivel_esfuerzo}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-lg shadow-sm p-3 border"
                        >
                            <option value="">Seleccionar...</option>
                            <option value="Bajo">Bajo</option>
                            <option value="Medio">Medio</option>
                            <option value="Alto">Alto</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Accesibilidad Física</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                            type="checkbox"
                            name="tiene_rampa"
                            checked={values.tiene_rampa}
                            onChange={handleChange}
                            className="w-5 h-5 text-primary rounded"
                        />
                        <span className="font-medium text-gray-700">Tiene rampas</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                            type="checkbox"
                            name="tiene_banio"
                            checked={values.tiene_banio}
                            onChange={handleChange}
                            className="w-5 h-5 text-primary rounded"
                        />
                        <span className="font-medium text-gray-700">Tiene baños accesibles</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                            type="checkbox"
                            name="es_plano"
                            checked={values.es_plano}
                            onChange={handleChange}
                            className="w-5 h-5 text-primary rounded"
                        />
                        <span className="font-medium text-gray-700">Es plano (sin escalones)</span>
                    </label>
                    <div>
                        <input
                            type="text"
                            name="distancia_aprox"
                            value={values.distancia_aprox}
                            onChange={handleChange}
                            placeholder="Distancia desde estacionamiento (ej: 50m)"
                            className="w-full border-gray-300 rounded-lg shadow-sm p-3 border"
                        />
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Movilidad Compatible</h3>
                <div className="flex flex-wrap gap-4">
                    {["Silla de ruedas", "Andador", "Bastón"].map((mov) => (
                        <label key={mov} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={(values.movilidad || []).includes(mov)}
                                onChange={() => handleArrayChange("movilidad", mov)}
                                className="w-4 h-4 text-primary rounded"
                            />
                            <span className="text-gray-700">{mov}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

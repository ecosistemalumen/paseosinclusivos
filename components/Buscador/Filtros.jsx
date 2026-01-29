export default function Filtros({ filtros, onChange }) {
    const handleChange = (key, value) => {
        onChange({ ...filtros, [key]: value });
    };

    const handleCheckboxChange = (key, value) => {
        const current = filtros[key] || [];
        const newValues = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        handleChange(key, newValues);
    };

    return (
        <aside className="bg-white p-6 rounded-lg shadow-sm w-full md:w-64 h-fit">
            <h2 className="text-xl font-bold mb-6">Filtrar por:</h2>

            <div className="mb-6">
                <h3 className="font-semibold mb-3">Costo</h3>
                <div className="space-y-2">
                    {["Gratis", "Gratis con CUD", "Pago"].map((opcion) => (
                        <label key={opcion} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="costo"
                                value={opcion}
                                checked={filtros.costo === opcion}
                                onChange={(e) => handleChange("costo", e.target.value)}
                                className="w-4 h-4 text-primary focus:ring-primary"
                            />
                            <span className="text-gray-700">{opcion}</span>
                        </label>
                    ))}
                    <button
                        onClick={() => handleChange("costo", "")}
                        className="text-sm text-gray-500 hover:text-primary mt-1"
                    >
                        Cualquier costo
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold mb-3">Nivel de esfuerzo</h3>
                <div className="space-y-2">
                    {["Bajo", "Medio", "Alto"].map((opcion) => (
                        <label key={opcion} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={(filtros.esfuerzo || []).includes(opcion)}
                                onChange={() => handleCheckboxChange("esfuerzo", opcion)}
                                className="w-4 h-4 rounded text-primary focus:ring-primary"
                            />
                            <span className="text-gray-700">{opcion}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold mb-3">Movilidad</h3>
                <div className="space-y-2">
                    {["Andador", "Bastón", "Silla"].map((opcion) => (
                        <label key={opcion} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={(filtros.movilidad || []).includes(opcion)}
                                onChange={() => handleCheckboxChange("movilidad", opcion)}
                                className="w-4 h-4 rounded text-primary focus:ring-primary"
                            />
                            <span className="text-gray-700">{opcion}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold mb-3">Ambiente</h3>
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                        type="checkbox"
                        checked={filtros.ruido === "Bajo"}
                        onChange={(e) => handleChange("ruido", e.target.checked ? "Bajo" : "")}
                        className="w-4 h-4 rounded text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700">Ruido bajo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={filtros.sombra === true}
                        onChange={(e) => handleChange("sombra", e.target.checked)}
                        className="w-4 h-4 rounded text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700">Tiene sombra</span>
                </label>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold mb-3">Estación</h3>
                <div className="space-y-2">
                    {["Verano", "Otoño", "Invierno", "Primavera"].map((opcion) => (
                        <label key={opcion} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={(filtros.estacion || []).includes(opcion)}
                                onChange={() => handleCheckboxChange("estacion", opcion)}
                                className="w-4 h-4 rounded text-primary focus:ring-primary"
                            />
                            <span className="text-gray-700">{opcion}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button
                onClick={() => onChange({})}
                className="w-full py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
                Limpiar filtros
            </button>
        </aside>
    );
}

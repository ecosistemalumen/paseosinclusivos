export default function Filtros({ filtros, setFiltros }) {

    const handleCheckbox = (category, value) => {
        setFiltros(prev => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter(item => item !== value)
                : [...prev[category], value]
        }));
    };

    const handleToggle = (category) => {
        setFiltros(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    return (
        <div className="space-y-8">

            {/* Costo */}
            <fieldset>
                <legend className="text-lg font-semibold text-gray-900 mb-3">
                    Costo
                </legend>
                <div className="space-y-2">
                    {['Gratis', 'Gratis con CUD', 'Pago'].map((opcion) => (
                        <label key={opcion} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filtros.costo.includes(opcion)}
                                onChange={() => handleCheckbox('costo', opcion)}
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-300"
                            />
                            <span className="text-base text-gray-700 group-hover:text-gray-900">
                                {opcion}
                            </span>
                        </label>
                    ))}
                </div>
            </fieldset>

            {/* Nivel de esfuerzo */}
            <fieldset>
                <legend className="text-lg font-semibold text-gray-900 mb-3">
                    Nivel de esfuerzo
                </legend>
                <div className="space-y-2">
                    {['Bajo', 'Medio', 'Alto'].map((nivel) => (
                        <label key={nivel} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filtros.esfuerzo.includes(nivel)}
                                onChange={() => handleCheckbox('esfuerzo', nivel)}
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-300"
                            />
                            <span className="text-base text-gray-700 group-hover:text-gray-900">
                                {nivel}
                            </span>
                        </label>
                    ))}
                </div>
            </fieldset>

            {/* Movilidad */}
            <fieldset>
                <legend className="text-lg font-semibold text-gray-900 mb-3">
                    Movilidad compatible
                </legend>
                <div className="space-y-2">
                    {['Silla de ruedas', 'Andador', 'Bastón'].map((tipo) => (
                        <label key={tipo} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filtros.movilidad.includes(tipo)}
                                onChange={() => handleCheckbox('movilidad', tipo)}
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-300"
                            />
                            <span className="text-base text-gray-700 group-hover:text-gray-900">
                                {tipo}
                            </span>
                        </label>
                    ))}
                </div>
            </fieldset>

            {/* Ambiente */}
            <fieldset>
                <legend className="text-lg font-semibold text-gray-900 mb-3">
                    Ambiente
                </legend>
                <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={filtros.sombra}
                            onChange={() => handleToggle('sombra')}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-300"
                        />
                        <span className="text-base text-gray-700 group-hover:text-gray-900">
                            Tiene sombra
                        </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={filtros.pet_friendly}
                            onChange={() => handleToggle('pet_friendly')}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-300"
                        />
                        <span className="text-base text-gray-700 group-hover:text-gray-900">
                            Pet Friendly 🐶
                        </span>
                    </label>
                </div>
            </fieldset>

            {/* Estación */}
            <fieldset>
                <legend className="text-lg font-semibold text-gray-900 mb-3">
                    Mejor época
                </legend>
                <div className="space-y-2">
                    {['Verano', 'Otoño', 'Invierno', 'Primavera'].map((estacion) => (
                        <label key={estacion} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filtros.estacion.includes(estacion)}
                                onChange={() => handleCheckbox('estacion', estacion)}
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-300"
                            />
                            <span className="text-base text-gray-700 group-hover:text-gray-900">
                                {estacion}
                            </span>
                        </label>
                    ))}
                </div>
            </fieldset>

        </div>
    );
}

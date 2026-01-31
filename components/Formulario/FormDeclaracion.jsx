'use client';

import { useState } from 'react';
import CamposAccesibilidad from './CamposAccesibilidad';
import ImageUploader from '../UI/ImageUploader';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const STEPS = [
    'Sobre el Espacio',
    'Acceso y Costos',
    'Detalles de Accesibilidad',
    'Ambiente',
    'Fotos del Espacio',
    'Notas finales'
];

export default function FormDeclaracion({ setEnviado }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        // Datos del lugar
        nombre_lugar: '',
        ubicacion: '',
        email_contacto: '',
        telefono: '',

        // Costo
        costo: 'Gratis',

        // Accesibilidad
        tiene_rampa: false,
        tiene_banio: false,
        es_plano: false,
        distancia_aprox: '',

        // Nivel de esfuerzo
        nivel_esfuerzo: 'Bajo',

        // Movilidad
        movilidad: [],

        // Ambiente
        ruido: 'Bajo',
        tiene_sombra: false,
        pet_friendly: false,

        // Estación
        mejor_estacion: [],

        // Imágenes
        imagenes: [],

        // Notas
        notas_adicionales: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            // Checkboxes de array
            if (name === 'movilidad' || name === 'mejor_estacion') {
                setFormData(prev => ({
                    ...prev,
                    [name]: checked
                        ? [...prev[name], value]
                        : prev[name].filter(item => item !== value)
                }));
            } else {
                // Checkboxes simples
                setFormData(prev => ({
                    ...prev,
                    [name]: checked
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const supabase = createClient();
            const imageUrls = [];

            // 1. Upload Images
            if (formData.imagenes.length > 0) {
                for (const file of formData.imagenes) {
                    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
                    const { data, error: uploadError } = await supabase.storage
                        .from('lugares')
                        .upload(fileName, file);

                    if (uploadError) throw uploadError;

                    // Get Public URL
                    const { data: { publicUrl } } = supabase.storage
                        .from('lugares')
                        .getPublicUrl(fileName);

                    imageUrls.push(publicUrl);
                }
            }

            // 2. Submit Data
            const payload = { ...formData, imagenes: imageUrls };

            const response = await fetch('/api/declaracion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el formulario');
            }

            setEnviado(true);
        } catch (err) {
            setError('Hubo un error al enviar el formulario. Intentá de nuevo.');
            console.error(err);
            setLoading(false);
        }
    };

    const nextStep = () => {
        // Validación básica paso 1
        if (currentStep === 0) {
            if (!formData.nombre_lugar || !formData.ubicacion || !formData.email_contacto) {
                setError('Por favor completá los campos del espacio.');
                return;
            }
        }
        setError(null);
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            handleSubmit();
        }
    };

    const prevStep = () => {
        setError(null);
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    // Renderizado de pasos
    const renderStepContent = () => {
        switch (currentStep) {
            case 0: // Datos del lugar
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Sobre el espacio
                        </h2>
                        {/* Nombre */}
                        <div>
                            <label htmlFor="nombre_lugar" className="block text-base font-semibold text-gray-900 mb-2">
                                Nombre del espacio <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="nombre_lugar"
                                name="nombre_lugar"
                                required
                                value={formData.nombre_lugar}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:ring-0 transition-colors"
                                placeholder="Ej: Parque Centenario"
                            />
                        </div>

                        {/* Ubicación */}
                        <div>
                            <label htmlFor="ubicacion" className="block text-base font-semibold text-gray-900 mb-2">
                                Ubicación completa <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="ubicacion"
                                name="ubicacion"
                                required
                                value={formData.ubicacion}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:ring-0 transition-colors"
                                placeholder="Ej: Av. Díaz Vélez y Av. Patricias Argentinas, CABA"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email_contacto" className="block text-base font-semibold text-gray-900 mb-2">
                                Email de contacto <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email_contacto"
                                name="email_contacto"
                                required
                                value={formData.email_contacto}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:ring-0 transition-colors"
                                placeholder="contacto@ejemplo.com"
                            />
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label htmlFor="telefono" className="block text-base font-semibold text-gray-900 mb-2">
                                Teléfono <span className="text-gray-400 font-normal">(opcional)</span>
                            </label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:ring-0 transition-colors"
                                placeholder=""
                            />
                        </div>
                    </div>
                );

            case 1: // Costo
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Costo de acceso
                            </h2>
                            <fieldset>
                                <legend className="text-lg font-medium text-gray-700 mb-4">¿Cómo funciona el acceso?</legend>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {['Gratis', 'Gratis con CUD', 'Pago'].map((opcion) => (
                                        <label key={opcion} className={`
                                            cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center gap-2
                                            ${formData.costo === opcion ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:border-indigo-200 text-gray-600'}
                                        `}>
                                            <input
                                                type="radio"
                                                name="costo"
                                                value={opcion}
                                                checked={formData.costo === opcion}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <span className="font-bold">{opcion}</span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                        </section>
                    </div>
                );

            case 2: // Accesibilidad y Terreno
                return (
                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                        {/* Accesibilidad Component */}
                        <CamposAccesibilidad formData={formData} handleChange={handleChange} />

                        {/* Recorrido Interno (Antes Nivel de Esfuerzo) */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Recorrido interno
                            </h2>
                            <p className="text-gray-600 mb-6">¿Cómo es moverse dentro del espacio?</p>

                            <fieldset>
                                <div className="space-y-4">
                                    {['Bajo (Plano)', 'Medio (Irregular)', 'Alto (Difícil)'].map((nivel, idx) => {
                                        const val = ['Bajo', 'Medio', 'Alto'][idx];
                                        return (
                                            <label key={val} className="flex p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                                <input
                                                    type="radio"
                                                    name="nivel_esfuerzo"
                                                    value={val}
                                                    checked={formData.nivel_esfuerzo === val}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 mt-0.5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                                />
                                                <div className="ml-3">
                                                    <span className="block text-lg font-medium text-gray-900">{nivel}</span>
                                                </div>
                                            </label>
                                        )
                                    })}
                                </div>
                            </fieldset>
                        </section>
                    </div>
                );

            case 3: // Ambiente y Movilidad
                return (
                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Ambiente
                            </h2>

                            {/* Ruido */}
                            <fieldset className="mb-8">
                                <legend className="text-lg font-semibold text-gray-900 mb-4">
                                    Nivel de ruido
                                </legend>
                                <div className="flex flex-wrap gap-4">
                                    {['Bajo', 'Medio', 'Alto'].map((nivel) => (
                                        <label key={nivel} className={`
                                            cursor-pointer px-6 py-3 rounded-full border transition-all text-sm font-bold uppercase tracking-wider
                                            ${formData.ruido === nivel ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-900'}
                                        `}>
                                            <input
                                                type="radio"
                                                name="ruido"
                                                value={nivel}
                                                checked={formData.ruido === nivel}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            {nivel}
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.tiene_sombra ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                                    <input
                                        type="checkbox"
                                        name="tiene_sombra"
                                        checked={formData.tiene_sombra}
                                        onChange={handleChange}
                                        className="w-6 h-6 text-green-600 rounded focus:ring-green-500"
                                    />
                                    <span className="font-bold text-gray-800">Tiene zonas de sombra</span>
                                </label>

                                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.pet_friendly ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}>
                                    <input
                                        type="checkbox"
                                        name="pet_friendly"
                                        checked={formData.pet_friendly}
                                        onChange={handleChange}
                                        className="w-6 h-6 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <span className="font-bold text-gray-800">Es Pet Friendly 🐶</span>
                                </label>
                            </div>
                        </section>

                        {/* MEJOR ESTACIÓN */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Mejor época
                            </h2>
                            <p className="text-gray-600 mb-4">¿En qué estaciones suele funcionar mejor?</p>
                            <div className="flex flex-wrap gap-3">
                                {['Verano', 'Otoño', 'Invierno', 'Primavera'].map((estacion) => (
                                    <label key={estacion} className={`
                                        cursor-pointer px-4 py-2 rounded-lg border border-gray-200 transition-all select-none
                                        ${formData.mejor_estacion.includes(estacion) ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}
                                    `}>
                                        <input
                                            type="checkbox"
                                            name="mejor_estacion"
                                            value={estacion}
                                            checked={formData.mejor_estacion.includes(estacion)}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        {estacion}
                                    </label>
                                ))}
                            </div>
                        </section>
                    </div>
                );

            case 4: // Fotos
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Fotos del Espacio
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Sumá hasta 3 fotos para que la comunidad sepa con qué se va a encontrar.
                            </p>

                            <ImageUploader
                                images={formData.imagenes}
                                onImagesChange={(newImages) => setFormData(prev => ({ ...prev, imagenes: newImages }))}
                            />
                        </section>
                    </div>
                );

            case 5: // Notas finales
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Notas finales
                            </h2>
                            <label htmlFor="notas_adicionales" className="block text-lg text-gray-700 mb-4">
                                ¿Querés sumar algo importante que no haya entrado antes?
                            </label>
                            <textarea
                                id="notas_adicionales"
                                name="notas_adicionales"
                                rows="8"
                                value={formData.notas_adicionales}
                                onChange={handleChange}
                                className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:ring-0 transition-colors resize-none leading-relaxed"
                                placeholder="Ej: Los fines de semana suele haber mucha gente. El baño accesible queda lejos de la entrada."
                            />
                        </section>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                    <span>Paso {currentStep + 1} de {STEPS.length}</span>
                    <span>{Math.round(((currentStep + 1) / STEPS.length) * 100)}% Completado</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                    />
                </div>
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {STEPS.map((step, idx) => (
                        <div
                            key={step}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${idx === currentStep ? 'bg-indigo-50 text-indigo-700 font-bold' :
                                idx < currentStep ? 'text-green-600 font-medium' : 'text-gray-400'
                                }`}
                        >
                            {idx < currentStep && <Check className="w-3 h-3" />}
                            {step}
                        </div>
                    ))}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 animate-in fade-in">
                    <div className="text-red-500 mt-0.5">⚠️</div>
                    <p>{error}</p>
                </div>
            )}

            {/* Step Content */}
            <div className="min-h-[400px]">
                {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                    {currentStep > 0 ? (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex items-center gap-2 px-6 py-3 text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" /> Anterior
                        </button>
                    ) : (
                        <div /> // Spacer
                    )}
                </div>

                <button
                    type="button"
                    onClick={nextStep}
                    disabled={loading}
                    className={`
                        flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 transition-all
                        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:translate-y-[-2px] hover:shadow-xl'}
                    `}
                >
                    {loading ? (
                        'Enviando...'
                    ) : currentStep === STEPS.length - 1 ? (
                        <>Sumar experiencia <Check className="w-5 h-5" /></>
                    ) : (
                        <>Siguiente <ArrowRight className="w-5 h-5" /></>
                    )}
                </button>
            </div>

            {currentStep === STEPS.length - 1 && (
                <p className="text-center text-gray-400 text-sm mt-6 max-w-md mx-auto">
                    Esta información se va a usar para ayudar a otras personas a decidir con menos incertidumbre.
                </p>
            )}
        </div>
    );
}

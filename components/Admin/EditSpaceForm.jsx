'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Save,
    ChevronLeft,
    Image as ImageIcon,
    X,
    Plus,
    Loader2,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function EditSpaceForm({ lugar }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        ...lugar,
        // Ensure arrays are arrays
        movilidad: lugar.movilidad || [],
        mejor_estacion: lugar.mejor_estacion || [],
        imagenes: lugar.imagenes || []
    });

    const [newImageUrl, setNewImageUrl] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayToggle = (field, value) => {
        setFormData(prev => {
            const current = prev[field] || [];
            if (current.includes(value)) {
                return { ...prev, [field]: current.filter(v => v !== value) };
            } else {
                return { ...prev, [field]: [...current, value] };
            }
        });
    };

    const addImage = () => {
        if (!newImageUrl) return;
        setFormData(prev => ({
            ...prev,
            imagenes: [...prev.imagenes, newImageUrl]
        }));
        setNewImageUrl('');
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            imagenes: prev.imagenes.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/admin/lugares/${lugar.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Error al guardar');

            toast.success('¡Espacio actualizado correctamente!');
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error('Error al guardar los cambios.');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm font-medium";
    const labelClasses = "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1";

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            {/* Header / Actions */}
            <div className="flex items-center justify-between sticky top-16 bg-gray-50/95 backdrop-blur-sm py-4 z-10 border-b border-gray-100 -mx-8 px-8 mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/espacios" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{lugar.nombre}</h1>
                        <p className="text-sm text-gray-500">Editando detalles del espacio</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Core Info */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Basic Section */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                            <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
                            Información General
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClasses}>Nombre del Espacio</label>
                                <input
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Categoría</label>
                                <select
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                    className={inputClasses}
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="Naturaleza">Naturaleza</option>
                                    <option value="Cultura">Cultura</option>
                                    <option value="Gastronomía">Gastronomía</option>
                                    <option value="Recreación">Recreación</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className={labelClasses}>Ubicación / Dirección</label>
                            <input
                                name="ubicacion"
                                value={formData.ubicacion}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className={labelClasses}>Costo</label>
                                <select name="costo" value={formData.costo} onChange={handleChange} className={inputClasses}>
                                    <option value="Gratis">Gratis</option>
                                    <option value="Bajo">Bajo</option>
                                    <option value="Medio">Medio</option>
                                    <option value="Alto">Alto</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Nivel de Esfuerzo</label>
                                <select name="nivel_esfuerzo" value={formData.nivel_esfuerzo} onChange={handleChange} className={inputClasses}>
                                    <option value="Bajo">Bajo</option>
                                    <option value="Moderado">Moderado</option>
                                    <option value="Alto">Alto</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Nivel de Ruido</label>
                                <select name="ruido" value={formData.ruido} onChange={handleChange} className={inputClasses}>
                                    <option value="Bajo">Bajo</option>
                                    <option value="Moderado">Moderado</option>
                                    <option value="Alto">Alto</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Honest Notes */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                            <span className="w-2 h-6 bg-teal-500 rounded-full"></span>
                            Notas Honestas (Textos)
                        </h2>
                        <p className="text-sm text-gray-500 italic mb-4">
                            Este es el campo más importante. Usá un lenguaje cálido y detallado.
                        </p>
                        <textarea
                            name="notas_honestas"
                            value={formData.notas_honestas || ''}
                            onChange={handleChange}
                            rows={8}
                            className={`${inputClasses} resize-none py-4 leading-relaxed`}
                            placeholder="Describí cómo es realmente la experiencia..."
                        />
                    </div>

                    {/* Toggles Group */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4 mb-6">Accesibilidad y Entorno</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            {[
                                { name: 'tiene_rampa', label: 'Rampas / Accesible' },
                                { name: 'tiene_banio', label: 'Baño Adaptado' },
                                { name: 'es_plano', label: 'Terreno Plano' },
                                { name: 'tiene_sombra', label: 'Mucha Sombra' },
                                { name: 'pet_friendly', label: 'Pet Friendly' },
                            ].map((toggle) => (
                                <label key={toggle.name} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name={toggle.name}
                                            checked={formData[toggle.name]}
                                            onChange={handleChange}
                                            className="sr-only p-4"
                                        />
                                        <div className={`w-12 h-6 rounded-full transition-colors ${formData[toggle.name] ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData[toggle.name] ? 'translate-x-6' : ''}`}></div>
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                                        {toggle.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column: Media & Advanced */}
                <div className="space-y-8">

                    {/* Media Management */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                            <ImageIcon className="w-5 h-5 text-indigo-500" />
                            Fotos y Media
                        </h2>

                        <div className="space-y-4">
                            {formData.imagenes.map((img, idx) => (
                                <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-100">
                                    <img src={img} alt="" className="w-full h-32 object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="URL de Unsplash/Imagen..."
                                    value={newImageUrl}
                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                    className={inputClasses}
                                />
                                <button
                                    type="button"
                                    onClick={addImage}
                                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-gray-600"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Geo Location */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4 mb-2">Geolocalización</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClasses}>Latitud</label>
                                <input name="lat" value={formData.lat || ''} onChange={handleChange} className={inputClasses} placeholder="-34.xxx" />
                            </div>
                            <div>
                                <label className={labelClasses}>Longitud</label>
                                <input name="lng" value={formData.lng || ''} onChange={handleChange} className={inputClasses} placeholder="-58.xxx" />
                            </div>
                        </div>
                    </div>

                    {/* Verification Card */}
                    <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                        <div className="flex gap-4 items-start">
                            <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0" />
                            <div>
                                <p className="font-bold text-indigo-900 mb-1 leading-tight">Estado de Verificación</p>
                                <p className="text-xs text-indigo-700/80 mb-4">Este lugar está cargado como: <strong>{formData.fuente}</strong></p>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, fuente: 'Ecosistema' }))}
                                    className="text-xs font-bold text-indigo-600 bg-white border border-indigo-200 px-4 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition-all w-full"
                                >
                                    Marcar como Verificado
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
}

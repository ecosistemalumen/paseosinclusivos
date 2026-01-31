
'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ReviewLugar() {
    const { id } = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState(null)

    // Helpers for array inputs
    const handleArrayChange = (field, valueString) => {
        setFormData(prev => ({ ...prev, [field]: valueString.split(',').map(s => s.trim()) }))
    }

    const getStringFromArray = (arr) => Array.isArray(arr) ? arr.join(', ') : ''

    useEffect(() => {
        if (id) {
            fetch(`/api/admin/declaraciones?id=${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) throw new Error(data.error)
                    setFormData(data)
                    setLoading(false)
                })
                .catch(err => {
                    console.error(err)
                    alert("Error cargando la declaración")
                    router.push('/admin/lugares')
                })
        }
    }, [id, router])

    const handleSave = async () => {
        try {
            const res = await fetch('/api/admin/declaraciones', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (res.ok) alert('Guardado correctamente')
            else alert('Error al guardar')
        } catch (e) {
            alert('Error de conexión')
        }
    }

    const handleApprove = async () => {
        if (!confirm('¿Confirmas que los datos son correctos y deseas PUBLICAR este lugar?')) return

        // Save first
        await fetch('/api/admin/declaraciones', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        // Approve
        try {
            const res = await fetch('/api/admin/declaraciones', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, action: 'approve' })
            })
            if (res.ok) {
                alert('¡Lugar publicado con éxito!')
                router.push('/admin/lugares')
            } else {
                alert('Error al aprobar')
            }
        } catch (e) { alert('Error de conexión') }
    }

    const handleReject = async () => {
        if (!confirm('¿Rechazar esta declaración?')) return
        try {
            const res = await fetch('/api/admin/declaraciones', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, action: 'reject' })
            })
            if (res.ok) {
                router.push('/admin/lugares')
            }
        } catch (e) { alert('Error de conexión') }
    }

    if (loading) return <div className="p-8">Cargando...</div>
    if (!formData) return <div className="p-8">No encontrado</div>

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Revisar y Editar Lugar</h1>
                <Link href="/admin/lugares" className="text-sm text-gray-500 hover:underline">Volver a la lista</Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">

                {/* Info General */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b dark:border-zinc-800">Información General</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Lugar</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                                value={formData.nombre_lugar}
                                onChange={e => setFormData({ ...formData, nombre_lugar: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ubicación</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                                value={formData.ubicacion}
                                onChange={e => setFormData({ ...formData, ubicacion: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Costo</label>
                            <select
                                className="w-full mt-1 p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                                value={formData.costo}
                                onChange={e => setFormData({ ...formData, costo: e.target.value })}
                            >
                                <option value="Gratis">Gratis</option>
                                <option value="Bajo">Bajo</option>
                                <option value="Medio">Medio</option>
                                <option value="Alto">Alto</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Distancia Aprox</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                                value={formData.distancia_aprox || ''}
                                onChange={e => setFormData({ ...formData, distancia_aprox: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Accesibilidad */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b dark:border-zinc-800">Accesibilidad Real</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nivel de Esfuerzo</label>
                            <select
                                className="w-full mt-1 p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                                value={formData.nivel_esfuerzo}
                                onChange={e => setFormData({ ...formData, nivel_esfuerzo: e.target.value })}
                            >
                                <option value="Bajo">Bajo</option>
                                <option value="Medio">Medio</option>
                                <option value="Alto">Alto</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Movilidad (separar por comas)</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                                defaultValue={getStringFromArray(formData.movilidad)}
                                onBlur={e => handleArrayChange('movilidad', e.target.value)}
                            />
                            <p className="text-xs text-gray-500">Ej: silla, baston, visual</p>
                        </div>
                        <div className="col-span-2 flex flex-wrap gap-6 mt-2">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={formData.tiene_rampa} onChange={e => setFormData({ ...formData, tiene_rampa: e.target.checked })} />
                                <span className="text-sm">Tiene Rampa</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={formData.tiene_banio} onChange={e => setFormData({ ...formData, tiene_banio: e.target.checked })} />
                                <span className="text-sm">Baño Adaptado</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={formData.es_plano} onChange={e => setFormData({ ...formData, es_plano: e.target.checked })} />
                                <span className="text-sm">Es Plano</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Ambiente y Notas */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b dark:border-zinc-800">Ambiente</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ruido</label>
                            <select
                                className="w-full mt-1 p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                                value={formData.ruido}
                                onChange={e => setFormData({ ...formData, ruido: e.target.value })}
                            >
                                <option value="Silencioso">Silencioso</option>
                                <option value="Moderado">Moderado</option>
                                <option value="Ruidoso">Ruidoso</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mejor Estación (comas)</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                                defaultValue={getStringFromArray(formData.mejor_estacion)}
                                onBlur={e => handleArrayChange('mejor_estacion', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex gap-6 mb-4">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={formData.tiene_sombra} onChange={e => setFormData({ ...formData, tiene_sombra: e.target.checked })} />
                            <span className="text-sm">Tiene Sombra</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={formData.pet_friendly} onChange={e => setFormData({ ...formData, pet_friendly: e.target.checked })} />
                            <span className="text-sm">Pet Friendly</span>
                        </label>
                    </div>
                </div>

                {/* Images */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b dark:border-zinc-800">Fotos del Espacio</h3>
                    {formData.imagenes && formData.imagenes.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {formData.imagenes.map((img, idx) => (
                                <div key={idx} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                    <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                                    <a href={img} target="_blank" rel="noopener noreferrer" className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-2 py-1 rounded hover:bg-black/70">
                                        Ver original
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No hay fotos adjuntas.</p>
                    )}
                </div>

                {/* Advertencias Críticas / Notas (Wireframe 2.3) */}
                <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900/30">
                    <h3 className="text-red-800 dark:text-red-400 font-semibold mb-2">Advertencias / Notas Honestas</h3>
                    <label className="block text-sm text-red-600 dark:text-red-400 mb-1">
                        Esta información será visible y destacada en la ficha. Se honesto.
                    </label>
                    <textarea
                        className="w-full p-3 border border-red-200 rounded dark:bg-zinc-800 dark:border-red-900 min-h-[100px]"
                        value={formData.notas_adicionales || ''}
                        onChange={e => setFormData({ ...formData, notas_adicionales: e.target.value })}
                    />
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t dark:border-zinc-800">
                    <button onClick={handleReject} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                        Rechazar
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Guardar Cambios
                    </button>
                    <button onClick={handleApprove} className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700">
                        Aprobar y Publicar
                    </button>
                </div>
            </div>
        </div>
    )
}

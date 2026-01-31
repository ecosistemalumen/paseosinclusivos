
'use client'
import { useEffect, useState } from 'react'

export default function AdminNotas() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchReviews = () => {
        setLoading(true)
        fetch('/api/admin/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data)
                setLoading(false)
            })
            .catch(err => setLoading(false))
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    const handleDelete = async (id) => {
        if (!confirm('¿Seguro que quieres eliminar esta nota? Esta acción no se puede deshacer.')) return

        try {
            const res = await fetch(`/api/admin/reviews?id=${id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                fetchReviews()
            } else {
                alert('Error eliminando la nota')
            }
        } catch (e) {
            alert('Error de conexión')
        }
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Moderación de Notas</h2>
            <p className="text-gray-500 mb-8">Administra los comentarios y reviews dejados por los usuarios.</p>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="overflow-x-auto bg-white dark:bg-zinc-900 rounded-xl shadow border border-gray-200 dark:border-zinc-800">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-zinc-800 text-gray-500 border-b border-gray-200 dark:border-zinc-700">
                            <tr>
                                <th className="px-6 py-4 font-medium">Usuario</th>
                                <th className="px-6 py-4 font-medium">Lugar</th>
                                <th className="px-6 py-4 font-medium">Nota / Contenido</th>
                                <th className="px-6 py-4 font-medium">Fecha</th>
                                <th className="px-6 py-4 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {reviews.map(review => (
                                <tr key={review.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900 dark:text-white">{review.user?.full_name || 'Desconocido'}</div>
                                        <div className="text-xs text-gray-500">{review.user?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate text-gray-700 dark:text-gray-300" title={review.lugar?.nombre}>
                                        {review.lugar?.nombre}
                                    </td>
                                    <td className="px-6 py-4 max-w-md">
                                        <p className="text-gray-800 dark:text-gray-200">{review.text}</p>
                                        {review.context && <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{review.context}</span>}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="text-red-600 hover:text-red-900 font-medium hover:underline"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {reviews.length === 0 && (
                        <div className="p-8 text-center text-gray-500">No hay notas recientes.</div>
                    )}
                </div>
            )}
        </div>
    )
}

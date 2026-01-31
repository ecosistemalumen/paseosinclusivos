
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminLugares() {
    const [declaraciones, setDeclaraciones] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchDeclaraciones = () => {
        setLoading(true)
        fetch('/api/admin/declaraciones?status=pendiente')
            .then(res => res.json())
            .then(data => {
                setDeclaraciones(data)
                setLoading(false)
            })
            .catch(err => setLoading(false))
    }

    useEffect(() => {
        fetchDeclaraciones()
    }, [])

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Gestión de Lugares</h2>
            <p className="text-gray-500 mb-8">Revisa las solicitudes pendientes de la comunidad.</p>

            {loading ? (
                <p>Cargando...</p>
            ) : declaraciones.length === 0 ? (
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl text-center border border-gray-200 dark:border-zinc-800">
                    <p className="text-gray-500">No hay declaraciones pendientes.</p>
                </div>
            ) : (
                <div className="overflow-hidden bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
                        <thead className="bg-gray-50 dark:bg-zinc-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lugar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Origen</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
                            {declaraciones.map((decl) => (
                                <tr key={decl.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{decl.nombre_lugar}</div>
                                        <div className="text-xs text-gray-500">{decl.ubicacion}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            Comunidad
                                        </span>
                                        <div className="text-xs text-gray-500 mt-1">{decl.user?.email || 'Anónimo'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800 capitalize">
                                            {decl.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            href={`/admin/lugares/${decl.id}`}
                                            className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 font-bold"
                                        >
                                            Revisar / Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

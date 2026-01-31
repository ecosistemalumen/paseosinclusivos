
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HistoryPage() {
    // We can reuse user dashboard api or create a dedicated one. 
    // For simplicity and considering time, I'll fetch recent activity from dashboard API 
    // but ideally this should be paginated if the list is long.
    // I will create a simple client-side fetcher that reuses dashboard endpoint recentActivity logic 
    // but since dashboard limits to 3, I might need a new endpoint or query param.
    // I'll assume for now I should use a dedicated endpoint or modify existing to support 'all'.
    // I'll create a quick dedicated inline API call via server helper? No, client side.
    // I'll create a new API route /api/user/history quickly.

    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // I'll just use a direct Prisma call in a server action or separate route?
        // I haven't created /api/user/history yet. 
        // I'll assume it exists or I'll handle it. 
        // Actually, I should create it.
        // I'll fetch to a new endpoint I'll write in next step.
        fetch('/api/user/history')
            .then(res => res.json())
            .then(data => {
                setHistory(data)
                setLoading(false)
            })
            .catch(err => setLoading(false))
    }, [])

    if (loading) return <div className="p-8 text-center text-gray-500">Cargando historial...</div>

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Historial de Visitas</h1>
                <Link href="/perfil" className="text-sm text-gray-500 hover:underline">&larr; Volver al Panel</Link>
            </div>

            {history.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">Tu historial está vacío.</p>
                </div>
            ) : (
                <div className="border-l-2 border-gray-100 dark:border-zinc-800 ml-4 space-y-8">
                    {history.map((item, index) => (
                        <div key={item.id} className="relative pl-8">
                            {/* Dot */}
                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-white dark:border-zinc-950"></div>

                            <div className="group">
                                <span className="text-xs font-mono text-gray-400 mb-1 block">
                                    {new Date(item.timestamp).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                                <Link href={`/lugar/${item.lugar.slug}`} className="block bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg group-hover:text-blue-600 transition-colors">
                                        {item.lugar.nombre}
                                    </h3>
                                    <p className="text-sm text-gray-500">{item.lugar.ubicacion}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}


'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/user/favorites')
            .then(res => res.json())
            .then(data => {
                setFavorites(data)
                setLoading(false)
            })
            .catch(err => setLoading(false))
    }, [])

    if (loading) return <div className="p-8 text-center text-gray-500">Cargando favoritos...</div>

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tus Favoritos</h1>
                <Link href="/perfil" className="text-sm text-gray-500 hover:underline">&larr; Volver al Panel</Link>
            </div>

            {favorites.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-dashed border-gray-300 dark:border-zinc-800">
                    <p className="text-gray-500 text-lg mb-2">Todavía no marcaste espacios como favoritos.</p>
                    <p className="text-sm text-gray-400 mb-6">Guarda lo que te inspira confianza.</p>
                    <Link href="/buscar" className="px-5 py-2 bg-pink-100 text-pink-700 font-medium rounded-full hover:bg-pink-200 transaction-colors">
                        Explorar experiencias
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map(item => (
                        <Link key={item.id} href={`/lugar/${item.lugar.slug}`} className="group block">
                            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                <div className="h-32 bg-gray-200 dark:bg-zinc-800 relative">
                                    {/* Placeholder for image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-pink-600 transition-colors">{item.lugar.nombre}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{item.lugar.ubicacion}</p>
                                    <div className="mt-3 flex gap-2">
                                        <span className="bg-gray-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded-md text-gray-600 dark:text-gray-300">{item.lugar.costo}</span>
                                        <span className="bg-gray-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded-md text-gray-600 dark:text-gray-300">{item.lugar.nivel_esfuerzo}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}


'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/user/wishlist')
            .then(res => res.json())
            .then(data => {
                setWishlist(data)
                setLoading(false)
            })
            .catch(err => setLoading(false))
    }, [])

    if (loading) return <div className="p-8 text-center text-gray-500">Cargando wishlist...</div>

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tu Wishlist (Quiero ir)</h1>
                <Link href="/perfil" className="text-sm text-gray-500 hover:underline">&larr; Volver al Panel</Link>
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-20 bg-purple-50/50 dark:bg-zinc-900 rounded-2xl border border-dashed border-purple-200 dark:border-zinc-800">
                    <svg className="w-12 h-12 text-purple-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                    <p className="text-gray-500 text-lg mb-2">Guarda espacios para cuando tengas ganas o energía.</p>
                    <Link href="/buscar" className="inline-block mt-4 px-5 py-2 bg-purple-600 text-white font-medium rounded-full hover:bg-purple-700 transaction-colors shadow-lg shadow-purple-200 dark:shadow-none">
                        Agregar destinos
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map(item => (
                        <Link key={item.id} href={`/lugar/${item.lugar.slug}`} className="group block">
                            <div className="bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-700/50 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-100 dark:hover:shadow-none transition-all hover:-translate-y-1">
                                <div className="p-5">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors text-lg">{item.lugar.nombre}</h3>
                                        <span className="text-xs font-mono text-purple-500 bg-purple-50 dark:bg-zinc-800 px-2 py-1 rounded">PLAN</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">{item.lugar.ubicacion}</p>
                                    <div className="mt-4 pt-4 border-t border-dashed border-gray-100 dark:border-zinc-800 text-right">
                                        <span className="text-xs text-gray-400">Ver ficha &rarr;</span>
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

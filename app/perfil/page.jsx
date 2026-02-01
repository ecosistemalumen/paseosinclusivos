
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSupabaseClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function UserDashboard() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const supabase = getSupabaseClient()
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (!user) router.push('/login')
            setUser(user)
        })

        fetch('/api/user/dashboard')
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error(data.error)
                setData(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [router, supabase])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    )

    if (!data) return <div className="p-8 text-center">Error al cargar datos</div>

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* 1. Encabezado suave */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Hola, {data.user?.full_name?.split(' ')[0] || 'Viajero'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Información pensada para salir tranquilo.
                    </p>
                </div>
                <button
                    onClick={handleSignOut}
                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                >
                    Cerrar Sesión
                </button>
            </div>

            {/* 2. Resumen rápido */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Card: Historial */}
                <Link href="/perfil/historial" className="group">
                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Espacios Visitados</p>
                        <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{data.stats.visited}</p>
                        <span className="text-xs text-gray-400 mt-2 block group-hover:text-blue-500 transition-colors">Ver historial &rarr;</span>
                    </div>
                </Link>

                {/* Card: Favoritos */}
                <Link href="/perfil/favoritos" className="group">
                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg className="w-16 h-16 text-pink-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Favoritos</p>
                        <p className="text-4xl font-extrabold text-pink-500">{data.stats.favorites}</p>
                        <span className="text-xs text-gray-400 mt-2 block group-hover:text-pink-500 transition-colors">Ver guardados &rarr;</span>
                    </div>
                </Link>

                {/* Card: Wishlist */}
                <Link href="/perfil/wishlist" className="group">
                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg className="w-16 h-16 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Quiero ir (Wishlist)</p>
                        <p className="text-4xl font-extrabold text-purple-600 dark:text-purple-400">{data.stats.wishlist}</p>
                        <span className="text-xs text-gray-400 mt-2 block group-hover:text-purple-500 transition-colors">Planear salidas &rarr;</span>
                    </div>
                </Link>
            </div>

            {/* 3. Última actividad (Visitados) */}
            <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-8">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tu última actividad</h2>
                        <p className="text-sm text-gray-500 mt-1">Espacios que visitaste recientemente.</p>
                    </div>
                    {data.recentActivity.length > 0 && (
                        <Link href="/perfil/historial" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            Ver todo
                        </Link>
                    )}
                </div>

                {data.recentActivity.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-400 text-sm mb-4">Todavía no registraste visitas.</p>
                        <Link href="/buscar" className="inline-block bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
                            Explorar experiencias
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {data.recentActivity.map((activity) => (
                            <Link key={activity.id} href={`/lugar/${activity.lugar.slug}`}>
                                <div className="flex items-center justify-between bg-white dark:bg-zinc-800 p-4 rounded-xl border border-gray-100 dark:border-zinc-700/50 hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors group">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 transition-colors">{activity.lugar.nombre}</h3>
                                        <p className="text-xs text-gray-500">{activity.lugar.ubicacion}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-gray-400">{new Date(activity.timestamp).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

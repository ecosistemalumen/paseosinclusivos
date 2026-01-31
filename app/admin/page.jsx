import prisma from '@/lib/db';
import {
    MapPin,
    Inbox,
    Users,
    AlertCircle,
    TrendingUp,
    CheckCircle2,
    ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

async function getStats() {
    const totalLugares = await prisma.lugar.count();
    const totalDeclaraciones = await prisma.declaracion.count();
    const verifiedLugares = await prisma.lugar.count({
        where: { fuente: 'Comunidad' }
    });

    return { totalLugares, totalDeclaraciones, verifiedLugares };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    const statCards = [
        { label: 'Espacios Totales', value: stats.totalLugares, icon: MapPin, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Pendientes Revisión', value: stats.totalDeclaraciones, icon: Inbox, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Aportes Comunidad', value: stats.verifiedLugares, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Usuarios Activos', value: '10+', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Hola, Administradora</h1>
                <p className="text-gray-500">Este es el estado actual de Paseos Inclusivos.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Bandeja de Entrada Rápida */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-indigo-500" />
                            Actividad Reciente
                        </h3>
                        <Link href="/admin/declaraciones" className="text-sm font-bold text-indigo-600 hover:underline">
                            Ver todo
                        </Link>
                    </div>
                    <div className="p-0">
                        {stats.totalDeclaraciones === 0 ? (
                            <div className="py-20 text-center">
                                <AlertCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                <p className="text-gray-400">No hay nuevas declaraciones para revisar.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {/* Sample list item */}
                                <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Nueva Experiencia Cargada</p>
                                            <p className="text-sm text-gray-500">Un usuario añadió un Museo en CABA.</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400">Hace 2 horas</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Acciones Rápidas */}
                <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <ShieldCheck className="w-24 h-24" />
                    </div>
                    <h3 className="text-xl font-bold mb-6">Acciones Rápidas</h3>
                    <div className="space-y-4">
                        <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center gap-3 px-6 transition-all font-bold border border-white/10">
                            <MapPin className="w-5 h-5" />
                            Añadir Nuevo Lugar
                        </button>
                        <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl flex items-center gap-3 px-6 transition-all font-bold shadow-lg">
                            <Inbox className="w-5 h-5" />
                            Revisar Pendientes
                        </button>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <p className="text-indigo-200 text-sm italic">
                            "Recordá que tu curaduría es lo que da confianza a la comunidad."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

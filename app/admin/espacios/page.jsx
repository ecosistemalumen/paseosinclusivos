import prisma from '@/lib/db';
import {
    Edit,
    Trash2,
    Plus,
    ExternalLink,
    MapPin,
    Search
} from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

async function getLugares() {
    return await prisma.lugar.findMany({
        orderBy: { nombre: 'asc' }
    });
}

export default async function AdminEspacios() {
    const lugares = await getLugares();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestionar Espacios</h1>
                    <p className="text-gray-500">Editá, eliminá o añadí nuevos lugares a la plataforma.</p>
                </div>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                    <Plus className="w-5 h-5" />
                    Nuevo Lugar
                </button>
            </div>

            {/* Listado en tabla */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o ubicación..."
                            className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest font-bold">
                                <th className="px-8 py-4">Lugar</th>
                                <th className="px-6 py-4">Categoría</th>
                                <th className="px-6 py-4">Ubicación</th>
                                <th className="px-6 py-4">Fuente</th>
                                <th className="px-8 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {lugares.map((lugar) => (
                                <tr key={lugar.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                                {lugar.imagenes && lugar.imagenes[0] ? (
                                                    <img src={lugar.imagenes[0]} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <MapPin className="w-5 h-5 text-gray-350" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{lugar.nombre}</p>
                                                <p className="text-xs text-gray-400 font-medium">ID: {lugar.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${lugar.categoria === 'Naturaleza' ? 'bg-emerald-50 text-emerald-700' :
                                                lugar.categoria === 'Cultura' ? 'bg-indigo-50 text-indigo-700' :
                                                    'bg-gray-100 text-gray-600'
                                            }`}>
                                            {lugar.categoria || 'Sin Categoría'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-sm text-gray-600 max-w-[200px] truncate">{lugar.ubicacion}</p>
                                    </td>
                                    <td className="px-6 py-6 font-medium text-sm text-gray-500">
                                        {lugar.fuente}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link
                                                href={`/lugar/${lugar.slug}`}
                                                target="_blank"
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                title="Ver en el sitio"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </Link>
                                            <Link
                                                href={`/admin/espacios/${lugar.id}`}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                title="Editar"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                            <button
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {lugares.length === 0 && (
                    <div className="p-20 text-center text-gray-400 bg-gray-50/20">
                        No hay lugares registrados aún.
                    </div>
                )}
            </div>
        </div>
    );
}

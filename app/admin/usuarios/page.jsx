import prisma from '@/lib/db';
import {
    Users,
    Shield,
    User,
    Mail,
    Filter,
    MoreHorizontal
} from 'lucide-react';

export const revalidate = 0;

async function getUsuarios() {
    return await prisma.profile.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20
    });
}

export default async function AdminUsuarios() {
    const usuarios = await getUsuarios();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Comunidad y Usuarios</h1>
                    <p className="text-gray-500">Gestioná los perfiles y roles de los miembros de Paseos Inclusivos.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50">
                        <Filter className="w-4 h-4" />
                        Filtrar
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest font-bold">
                            <th className="px-8 py-4">Usuario</th>
                            <th className="px-6 py-4">Rol</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Desde</th>
                            <th className="px-8 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {usuarios.map((u) => (
                            <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                            {u.avatar_url ? (
                                                <img src={u.avatar_url} className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                <User className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                        <span className="font-bold text-gray-900">{u.full_name || 'Sin nombre'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-6 font-medium">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-6 py-6 text-sm text-gray-500 flex items-center gap-2 mt-1">
                                    <Mail className="w-4 h-4 text-gray-300" />
                                    {u.email}
                                </td>
                                <td className="px-6 py-6 text-sm text-gray-400">
                                    {new Date(u.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

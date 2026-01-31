import prisma from '@/lib/db';
import {
    CheckCircle,
    XCircle,
    Eye,
    Inbox,
    User,
    Calendar,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const revalidate = 0;

async function getDeclaraciones() {
    return await prisma.declaracion.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            autor: {
                select: { full_name: true, email: true }
            }
        }
    });
}

export default async function AdminDeclaraciones() {
    const declaraciones = await getDeclaraciones();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Bandeja de Entrada</h1>
                <p className="text-gray-500">Revisá las experiencias cargadas por la comunidad antes de publicarlas.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {declaraciones.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-20 text-center">
                        <Inbox className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-400">No hay pendientes</h3>
                        <p className="text-gray-400">Todo está al día por aquí.</p>
                    </div>
                ) : (
                    declaraciones.map((dec) => (
                        <div key={dec.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col md:flex-row gap-8 hover:shadow-md transition-shadow">

                            {/* Content */}
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full">
                                        Pendiente de Revisión
                                    </span>
                                    <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {format(new Date(dec.createdAt), "d 'de' MMMM, HH:mm", { locale: es })}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{dec.nombre_lugar}</h2>
                                    <p className="text-gray-500 text-sm flex items-center gap-1">
                                        {dec.ubicacion}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-2xl italic text-gray-600 text-sm leading-relaxed border-l-4 border-indigo-400">
                                    "{dec.notas_adicionales?.substring(0, 150)}..."
                                </div>

                                <div className="flex items-center gap-4 pt-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                                            <User className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-900 leading-none">{dec.autor?.full_name || 'Usuario Anónimo'}</p>
                                            <p className="text-[10px] text-gray-400">{dec.autor?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions Area */}
                            <div className="md:w-64 border-l border-gray-50 md:pl-8 flex flex-col justify-center gap-3">
                                <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                                    <CheckCircle className="w-5 h-5" />
                                    Aprobar y Publicar
                                </button>
                                <button className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all">
                                    <Eye className="w-5 h-5" />
                                    Ver Detalle
                                </button>
                                <button className="w-full py-3 text-red-600 hover:bg-red-50 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                    <XCircle className="w-5 h-5" />
                                    Rechazar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

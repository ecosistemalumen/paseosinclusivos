import Link from 'next/link';
import {
    LayoutDashboard,
    MapPin,
    Inbox,
    Users,
    ExternalLink,
    ShieldCheck,
    LogOut
} from 'lucide-react';

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full z-20 shadow-xl">
                <div className="p-8">
                    <div className="flex items-center gap-3 text-white mb-2">
                        <ShieldCheck className="w-6 h-6 text-indigo-400" />
                        <span className="font-extrabold text-lg tracking-tight">Admin PI</span>
                    </div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                        Centro de Control
                    </p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all font-medium group"
                    >
                        <LayoutDashboard className="w-5 h-5 group-hover:text-indigo-400" />
                        Resumen
                    </Link>
                    <Link
                        href="/admin/espacios"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all font-medium group"
                    >
                        <MapPin className="w-5 h-5 group-hover:text-indigo-400" />
                        Gestionar Espacios
                    </Link>
                    <Link
                        href="/admin/declaraciones"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all font-medium group"
                    >
                        <Inbox className="w-5 h-5 group-hover:text-indigo-400" />
                        Bandeja de Entrada
                    </Link>
                    <Link
                        href="/admin/usuarios"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all font-medium group"
                    >
                        <Users className="w-5 h-5 group-hover:text-indigo-400" />
                        Comunidad
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <Link
                        href="/inicio"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-all font-medium group bg-slate-800 text-white"
                    >
                        <ExternalLink className="w-5 h-5" />
                        Volver al Sitio
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 min-h-screen">
                <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="font-bold text-gray-800">Paseos Inclusivos / Admin</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full uppercase">
                            Admin Mode
                        </span>
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

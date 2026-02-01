'use client';

'use client';

import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { User, LogIn, Menu, X, ChevronDown, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [profileOpen, setProfileOpen] = useState(false);

    // Initialized inside effect/handler to avoid SSR issues
    const supabase = getSupabaseClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data: profile } = await supabase
                    .from('Profile')
                    .select('role')
                    .eq('email', user.email)
                    .single();
                setRole(profile?.role);
            }
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                supabase
                    .from('Profile')
                    .select('role')
                    .eq('email', session.user.email)
                    .single()
                    .then(({ data }) => setRole(data?.role));
            } else {
                setRole(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setProfileOpen(false);
        window.location.href = '/login'; // Force a full reload to clean all states
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl md:text-3xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                        Paseos Inclusivos
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/buscar" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                            Buscar
                        </Link>
                        <Link href="/declarar" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                            Sumar experiencia
                        </Link>
                        <Link href="/transparencia" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                            Qué es esto
                        </Link>

                        <div className="h-6 w-px bg-gray-200 mx-2"></div>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-full border border-gray-200 hover:border-indigo-200 transition-all"
                                >
                                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700">
                                        <User className="w-3.5 h-3.5" />
                                    </div>
                                    <span>Mi Cuenta</span>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </button>

                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                            <p className="text-xs text-gray-500 font-medium truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                        <Link
                                            href="/perfil"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                            onClick={() => setProfileOpen(false)}
                                        >
                                            Mi Dashboard
                                        </Link>
                                        {role === 'admin' && (
                                            <Link
                                                href="/admin"
                                                className="block px-4 py-2 text-sm text-indigo-600 font-bold hover:bg-indigo-50"
                                                onClick={() => setProfileOpen(false)}
                                            >
                                                Panel Admin
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                                        >
                                            <LogOut className="w-3.5 h-3.5" /> Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
                            >
                                <LogIn className="w-4 h-4" /> Ingresar
                            </Link>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
                    >
                        {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
                    </button>

                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <nav className="md:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top-2">
                        <div className="flex flex-col gap-2 p-2">
                            {user ? (
                                <div className="bg-gray-50 rounded-xl p-4 mb-2">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-bold text-gray-900 truncate">Mi Cuenta</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link href="/perfil" className="block w-full text-center bg-white border border-gray-200 py-2 rounded-lg text-sm font-medium text-gray-700 mb-2">
                                        Ir a mi Dashboard
                                    </Link>
                                    {role === 'admin' && (
                                        <Link href="/admin" className="block w-full text-center bg-indigo-600 border border-indigo-700 py-2 rounded-lg text-sm font-bold text-white mb-2">
                                            Ir al Panel Admin
                                        </Link>
                                    )}
                                    <button onClick={handleLogout} className="block w-full text-center text-rose-600 text-sm font-medium">
                                        Cerrar Sesión
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl text-lg font-bold mb-4"
                                >
                                    <LogIn className="w-5 h-5" /> Ingresar
                                </Link>
                            )}

                            <Link href="/buscar" className="px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">Buscar</Link>
                            <Link href="/declarar" className="px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">Declarar</Link>
                            <Link href="/transparencia" className="px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">Qué es esto</Link>
                        </div>
                    </nav>
                )}

            </div>
        </header>
    );
}

'use client';

import { useState } from 'react';
import { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Mail, Lock, ArrowRight, Loader2, KeyRound, UserPlus, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const supabase = getSupabaseClient();

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast.success('¡Bienvenido de nuevo!');
            router.push('/inicio');
            router.refresh();
        } catch (error) {
            console.error(error);
            const message = error.message === 'Invalid login credentials'
                ? 'Correo o contraseña incorrectos. Por favor, revisá tus datos.'
                : 'Hubo un problema al ingresar. Intentá de nuevo.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl max-w-md w-full border border-gray-100 relative overflow-hidden">

                {/* Decoración */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Ingresar</h1>
                    <p className="text-gray-500">
                        Iniciá sesión para continuar en la comunidad.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                            Correo Electrónico
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:ring-0 outline-none transition-all font-medium text-gray-900"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2 ml-1">
                            <label htmlFor="password" class="block text-sm font-bold text-gray-700">
                                Contraseña
                            </label>
                            <Link href="/recuperar" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
                                ¿La olvidaste?
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:ring-0 outline-none transition-all font-medium text-gray-900"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3.5 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Ingresar ahora <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500 mb-4">¿No tenés cuenta todavía?</p>
                    <Link
                        href="/registro"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
                    >
                        <UserPlus className="w-4 h-4" /> Crear mi cuenta
                    </Link>
                </div>

                <p className="mt-8 text-center text-[10px] text-gray-300 uppercase tracking-widest font-bold">
                    © 2026 — Paseos Inclusivos
                </p>
            </div>
        </div>
    );
}

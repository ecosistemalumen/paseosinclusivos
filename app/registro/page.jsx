'use client';

import { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Mail, Lock, User, ArrowRight, Loader2, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function RegisterPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const supabase = getSupabaseClient();

        try {
            // 1. Sign up user in Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            });

            if (authError) throw authError;

            // Note: In a real production app, profile creation is better handled 
            // by a database trigger (SQL) to ensure atomicity. 
            // For now, we rely on the auth.getUser() hook or a manual sync if needed,
            // but we'll show the success message first.

            setSuccess(true);
            toast.success('¡Cuenta creada con éxito!');
        } catch (error) {
            console.error(error);
            let message = 'No pudimos crear tu cuenta. Por favor, intentá de nuevo.';
            if (error.message.includes('already registered')) {
                message = 'Este correo ya está registrado. Probá iniciando sesión.';
            } else if (error.message.includes('at least 6 characters')) {
                message = 'La contraseña es muy corta. Probá con una más larga.';
            }
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Casi listo!</h2>
                    <p className="text-gray-600 mb-8">
                        Te enviamos un correo de confirmación a <strong>{email}</strong>.
                        Por favor, verificá tu bandeja de entrada para activar tu cuenta.
                    </p>
                    <Link
                        href="/login"
                        className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl block hover:bg-indigo-700 transition-all"
                    >
                        Volver al Ingreso
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl max-w-md w-full border border-gray-100 relative overflow-hidden">

                {/* Decoración */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Crear Cuenta</h1>
                    <p className="text-gray-500">
                        Sumate a la comunidad de Paseos Inclusivos.
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                            Nombre Completo
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Tu nombre"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:ring-0 outline-none transition-all font-medium text-gray-900"
                            />
                        </div>
                    </div>

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
                        <label htmlFor="password" class="block text-sm font-bold text-gray-700 mb-2 ml-1">
                            Elegí una Contraseña
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mínimo 8 caracteres"
                                required
                                minLength={8}
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
                                Crear mi cuenta <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500 mb-4">¿Ya tenés cuenta?</p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
                    >
                        Iniciá sesión acá
                    </Link>
                </div>

                <p className="mt-8 text-center text-[10px] text-gray-300 uppercase tracking-widest font-bold">
                    © 2026 — Paseos Inclusivos
                </p>
            </div>
        </div>
    );
}

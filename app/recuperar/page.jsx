'use client';

import { useState } from 'react';
import { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function RecoverPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRecover = async (e) => {
        e.preventDefault();
        setLoading(true);

        const supabase = getSupabaseClient();

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${location.origin}/auth/callback?next=/actualizar-password`,
            });

            if (error) throw error;

            setSuccess(true);
            toast.success('¡Instrucciones enviadas!');
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Error al procesar la solicitud.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Email enviado!</h2>
                    <p className="text-gray-600 mb-8">
                        Si el correo <strong>{email}</strong> está registrado, te llegará un enlace para elegir una nueva contraseña en unos instantes.
                    </p>
                    <Link
                        href="/login"
                        className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl block hover:bg-indigo-700 transition-all font-bold"
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
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Recuperar Acceso</h1>
                    <p className="text-gray-500">
                        Te enviaremos los pasos para volver a entrar.
                    </p>
                </div>

                <form onSubmit={handleRecover} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                            Tu Correo Electrónico
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Enviar instrucciones <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                    <Link
                        href="/login"
                        className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
                    >
                        Me acordé la contraseña
                    </Link>
                </div>

                <p className="mt-8 text-center text-[10px] text-gray-300 uppercase tracking-widest font-bold">
                    © 2026 — Paseos Inclusivos
                </p>
            </div>
        </div>
    );
}

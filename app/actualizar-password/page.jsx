'use client';

import { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Lock, ArrowRight, Loader2, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleUpdate = async (e) => {
        e.preventDefault();

        const supabase = getSupabaseClient();

        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password,
            });

            if (error) throw error;

            setSuccess(true);
            toast.success('¡Contraseña actualizada!');

            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Error al actualizar la contraseña.');
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Todo listo!</h2>
                    <p className="text-gray-600 mb-8">
                        Tu contraseña se cambió con éxito. En unos segundos te redirigiremos al ingreso para que entres con tu nueva clave.
                    </p>
                    <div className="flex justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                    </div>
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
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Nueva Contraseña</h1>
                    <p className="text-gray-500">
                        Elegí una clave segura que puedas recordar.
                    </p>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label htmlFor="password" class="block text-sm font-bold text-gray-700 mb-2 ml-1">
                            Contraseña Nueva
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

                    <div>
                        <label htmlFor="confirmPassword" class="block text-sm font-bold text-gray-700 mb-2 ml-1">
                            Confirmar Contraseña
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                id="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Repetí tu nueva contraseña"
                                required
                                minLength={8}
                                className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:ring-0 outline-none transition-all font-medium text-gray-900"
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
                                Actualizar Contraseña <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-8 text-center text-[10px] text-gray-300 uppercase tracking-widest font-bold">
                    © 2026 — Paseos Inclusivos
                </p>
            </div>
        </div>
    );
}

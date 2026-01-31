import Link from 'next/link';
import { Accessibility, Users, Heart, ArrowRight } from 'lucide-react';

export default function ComingSoon() {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-teal-50 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 text-sm font-bold mb-8 animate-bounce">
                    <Accessibility className="w-4 h-4" />
                    Muy pronto: Paseos Inclusivos
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 text-balance">
                    La accesibilidad <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        no es una promesa.
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                    Estamos construyendo la mayor comunidad de turismo accesible de Argentina, basada en experiencias reales y datos honestos.
                </p>

                {/* Group Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 text-left max-w-2xl mx-auto">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center shrink-0 border border-gray-100">
                            <Users className="w-6 h-6 text-indigo-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1">Comunidad Activa</h3>
                            <p className="text-gray-500 text-sm">Validando información directamente con grupos de evaluadores expertos.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center shrink-0 border border-gray-100">
                            <Heart className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1">Sin Intermediarios</h3>
                            <p className="text-gray-500 text-sm">Del usuario para el usuario. Sin marketing, solo transparencia total.</p>
                        </div>
                    </div>
                </div>

                {/* Footer of the page */}
                <div className="pt-12 border-t border-gray-100 flex flex-col items-center">
                    <p className="text-gray-400 font-medium mb-6">
                        ¿Sos parte del grupo de evaluadores invitados?
                    </p>
                    <Link
                        href="/login"
                        className="group flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl hover:bg-black transition-all active:scale-95"
                    >
                        Acceso para evaluadores <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Discrete credits */}
            <div className="absolute bottom-8 left-0 w-full text-center">
                <p className="text-xs text-gray-300 uppercase tracking-[0.2em] font-bold">
                    © 2026 — Paseos Inclusivos
                </p>
            </div>
        </main>
    );
}

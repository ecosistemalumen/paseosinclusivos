import { ShieldCheck, EyeOff, Lock, Database } from 'lucide-react';

export default function PrivacidadPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-slate-50 py-20 border-b border-slate-100 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-serif tracking-tight">
                        Privacidad y Cuidado
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed font-light">
                        En Paseos Inclusivos, tus datos no son una mercancía. Son la base de una relación de confianza comunitaria.
                    </p>
                </div>
            </section>

            {/* Principios */}
            <section className="py-20">
                <div className="max-w-3xl mx-auto px-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
                            <EyeOff className="w-8 h-8 text-slate-400 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2">Sin Perfilamiento</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                No creamos perfiles comerciales tuyos ni rastreamos tu comportamiento para venderte nada.
                            </p>
                        </div>
                        <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
                            <Lock className="w-8 h-8 text-slate-400 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2">Cero IA Decisoria</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                No usamos algoritmos de IA para decidir qué información mostrate o qué es "mejor" para vos.
                            </p>
                        </div>
                    </div>

                    <div className="prose prose-slate prose-lg max-w-none text-slate-700">
                        <h2 className="text-slate-900">¿Qué datos guardamos?</h2>
                        <ul className="space-y-4 marker:text-slate-300">
                            <li>
                                <strong>Experiencias compartidas:</strong> La información sobre accesibilidad que cargás voluntariamente para ayudar a otros.
                            </li>
                            <li>
                                <strong>Datos mínimos de contacto:</strong> Tu email cuando iniciás sesión, solo para gestionar tu cuenta o avisarte cambios importantes.
                            </li>
                            <li>
                                <strong>Fotos voluntarias:</strong> Si decidís subir una foto de un lugar, se guarda en nuestros servidores seguros solo para ese fin.
                            </li>
                        </ul>

                        <h2 className="text-slate-900 mt-12 text-2xl font-bold">Lo que NUNCA hacemos</h2>
                        <div className="bg-red-50 p-6 rounded-xl border border-red-100 mt-6">
                            <ul className="list-none p-0 m-0 space-y-3">
                                <li className="flex items-center gap-3 text-red-900 font-medium">
                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                    No vendemos tu base de datos a terceros.
                                </li>
                                <li className="flex items-center gap-3 text-red-900 font-medium">
                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                    No hacemos publicidad personalizada.
                                </li>
                                <li className="flex items-center gap-3 text-red-900 font-medium">
                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                    No usamos tracking invasivo.
                                </li>
                            </ul>
                        </div>

                        <div className="mt-20 pt-12 border-t border-slate-100 text-center">
                            <ShieldCheck className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <p className="text-slate-500 text-sm">
                                Nuestra política es simple: el dueño de la información sos vos.<br />
                                <strong>Última actualización:</strong> Enero 2026
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

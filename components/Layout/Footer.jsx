import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-20 text-sm">

                    {/* Columna 1 — Explorar */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Explorar</h3>
                        <ul className="space-y-4">
                            <li><Link href="/buscar" className="text-gray-500 hover:text-indigo-600 transition-colors">Buscar experiencias</Link></li>
                            <li><Link href="/buscar?categoria=Cultura" className="text-gray-500 hover:text-indigo-600 transition-colors">Espacios culturales</Link></li>
                            <li><Link href="/buscar?categoria=Naturaleza" className="text-gray-500 hover:text-indigo-600 transition-colors">Naturaleza y aire libre</Link></li>
                            <li><Link href="/buscar?categoria=Gastronomía" className="text-gray-500 hover:text-indigo-600 transition-colors">Gastronomía accesible</Link></li>
                            <li><Link href="/buscar?costo=Gratis" className="text-gray-500 hover:text-indigo-600 transition-colors">Gratis / bajo costo</Link></li>
                            <li><Link href="/buscar?pet_friendly=true" className="text-gray-500 hover:text-indigo-600 transition-colors">Pet friendly</Link></li>
                        </ul>
                    </div>

                    {/* Columna 2 — Comunidad */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Comunidad</h3>
                        <ul className="space-y-4">
                            <li><Link href="/noticias" className="text-gray-500 hover:text-indigo-600 transition-colors">Qué dicen personas como vos</Link></li>
                            <li><Link href="/declarar" className="text-gray-500 hover:text-indigo-600 transition-colors">Sumar experiencia</Link></li>
                            <li><Link href="/transparencia#como-funciona" className="text-gray-500 hover:text-indigo-600 transition-colors">Cómo funciona la comunidad</Link></li>
                            <li><Link href="/actualizaciones" className="text-gray-500 hover:text-indigo-600 transition-colors">Actualizaciones estacionales</Link></li>
                            <li><Link href="/transparencia#confianza" className="text-gray-500 hover:text-indigo-600 transition-colors">Criterios de confianza</Link></li>
                        </ul>
                    </div>

                    {/* Columna 3 — Proyecto */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Proyecto</h3>
                        <ul className="space-y-4">
                            <li><Link href="/transparencia" className="text-gray-500 hover:text-indigo-600 transition-colors">Qué es Paseos Inclusivos</Link></li>
                            <li><Link href="/transparencia#mision" className="text-gray-500 hover:text-indigo-600 transition-colors">Por qué existe</Link></li>
                            <li><Link href="/equipo" className="text-gray-500 hover:text-indigo-600 transition-colors">Equipo y colaboradores</Link></li>
                            <li><Link href="/prensa" className="text-gray-500 hover:text-indigo-600 transition-colors">Prensa</Link></li>
                            <li><Link href="mailto:contacto@paseosinclusivos.org" className="text-gray-500 hover:text-indigo-600 transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Columna 4 — Legal y cuidado */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Legal y cuidado</h3>
                        <ul className="space-y-4">
                            <li><Link href="/accesibilidad" className="text-gray-500 hover:text-indigo-600 transition-colors">Accesibilidad (declaración propia)</Link></li>
                            <li><Link href="/privacidad" className="text-gray-500 hover:text-indigo-600 transition-colors">Políticas de privacidad</Link></li>
                            <li><Link href="/terminos" className="text-gray-500 hover:text-indigo-600 transition-colors">Términos claros</Link></li>
                        </ul>
                    </div>

                    {/* Columna 5 — Seguinos */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Seguinos</h3>
                        <ul className="space-y-4">
                            <li><a href="https://instagram.com/paseosinclusivos" target="_blank" className="text-gray-500 hover:text-indigo-600 transition-colors">Instagram</a></li>
                            <li><a href="https://x.com/paseosinclusivos" target="_blank" className="text-gray-500 hover:text-indigo-600 transition-colors">X</a></li>
                            <li><a href="https://facebook.com/paseosinclusivos" target="_blank" className="text-gray-500 hover:text-indigo-600 transition-colors">Facebook</a></li>
                            <li><a href="https://tiktok.com/@paseosinclusivos" target="_blank" className="text-gray-500 hover:text-indigo-600 transition-colors">TikTok</a></li>
                        </ul>
                    </div>
                </div>

                {/* Cierre emocional */}
                <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="max-w-xs">
                        <p className="font-bold text-gray-900 text-lg mb-1">Paseos Inclusivos</p>
                        <p className="text-gray-500">Proyecto comunitario, sin fines de lucro.</p>
                    </div>

                    <div className="flex-1 px-4">
                        <p className="text-gray-400 italic font-medium text-lg leading-relaxed">
                            "La accesibilidad no es una promesa. Es un proceso compartido."
                        </p>
                    </div>

                    <div className="md:text-right">
                        <p className="text-sm text-gray-400">
                            © {currentYear} — Paseos Inclusivos
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

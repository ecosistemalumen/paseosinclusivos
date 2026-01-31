import Link from 'next/link';
import Badge from '@/components/Ficha/Badge';
import prisma from '@/lib/db';
import {
    Search,
    MapPin,
    Accessibility,
    Ear,
    Trees,
    Landmark,
    Info,
    Share2,
    ChevronRight,
    ArrowRight,
    Bath,
    Dog,
    Ticket
} from 'lucide-react';

export const revalidate = 0; // Ensure fresh data on every request

async function getFeaturedPlaces() {
    try {
        const places = await prisma.lugar.findMany({
            take: 6,
            orderBy: { nombre: 'asc' },
        });
        return places;
    } catch (error) {
        console.error("Error fetching featured places:", error);
        return [];
    }
}

export default async function InicioPage() {
    const featuredPlaces = await getFeaturedPlaces();

    return (
        <main className="min-h-screen bg-gray-50/50">
            {/* HER0 SECTION */}
            <section className="relative px-4 pt-16 pb-24 md:pt-24 md:pb-32 bg-white border-b border-gray-100 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl mix-blend-multiply filter"></div>
                    <div className="absolute top-40 -left-20 w-72 h-72 bg-teal-100 rounded-full blur-3xl mix-blend-multiply filter"></div>
                </div>

                <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 text-balance">
                        Qué dicen <br />
                        <span className="text-indigo-600">personas como vos</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mb-12 text-balance font-medium">
                        Experiencias reales para decidir sin incertidumbre.
                    </p>

                    <div className="w-full max-w-3xl bg-white p-2 md:p-3 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 mb-10 transform transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] ring-1 ring-gray-100">
                        <form action="/buscar" className="flex flex-col gap-2">
                            <div className="relative flex items-center">
                                <Search className="absolute left-6 text-indigo-500 w-6 h-6" strokeWidth={2.5} />
                                <input
                                    type="text"
                                    name="q"
                                    placeholder="¿A dónde querés ir? (Museo, Parque...)"
                                    className="w-full pl-16 pr-32 py-4 md:py-5 text-lg bg-transparent border-none focus:ring-0 active:bg-transparent outline-none text-gray-900 font-medium placeholder-gray-400 rounded-2xl"
                                />
                                <button
                                    type="submit"
                                    className="hidden md:flex absolute right-2 top-2 bottom-2 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all items-center gap-2 shadow-md hover:shadow-lg active:scale-95"
                                >
                                    Buscar experiencias
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="md:hidden w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                            >
                                <Search className="w-5 h-5" /> Buscar experiencias
                            </button>
                        </form>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl">
                        {[
                            { label: 'Gratis', query: 'costo=Gratis', icon: Ticket },
                            { label: 'Silla de ruedas', query: 'movilidad=Silla de ruedas', icon: Accessibility },
                            { label: 'Ruido bajo', query: 'ruido=Bajo', icon: Ear },
                            { label: 'Tiene sombra', query: 'sombra=true', icon: Trees },
                            { label: 'Pet Friendly', query: 'pet_friendly=true', icon: Dog },
                        ].map((chip, idx) => (
                            <Link
                                key={idx}
                                href={`/buscar?${chip.query}`}
                                className="group flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-indigo-50 hover:border-indigo-200 border border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:text-indigo-700 transition-all shadow-sm hover:shadow-md"
                            >
                                <chip.icon className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                                {chip.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* EXPLORE BY NEED */}
            <section className="py-20 md:py-24 px-4 max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Explorar por necesidad</h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: Accessibility, label: 'Movilidad reducida', href: '/buscar?movilidad=Silla de ruedas,Andador,Bastón', color: 'text-blue-600', bg: 'bg-blue-50', hover: 'group-hover:bg-blue-600 group-hover:text-white' },
                        { icon: Ear, label: 'Bajo estímulo sonoro', href: '/buscar?ruido=Bajo', color: 'text-purple-600', bg: 'bg-purple-50', hover: 'group-hover:bg-purple-600 group-hover:text-white' },
                        { icon: Trees, label: 'Espacios con sombra', href: '/buscar?sombra=true', color: 'text-green-600', bg: 'bg-green-50', hover: 'group-hover:bg-green-600 group-hover:text-white' },
                        { icon: Ticket, label: 'Entrada gratuita', href: '/buscar?costo=Gratis', color: 'text-amber-600', bg: 'bg-amber-50', hover: 'group-hover:bg-amber-600 group-hover:text-white' },
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="group flex flex-col items-start p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden"
                        >
                            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${item.hover}`}>
                                <item.icon className="w-7 h-7" strokeWidth={2} />
                            </div>
                            <span className="font-bold text-lg text-gray-900 group-hover:text-indigo-900">{item.label}</span>
                            <div className="mt-auto pt-4 flex items-center text-sm font-medium text-gray-400 group-hover:text-indigo-500 transition-colors">
                                Ver resultados <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* FEATURED PLACES */}
            <section className="py-16 bg-white px-4 border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Experiencias destacadas</h2>
                            <p className="text-gray-500">Los espacios más recomendados por nuestra comunidad</p>
                        </div>
                        <Link href="/buscar" className="hidden sm:flex items-center font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-4 py-2 rounded-full transition-colors">
                            Ver todas <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    {featuredPlaces.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredPlaces.map((lugar) => {
                                const isPark = lugar.nombre.includes('Parque') || lugar.nombre.includes('Plaza') || lugar.nombre.includes('Reserva');

                                return (
                                    <Link
                                        key={lugar.id}
                                        href={`/lugar/${lugar.slug}`}
                                        className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-indigo-100 transition-all duration-300 h-full"
                                    >
                                        <div className={`h-52 flex items-center justify-center relative overflow-hidden ${isPark ? 'bg-gradient-to-br from-green-100 to-emerald-50' : 'bg-gradient-to-br from-indigo-100 to-blue-50'}`}>
                                            {lugar.imagenes && lugar.imagenes.length > 0 ? (
                                                <img
                                                    src={lugar.imagenes[0]}
                                                    alt={lugar.nombre}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="transform group-hover:scale-110 transition-transform duration-500 opacity-80">
                                                    {isPark ? (
                                                        <Trees className="w-20 h-20 text-emerald-600/50" strokeWidth={1} />
                                                    ) : (
                                                        <Landmark className="w-20 h-20 text-indigo-600/50" strokeWidth={1} />
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="mb-3">
                                                <Badge fuente={lugar.fuente} />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                                {lugar.nombre}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-5 line-clamp-2 flex items-start gap-1">
                                                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" />
                                                {lugar.ubicacion}
                                            </p>

                                            <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                                                <div className="flex gap-3 text-sm text-gray-600">
                                                    {lugar.tiene_banio && <span title="Baño accesible"><Bath className="w-5 h-5 text-gray-400" strokeWidth={1.5} /></span>}
                                                    {lugar.tiene_rampa && <span title="Accesible"><Accessibility className="w-5 h-5 text-gray-400" strokeWidth={1.5} /></span>}
                                                    {lugar.tiene_sombra && <span title="Tiene Sombra"><Trees className="w-5 h-5 text-gray-400" strokeWidth={1.5} /></span>}
                                                </div>
                                                <span className="text-sm font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center">
                                                    Ver detalles <ChevronRight className="w-4 h-4 ml-0.5" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                            <p className="text-gray-500 text-lg">Cargando experiencias o no hay destacadas...</p>
                        </div>
                    )}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-24 px-4 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-500 rounded-full blur-[100px] opacity-20"></div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Cómo funciona la comunidad</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">Nos unimos para que la falta de información deje de ser una barrera.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
                        {[
                            { title: '1. Buscás', desc: 'Filtrá por lo que necesitás hoy: silla, poco ruido, gratis, sombra.', icon: Search },
                            { title: '2. Te informás', desc: 'Sin sorpresas. Datos honestos sobre baños, rampas, distancias y entorno.', icon: Info },
                            { title: '3. Compartís', desc: '¿Fuiste y algo cambió? Sumá tu experiencia para ayudar a otros.', icon: Share2 },
                        ].map((step, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row gap-6 items-center md:items-start group">
                                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 transition-colors duration-300 shadow-lg ring-1 ring-white/10">
                                    <step.icon className="w-8 h-8 text-slate-200 group-hover:text-white" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-balance">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

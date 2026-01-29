import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-[calc(100vh-theme(spacing.20))] flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-blue-50 to-white">

            {/* Friendly Icon */}
            <div className="mb-8 p-6 bg-white rounded-full shadow-sm ring-1 ring-blue-100">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-16 h-16 text-primary"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900">
                ¿Este lugar <span className="text-primary">da</span> o no da?
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Información <strong>real</strong> para salir sin pedir permiso.
                <br /><span className="text-base text-gray-500 font-normal mt-2 block">Sin épica. Sin marketing. Solo accesibilidad.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                    href="/buscar"
                    className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-600 hover:scale-105 transition-all shadow-lg shadow-blue-200"
                >
                    Buscar paseos
                </Link>
                <Link
                    href="/declarar"
                    className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg font-bold hover:border-primary hover:text-primary transition-all hover:bg-blue-50"
                >
                    Soy un lugar
                </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 text-center opacity-60 max-w-lg mx-auto">
                <div>
                    <span className="block text-2xl font-bold text-gray-800">100%</span>
                    <span className="text-sm text-gray-600">Honesto</span>
                </div>
                <div>
                    <span className="block text-2xl font-bold text-gray-800">4</span>
                    <span className="text-sm text-gray-600">Actualizaciones/año</span>
                </div>
                <div>
                    <span className="block text-2xl font-bold text-gray-800">0</span>
                    <span className="text-sm text-gray-600">Marketing</span>
                </div>
            </div>
        </main>
    );
}

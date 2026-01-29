import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-primary transition-colors">
                        P
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-primary transition-colors">
                        PaseosInclusivos
                    </span>
                </Link>
                <nav className="flex gap-1 sm:gap-6 items-center">
                    <Link href="/buscar" className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium transition-all">
                        Buscar
                    </Link>
                    <Link href="/declarar" className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium transition-all">
                        Declarar
                    </Link>
                    <Link href="/transparencia" className="hidden sm:block px-4 py-2 rounded-lg text-gray-500 hover:text-primary font-medium text-sm">
                        Info
                    </Link>
                </nav>
            </div>
        </header>
    );
}

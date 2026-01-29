"use client";

import dynamic from 'next/dynamic';

const Mapa = dynamic(() => import('./Mapa'), {
    ssr: false,
    loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">Cargando mapa...</div>
});

export default Mapa;

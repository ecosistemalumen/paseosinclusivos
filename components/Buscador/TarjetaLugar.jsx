import Link from 'next/link';
import Badge from '@/components/Ficha/Badge';
import { MapPin, CircleDollarSign, Mountain, Accessibility, ChevronRight, Dog } from 'lucide-react';

export default function TarjetaLugar({ lugar }) {
    return (
        <Link
            href={`/lugar/${lugar.slug}`}
            className="group block bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 p-6"
        >
            {/* Image (if available) */}
            {lugar.imagenes && lugar.imagenes.length > 0 && (
                <div className="w-full h-48 mb-4 rounded-xl overflow-hidden relative bg-gray-100">
                    <img
                        src={lugar.imagenes[0]}
                        alt={`Foto de ${lugar.nombre}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            )}

            {/* Header: Badge + Pet Friendly */}
            <div className="mb-4 flex flex-wrap gap-2 items-start justify-between">
                <Badge fuente={lugar.fuente} />
                {lugar.pet_friendly && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        <Dog className="w-3 h-3" /> Pet Friendly
                    </span>
                )}
            </div>

            {/* Nombre */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {lugar.nombre}
            </h3>

            {/* Ubicación */}
            <p className="flex items-center text-sm text-gray-500 mb-6 font-medium">
                <MapPin className="w-4 h-4 mr-1.5 text-gray-400" /> {lugar.ubicacion}
            </p>

            {/* Grid de Info con Iconos */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">

                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CircleDollarSign className="w-4 h-4 text-gray-400" />
                    <span>{lugar.costo}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Mountain className="w-4 h-4 text-gray-400" />
                    <span>Esfuerzo {lugar.nivel_esfuerzo}</span>
                </div>

                <div className="col-span-2 flex items-start gap-2 text-sm text-gray-700">
                    <Accessibility className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{lugar.movilidad.join(', ')}</span>
                </div>

            </div>

            {/* Footer / CTA */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
                <span className="inline-flex items-center text-sm font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                    Ver detalles <ChevronRight className="w-4 h-4 ml-1" />
                </span>
            </div>

        </Link>
    );
}

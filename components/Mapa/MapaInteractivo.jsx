'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Fix Leaflet Default Icon Issue in Next.js
const icon = L.icon({
    iconUrl: '/images/marker-icon.png', // We might need to copy these assets or rely on CDN
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Or use CDN icons if local assets are missing
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapaInteractivo({ lugares, center = [-34.6037, -58.3816], zoom = 13 }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="h-96 w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">Cargando mapa...</div>;
    }

    // Adapt single lugar to array if needed
    const markers = Array.isArray(lugares) ? lugares : [lugares];

    // Calculate center if markers exist
    const mapCenter = markers.length === 1 && markers[0].lat
        ? [markers[0].lat, markers[0].lng]
        : center;

    return (
        <MapContainer
            center={mapCenter}
            zoom={markers.length === 1 ? 15 : zoom}
            scrollWheelZoom={false}
            className="h-96 w-full rounded-xl z-0 shadow-sm border border-gray-200"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((lugar, idx) => (
                lugar.lat && lugar.lng && (
                    <Marker key={lugar.id || idx} position={[lugar.lat, lugar.lng]}>
                        <Popup>
                            <div className="text-center">
                                <h3 className="font-bold text-gray-900">{lugar.nombre}</h3>
                                <p className="text-gray-600 text-sm">{lugar.ubicacion}</p>
                                <a href={`/lugar/${lugar.slug}`} className="text-blue-600 font-semibold text-xs hover:underline mt-1 block">
                                    Ver detalle
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                )
            ))}
        </MapContainer>
    );
}

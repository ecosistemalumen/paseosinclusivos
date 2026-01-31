'use client';

import { useState, useEffect } from 'react';
import { Heart, MapPin, Compass, Loader2 } from 'lucide-react';
import { toggleInteraction, checkInteraction } from '@/lib/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function InteractionButtons({ lugarId }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isVisited, setIsVisited] = useState(false);
    const [isWishlist, setIsWishlist] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchStatus = async () => {
            // In a real app we might pass initial state from server to avoid this flicker/fetch
            // but for now this is client side progressive enhancement
            try {
                const [fav, visit, wish] = await Promise.all([
                    checkInteraction(lugarId, 'FAVORITE'),
                    checkInteraction(lugarId, 'VISITED'),
                    checkInteraction(lugarId, 'WISHLIST')
                ]);
                setIsFavorite(fav);
                setIsVisited(visit);
                setIsWishlist(wish);
            } catch (e) {
                // User likely not logged in or error
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, [lugarId]);

    const handleAction = async (type, currentState, setState, label) => {
        // Optimistic update
        const newState = !currentState;
        setState(newState);

        try {
            const result = await toggleInteraction(lugarId, type);
            // If we needed to revert: setState(result.added)
            if (result.added) {
                toast.success(`Añadido a ${label}`);
            } else {
                toast.info(`Eliminado de ${label}`);
            }
            router.refresh(); // Update dashboard counts if we navigate there
        } catch (error) {
            console.error(error);
            setState(currentState); // Revert
            toast.error('Debes iniciar sesión para hacer esto');
            router.push('/login');
        }
    };

    if (loading) return <div className="h-10 w-full bg-gray-100 rounded-lg animate-pulse" />;

    return (
        <div className="flex gap-2">
            <button
                onClick={() => handleAction('FAVORITE', isFavorite, setIsFavorite, 'Favoritos')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl border font-medium transition-all ${isFavorite
                        ? 'bg-rose-50 text-rose-600 border-rose-200'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
            >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span className="hidden sm:inline">{isFavorite ? 'Guardado' : 'Guardar'}</span>
            </button>

            <button
                onClick={() => handleAction('WISHLIST', isWishlist, setIsWishlist, 'Quiero ir')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl border font-medium transition-all ${isWishlist
                        ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
            >
                <Compass className={`w-5 h-5 ${isWishlist ? 'fill-indigo-500 text-indigo-500' : ''}`} />
                <span className="hidden sm:inline">{isWishlist ? 'En lista' : 'Quiero ir'}</span>
            </button>

            <button
                onClick={() => handleAction('VISITED', isVisited, setIsVisited, 'Visitados')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl border font-medium transition-all ${isVisited
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
            >
                <MapPin className={`w-5 h-5 ${isVisited ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                <span className="hidden sm:inline">{isVisited ? 'Visitado' : 'Ya fui'}</span>
            </button>
        </div>
    );
}

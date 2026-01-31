'use client';

import { createClient } from '@/lib/supabase/client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        router.push('/');
    };

    return (
        <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium text-sm border border-rose-200 hover:bg-rose-50 px-4 py-2 rounded-lg transition-colors"
        >
            <LogOut className="w-4 h-4" /> Cerrar Sesión
        </button>
    );
}

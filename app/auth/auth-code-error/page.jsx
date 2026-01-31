import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function AuthCodeError() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-100">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Link expirado o inválido</h2>
                <p className="text-gray-600 mb-6">
                    El enlace de acceso ya fue usado o expiró. Por seguridad, los links mágicos solo sirven una vez.
                </p>
                <Link
                    href="/login"
                    className="block w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors"
                >
                    Intentar de nuevo
                </Link>
            </div>
        </div>
    );
}

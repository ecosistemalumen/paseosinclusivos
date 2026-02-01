import './globals.css';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import AccessibilityWidget from '@/components/UI/AccessibilityWidget';
import { Toaster } from 'sonner';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Paseos Inclusivos | Experiencias reales',
    description: 'Información y experiencias reales para decidir salir con más certeza. Plataforma comunitaria de accesibilidad.',
    keywords: 'accesibilidad, discapacidad, CUD, movilidad reducida, paseos, inclusión',
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className="antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col">

                {/* Skip to content (accesibilidad) */}
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium z-50"
                >
                    Saltar al contenido principal
                </a>

                <Header />

                <div id="main-content" className="flex-1">
                    {children}
                </div>

                <Footer />
                <AccessibilityWidget />
                <Toaster position="top-center" richColors />

            </body>
        </html>
    );
}

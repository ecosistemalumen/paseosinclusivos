import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import "./globals.css";

export const metadata = {
    title: "Paseos Inclusivos",
    description: "Información real para salir sin pedir permiso.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased flex flex-col">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}

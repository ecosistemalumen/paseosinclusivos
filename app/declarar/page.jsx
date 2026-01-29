import FormDeclaracion from '@/components/Formulario/FormDeclaracion';

export default function DeclararPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Declarar accesibilidad</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    ¿Sos un lugar y querés aparecer en el listado? Completá este formulario con honestidad.
                    No prometemos perfección, prometemos transparencia.
                </p>
            </div>

            <FormDeclaracion />
        </div>
    );
}

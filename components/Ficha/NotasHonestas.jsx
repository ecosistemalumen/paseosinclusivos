export default function NotasHonestas({ notas }) {
    return (
        <section className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Así se vivió
            </h2>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                    {notas}
                </p>
            </div>

            <p className="text-sm text-gray-500 mt-4 italic">
                La experiencia es subjetiva. Esto es lo que vivió alguien de la comunidad.
            </p>
        </section>
    );
}

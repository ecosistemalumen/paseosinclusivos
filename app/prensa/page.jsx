import { Newspaper, Mail, Download, Globe } from 'lucide-react';

export default function PrensaPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gray-50 py-20 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Prensa y Comunicación
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Facilitamos información nítida y recursos para periodistas y comunicadores que quieran difundir el impacto de la accesibilidad comunitaria.
                    </p>
                </div>
            </section>

            {/* Contenido Principal */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">

                    {/* El Proyecto */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                            <Globe className="w-6 h-6 text-indigo-600" />
                            ¿Qué es Paseos Inclusivos?
                        </h2>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p className="text-xl font-medium text-gray-900 mb-4">
                                Paseos Inclusivos es la primera plataforma comunitaria de turismo accesible en Argentina que no se basa en fichas técnicas, sino en la experiencia real de las personas.
                            </p>
                            <p>
                                Nacido como una iniciativa sin fines de lucro, el proyecto busca transformar la frustración de la "falta de información" en la seguridad de saber exactamente con qué se va a encontrar un usuario antes de salir de su casa.
                            </p>
                        </div>
                    </div>

                    {/* Datos Clave */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        <div className="bg-indigo-50 p-8 rounded-2xl">
                            <h3 className="font-bold text-indigo-900 mb-4">Por qué es relevante</h3>
                            <p className="text-indigo-800/80 leading-relaxed">
                                Más de 5 millones de personas en Argentina tienen alguna discapacidad. La falta de datos actualizados es la principal barrera para el ejercicio del derecho al ocio y la cultura.
                            </p>
                        </div>
                        <div className="bg-green-50 p-8 rounded-2xl">
                            <h3 className="font-bold text-green-900 mb-4">A quiénes impacta</h3>
                            <p className="text-green-800/80 leading-relaxed">
                                Usuarios de sillas de ruedas, personas con movilidad reducida, familias con cochecitos, personas con autismo (CEA) y adultos mayores.
                            </p>
                        </div>
                    </div>

                    {/* Recursos y Contacto */}
                    <div className="border-t border-gray-100 pt-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                            {/* Contacto */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-indigo-600" />
                                    Contacto de Prensa
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Respondemos consultas, enviamos datos específicos para notas y coordinamos entrevistas con el equipo fundador.
                                </p>
                                <a
                                    href="mailto:prensa@paseosinclusivos.org"
                                    className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors break-words"
                                >
                                    prensa@paseosinclusivos.org
                                </a>
                            </div>

                            {/* Descargas */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Download className="w-5 h-5 text-indigo-600" />
                                    Kit de Prensa
                                </h3>
                                <p className="text-gray-600 mb-8">
                                    Descargá logotipos en alta resolución, capturas de la plataforma y textos de referencia.
                                </p>
                                <button className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-95">
                                    Descargar Kit (.zip)
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

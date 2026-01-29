"use client";

import { useState } from 'react';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import CamposAccesibilidad from '@/components/Formulario/CamposAccesibilidad';

export default function FormDeclaracion() {
    const [formData, setFormData] = useState({
        nombre_lugar: '',
        email_contacto: '',
        telefono: '',
        ubicacion: '',
        costo: '',
        nivel_esfuerzo: '',
        movilidad: [],
        tiene_rampa: false,
        tiene_banio: false,
        es_plano: false,
        distancia_aprox: '',
        ruido: '',
        tiene_sombra: false,
        mejor_estacion: [],
        notas_adicionales: ''
    });

    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('/api/declaracion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                console.log('Form submitted:', formData);
            } else {
                setStatus('error');
                console.error('Error submitting form');
                alert('Hubo un error al enviar tu declaración. Por favor intentá nuevamente.');
            }
        } catch (error) {
            setStatus('error');
            console.error('Error submitting form:', error);
            alert('Hubo un error de conexión.');
        } finally {
            if (status !== 'success') {
                setStatus('idle');
            }
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 p-8 rounded-xl text-center border border-green-100">
                <h2 className="text-2xl font-bold text-green-800 mb-4">¡Gracias por tu declaración!</h2>
                <p className="text-lg text-green-700 mb-6">
                    Revisaremos la información y la publicaremos pronto. Tu aporte ayuda a que más personas salgan sin pedir permiso.
                </p>
                <Button onClick={() => window.location.href = '/'}>
                    Volver al inicio
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-8">
                <h3 className="text-xl font-bold mb-6 pb-2 border-b">1. Datos del Lugar</h3>
                <Input
                    label="Nombre del lugar"
                    id="nombre_lugar"
                    value={formData.nombre_lugar}
                    onChange={(e) => handleChange('nombre_lugar', e.target.value)}
                    required
                />
                <Input
                    label="Ubicación completa"
                    id="ubicacion"
                    value={formData.ubicacion}
                    onChange={(e) => handleChange('ubicacion', e.target.value)}
                    required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Email de contacto"
                        id="email_contacto"
                        type="email"
                        value={formData.email_contacto}
                        onChange={(e) => handleChange('email_contacto', e.target.value)}
                        required
                    />
                    <Input
                        label="Teléfono (opcional)"
                        id="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => handleChange('telefono', e.target.value)}
                    />
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-bold mb-6 pb-2 border-b">2. Información de Accesibilidad</h3>
                <CamposAccesibilidad values={formData} onChange={handleChange} />
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-bold mb-6 pb-2 border-b">3. Ambiente y Notas</h3>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de Ruido</label>
                    <div className="flex gap-4">
                        {['Bajo', 'Medio', 'Alto'].map(nivel => (
                            <label key={nivel} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="ruido"
                                    value={nivel}
                                    checked={formData.ruido === nivel}
                                    onChange={(e) => handleChange('ruido', e.target.value)}
                                    className="w-4 h-4 text-primary"
                                />
                                <span>{nivel}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.tiene_sombra}
                            onChange={(e) => handleChange('tiene_sombra', e.target.checked)}
                            className="w-4 h-4 text-primary rounded"
                        />
                        <span className="font-medium text-gray-700">¿Tiene sectores con sombra?</span>
                    </label>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notas honestas o adicionales</label>
                    <textarea
                        className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all"
                        rows="4"
                        placeholder="Contanos algo que deberíamos saber..."
                        value={formData.notas_adicionales}
                        onChange={(e) => handleChange('notas_adicionales', e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Enviando...' : 'Enviar Declaración'}
                </Button>
            </div>
        </form>
    );
}

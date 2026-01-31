'use client';

import { useState, useEffect } from 'react';
import {
    Accessibility,
    Eye,
    Type,
    Volume2,
    VolumeX,
    Minus,
    Plus,
    X,
    Sun,
    Moon
} from 'lucide-react';

export default function AccessibilityWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [fontSize, setFontSize] = useState(100); // Percentage
    const [highContrast, setHighContrast] = useState(false);
    const [reading, setReading] = useState(false);

    // Apply high contrast
    useEffect(() => {
        if (highContrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
    }, [highContrast]);

    // Apply font size
    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}%`;
    }, [fontSize]);

    // Text to Speech logic
    const toggleSpeech = () => {
        if (reading) {
            window.speechSynthesis.cancel();
            setReading(false);
        } else {
            const text = document.body.innerText;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-AR';
            window.speechSynthesis.speak(utterance);
            setReading(true);

            utterance.onend = () => setReading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">

            {/* Panel */}
            {isOpen && (
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-[0_10px_40px_-5px_rgba(0,0,0,0.2)] border border-gray-100 mb-2 w-72 animate-in slide-in-from-bottom-4 duration-200">
                    <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <Accessibility className="w-5 h-5 text-indigo-600" />
                            Accesibilidad
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-5">
                        {/* Font Size */}
                        <div>
                            <span className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-2 block">Tamaño de Texto</span>
                            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-1 border border-gray-200">
                                <button
                                    onClick={() => setFontSize(prev => Math.max(80, prev - 10))}
                                    className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-gray-600 transition-all active:scale-95"
                                    aria-label="Disminuir texto"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-bold text-gray-700 w-12 text-center select-none">{fontSize}%</span>
                                <button
                                    onClick={() => setFontSize(prev => Math.min(150, prev + 10))}
                                    className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-gray-600 transition-all active:scale-95"
                                    aria-label="Aumentar texto"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Tools Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Contrast */}
                            <button
                                onClick={() => setHighContrast(!highContrast)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 gap-2 ${highContrast
                                    ? 'bg-yellow-400 border-black text-black shadow-none ring-2 ring-black transform scale-[0.98]'
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md'
                                    }`}
                            >
                                {highContrast ? <Sun className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                                <span className="text-xs font-bold">{highContrast ? 'Normal' : 'Contraste'}</span>
                            </button>

                            {/* TTS */}
                            <button
                                onClick={toggleSpeech}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 gap-2 ${reading
                                    ? 'bg-indigo-100 border-indigo-200 text-indigo-700 ring-2 ring-indigo-500 transform scale-[0.98]'
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md'
                                    }`}
                            >
                                {reading ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                                <span className="text-xs font-bold">{reading ? 'Silenciar' : 'Leer web'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 rounded-full shadow-[0_8px_30px_rgba(79,70,229,0.3)] transition-all duration-300 transform hover:scale-110 focus:ring-4 focus:ring-indigo-300 focus:outline-none flex items-center justify-center ${isOpen ? 'bg-gray-800 rotate-90' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                aria-label="Opciones de accesibilidad"
            >
                {isOpen ? (
                    <X className="w-8 h-8 text-white" strokeWidth={2.5} />
                ) : (
                    <Accessibility className="w-8 h-8 text-white" strokeWidth={1.5} />
                )}
            </button>
        </div>
    );
}

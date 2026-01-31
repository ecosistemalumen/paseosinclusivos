
/**
 * NÚCLEO DE DECISIÓN - SEMÁFORO DE ACCESIBILIDAD
 * 
 * Responde a: ¿Qué me voy a encontrar?
 * Lógica: Describir la experiencia sin juzgar ni certificar.
 * Lenguaje: Experiencial + Contexto + Cuidado.
 */

import { ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';

export function calculateSemaphore(lugar, userProfile) {
    // Definimos si la perspectiva es de movilidad reducida (por defecto sí, enfoque cuidado)
    const mobility = userProfile?.mobility_type || 'general';
    const isWheelchair = mobility === 'silla' || mobility === 'general';

    let color = 'green';
    let reasons = [];

    // --- REGLAS TÉCNICAS (Determinan el color base) ---

    // 1. Esfuerzo Alto -> ROJO (Información crítica)
    if (lugar.nivel_esfuerzo === 'Alto') {
        return {
            status: 'red',
            title: 'Para tener en cuenta antes de ir',
            desc: 'Quienes ya fueron comentan que el recorrido requiere esfuerzo físico o tiene barreras estructurales importantes.',
            icon: ThumbsDown,
            style: 'bg-red-50 text-red-800 border-red-200'
        };
    }

    // 2. Falta de baño adaptado -> AMARILLO (Dato a considerar)
    if (!lugar.tiene_banio) {
        color = 'yellow';
        reasons.push('no cuenta con baño adaptado');
    }

    // 3. Silla de ruedas requiere Rampa y Plano
    if (isWheelchair) {
        if (!lugar.tiene_rampa) {
            color = 'red'; // Barrera de ingreso
            reasons.push('falta rampa de acceso');
        }
        if (!lugar.es_plano) {
            color = 'yellow'; // Puede ser manejable con ayuda
            if (lugar.nivel_esfuerzo !== 'Bajo') color = 'red';
            reasons.push('la superficie es irregular o con desniveles');
        }
    }

    // 4. Notas Honestas
    if (lugar.notas_honestas && lugar.notas_honestas.length > 10) {
        if (color === 'green') color = 'yellow';
        reasons.push('hay observaciones de la comunidad que conviene leer');
    }


    // --- RETORNO DE ESTADO CON LENGUAJE EXPERIENCIAL ---

    const formattedReasons = reasons.length > 0
        ? 'Principalmente porque ' + reasons.join(' y ') + '.'
        : '';

    if (color === 'red') {
        return {
            status: 'red',
            title: 'Para tener en cuenta antes de ir',
            desc: reasons.length > 0
                ? `Puede presentar barreras importantes. ${formattedReasons}`
                : 'La experiencia puede ser difícil por las barreras estructurales actuales.',
            icon: ThumbsDown,
            style: 'bg-red-50 text-red-800 border-red-200'
        };
    }

    if (color === 'yellow') {
        return {
            status: 'yellow',
            title: 'Lo bueno y lo incómodo',
            desc: reasons.length > 0
                ? `El espacio es disfrutable, pero conviene saber que ${reasons.join(', ')}.`
                : 'Es un lindo espacio, pero requiere cierta planificación.',
            icon: AlertTriangle,
            style: 'bg-amber-50 text-amber-900 border-amber-200'
        };
    }

    // Green
    return {
        status: 'green',
        title: 'Qué vas a encontrar',
        desc: 'Un espacio que suele ser cómodo, con recorridos planos y sin barreras importantes señaladas.',
        icon: ThumbsUp,
        style: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    };
}

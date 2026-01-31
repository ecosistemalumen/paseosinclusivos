export default function Badge({ fuente }) {
    const esDeclarado = fuente === 'Declarado';

    return (
        <span className={`
      inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
      ${esDeclarado
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-blue-100 text-blue-800 border border-blue-300'
            }
    `}>
            {esDeclarado ? '✓' : 'ⓘ'}
            {esDeclarado
                ? 'Información del espacio'
                : 'Información comunitaria'
            }
        </span>
    );
}

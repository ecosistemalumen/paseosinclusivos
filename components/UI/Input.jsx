export default function Input({ label, id, type = 'text', className = '', ...props }) {
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-900 mb-2">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={`w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all ${className}`}
                {...props}
            />
        </div>
    );
}

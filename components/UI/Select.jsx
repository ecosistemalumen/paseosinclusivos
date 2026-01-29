export default function Select({ label, id, options = [], className = '', ...props }) {
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-900 mb-2">
                    {label}
                </label>
            )}
            <select
                id={id}
                className={`w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all bg-white ${className}`}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
    const baseStyles = "px-6 py-3 text-lg font-medium rounded-lg focus:ring-4 focus:outline-none transition-colors";
    const variants = {
        primary: "bg-primary text-white hover:bg-blue-700 focus:ring-blue-300",
        secondary: "bg-secondary text-white hover:bg-slate-600 focus:ring-slate-300",
        outline: "bg-white border-2 border-primary text-primary hover:bg-blue-50 focus:ring-blue-100",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

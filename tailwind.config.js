/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Azul accesible
        secondary: '#64748b', // Gris
        success: '#10b981', // Verde
        warning: '#f59e0b', // Naranja
        danger: '#ef4444', // Rojo
      },
    },
  },
  plugins: [],
};

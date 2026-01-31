/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5', // Indigo 600
          hover: '#4338ca',   // Indigo 700
          light: '#818cf8',   // Indigo 400
        },
        secondary: {
          DEFAULT: '#14b8a6', // Teal 500
          hover: '#0d9488',   // Teal 600
        },
        accent: {
          DEFAULT: '#f59e0b', // Amber 500
          hover: '#d97706',   // Amber 600
        },
        surface: {
          DEFAULT: '#ffffff',
          glass: 'rgba(255, 255, 255, 0.7)',
        }
      },
      fontSize: {
        'base': ['18px', '1.6'],
        'lg': ['20px', '1.6'],
        'xl': ['22px', '1.5'],
        '2xl': ['26px', '1.4'],
        '3xl': ['32px', '1.3'],
        '4xl': ['40px', '1.2'],
        '5xl': ['48px', '1.1'],
        '6xl': ['56px', '1.1'],
        '7xl': ['64px', '1'],
      },
      borderWidth: {
        '3': '3px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}

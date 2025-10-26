/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mint: '#00C58E',
        turquoise: '#3FB8AF',
        aquaBg: '#F5FAFA',
        aquaLight: '#E8F9F3',
        darkTeal: '#1B3A3F',
      },
      fontFamily: {
        poppins: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans'],
      },
      boxShadow: {
        soft: '0 10px 24px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl2: '1rem',
      }
    },
  },
  plugins: [],
}


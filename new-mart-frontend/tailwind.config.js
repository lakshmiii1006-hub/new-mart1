/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        supermarket: {
          50: '#fef3e8',
          100: '#fed7aa',
          400: '#fb923c', 
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'Segoe UI', 'system-ui']
      }
    }
  },
  plugins: [],
}

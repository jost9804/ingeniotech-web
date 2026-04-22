/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#F26522',
          dark: '#D4561A',
          light: '#FF8040',
        },
        surface: {
          DEFAULT: '#1E293B',
          dark: '#0F172A',
          light: '#293548',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

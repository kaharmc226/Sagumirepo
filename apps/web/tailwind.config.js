/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sagumi: {
          50: '#fdf8f3',
          100: '#faeee0',
          200: '#f4d9bc',
          300: '#ecc090',
          400: '#e29d5b',
          500: '#d87f35',
          600: '#c46628',
          700: '#a34e22',
          800: '#843f22',
          900: '#6b351e',
        },
      },
    },
  },
  plugins: [],
};
